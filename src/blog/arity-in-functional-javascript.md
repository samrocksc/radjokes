---
title: "Arity In Functional Javascript"
date: "2019-05-16"
author: "Sammy C."
description: "A quick look at currying and arity in JavaScript, with a more advanced higher-order function example using lodash."
tags:
  - blog
  - javascript
  - functional
  - currying
  - horriblesnippets
layout: blog-post.njk
---

Good References:

* [Understanding Currying in JavaScript – Bits and Pieces](https://blog.bitsrc.io/understanding-currying-in-javascript-ceb2188c339)

I think most of the time it's easier for me at least to read someone else's code instead of long drawn out blog posts. Let's take a look at this non-functional JS snippet:

```javascript
function nfMultiply(a, b, c) {
  return a * b * c;
}

console.log('non-functional', nfMultiply(1, 2, 3));
```

Arity in essence is the number of functions you can pass into an object. It's all rather confusing, but I think of it as the amount of functions you can curry into one function. Let's convert the function above into an arity of **3**.

```javascript
function multiply(a) {
  return b => {
    return c => {
      return a * b * c;
    };
  };
}

console.log('arity breakdown', multiply(1)(2)(3));
```

If you think about it simply: how many times can I fold this function against itself? This becomes useful when we start creating more complex functional JavaScript statements. I really enjoy using lodash in my node code, and also because it's included in AWS lambdas by default, thus not really bloating it.

## More Advanced

```javascript
const { has } = require('lodash');

const fakeDataFunc = () => 3;
const fakeObjFunc = () => ({ uncool: 'blue' });

function coolDude(a) {
  return b => {
    return c => {
      return d => {
        return e => {
          return {
            a,
            bTimesC: b * c(),
            d,
            eHas: has(e(), 'cool') ? 'sure does' : 'nope',
          };
        };
      };
    };
  };
}

console.log(
  'testing',
  coolDude('Mutliplied Value times a function is: ')(2)(fakeDataFunc)(
    'and here we generate a ternary if something is in an object:',
  )(fakeObjFunc),
);
```

You can take the above snippets and kind of meld them to your wishes, and play with them to create Higher Order Functions, enjoy!!!
