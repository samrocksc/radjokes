---
title: Exploring Guardrails for LLMs with a Functional Pattern
date: "2026-07-02"
author: "Sammy C."
description: "Demonstrating how OOP state management creates a cognitive tax that increases AI hallucination risk and structural drift."
tags: 
  - blog
  - ai-development
  - functional-programming
  - llm
  - architecture
layout: blog-post.njk
---

I'm not a Cognitive Science nerd....personally, I don't really care much for the usage of coding tools. I view LLMs as basically glorified linters where we can feed specs to it, and it gives us output within the fences we built for it.  The less we fence, the worse it gets.  I personally think understanding the changes an LLM does is the key important factor.  The rate at which bespoke applications are being created means that we have to start gauging _every_ single tool we use for clarity, extensibility, and machine readability.  I think we need to grade software based on its source, to determine if it holds the internal capability.

I've had this idea in my back pocket for a while, and this is going to be one of just a few of my thoughts on how to improve this.

The problem isn't the LLM's ability to write logic. It's the LLMs's struggle with **State**.  I'm going to start moving to approach the fix in this using tried and true mechanisms as software engineers we've employed for decades.  Perhaps new methodologies will arrive from elsewhere, but we shouldn't abandon what we know when we know that that works.

## Enter my sample repo [LLMs and Guardrails](https://github.com/samrocksc/llms-and-guardrails)

**Both of these repositories were built with the same spec criteria, one using Uncle Bob's best advice, functional being guided by the linter**

...literally, i told the LLM, "You are Bob Martin, ol'Bob, the king of Clean code"

I created a sample repo to be able to better visualize the concepts.  There are 3 branches, each branch takes a transformative change.  

### The Metrics I'm Using to Gauge With

1. **Cyclomatic Complexity** - I think this is one that really tells us *how your average developer can read the code*.  This is probably where I sit personally.
2. **State Complexity** - This is an _incredibly_ dense subject...but I think ultimately this is the lodestone for improving LLM coding predictability.  In essence it predicts calculatable changes that can occur.  Decreasing prior state complexity has an almost negative funnel effect.
3. **Architectural Complexity** - The number of interdependent components within any system, and also a gauge of how often they interact with eachother.

## The Fog of State: Why OOP is a Liability for AI

OOP has been the industry standard for decades because it's great for humans to organize a system into classes and encapsulated state. But for an LLM, that state is a liability.

When you ask an AI to modify a method in a class, it isn't just looking at a function. It's trying to maintain a mental map of the entire object's lifecycle. It has to guess:
- What's actually in `this.state` right now?
- Which other methods are mutating this property in the background?
- Was the `reset()` method called before this operation?
- If I change this property here, what side-effect is going to bite me three calls later?

I call this the "Fog of State." As the session goes on and the context window fills up, the AI starts to "drift." It begins to hallucinate the state of the object, introducing bugs that are nearly impossible to spot at a glance. The AI didn't forget how to code, it just lost its place in the state machine. This isn't a failure of the model's intelligence, but a failure of the architectural surface area we're asking it to reason across. Yeah, this works for a POC, but it's not going to hold up through multiple iterations.

## The Solution: The "Functional-Lite" Guardrail

The answer isn't to jump into a purely academic, Haskell-style functional world. We just need a **"Functional-Lite"** approach. 

Essentially: **(Input) -> (Logic) -> (Output)**

If you strip away the `class` keyword and the `this` context, you collapse the reasoning surface area. The LLM no longer needs to track a lifecycle; it just needs to understand a transformation. By moving the state *out* of the logic and into the data payload, we make the code "boring." And in the world of AI-assisted development, boring is beautiful.

### The Proof: The GDPR Decision Engine

To put this into numbers, I built a demonstrative API in the [llms-and-guardrails](https://github.com/samrocksc/llms-and-guardrails) repository. The goal was to process a highly complex GDPR breach notification decision tree, a nightmare of nested conditionals.

I implemented the engine twice: once using a stateful OOP Evaluator and once using a pure Functional transformation. You can see the raw data and the growth of the \"State Tax\" in the [Complexity Analysis Report](https://github.com/samrocksc/llms-and-guardrails/blob/main/COMPLEXITY_REPORT.md).

#### 1. The Complexity Tax
Using ESLint's complexity metrics, we found a disparity between the two that any engineer who's worked with both paradigm would know already. The functional implementation had a cyclomatic complexity of **7**, while the OOP implementation sat at **10**.

Wait, why is the OOP version more complex? The business logic (the GDPR rules) is identical.

The extra 3 points of complexity are the **"State Tax."** This is the overhead of managing the pointer, the `isResolved` flag, and the `reset()` logic. It is complexity that serves no business purpose; it only serves the architecture. When you pay this tax, you aren't paying in performance, you're paying in "Cognitive Load."

The tradeoff used to be readability over efficiency, but when we turn code from a human back to machine readable language, I the argumentative weight for OOP vs. Functional has shifted vastly towards functioanl.

#### 2. The "Vibe-Coding" Stress Test
To see how this holds up over time, I did a "Vibe-Coding" run. I asked the AI to rapidly add 8 new features (Confidence Scoring, Temporal Decay, Jurisdiction checks, etc.) without refactoring.

The results were a perfect study in fragility.

In the **Functional** version, adding a feature was just adding a field to the return object. The "plumbing" never changed. The logic remained a pure pipeline. Even with 8 new features, the core `evaluate` function remained a simple transformation.

In the **OOP** version, the `GDPREvaluator` became a "God Object." Every new feature required adding a private property, updating the constructor, and, this is the killer, updating the `reset()` method.

```typescript
// The Fragility of the "Reset"
public reset(payload: Payload): void {
  this.currentNode = rules;
  this.isResolved = false;
  this.payload = payload;
  this.path = [];
  this.confidence = payload.data_quality_score || 1.0; // New state
  this.jurisdictions = payload.affected_regions || ['EU']; // New state
  // ... 6 more properties
}
```

This is where the LLM fails. If the AI forgets to add just *one* of these resets, you get a cross-request state leak. Data from the last user suddenly influences the current decision. In a functional world, this bug is mathematically impossible because there is no state to leak. The "vibe" of the code might look the same, but the risk profile has diverged completely.

## Why I Prefer This Approach

For me, this isn't just about avoiding bugs; it's about **cognitive bandwidth**. 

When I'm reviewing code or directing an AI, I don't want to spend 50% of my mental energy auditing the "plumbing" of a class. I want to focus on the logic. Functional-Lite allows me to treat the AI as a highly efficient logic engine rather than a temperamental state-manager. It turns the process of coding into a series of verifiable, atomic transformations.

That said, I'm a pragmatist. I know that in some massive enterprise systems, you might be forced into OOP. Even in those cases, you can still apply these "guardrails" to minimize the damage.

If you must use OOP, you can still corral the chaos by:
1. **Enforcing Immutability**: Use `Readonly<T>` and forbid parameter reassignment. This stops the "invisible mutation" that makes OOP so unpredictable.
2. **Isolating State**: Keep the state-mutating "shell" as thin as possible, pushing all actual logic into pure functions that the shell simply calls. This is the "Functional Core, Imperative Shell" pattern.
3. **Strict Lifecycles**: Use tools to ensure `reset` or `init` patterns are consistently applied and verified.

## The Tooling: Beyond the Prompt

One of the biggest mistakes people make with AI development is thinking that a "better prompt" will solve architectural fragility. I'm here to say buds.....not true.  Anyone who worked pre-llm can spot llm generated code in moments.

You can tell an LLM to "be functional" a thousand times, but the moment it gets tired or the context window shifts, it will slip back into its training data's OOP habits. This is the reality of the probabilistic nature of the model fighting against your architectural intent.

The only solution is **Hard Constraints**.

In the `llms-and-guardrails` repo, I used a specific ESLint configuration that targets only the functional directory. It doesn't just suggest patterns, it forbids the tools of state:
- **Banning `ClassDeclaration` and `TSInterfaceDeclaration`**: Forcing the use of `type` and pure functions. If the AI tries to use a class, the build fails.
- **Enforcing `no-return-void`**: Ensuring every function is a transformation that returns a value.
- **Banning Mutation**: Using `functional/immutable-data` and `prefer-immutable-types` to make it an error to change a property on an object.
- **Param Protection**: Using `no-param-reassign` to treat all inputs as constants.

## The Model Factor: Local and Open Weights

Finally, there is the hardware and model choice. While cloud-scale models are impressive, using local, open-weight models (like those run via Ollama) provides a different kind of predictability. It is also more pure, and takes the power _away_ from giant power brokers.

When you control the model and the environment, you can tune the sampling parameters (like temperature) to be more deterministic*. When combined with the architectural guardrails mentioned above, you create a "Closed Loop" system: a deterministic model producing code that is constrained by a deterministic linter. 

The synergy between a lean, open-weight model and a strict functional constraint is where true engineering happens. It's not about the *size* of the model, but the *tightness* of the loop.

## Conclusion: Architecture as a Prompt

I'll be honest, the more I wrote this article, the more I learned.  I feel confident now I could write more complex code consuming less electricty, computing power, and needing to feed big tech my money.  We need to stop thinking of architecture as something we do *before* we code and start thinking of it as the **ultimate prompt**.

The most effective way to "prompt" an AI to write bug-free, maintainable software is to build an environment where it is *impossible* to write a stateful bug. Architecture is the set of boundaries that guides the AI's probabilistic guesses toward a deterministic result.

By adopting Functional-Lite patterns and enforcing them through tooling, we close the Predictability Gap. We stop "vibing" and start engineering.

***

\*Determinism does not exist with LLMs.

> **Disclaimer:** Obviously because of the topic, I co-authored much of this using gemma4:31b-cloud from Ollama Cloud, and the code for the most part is 100% generated. I utilized a derivative of the eslint file that I use with all of my node projects to test everything out. Obviously you can get a lot stricter with both OOP and Functional, but the goal here was to give a reasonable idea of how vibe coding looks over iteration.

### References & Tools
- **Implementation Proof**: [llms-and-guardrails repository](https://github.com/samrocksc/llms-and-guardrails)
- **Foundational Concepts**: Kyle Simpson's *Functional-Light JS* — [GitHub Repo](https://github.com/getify/functional-light-js)
- **Enforcement Tooling**: [eslint-plugin-functional](https://github.com/eslint-functional/eslint-plugin-functional)
- **Architectural Complexity:** https://swizec.com/blog/two-types-of-complexity-and-their-impact/
- **State Complexity:** https://en.wikipedia.org/wiki/State_complexity
