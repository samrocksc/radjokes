---
title: "The State Tax: Why OOP Is a Liability for AI-Assisted Development"
date: "2026-07-16"
status: draft
target_audience: "Developers using AI coding tools who want fewer bugs and more predictable results."
word_count: 390
primary_goal: "Explain how object-oriented state management creates cognitive drift for LLMs, and why functional-lite patterns reduce it."
tags: [blog, draft, ai-development, functional-programming, architecture, llm]
layout: blog-post.njk
---

I built the same GDPR decision engine twice. Once with a stateful OOP evaluator. Once with pure functional transformations. Same business logic. Same test suite. The difference was three points of cyclomatic complexity and a world of cognitive drift.

The OOP version scored 10 on complexity. The functional version scored 7. Those three extra points are what I call the State Tax. They are the overhead of managing the pointer, the isResolved flag, and the reset() logic. Complexity that serves no business purpose. It only serves the architecture.

<div class="callout">
When you pay the State Tax, you are not paying in performance. You are paying in cognitive load. And when an LLM is writing your code, cognitive load is the most expensive currency there is.
</div>

Here is what happens when you ask an AI to modify a method in a class. It does not just look at the function. It tries to maintain a mental map of the entire object's lifecycle. What is in this.state right now? Which other methods are mutating this property? If I change this, what side effect bites me three calls later?

As the context window fills up, the AI starts to drift. It hallucinates the state of the object. It forgets to update the reset() method. It introduces bugs that are nearly impossible to spot at a glance. The AI did not forget how to code. It lost its place in the state machine.

The fix is not to abandon objects entirely. It is to adopt a functional-lite approach. Move the state out of the logic and into the data payload. Make every function a transformation: input goes in, output comes out. No this. No side effects. No hidden lifecycle.

I tested this by asking an AI to rapidly add eight new features to both versions without refactoring. The functional version handled it cleanly. Each new feature was just a field in the return object. The OOP version became a god object. Every feature required a new private property, a constructor update, and a reset() method change. The AI forgot one of the resets. Cross-request state leak. In a functional world, that bug is mathematically impossible.

The lesson is simple. If you are using AI to write code, architecture is your most powerful prompt. Build an environment where it is impossible to write a stateful bug, and the AI will reward you with predictable, maintainable output.
