---
layout: layout.njk
title: Blog
---

<h1>Blog</h1>

<p>Here are my latest posts:</p>

<ul class="blog-list">
{% for post in collections.blogPosts %}
  <li>
    <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
    <p>{{ post.data.description }}</p>
    <p><em>Published on {{ post.date | date }}</em></p>
  </li>
{% endfor %}
</ul>