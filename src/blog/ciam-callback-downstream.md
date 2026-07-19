---
title: "The Invisible Handshake: Understanding Callbacks in CIAM"
date: "2026-07-02"
status: draft
target_audience: "Aspiring developers, agentic coding learners, CIAM newcomers"
word_count: 950
primary_goal: "Clarify the directional flow of OAuth2/OIDC callbacks and provide a mental model for troubleshooting."
tags: [blog, draft, ciam, oauth2, oidc, architecture, troubleshooting]
urls: []
layout: blog-post.njk
---

## Section 1: The Callback Paradox

The Callback Paradox is a rite of passage for anyone working in Customer Identity and Access Management. It is often rooted in a fundamental misunderstanding: the authentication process does not happen on your website, but on a dedicated authentication server. In the world of CIAM, the callback is the most critical and most misunderstood moment of the whole process. It is the invisible handshake where trust is transferred from one system to another.

Most of us are taught to think of callbacks as simple functions that run after another piece of code. In CIAM, a callback is a journey.

<div class="callout">
<strong>The Thesis:</strong> In CIAM, a callback is not a function — it is a journey. The authentication server does not push data into your app. It redirects the user's browser to a pre-registered address. That redirect is the handshake. If you do not understand this directional flow, you will never debug a failed integration.
</div>

To visualize this, imagine CIAM security as a multi-story building. The different environments — your website, the authentication server, and third-party providers — are the floors. The callbacks are the stairwells. They are the only way to move a user between these levels of trust. If a stairwell is unsecured or leads to the wrong floor, the integrity of the entire building is compromised.

I remember wiring up my first OAuth2 app years ago. I had everything configured. The JWTs were set, the libraries were in place, and the secrets were locked down. But the moment I shifted from my local machine to the production environment, everything broke. An IT colleague walked me through it, and his explanation is what finally made it click: everything flows downstream.

<div class="callout">
<strong>The Trap:</strong> Most developers treat callbacks as code-to-code communication. They expect the server to "send" data directly to their app. This mental model works fine in local development and breaks catastrophically in production. The difference? In production, the browser is the courier, not the server.
</div>

## Section 2: The Downstream Flow

In a standard OAuth2 flow, the request moves from the Client (your app) to the **Authorization Server** (often called the AS — the central system that verifies identities and issues tokens). The AS performs the heavy lifting — verifying the user's identity and permissions — and then generates a set of credentials.

The failure almost always happens on the return trip. The AS does not push data directly into your application's internal state. Instead, it redirects the user's browser to a specific, pre-registered address: your callback URL. This is the "downstream" delivery. If the address you provided in the request does not match the registered URI exactly, the AS will refuse to deliver the payload for security reasons. This is the root of the dreaded `redirect_uri_mismatch`.

<div class="callout">
<strong>The Thesis:</strong> The AS does not push data into your app. It redirects the user's browser to a callback URL. If that URL doesn't match the registered URI exactly, the AS refuses to deliver. This is the root of the dreaded <code>redirect_uri_mismatch</code> — and it is not a bug, it is a security feature.
</div>

CIAM is essentially a stack of trust layers. You have the user's device handling biometrics or passwords, the Authorization Server acting as the source of truth, and the application acting as the consumer. OAuth2 and OIDC act as the normalization layer between these worlds. They translate a trust signal, like a successful password check, into a standardized token that the application can understand without ever needing to see the user's password.

The callback is the exact point where these layers touch. If you misunderstand which layer is talking and which one is listening, you are not just making a coding error. You are breaking the trust chain. This often happens when developers move from being a consumer of an AS to actually managing one. Suddenly, the perspective shifts. You are no longer the one waiting for the groceries; you are the one driving the delivery truck.

### The S-S-P Check

To stop the guesswork, I use a simple three step audit called the S-S-P Check.

**Source** — First, check who is actually sending the data. Is the data coming from the AS back to the app, or is this a hook inside the AS sending a notification to an external system? It is very common to confuse a post-login trigger with an OAuth callback. They move in different directions.

<div class="callout">
Is the data coming from the AS back to the app, or is this a hook inside the AS sending a notification to an external system? A post-login trigger and an OAuth callback move in different directions. Get the direction wrong and you will spend hours staring at the wrong logs.
</div>

**Station** — Second, look at where the data is landing. Is the destination the app's endpoint or the internal logic of the AS? If you put the AS's own URL in your app's configuration, you are essentially mailing a letter to the post office and expecting it to arrive at your own front door.

<div class="callout">
If you put the AS's own URL in your app's configuration, you are mailing a letter to the post office and expecting it to arrive at your own front door. The callback URL must be an endpoint your app controls.
</div>

**Payload** — Third, examine what is actually in the envelope. Is the data an authorization code, an access token, or an ID token? A common mistake is trying to use an authorization code as a key. You cannot open the door with a ticket. You have to exchange that code for a token before the application can actually identify the user.

<div class="callout">
You cannot open the door with a ticket. An authorization code must be exchanged for a token before the application can identify the user. If you are stuck, check the payload type first — it is the most common source of confusion.
</div>

## Section 3: The Invisible Handshake

This is where the distinction between OAuth2 and OIDC becomes vital. OAuth2 was built for authorization, not authentication. It was designed to give a service a key to your data, not to prove who you are. OIDC was added later to fix this, introducing the ID Token so we could finally have a standardized way to do Single Sign-On. When the payload looks wrong, it is often because you are treating an OAuth2 token as an OIDC identity.

<div class="callout">
<strong>The Thesis:</strong> OAuth2 gives a service a key to your data. OIDC proves who you are. When the payload looks wrong, you are probably treating an OAuth2 token as an OIDC identity. These are not interchangeable — they serve fundamentally different purposes.
</div>

Identity is not a linear line. It is a series of hand-offs. When you feel the friction of a failing flow, stop looking at the code for a second and look at the map. Determine the sender, the station, and the payload. Once you see the downstream flow, the invisible handshake becomes visible.

<div class="callout">
<strong>The Takeaway:</strong> Stop debugging the code and start debugging the direction. Every CIAM failure I have ever seen traces back to someone misunderstanding which way the data flows. Master the direction, and the handshake reveals itself.
</div>
