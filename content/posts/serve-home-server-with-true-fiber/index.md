+++
title = "Serving Your Home Server with True Fiber Internet Without a Static IP"
slug = "serve-home-server-with-true-fib"
date = 2023-01-15T09:00:00-07:00
draft = false
description = "Serve your home server without buying static IP and using IP behind NAT"
tags = ['red']
+++

### Problem Description

Recently, I switched to a new internet service provider in Thailand called "True." The name is quite inconvenient for searching solutions related to their services due to its common use as a Boolean variable or word. Previously, I was using "AIS," which was affordable, costing only 200B to get a static IP. However, with "True," obtaining a static IP for my home server has become quite expensive, costing around 1000B.

### Research and Solution

To avoid the high cost of a static IP, I started exploring the router settings to find an alternative. The router supports Dynamic DNS (DDNS) updates, so I needed a way to get the IPv4 address behind the NAT and automatically update it to my A record for serving my server.

After some investigation, I discovered an API request that the router makes:

1. **Identify the API Request**: The router makes a specific API request to obtain the external IP address.
2. **Automate the Process**: Use this API request to fetch the current external IP address and update the DNS record automatically.

Here is a basic outline of how you can achieve this:

1. **Fetch External IP Address**: Write a script to make the API request and retrieve the external IP address.
2. **Update DNS Record**: Use a DNS provider's API to update the A record with the fetched IP address.

T﻿he url that gave me the proper result that I wanted was:

`http://192.168.1.1/cgi-bin/json/diagnoseStatus.json`

T﻿he response for it was:

```json
{
  "Wlan2GEnable": "1",
  "Wlan5GEnable": "1",
  "DnsAddress": "201.144.201.42",
  "WanState": "up",
  "WANEnNAT": "Enable,Disabled,",
  "WanName": "1_TR069_INTERNET_R_VID_100,2_INTERNET_B_VID_293,",
  "WanIP4": "100.105.170.53,N/A,",
  "WanDns4": "203.144.207.49,N/A,",
  "WanDns6": "2001:fb0:100::207:49,N/A,",
  "DhcpEnable": "1",
  "wanStatus": "up"
}
```

S﻿o, from this what I wanted was `WanIP4`. That would do the trick and I would no longer need to require a static IP.

### Implementation

T﻿hen I created a Docker container with a script that will run a cron job every day and get the IP by calling my router and then send update to cloudflare to update my DNS A record.
Y﻿ou can find the Dockerfile and script from the following github repo:

https://github.com/zaffron/true-ddns-cf-updater

F﻿or docker image you can refer to:

https://hub.docker.com/repository/docker/avinashrijal/true-th-cf-dns-updater/general

H﻿ere is reference to the script:

```shell
#!/bin/sh

# Fetch the URL from the environment variable, use default if not set
url=${URL:-"http://192.168.1.1/cgi-bin/json/diagnoseStatus.json"}

# Cloudflare credentials from environment variables
zone_id=${CF_ZONE_ID}
dns_record_id=${CF_DNS_RECORD_ID}
auth_token=${CF_AUTH_TOKEN}
record_name=${CF_RECORD_NAME}
ttl=${CF_TTL:-3600}

# Fetch the JSON data
response=$(curl -s "$url")

# Extract the WanIP4 field using jq and get the first IP address
ip4=$(echo "$response" | jq -r '.WanIP4' | cut -d ',' -f 1)

# Print the extracted IP address
echo "Extracted IP: $ip4"

# Update Cloudflare DNS record
curl --request PUT \
  --url https://api.cloudflare.com/client/v4/zones/$zone_id/dns_records/$dns_record_id \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer $auth_token" \
  --data '{
    "type": "A",
    "name": "'"${record_name}"'",
    "content": "'"${ip4}"'",
    "ttl": '"${ttl}"',
    "proxied": false
  }'

echo "DNS record updated successfully!"
```

### Final Results

With the solution in place, I no longer need to pay for a static IPv4 address. The script runs automatically every day and keeps the IPv4 address updated in the DNS records. The only downside is that this IP cannot be proxied by Cloudflare, so it's essential to have good measures in place for DDoS attacks just in case.
