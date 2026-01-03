---
title: "From Gatsby to Hugo: Why I Finally Let Go"
slug: from-gatsby-to-hugo
description: After years of relying on Gatsby for my personal site, mounting
  maintenance issues and a slowing ecosystem pushed me to move on. This is my
  journey migrating to Hugo, why I chose it, and what I gained by embracing a
  faster, simpler stack.
date: 2026-01-03T13:35:00+07:00
lastmod: 2026-01-03T13:35:00+07:00
draft: false
author: Avinash Rijal
categories:
  - Daily Life
  - Opinion
tags:
  - hugo
  - daily-life
series_order: 0
featured_image: /uploads/hugo-over-gatsby.png
featured_image_alt: hugo-over-gatsby
seo:
  robots: index, follow
  meta_description: After years of relying on Gatsby for my personal site,
    mounting maintenance issues and a slowing ecosystem pushed me to move on.
    This is my journey migrating to Hugo, why I chose it, and what I gained by
    embracing a faster, simpler stack.
  keywords:
    - hugo
    - gatsby
    - hugo-to-gatsby
social:
  og_type: article
  twitter_card: summary_large_image
  twitter_handle: "@avinashrijal"
advanced:
  weight: 0
  toc: true
  disable_comments: false
---
## Pretext

Around **5–6 years ago**, I stumbled upon **[GatsbyJS](https://www.gatsbyjs.com/)** while searching for a JavaScript framework that could *actually* handle everything my personal blog needed:

* Markdown content  
* Image optimization  
* Static site generation  

At the time, Gatsby felt like a silver bullet.

My prior experience with **[GraphQL](https://graphql.org/)** fit perfectly into Gatsby’s mental model, and to this day I’ll argue that Gatsby’s image tooling was — and still is — **top-tier**. Back then, it solved problems most frameworks barely acknowledged.

- - -

## The Downfall

Then came **2025** — and things started feeling… off.

I can’t pinpoint the exact moment Gatsby began declining, but it felt like watching a project slowly lose momentum. Not abandoned outright — just increasingly neglected.

Issues started piling up:

* Plugins breaking with the latest Node LTS  
* “Official” plugins not working out of the box  
* Long-standing issues sitting unanswered  
* A plugin ecosystem that felt stale and under-maintained  

Individually, these were manageable. Collectively, they were exhausting.

Maintaining my portfolio started feeling like babysitting a framework instead of building with it — and that’s when I knew it was time to move on.

- - -

## Migration

In **December 2025**, I finally opened my portfolio repository again.

I’ll be honest — I’m terrible at maintaining my own portfolio. Work keeps me busy, and it’s always the last thing on my priority list. Still, I had one hard rule:\
**if I’m going to touch it, I’m migrating it before the end of 2025.**

While researching alternatives, I noticed Netlify spinning off its blogging solution into **[Decap CMS](https://decapcms.org/)** (formerly Netlify CMS). Around the same time, my Gatsby app started throwing deprecation warnings like confetti.

That combination was enough of a red flag.

After some digging, comparisons, and gut checks, I landed on **[Hugo](https://gohugo.io/)**.

- - -

## Enter Hugo

Hugo brands itself as *“the world’s fastest framework for building websites”* — and for once, that marketing claim actually holds up.

* Builds complete in **milliseconds**
* Deployments finish in **seconds**

Coming from Gatsby, the speed difference was almost comical.

I already had some familiarity with **[Go](https://go.dev/)**, and while Hugo doesn’t feel like writing Go directly, the underlying philosophy is close enough to feel intuitive. After spending some time migrating content, layouts, and workflows, everything clicked — and honestly, it felt refreshing.

That said, Hugo is **not perfect**.

The one thing I genuinely dislike is its templating language: **`gotmpl`**.

I couldn’t find a clean way to get proper Tree-sitter support working in **[Neovim](https://neovim.io/)**. Syntax highlighting is rough at best — it’s either treated as raw HTML or generic templates, neither of which feels right. Compared to JSX or even Vue templates, this part of Hugo absolutely shows its age.

Still, I’ll take bad syntax highlighting over slow builds any day.

- - -

## What’s Next

For now, I’m sticking with **Hugo**. It’s fast, reliable, boring in the *right* ways — and that’s exactly what I want for a personal site.

### Current Stack

* Styling fully migrated from `styled-components` to **[Tailwind CSS](https://tailwindcss.com/)**
* Entire site built with **[Hugo](https://gohugo.io/)**

  * I initially considered extracting everything into a reusable Hugo theme
  * Dropped the idea — tight coupling is fine for now, and over-engineering helps no one
* Blogging workflow:

  * Write posts in **[Obsidian](https://obsidian.md/)**
  * Publish via **[Decap CMS](https://decapcms.org/)** admin panel. This is what it looks like on the backend:

    ![decap-backend](/uploads/blog-backend.png "decap-backend")
* Hosting on **[Netlify](https://www.netlify.com/)**

  * Authentication handled by Netlify itself

The end result is a setup that’s:

* Faster  
* Simpler  
* Easier to maintain  
* Less mentally taxing  

And honestly? That’s the biggest win.
