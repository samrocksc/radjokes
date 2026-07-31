---
title: "SCA and SAST: Easily Confused, Easily Mitigated"
date: "2026-07-31"
author: "Sammy C."
description: "Application security is drowning in three-letter acronyms. Two of the most-confused, SAST and SCA, actually solve different problems. Here's how to tell them apart."
status: published
tags:
  - blog
  - security
  - appsec
  - sast
  - sca
layout: blog-post.njk
---

Security is confusing...most of my career when listening to a security professional my eyes would just glaze over, and I'd think about all the cool features next up in my library. Security has a jargon problem. DAST, SAST, SCA, IAST, RASP, SBOM: six acronyms in one paragraph, none of them telling you anything about what the thing actually does, and to anyone outside the field they all blur together into "that AppSec stuff". Of those, SAST and SCA get mistaken for each other most often. They're both called "static analysis", they both show up in vendor dashboards, and they both live in the same pipeline diagrams. Swapping their names is how you end up with a tool that does half the job you think it does. So I'm writing it down.

While an Engineering Manager I met a security contractor, and he explained security in the easiest possible terms: education. Just knowing what the problem is in Application security is in my opinion 80% of the problem, because the fixes are more often than not changing one character in your software manifest. Education comes with the inherent problem of nerd overload.

## The Short Version

**SAST** looks at *your code*. **SCA** looks at *the code you imported*. They run at different stages of the pipeline and miss different bugs. Neither replaces the other, and if you only have one of them, you're blind to roughly half the threat surface.

## What Each One Actually Does

### SAST, or Static Application Security Testing

SAST scans the source code you wrote. It's looking at your functions, your branches, your data flows.

Concretely, a SAST tool catches things like:

- SQL injection in a query you hand-rolled on line 47
- Hardcoded secrets in your config
- Insecure deserialization patterns
- Missing authentication checks on a route handler
- Dangerous use of eval, exec, or dynamic require

**You can think of SAST as code review by a paranoid senior engineer who never sleeps.**

The catch: SAST tools analyze patterns. Patterns can be ambiguous. A concat call right next to a SQL string *might* be a vuln, or it might be parameterised before it gets there. That's why SAST tends to need tuning, and why false positive rates are the perennial complaint.

### SCA, or Software Composition Analysis

SCA scans your third-party dependencies. Your package.json, your pom.xml, your requirements.txt, your lockfiles, your transitive deps: everything you pulled in from someone else's repo. SCA in essence is where your first line of defence sits, and it is also a great indicator about the health of your software chain.  At larger companies you will see versions locked at this level.

Concretely, SCA catches things like:

- "You're on lodash x.y.z CVE-2021-43210. Upgrade to x.y.b."
- License compliance violations (GPL in a proprietary product, missing attributions)
- Outdated packages with known fixes
- Dependency confusion risks

**You can think of SCA as an audit log reader for someone else's supply chain.**

The catch: SCA only knows about what's already known. It checks against CVE databases like NVD. A zero-day in your favourite library won't show up until someone files a CVE, which means by then, you're reading about it on Hacker News along with everyone else.

## When They Run in the Pipeline

This is where the distinction matters most operationally:

| Stage | Tool | Why |
|-------|------|-----|
| Pre-commit / commit hook | SAST | Source code is what changed |
| Pull request | Both | Catch issues before merge |
| Build / dependency resolution | SCA | This is when the lockfile is locked |
| Post-build / artifact | SAST (deep scan) | With full call graphs in hand |
| Deploy / runtime | Neither (RASP/DAST territory) | Out of band |

A modern pipeline runs SCA on every dependency update and SAST on every commit. Different triggers, different feedback loops, different ownership if you split your AppSec team by domain.

## Different Failure Profiles

This is the part the vendor decks usually gloss over.

SAST false positives come from pattern ambiguity. The tool sees a code shape that *could* be dangerous and flags it. You spend hours confirming "yes, we sanitise that elsewhere" and triaging the alert. The fix is usually: better rules, more context, custom queries.

SCA false positives are rarer but stickier. When SCA says "this version has a CVE", it usually means it. The fix isn't always straightforward. Maybe the maintainer hasn't shipped a patch, or the upgrade breaks your API. You're stuck with exposure until something gives.

SAST false negatives hide in plain sight: business logic flaws. A broken authorisation check looks like a normal if (user.role === 'admin'). The pattern is fine. The logic is wrong. SAST doesn't see it.

SCA false negatives are zero-days in libraries nobody's audited yet. By definition, you don't know what you don't know.

Where the two cover for each other is the actual win. SCA catches what you'd never see in-house because nobody reads every changelog. SAST catches what you'd never see at all because it's your own blind spot.

## A Practical Thought Process that will get your SDLC 80% of the way there with security.

If you're standing up an AppSec program and you have to choose, this is roughly the order I'd argue for:

1. **SCA first.** It's faster to set up, generates instant signal (the lockfile is the lockfile), and gives you an SBOM you can hand to auditors, customers, and procurement teams.
2. **SAST second.** Once you know what's *in* your app, you start caring what's *happening* in your app.
3. **DAST third** (a future post). Runtime testing against a deployed instance.
4. **RASP fourth** (another future post). Defence-in-depth inside the running process.

I think a lot of times we need to evaluate what's the most important risk to mitigate first and foremost.  A lot of times the easiest is the most important actually.  Supply chain attacks in the age of AI are probably where we need to focus first.
