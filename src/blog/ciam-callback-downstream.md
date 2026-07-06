---
title: The Invisible Handshake: Understanding Callbacks in CIAM
date_created: 2026-07-02
status: considered
target_audience: Aspiring developers, agentic coding learners, CIAM newcomers
word_count: 950
primary_goal: Clarify the directional flow of OAuth2/OIDC callbacks and provide a mental model for troubleshooting.
tags: [blog, ciam, oauth2, oidc, architecture, troubleshooting]
urls: []
---

The Callback Paradox is a rite of passage for anyone working in Customer Identity and Access Management. It usually starts with a redirect_uri_mismatch error or the sudden realization that your application is receiving a weird string when it was expecting a clean JSON object. In the world of CIAM, the callback is the most critical and most misunderstood moment of the whole process. It is the invisible handshake where trust is transferred from one system to another.

Most of us are taught to think of callbacks as simple functions that run after another piece of code. In CIAM, a callback is a journey.

I remember wiring up my first OAuth2 app years ago. I had everything configured. The JWTs were set, the libraries were in place, and the secrets were locked down. But the moment I shifted from my local machine to the production environment, everything broke. An IT colleague walked me through it, and his explanation is what finally made it click. He told me that everything flows downstream.

Think of the identity flow like a grocery run. You send a request to the store, which in this case is the Authorization Server. You give them a list of what you need. The store does the heavy lifting. They verify your identity, check your permissions, and pack your tokens into a bag.

The failure almost always happens on the return trip. The store does not just teleport the groceries into your fridge. They deliver them to a specific address, which is your callback URL. If you told the store to leave the groceries on your kitchen table, but you have since moved that table to a different room or moved to a different house entirely, the delivery driver just stands there with a bag of food and nowhere to put it.

The Authorization Server does not care where you actually are. It only cares that the address on the delivery slip matches the destination it has been told to trust. This is why the redirect URI is such a common point of failure. If the registered URI doesn't match the request exactly, the AS refuses to deliver the payload for security reasons.

CIAM is essentially a stack of trust layers. You have the user's device handling biometrics or passwords, the Authorization Server acting as the source of truth, and the application acting as the consumer. OAuth2 and OIDC act as the normalization layer between these worlds. They translate a trust signal, like a successful password check, into a standardized token that the application can understand without ever needing to see the user's password.

The callback is the exact point where these layers touch. If you misunderstand which layer is talking and which one is listening, you are not just making a coding error. You are breaking the trust chain. This often happens when developers move from being a consumer of an AS to actually managing one. Suddenly, the perspective shifts. You are no longer the one waiting for the groceries; you are the one driving the delivery truck.

To stop the guesswork, I use a simple three step audit called the S-S-P Check.

First, check the Source. Ask who is actually sending the data. Is the data coming from the AS back to the app, or is this a hook inside the AS sending a notification to an external system? It is very common to confuse a post-login trigger with an OAuth callback. They are moving in different directions.

Second, look at the Station. Where is the data landing? Is the destination the app's endpoint or the internal logic of the AS? If you put the AS's own URL in your app's configuration, you are essentially mailing a letter to the post office and expecting it to arrive at your own front door.

Third, examine the Payload. What is actually in the envelope? Is the data an authorization code, an access token, or an ID token? A common mistake is trying to use an authorization code as a key. You cannot open the door with a ticket. You have to exchange that code for a token before the application can actually identify the user.

This is where the distinction between OAuth2 and OIDC becomes vital. OAuth2 was built for authorization, not authentication. It was designed to give a service a key to your data, not to prove who you are. OIDC was added later to fix this, introducing the ID Token so we could finally have a standardized way to do Single Sign-On. When the payload looks wrong, it is often because you are treating an OAuth2 token as an OIDC identity.

Identity is not a linear line. It is a series of hand-offs. When you feel the friction of a failing flow, stop looking at the code for a second and look at the map. Determine the sender, the station, and the payload. Once you see the downstream flow, the invisible handshake becomes visible.
