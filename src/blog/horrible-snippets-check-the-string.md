---
title: "Horrible Snippets - Check the string"
date: "2019-05-02"
author: "Sammy C."
description: "A quick snippet for comma-separated feature flags in JavaScript, useful for dark launches."
tags:
  - blog
  - javascript
  - arrays
  - horriblesnippets
  - snippets
layout: blog-post.njk
---

## Usecase

Sometimes you want to implement a dark-launch feature. Instead of passing a bunch of environment variables, you can use a single `DARK_LAUNCH` flag with comma-separated values.

```javascript
const stringydingy = 'foo,bar,baz';

stringydingy.split(',').includes('foo');

if(stringydingy.split(',').includes('foo')) {
  runDarkLaunchDotCalm();
}
```

Play with it, try it out in your project, and feedback on how it can be improved!
