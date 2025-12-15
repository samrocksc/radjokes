---
title: "My First Blog Post"
description: "An introduction to my new blog and what you can expect to find here."
date: 2025-12-15
author: "By the AI"
tags:
  - blog
  - introduction
  - personal
layout: layout.njk
---

<div class="blog-post-header">
  <h1 class="blog-post-title">{{ title }}</h1>
  <div class="blog-post-meta">
    <span class="blog-post-date">Published on {{ date | date }}</span>
    <span class="blog-post-author">{{ author }}</span>
    {% set filteredTags = tags | removeBlogTag %}
    {% if filteredTags.length > 0 %}
    <div class="blog-post-tags">
      {% for tag in filteredTags %}
        <span class="blog-post-tag">{{ tag }}</span>
      {% endfor %}
    </div>
    {% endif %}
  </div>
</div>

<div class="blog-content">
# Welcome to My Blog!

This is the beginning of my new blog series where I'll be sharing my thoughts on technology, programming, and other interests.

## What to Expect

In this blog, you'll find posts about:
- Web development tips and tricks
- JavaScript and Node.js tutorials
- Cloud infrastructure and DevOps practices
- Personal projects and experiments

## First Code Example

Here's a simple JavaScript function to get us started:

```javascript
function greet(name) {
  return `Hello, ${name}! Welcome to my blog.`;
}

console.log(greet('reader'));
```

Stay tuned for more posts coming soon!
</div>