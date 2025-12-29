---
title: "Learning about CIAM & A Lesson in Specialization"
date: "2025-11-12"
author: "Sammy C."
description: "Becoming the specialist you were born to be"
tags:
  - specialization
  - craftsmanship
  - security
layout: layout.njk
---

I want to preface this post by saying I self-identify as a jack of all trades, master of none. I've been writing code for fun, or for profit for almost 30 years at this point. I've always prided myself on being able to know a little bit about everything. With the advent of LLM's though I think the ability to be a jack of all trades is actually implicit to having a web browser.....so with that I'm beginning to employee different specializations in our field.

Specialization is going to be crucial to our future as software engineers. It's pretty easy to assume that in the future somewhat mundane tasks like setting up routes, or simple three tier architectures will probably be pretty homogenous. Recently, I've learned about the field of **CIAM**. It stands for Customer Identity and Access Management. Which ultimately. This a fancy way of saying "how do we manage our customers' identities and access to our services".

CIAM is a subset of the broader field of Identity and Access Management (IAM), which typically focuses on managing the identities and access of employees within an organization. Honestly, I had never really thought about any of the key differences between customer and employee identity management until I started learning about CIAM.

Here are a few key factors that I think make the need to understand this field more important:

## Scale

When you think of a typical IAM arrangement, you think of tops a few 1000 employees, and a few hundred service accounts. This works well with the tooling already provided from the cloud providers we use. In fact, I think the most elegant implementations I've seen have been via Azure AD, which is a great fit for enterprise IAM. It breaks down though at CIAM scale, where you've got to think about managing millions of users. A government website is probably not going to be using the same IAM strategy as a corporation of 3000.

## Intent

There are a lot more different use cases for identities in IAM than in CIAM. Login systems for anything from note taking apps to being able to communicate service accounts between two services.

## Governance

CIAM has to deal with a lot more regulations around data privacy and protection. Things like GDPR, CCPA, and other data protection laws have a big impact on how customer identities are managed and stored. This means that CIAM systems need to be designed with these regulations in mind from the ground up.

We make the rules in IAM, but in CIAM, the customer makes the rules, and they vote with their their feet. If we don't support their privacy needs, they will go somewhere else. If we don't support their preferred authentication method....they don't sign up, they don't buy your stuff. Pretty simple.

## User Experience

I'm a former small business owner, and I understand the importance of first impressions. CIAM isn't just about protection, it's also about _consumer confidence_ in your product. Can you transition a customer from wanting to buy something to buying something seemlessly? If we were to over complicate this process, we risk the customer giving up and going to give their duckets to Jeff Bezos. If we do it well, we build a loyal customer base.

From what I've learned though so far about the industry, it's often specifically focused around reactivity instead of proactive implementation. This means that being a CIAM engineer is a bit of a specialized role that requires a deep understanding of both identity management and customer experience. Even the most ardent of AI enthusiasts will have to admit that this is a field that requires a human touch, and that it's probably not best served by a generalized AI model.

Summarizing, I think CIAM is a great example of a field where specialization is going to be crucial in the future. As software engineers, we need to start thinking about how we can become specialists in areas that are not easily automated by AI. CIAM is one of those areas, and I think it's a field that is going to be increasingly important as more and more businesses move online and need to manage customer identities and access. The career outlook for CIAM engineers is pretty strong, and I think it's a field that will be more in line with where the industry is heading.
