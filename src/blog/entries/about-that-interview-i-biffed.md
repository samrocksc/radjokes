---
title: "About That Interview I Biffed"
date: "2025-12-12"
author: "Sammy C."
description: "Reflecting on a recent interview where I struggled with a Vue.js async/await optimization question and what I learned from it."
tags: 
  - blog
  - introduction
  - interviewing
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
About that async/await question I biffed...

Interviewing is hard. We learn a lot about both ourselves and our industry when we take a lot of interviews. Specifically in software development, we often end up realizing that we carry a LOT of biases into interviews. Sometimes our biases are built from frameworks, or perhaps even how long we have been in the industry. Here's the thing about a coding challenge interview. I think it's important that we divorce ourselves from the behavioral and code challenge interviews. They are very different animals.

A coding challenge is a time limited test to show the breadth and depth of your knowledge on a specific selection of topics in a way that justifies your hiring.

Recently during an interview, I was asked about a Vue question. Here's a sample of the code in question:

```javascript
  onMounted(async () => {
    await fetchXX();
    await fetchXY();
  });
```

The question was asked "how could you improve this snippet?". To which I replied "oh, I think that's actually pretty cut and dry". I am new to Vue, I think I've made maybe one production code change on a legacy app once. I said "You COULD remove the await, but I would recommend against it". Eventually I was turned down for this job, and most of the feedback was positive, except they seemed to really target this question. I think this is where I biffed it.

But there's also a bit of a crux here. The code as it stands is perfectly valid. It will work just fine. However, the interviewers were looking for a different answer. The answer they wanted was that you could run both fetchXX and fetchXY in parallel, rather than sequentially. This would be done by removing the awaits, and instead using Promise.all:

Option 1: The Naive Overachiever

```javascript
  onMounted(async () => {
    await Promise.all([fetchXX(), fetchXY()]);
  });
```

Option 2: Be Safe, but probably the cleanest solution

```javascript
  onMounted(async () => {
    fetchXX().catch(console.error);
    fetchXY().catch(console.error);
  });
```

The interview in this situation was 45 minutes long, and I knew I already had limited time to show my skills. Instead of actually switching to a code based solution, I tried to explain my perspective verbally via a story about how removing await had burned me in the past. This was a mistake. I should have just written the code, and explained my reasoning after. I think this is a common mistake that many developers make during interviews.

Admittedly, I was a bit miffed when I got the feedback. I thought my answer was valid, and in many situations, it is. However, in this specific case, the interviewers were looking for a different approach. This experience has taught me to be more adaptable during interviews and to focus on demonstrating my coding skills more directly.

Understanding the signals that interviewers are looking for is crucial. In this case, they wanted to see if I could optimize the code for performance by running asynchronous operations in parallel. Moving forward, I will strive to better interpret these signals and adjust my responses accordingly.

And so with that, unfortunately my journey with that shop ended, but I think it added a valuable tool to my toolkit. I think in the future as well this will probably make me a better interviewer as well, as I can empathize with candidates who might be in similar situations.

Sam C.
</div>
