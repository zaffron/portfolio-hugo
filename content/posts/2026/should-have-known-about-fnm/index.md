---
title: I should have known about fnm before
slug: should-have-known-about-fnm
description: The migration from nvm to fnm
date: 2026-02-01T13:10:00+07:00
lastmod: 2026-02-01T13:10:00+07:00
draft: false
author: Avinash Rijal
categories:
  - Daily Life
  - Tutorial
tags:
  - zsh
  - oh-my-zsh
  - fnm
series_order: 0
featured_image: /uploads/fnm.png
featured_image_alt: fnm
seo:
  robots: index, follow
social:
  og_type: article
  twitter_card: summary_large_image
  twitter_handle: "@avinashrijal"
advanced:
  weight: 0
  toc: true
  disable_comments: false
---
Okay, I have just woken up and had my food. I opened my computer and as usual; started terminal. I just setup my arch hyprland yesterday night and trimmed everything down to only things that I need. My least concern was terminal load time as I was really tired yesterday.

This is going to my inner thoughts and not a well written blog.

But when I woke up and open the computer, that first load of the terminal which took more than a second to load started to bug me off. On tmux, my workflow is constantly opening new terms and start typing immediately, this one second of delay is often ignored because it is not much but today I had to take a look into this.

I loaded the performance plugin, setup the zshrc and loaded it and then I saw this:

```
num  calls                time                       self            name
-----------------------------------------------------------------------------------
 1)    4         217.05    54.26   75.69%    125.41    31.35   43.73%  nvm
 2)    2          79.04    39.52   27.56%     68.01    34.01   23.72%  nvm_ensure_version_installed
 3)    2         255.76   127.88   89.19%     38.72    19.36   13.50%  nvm_auto
 4)    2          12.54     6.27    4.37%     12.44     6.22    4.34%  nvm_die_on_prefix
 5)    2          11.03     5.51    3.85%     11.03     5.51    3.85%  nvm_is_version_installed
 6)   26          13.47     0.52    4.70%      8.43     0.32    2.94%  _omz_source
 7)    4           7.41     1.85    2.58%      7.41     1.85    2.58%  compaudit
 8)    2          14.53     7.26    5.07%      7.12     3.56    2.48%  compinit
 9)    1           2.05     2.05    0.71%      2.01     2.01    0.70%  _zsh_highlight_load_highlighters
10)    1           1.18     1.18    0.41%      1.18     1.18    0.41%  zrecompile
11)    1           1.02     1.02    0.36%      1.02     1.02    0.36%  (anon) [/home/zaffron/.oh-my-zsh/tools/check_for_upgrade.sh:162]
12)    1           0.57     0.57    0.20%      0.57     0.57    0.20%  test-ls-args
13)    1           1.51     1.51    0.53%      0.49     0.49    0.17%  handle_update
14)    1           0.49     0.49    0.17%      0.48     0.48    0.17%  _zsh_highlight__function_callable_p
15)    1           0.39     0.39    0.14%      0.39     0.39    0.14%  colors
16)    9           0.37     0.04    0.13%      0.37     0.04    0.13%  is-at-least
17)   14           0.36     0.03    0.13%      0.36     0.03    0.13%  compdef
18)    9           0.35     0.04    0.12%      0.35     0.04    0.12%  add-zsh-hook
19)    3           0.36     0.12    0.13%      0.33     0.11    0.12%  add-zle-hook-widget
20)    1           0.22     0.22    0.08%      0.22     0.22    0.08%  regexp-replace
21)    8           0.09     0.01    0.03%      0.09     0.01    0.03%  nvm_npmrc_bad_news_bears
22)    1           0.07     0.07    0.02%      0.07     0.07    0.02%  (anon) [/home/zaffron/.oh-my-zsh/custom/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh:460]
23)    2           0.06     0.03    0.02%      0.06     0.03    0.02%  nvm_has
24)    8           0.05     0.01    0.02%      0.05     0.01    0.02%  is_plugin
25)    1           0.08     0.08    0.03%      0.03     0.03    0.01%  complete
26)    1           0.03     0.03    0.01%      0.03     0.03    0.01%  (anon) [/usr/share/zsh/functions/Misc/add-zle-hook-widget:28]
27)    2         255.79   127.90   89.20%      0.03     0.01    0.01%  nvm_process_parameters
28)    3           0.02     0.01    0.01%      0.02     0.01    0.01%  is_theme
29)    2           0.01     0.01    0.01%      0.01     0.01    0.01%  bashcompinit
30)    2           0.01     0.01    0.00%      0.01     0.01    0.00%  nvm_is_zsh
31)    2           0.01     0.00    0.00%      0.01     0.00    0.00%  env_default
32)    1           0.01     0.01    0.00%      0.01     0.01    0.00%  _zsh_highlight__is_function_p
33)    1           0.00     0.00    0.00%      0.00     0.00    0.00%  _awscli-homebrew-installed
34)    1           0.00     0.00    0.00%      0.00     0.00    0.00%  _zsh_highlight_bind_widgets
```

You will notice within a second the one culprit which was behind all this. NVM is really been my friend for long but this is too much of time it was taking to consider as a good friend anymore.

So, I searched a bit on internet and found this gem called `fnm` :
<https://github.com/Schniz/fnm>

Wow, this thing is written in rust and it just blew my mind, I should have switched to this long back, if you want to look at metrics here it is:
```
num  calls                time                       self            name
-----------------------------------------------------------------------------------
 1)   26          13.53     0.52   61.52%      8.54     0.33   38.84%  _omz_source
 2)    2           3.84     1.92   17.49%      3.84     1.92   17.49%  compaudit
 3)    1           2.09     2.09    9.50%      2.05     2.05    9.32%  _zsh_highlight_load_highlighters
 4)    1           5.56     5.56   25.30%      1.72     1.72    7.81%  compinit
 5)    1           1.08     1.08    4.90%      1.08     1.08    4.90%  zrecompile
 6)    1           1.06     1.06    4.83%      1.06     1.06    4.83%  (anon) [/home/zaffron/.oh-my-zsh/tools/check_for_upgrade.sh:162]
 7)    1           0.56     0.56    2.53%      0.56     0.56    2.53%  test-ls-args
 8)    1           1.53     1.53    6.95%      0.47     0.47    2.12%  handle_update
 9)    1           0.46     0.46    2.08%      0.45     0.45    2.05%  _zsh_highlight__function_callable_p
10)   10           0.40     0.04    1.84%      0.40     0.04    1.84%  add-zsh-hook
11)   13           0.37     0.03    1.67%      0.37     0.03    1.67%  compdef
12)    9           0.36     0.04    1.62%      0.36     0.04    1.62%  is-at-least
13)    1           0.34     0.34    1.57%      0.34     0.34    1.57%  colors
14)    3           0.37     0.12    1.69%      0.34     0.11    1.55%  add-zle-hook-widget
15)    1           0.21     0.21    0.95%      0.21     0.21    0.95%  regexp-replace
16)    1           0.07     0.07    0.32%      0.07     0.07    0.32%  (anon) [/home/zaffron/.oh-my-zsh/custom/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh:460]
17)    8           0.05     0.01    0.23%      0.05     0.01    0.23%  is_plugin
18)    1           0.03     0.03    0.14%      0.03     0.03    0.14%  (anon) [/usr/share/zsh/functions/Misc/add-zle-hook-widget:28]
19)    3           0.02     0.01    0.08%      0.02     0.01    0.08%  is_theme
20)    2           0.01     0.00    0.04%      0.01     0.00    0.04%  env_default
21)    1           0.01     0.01    0.03%      0.01     0.01    0.03%  bashcompinit
22)    1           0.01     0.01    0.03%      0.01     0.01    0.03%  _zsh_highlight__is_function_p
23)    1           0.01     0.01    0.02%      0.01     0.01    0.02%  _fnm_autoload_hook
24)    1           0.00     0.00    0.01%      0.00     0.00    0.01%  _awscli-homebrew-installed
25)    1           0.00     0.00    0.00%      0.00     0.00    0.00%  _zsh_highlight_bind_widgets
```

Basically the time taken to load for this went from >500 to 0.1


Anyway, that is just what I wanted to share, thanks if you are reading this and are someone else other than me :)
