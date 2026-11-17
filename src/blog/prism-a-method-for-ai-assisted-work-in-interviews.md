---
title: "PRISM: A Method for AI-Assisted Work in Interviews"
date: "2026-11-17"
author: "Sammy C."
description: "A practical method for keeping contracts, boundaries, and evidence visible while an LLM writes the code."
status: published
tags:
  - blog
  - ai
  - engineering
  - methodology
  - interviews
layout: blog-post.njk
---

**I want to open with a small disclaimer**: PRISM has been used for a MULTITUDE of acronyms.  Acronyms are used for memorization for me. 

Conforming to the new way of interviewing has been a challenge, and also a blessing.  I have notoriously locked up on a lot of coding interviews.  Primarily because I'm afraid of which route I should take the code.  LLM based interviews have made this slightly easier for me to be able to get extremely comfortable with process, and also my empirical learnings in the industry.  What I needed though was a way to tie these together into one predictable thematic methodology.  Prism is a way to contract, add boundaries, and produce evidence I need to provide to my interviewers.

This is the one that I personally kind of pieced together.  I'm not going to try and trademark it or claim it's originality.  My only goal here is to be a better software engineer, land a job, and hopefully make you better too. I have been reading a lot about how engineers work with AI in the loop, and this is not tied to any one company. There still does not seem to be a good methodology for it yet. So I am combining system architecture with a small system I have been using myself, called **PRISM**, and applying it to real work. 
## Why PRISM exists
When AI joins the work, the human is not only writing code any more. You are also leading.  The temptation is to hand the model a vague problem and hope for the best. That almost always produces something that looks close enough and is not safe enough.
## PRISM

- **P**rompt: set the contract and rules.  API surfaces, and how the presentation surface is going to look is very very very important in this scenario. This is the part of the interview where I will have an LLM interview _me_.
- **R**efine: edge cases before implementation.  Identifying as many as possible first is actually crucial to long term sustainability and first-round MVP correct ness. This is typically where I like to remove planning mode and ask it to produce the ADRs. 
- **I**mplement: ask for the smallest correct version. Previously we called this an MVP
- **S**ecure: check validation, auth, secrets, unsafe parsing.  Before we would have built with TDD, or added tests earlier.  The speed of iteration with AI has made the order in which these are implemented neglible
- **M**aintain: tests and a focused refactor. Tests are now the _easiest_ thing to write because code is cheap to **generate**, but expensive to **design**.  Utilize tests to validate what's happening

You can say this stuff while you work. That matters more than having a perfect plan in your head.  Engineering is not just code. It is making fuzzy things concrete. PRISM forces that translation before you ask the model to help.  Often times it's easier to anchor to a concept, and customize it for the interview because you _will_ be explaining this for a multitude of different problems

## Go ahead...Generate ADRs in the interview
A **LOT** of decisions we make we will not be explainable immediately.  We're going to have to go back through the code, read it, validate it and explain it.  This can be cumbersome, and a poor usage of time during an interview, and your interviewers want to hear you more than they want to hear you read your code.  We know that we can generate a lot of text fast, so why not include ADRs to answer these questions.  Sometimes it saves you have to read LLM generated code

## You can also set yourself up for success, with Gherkins
Why not?  You're going to have to show your code works at some point, why not show that you understand.  You already have almost all of the **Givens**, and **Whens**, you just need to finish the **Thens**.
## Three-tier architecture
For any real system, I split the problem into three tiers.  I always have, and I probably always will.  The reason why is it forces me to digest the problem in smaller chunks.  Often times if you use a [10,000 Foot View ](https://www.anomalogue.com/2018/10/31/10000-foot-view/) approach to system design you are going to probably design _better_, but not quicker.  In an interview, or if you're in a small brain storm or [event storm](https://www.eventstorming.com/)
### 1. Frontend
What the user sees and does.  Sometimes your user isn't even a person, for instance when building an MCP, your user is an agent.  For a lot of websites, we're finding that their primary users are now agents as well.  Building for another machine can often times be as important as building for the people.
### 2. Business layer
The rules for how the system works. This is where ownership, sharing, recurrence, and conflict logic live. This is also where security restrictions belong. If they are not here, they are nowhere.
### 3. Data layer
How data is stored and read. Entities, permissions, audit trails, and the shape of the records.

## What this looks like in practice
**Task: Create a calendar system that allows you to create, read, and update events, and a display mechanism**

## Prompt
> I need to create a basic calendar system, it should have basic CRUD capabilities.  I would like to make this a single application, so let's leverage Next.js since it has both frontend, routing, and API capabilities.  Let's utilize sqlite as our base layer.  Because this task is obscure,  ensure that everything is extensible for addition of Users in later acceptance criteria, but do not add it now.  Utilize Typescript, and only types with functions. Add validation layers with a typing library between our three layers, presentation, business, and data.  One exported function per file, and if there are methods involved in that function, then do not export them.  Please generate a plan for me to read.  Interview me for any decisions you are unsure about, explain the tradeoffs during these questions.  

At this point we should see the formation of the application begin to take place.  This prompt should get us about 80% of the way there.  We utilize the interview process here for being able to generate decisions in our refine step.  Complete the user interview

*Optional: add in input/output contracts, and have it generate an openapi spec  ;o)*
### Refine
> Let's go ahead and generate a docs/adrs file and within this put  `<adr>-slug.md` with a basic ADR, no more than 10 lines about each decision we have discussed, or was given to you during prompting.  

Go ahead and iterate over the refinement and the ADRs, Get your interviewers involved in the process to see how they think, and ideas that they may have.

*Optional: add in your Gherkins here*
## Implement

> Let's implement this plan, please implement it.

Let it do it's work.  Hopefully they didn't give you a super incredibly long task to iterate over and fix.  That's always a pain, and it's easy to rabbit hole in those scenarios.

### Secure
This is the step that can be somewhat difficult.  Normally during.  You could go a lot of directions here, adding JWTs is viable, basic auth is viable, but just make sure whatever you choose you can explain. I like to add some polish in here normally just to hit the basic fundamentals of OWASP Top 10 Knowledge...supply chain attacks:

> Let's go ahead and lock all versions in the `package.json` manifest to their current specific versions.

### Maintain
This is where we show we care.  TDD is great, and sometimes we'll want to start here, especially if we're doing a non-fullstack interview, but here, we can move this to the end to show regression tests after the product works, and leverage these for extension.

> Write Regression tests for both front and backend, for all obvious decisions, and then all functional requirements we chose in our ADRs.. 

Ultimately we've exposed a lot of fundamentals by utilizing Prism, and here is a simple list.
1. Contract before code - we're defining what we're making in specificity
2. Dependency Rule - We're focusing on three tier architecture building boundaries between inner and outer layers 
3. KISS & YAGNI - We're building tests we need, not tests we don't need.  We may not be "All Green" for every single line, but we're covering the functional half.
4. Boundaries - We're using three tier architecture, and defining typed boundaries between them.
5. Single Responsibility - We're starting with 3 tier architecture which infers SRP from the get go
6. Low coupling - We could swap out our API for a different api at any point through the process.

I primarily wrote this post because I really wanted to make sure I could explain my methodology to anyone, and also be able to explain it in detail during interviews.  I also wanted to practice.  Ultimately as we travel down LLM generated code we're watching our industry change before our eyes.  What we have already done is _not_ going away.  In fact many of the fundamentals we know will be fundamentals we utilize to lock down code.  

I often hear a lot of people saying that software development hasn't changed for thirty years, and I find this quite absurd.  I also challenge whether software development should change.  We know that a machine is still reading code, and we know that machines must understand that code.  Why would we think that because a variadic generation system like  an LLM is "safe".  Inherently it's not, but it can be made safe by applying principles we have been utilizing for the past 50 years.

## Credits and Links

- https://www.eventstorming.com/ - event storming is one of the best models for identifying, locating, and isolating side effects in your business and tech processes.
- https://en.wikipedia.org/wiki/Multitier_architecture - This is probably the best location to learn about these links, and also see other ideas that originate from Gang of Four Patterns and Architectural Patterns. 
- https://cucumber.io/docs/gherkin/reference/ - Gherkin format