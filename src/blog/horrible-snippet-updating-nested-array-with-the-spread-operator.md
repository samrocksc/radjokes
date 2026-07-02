---
title: "Horrible Snippet - Updating a Nested Array With The Spread Operator"
date: "2019-04-20"
author: "Sammy C."
description: "Updating a nested array immutably using the spread operator in JavaScript."
tags:
  - blog
  - javascript
  - horriblesnippets
  - horribleshowto
  - snippet
  - functional
layout: blog-post.njk
---

I always think of weird ways to accomplish things. This approach could be applied to some functional JS.

```javascript
// I really dig this one
const foo = {
  bar: {
    baz: [{ changeMe: 'asdf', notMe: 'asdf' }, { changeMe: 'ffff', notMe: 'asdf' }],
  },
};

const newArr = foo.bar.baz.map(baz => ({ ...baz, changeMe: 'swee' }));

const newData = {
  ...foo,
  bar: {
    baz: newArr,
  },
};

console.log('newData', newData.bar.baz);
```
