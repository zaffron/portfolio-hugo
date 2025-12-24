+++
date = '{{ .Date }}'
draft = true
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
path = '{{ .File.Path }}'
featured_image = '{{ .Params.featured_image }}'
description = '{{ .Description }} | default " "'
+++

{{ .Content }}
