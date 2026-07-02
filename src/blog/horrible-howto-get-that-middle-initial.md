---
title: "Horrible Howto - Get that Middle Initial"
date: "2019-04-20"
author: "Sammy C."
description: "A tiny snippet for formatting a middle initial from a middle name in JavaScript."
tags:
  - blog
  - javascript
  - horriblesnippets
  - howto
  - snippet
layout: blog-post.njk
---

I really just wanted to post my first post, and I had just made this snippet, so I decided to post it here. What the hay!

```javascript
const formatMiddleInitial = middleName => (middleName ? middleName.charAt(0).toUpperCase() : null);
console.log('stuff', formatMiddleInitial('clark hark'));
```
