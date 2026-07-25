---
title: "Security Scanning for Web devs"
date: "2026-07-14"
author: "Sammy C."
description: "The difference between looking at your code and poking your running app."
tags:
  - blog
  - security
  - testing
  - sast
  - dast
layout: blog-post.njk
---

I recently decided to kind of switch up and diversify my career.  Starting at [Distology](https://distology.com) as a CIAM Engineer has been eye opening.  It's also been incredibly fun.  I want to share with ya'll some things I get to learn on my career path. Today's topic is Security Testing.  I've been working on my Snyk Certifications for an implementation pro, and it's been so much fun.

Security scanning is one of those things that feels like it should be simple. You run a tool, it finds the holes, you patch them. Reality is a bit more of a mess.

<div class="callout">
  Remember that each is a security scan, but each takes place in different phases of the Software Development Lifecycle.  One when code is static(pre-deployment), and one after once we are deployed.
</div>

I have spent the last few months tuning both SAST and DAST pipelines for a CIAM project. If I'm being honest as an engineer, I GET why these tools so often fail...it's because we will focus one specific side too much, and it's normally only going to cover _part_ of our threat surface. 

As software devs, specifically web, we're under duress from the top down constantly to push more, faster, and cheaper. This means the first thing on the chopping block is security most of the time.

**SAST** is the whitebox approach. I would say this is probably the _easiest_ to catch, because a lot of this surface is covered by linters, and automatic scans already. It reads your source code, traces the data flow, and flags vulnerabilities before the app ever runs. SQL injection, hardcoded secrets, unsafe deserialization. SAST catches these by following the breadcrumbs through your functions. The tradeoff is noise. It flags patterns that look dangerous but are not, and it misses anything that only appears at runtime.

**DAST** is the blackbox. It's basically QA, but targeting a lower level. It hits your running application from the outside, crawling endpoints and throwing payloads at them. It finds the gaps SAST cannot see: misconfigured headers, exposed APIs, session handling bugs, and anything that depends on the live state of the app. The tradeoff here is blindness. DAST cannot see inside the logic. If a vulnerability exists but the crawler never reaches the endpoint, DAST stays quiet.

Here is where I have landed: SAST is for catching stupidity early. DAST is for catching reality later. One guards the code, the other guards the runtime. Running both is non-negotiable if you are handling anything sensitive. At the same time there are some pieces that can be interchanged between phases.

The gap that still keeps me up at night is the logic that sits between them. SAST sees the code, DAST sees the surface, but neither sees the intent. A perfectly secure function can still be called in a dangerous order. This I think is where things like manual QA or 3rd party Penetration testing comes in.

This is just a blurb, so I'll add more later!
