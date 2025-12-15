---
title: "An initial blog post"
date: "2025-11-12"
author: "Sammy C."
description: "Just a test blog post to ensure the blog system is working properly with multiple posts."
tags: 
  - blog
  - introduction
  - first-post
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
# My First Blog Post

Honestly this is just a test blog, and I needed atleast two posts to make sure they were iterated properly.
</div>
