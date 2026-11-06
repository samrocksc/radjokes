---
title: "Security and Being a Good Consultant: Why the Annoying Security Guy Was Right"
date: "2026-11-05"
author: "Sammy C."
description: "A bad first impression of security professionals followed me for decades. A consultant who started with the OWASP Top 10 and gentle questions changed that, and the lessons transfer to every seat in the SDLC."
status: published
tags: 
  - blog
  - security
  - consulting
layout: blog-post.njk
---

Security can be confusing, and often times it's actually purposely built to be confusing. An industry doesn't endorse "obfuscation of code" for no reason... right?

How we learn things can be a hell of a process. I'm taking a German A2.1 class right now, seven years into living in Germany, and I'm the slowest one in the room.

I remember when I first started going to Node.js meetups back in 2011/2012, everything was NEW and EXCITING. There was all this cool stuff like CoffeeScript coming out. The infinite possibilities that Node offered for one single language across the back and frontend. This was a period when the frontier was writing helper modules for an ecosystem no one had any interest in. API surfaces were being formed, and norms solidified that would shape the future of software development.

During these meetups there was _always_ one guy complaining about security. It always put a damper on the presenter because their goal was to present the functionality, not fine tune the code. The security guy ALWAYS showed up, and ALWAYS annoyed us. He was the butt of jokes, and he wasn't very sociable. It left a lasting impression for me being new to web development.

What I didn't realize at the time was that the way he talked about security felt designed to confuse us. It had that classic nerd-sniping quality, whether he meant it that way or was just wired to operate like that 24/7.

![Nerd Sniping, xkcd 356](/assets/security-and-being-a-good-consultant.png)

Either way the detrimental effect was I have NEVER taken security professionals seriously until about 4 years ago. I worked for a company and we hired three consultants: scrum, qa, and security. The scrum master was excellent, they were always willing to engage, they understood the mission, and executed well. The QA consultant was AWFUL and dry, preferring to over document over educate, ultimately frustrating us into ending that contract early. The third was the security consultant, and he was _excellent_.

He started off by doing a DEEP dive of our infrastructure, onboarding our platform, asking questions. The questions were never hard, and never pointed. They were just gentle social probes. He also asked for opinions. For a while I didn't even think he existed. Then he gave us 3 or 4 presentations, and they landed **solid**. The first one was the big one: a walkthrough of the OWASP Top 10, what it actually is, why it exists, and how almost every breach we were worried about mapped back to it. He said "80% of security is reading the OWASP Top 10." At this point, I'd heard the term mentioned briefly in the past, but never paid attention. I understood OAuth, JWTs, and encryption, but definitely not the other factors involved.

I think I took away four things:

- Read the OWASP Top 10 at least once a month
- Understand what each threat is in the top 10
- Understand the threat vectors to your product, and build a simple threat model.
- Security is not a single thing... it's a LOT of things, and some are required, and some are not.

At least 80% of the securing of an application can happen **during iteration**. The last 20% can normally be assessed, tweaked, and normalized during a security review. This can be as simple as changing token lifetimes, or implementing a private VPC for your data. Either way the concepts are pretty simple for a senior engineer.

## Why wasn't I doing this before?

Yeah, good question.... I think mainly because the speed at which technology has been moving for the past decade was both a boon and a trap. We didn't focus security because we thought we could just chuck 1,000,000 products over the fence, and see if we were obscure enough to NOT get hacked. I saw this approach from a lot of businesses.

## The difference between security and regulatory requirements

Security isn't _required_ in a lot of different industries, it's recommended. Sure there are GDPR Requirements, HIPAA Requirements, and PII Requirements. The problem is that they are requirements, so you feel forced to do them. Eventually we start normalizing the requirements into our daily work because we **must** not because we want to. So why not implement proper RBAC at the authentication layer instead of building it into your business/data layers? The reason is it's hard to understand sometimes! No one teaches about OAuth, or custom claims. Shit, no one ever alerted me about what a SBOM (Software Bill of Materials) until I started working for a Healthcare client.

## Layers build security, not requirements

There is a reason that almost every certification in security has extremely vague tests. Sometimes the answer is 45% A, and 10% B. This is by design, and understandable. Security is layered by the priority of the project it's protecting.

This stuff is not hard, but the problem is deciding where to put your focus. On expansion or security. Sometimes your product doesn't necessitate Role based access control. Sometimes you don't need an SBOM. Knowing when to take the time to implement something like SAST or DAST can depend on factors like budget, and the current state of your QA team. Ultimately understanding your company's budget, and goals is what can dictate your posturing both short and long term.

## Understanding Business Goals as a Software Engineer

This I think is the final point is that you can approach security as a software engineer as this is part of your tool kit. Take a two step approach.. understand the business, understand the capabilities. Talk to the PM, and ask if the budget (financial and time) facilitates role based implementation at the beginning. Explain that it's easier to start with secure access controls. Talk to your Engineering Manager and ask if it makes sense to start with locked down versions of your packages. The easiest fix we can make in the current climate is literally statically locked versions to our OSS packages.

Understand each member of the SDLC, what's important to them, and where to ask for time:

1. EM/Tech Lead - primarily work to get the product shipped in the time line from the PM. Ask for the permission to facilitate non-functional requirements
2. PMs/Product - Primarily focus on delivery of the finished product. Identify changes in functional requirements and the customer's interaction.
3. QA - Often the hardest to work with, and the gate keeper to success. Find out where QA is ACTUALLY needed in the process, and implement the QA at this point. Don't let authorization checks happen in the wrong spots. Know when to push back here.

Try and make these your go to funnels for improving your posturing when you are on the ground prompting, or adding new features.

## Making Security work for you as a Software Engineer

No one wants to deal with a security breach. It's exhausting and frustrating. The best advice I got was also the simplest: read the OWASP Top 10. At least once a month. Do that, and you're already 80% of the way there. The last 20% is just deciding where to put the layers.

## Citations & References
- [OWASP Top 10 2025](https://top10.owasp.org/2025/) - relevant still in the end of 2026... almost every breach has been preventable from this list. You can research almost every concept mentioned in this post there.
- [Software Bill of Materials](https://www.ibm.com/de-de/think/topics/sbom) - this explanation from IBM is really good, and I strongly recommend it.
