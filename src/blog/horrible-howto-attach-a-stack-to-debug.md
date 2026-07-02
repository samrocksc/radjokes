---
title: "Horrible Howto - Attach A Stack To Debug"
date: "2019-04-20"
author: "Sammy C."
description: "Attaching function name and line number to debug calls in Node.js before I learned to love error stacks."
tags:
  - blog
  - javascript
  - debugging
  - nodejs
  - horriblehowto
  - snippets
layout: blog-post.njk
---

I remember a time while learning how to use JavaScript when I wanted to attach the function name and file name to my debug calls, before fully grasping the utility of error stacks.

## The Circumstance

Imagine you're working in a cloud function like AWS Lambda. Deploying your function takes some time, and your ability to inspect it via a debugger is severely limited. To solve this, I used the `debug` module.

## Starting Out

In a file named `blah.js`:

```javascript
const v = require('debug')('verbose');

v('test');
```

By setting `DEBUG=verbose`, the output is `verbose test +0ms`.

## Building the Stack

JavaScript lacks a global stack, so the cheapest way to get stack history is to actually drop the function into an error status.

```javascript
const buildStack = () => {
  const depth = 3;
  if (!this.stackIs) {
    Object.defineProperty(this, 'stackIs', {
      get: function() {
        const orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack) {
          return stack;
        };
        const err = new Error();
        Error.captureStackTrace(err, arguments.callee);
        const stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
      },
    });
  }

  if (!this.lineIs) {
    Object.defineProperty(this, 'lineIs', {
      get: function() {
        return this.stackIs[depth].getLineNumber();
      },
    });
  }

  if (!this.functionIs) {
    Object.defineProperty(this, 'functionIs', {
      get: function() {
        return this.stackIs[depth].getFunctionName();
      },
    });
  }

  return {
    function: this.functionIs,
    line: this.lineIs,
  };
};
```

This gives you an object containing the location of the debug call, which makes for really awesome debugging.

The full snippet is available [in this gist](https://gist.github.com/samrocksc/2b9639c99538848be7bb80f99ca63f83), and I originally found the idea on [Stack Overflow](https://stackoverflow.com/questions/14172455/get-name-and-line-of-calling-function-in-node-js).
