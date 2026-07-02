---
title: "Beyond the Session: Understanding Highly Regulated Identity (HRI)"
date: "2026-06-29"
author: "Sammy C."
description: "Demystifying HRI and the shift from session-based to transactional security."
tags: 
  - blog
  - hri
  - fapi
  - security
  - identity
layout: blog-post.njk
---

In the world of standard Customer Identity and Access Management (CIAM), we spend a lot of time talking about the "session." We ask, "Is this user logged in?" and "Do they have the right scope?" For most applications, that's enough. But when you move into high-stakes environments, such as critical infrastructure, healthcare, or privileged admin access, the concept of a "session" becomes a liability.

We commit thousands of authenticated transactions over the internet every day. The problem is that most of these transactions rely on a baseline of trust that is simply too broad. We need to ensure that these actions have proper intent and usage, moving the goalposts from "who is this user?" to "what exactly is this user intending to do right now?"

The goal in these environments isn't just to know who the user is, but to establish transactional trust.

### The Flaw in the Standard Flow
Most of us are used to the standard OAuth 2.0 flow. It’s convenient. The client sends the user to the Authorization Server (AS) via a browser, the user logs in, and they're sent back with a token. 

The problem is that this process relies on a browser as the primary messenger. This is "front-channel" trust. Because the request details are passed through a browser, they are visible, susceptible to length limits, and potentially leakable. In a regulated environment, relying on a browser to carry your intent is a security gap. It's a fragile way to handle high-value data.

### Shifting the Trust: The HRI Approach
Highly Regulated Identity (HRI) changes the entry point. Instead of trusting a browser to tell the server what the user wants to do, HRI moves that conversation to the back-channel.

**1. PAR (Pushed Authorization Requests)**
Instead of a long, leaky URL, the client server talks directly to the AS server first. It "pushes" the authorization request server-to-server. The AS returns a tiny, opaque reference ID. When the user finally sees the login screen, a browser is just carrying a reference code, not the actual request. The trust has shifted from the user's agent to a secure server handshake.

**2. RAR (Rich Authorization Requests)**
Standard "scopes" are too blunt. Asking for a broad "write" permission is like asking for a key to the whole building. RAR allows for structured intent. Instead of a general scope, the request specifies exactly what is happening, such as a precise change to a sensitive record. The user isn't just consenting to a permission, they are consenting to a specific action.

**3. Sender Constraining (The End of Token Theft)**
Finally, HRI addresses the "stolen token" problem. Through mTLS or DPoP, the token is cryptographically bound to the specific device that requested it. If an attacker steals the token, it's useless to them because they don't have the private key tied to the origin device.

### The Business Logic of Trust
For a Product Manager or a stakeholder, HRI isn't just "extra security" or a compliance checkbox for the CISO. It's a business enabler. 

Standard CIAM allows you to build a good app. HRI allows you to build a *regulated* app. By moving the trust model from the session to the transaction, you can unlock features that would otherwise be too risky to offer: high-value fund transfers, medical record sharing, or critical system overrides. It turns compliance from a series of checkboxes into a product feature that provides genuine security for the end user.

### The Bottom Line
HRI is a fundamental shift in how we think about identity. It moves us away from a world where we trust a session, and into a world where we verify the intent of every single high-value action.

For the practitioner, it means moving beyond the basics of OAuth and embracing a world where the "how" of the request is just as important as the "who" of the user.

I totally get that reading RFCs is the world's most boring work, but in the case of HRI, these documents have been carefully crafted and really shine a light on how each of these concepts work. If you want to see the engine under the hood, these are the sources.

---

### References & Further Reading
- [RFC 9126](https://datatracker.ietf.org/doc/html/rfc9126): OAuth 2.0 Pushed Authorization Requests (PAR)
- [RFC 9396](https://datatracker.ietf.org/doc/html/rfc9396): OAuth 2.0 Rich Authorization Requests (RAR)
- [RFC 8705](https://datatracker.ietf.org/doc/html/rfc8705): OAuth 2.0 Mutual TLS (mTLS) Client Authentication and Certificate-Bound Access Tokens
- [FAPI 2.0](https://openid.net/specs/fapi-2_0-security-profile.html): Financial-grade API Security Profile
