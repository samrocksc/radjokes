---
title: "An MCP server, a login wall, and Luke Skywalker"
date: "2026-11-02"
author: "Sammy C."
description: "Building a Star Wars MCP server and layering security on it rung by rung: how an MCP is made, then authentication with Auth0 and PKCE."
status: published
tags: 
  - blog
  - mcp
  - oauth2
  - oidc
  - auth0
  - security
layout: blog-post.njk
---

MCP servers are the industry's hottest form of agentic consumption, and mostly a security nightmare.  Of the servers where authentication could be determined, 38.7% required none: anyone could connect, initialize a session, and enumerate every tool.  Another 22.9% ran wide open on CORS, and only 2.4% had any rate limiting.  Meanwhile 83% of businesses plan to roll out agentic AI, and only 24% have the controls to actually govern it(Cisco AI Readiness Index).  Companies with mature oversight launched agentic AI almost 4x faster: 46% versus 12%(CSA and Google Cloud).  The security pillar and the speed pillar turn out to be the same pillar; I'll cite the reports at the bottom.

**I have spent 15ish professional years in software development, and 20+ as a hobbyist, or side project software developer...There is a wide gap between the security/IT trade and where most developers sit.  I want to bridge this gap.**

Customer identity content reaches engineers two ways, and both are broken.  The one-off POC, increasingly AI-generated in an afternoon, demos beautifully, teaches a little, and vanishes with its uncommitted middle: nobody committed the part where the security decisions actually live.  The theoretical kind is all standards, diagrams, and threat models, correct and none of it executable.  Between a Friday demo and a Monday standard, the engineer with an empty editor has almost nothing to walk.

**The past few months have made it plain: security gets built side by side with the AI products, not stapled on after.**

This series is the walk for one small, representative case: a Star Wars MCP server, built rung by rung toward layered security.  Everything is committed; each rung lands one concern and the blog follows the commits.  I've broken it into two posts: the next one goes into Coarse Grained Role Based Access Control (RBAC).

I have created a pretty simple demo here: [a0-mcp-demo on GitHub](https://github.com/samrocksc/a0-mcp-demo), it's designed to only be 3 commits, by the end of this series....four.  You can follow along there by switching between commits.

## Agents, MCPs, etc....they're all just web technologies

Agents, MCPs, and the like are best read as new formats, not a new internet.  For twenty years the browser talked to REST endpoints, and later GraphQL, over HTTP; the agent generation swaps that for an RPC-style layer, the same discipline gRPC brought to services, now aimed at models instead of UIs.  The web part does not vanish: under that layer we are still serving plain web data.  Implementation-wise two technologies carry the traffic: XHR-style HTTP requests move the transport, and JSON-RPC 2.0 decides what the messages actually say.

![Agents, Auth0, and ACP in the presentation tier, MCPs in the business tier, and data stores in the data tier](/assets/agents-mcps-three-tier.png)

## Does it line up with three tier architecture

Yes....yes it does, it's almost hand in hand.  The only difference is an MCP is a different technology.  For those of you old enough to remember switching to GraphQL was a similar drive.  We had to adjust from utilizing the full spectrum of calls (GET, POST, PUT, PATCH) to utilizing POST and submitting a query language.  We're doing the exact same thing here, except we're establishing a stream.

## The Technology Behind This

First up is OAuth2 PKCE: the mechanism that binds all of our services together, this allows a browser to get a token and authorize the server.  Second, we are utilizing Auth0, an incredibly simple and cost efficient way to spin up environments and learn how to build with security in mind.  Our MCP registers as an API with an audience of `urn:mcp`, and Auth0 mints the access tokens aimed at that audience.  To bind the technologies together with the MCP we utilize Next.js, which acts as both API and Frontend for the storage of the token.

## Terms first: authN and authZ are two questions

Authentication, authN, answers: who called this tool, and did they prove it to a standard I trust?  Authorization, authZ, answers: what is that proven caller permitted to do?  The MCP context makes the split concrete. The model asks the client to invoke a tool; the client delivers the call to the server; the server owes two separate answers. A caller can be perfectly authenticated and still be unauthorized. PKCE (proof key for code exchange) rides along with the authorization-code flow: the client mints a one-time secret at login and proves possession at the token exchange instead of shipping a client secret around, which is exactly right for an app with no backend safe, and which modern OAuth expects of every public client. Post one implements authentication, plus the lightest possible authorization: a binary decision.

## How an MCP is made

The history of RPC is a different blog post.  An MCP server speaks JSON-RPC 2.0 and exposes **tools**, named operations with typed arguments.  The model decides whether to call one; the client executes the call.  Mine is read-only: `getPerson`, `searchPeople`, `getFilm`, `getPlanet`, four lookups over the classic Star Wars schema.  One could make a comparison to a route for the tool call, and a handler for the actual methodology.  For this project I created some Business Logic to help.

swapi.info serves classic JSON with no auth, no pagination, and no native search, so `searchPeople` fetches the roster once, caches briefly, filters locally:

```typescript
export async function searchPeople(term: string): Promise<PersonRef[]> {
  const all = await fetchJson<Person[]>("/people");
  const q = term.trim().toLowerCase();
  return all
    .filter((p) => p.name.toLowerCase().includes(q))
    .slice(0, 8)
    .map((p) => ({ id: idFromUrl(p.url), name: p.name }));
}
```

## The software inventory

Three pieces carry the load.  The Next.js frontend facilitates PKCE for the auth process and stores the access token once the callback lands; the session file is gitignored because dev churns module state faster than memory.  The `modelcontextprotocol` SDK speaks JSON-RPC 2.0 and hosts the server-side transport.  And zod builds tight contracts that every tool call has to adhere to for its input; which gets extremely important as security moves forward: a validated input line is the cheapest layer you will ever buy.

All three live in one process.  The first plan had two servers and a poller between them; it worked, and it was not worth it.  The SDK's legacy SSE transport lives inside the Next app itself, on pages-API routes:

```typescript
export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const transport = new SSEServerTransport("/api/messages", res);
  transports.set(transport.sessionId, transport);
  res.on("close", () => transports.delete(transport.sessionId));
  await mcp.connect(transport);
}
```

`bodyParser: false` is the trick to remember: the transport reads its POST body from the raw stream itself; a body parser would eat the body and hang the connection.  The client holds `GET /api/sse` open; messages ride `POST /api/messages?sessionId=...`; every hop is visible in curl.  The transport predates streamable HTTP; this demo stays on it anyway, seeing every hop beats chasing a spec bump.

## The layers

Security is layers, and none of the controls in this series is the wrong answer; none of them completes security alone.  A login wall without token verification is theater.  Token verification without a permissions model means every authenticated identity reads everything.  Permissions without trustworthy authentication are a list of wishes.  So we stack them, and defense in depth is the name for the stack: each layer holds some ground if its neighbors fail, and the attacker has to beat all of them.  The server helps by construction too: localhost-only, read-only, nothing sensitive behind it.

## The demonstration

Two windows side by side:  opencode asks for Luke Skywalker and refuses, its refusal printing a login link;  a browser sits at that link while I sign in through Auth0;  then the call held open the whole time finishes with real data, no second prompt, because the server polled the session holder and released it the moment the login landed.

![Opencode on the refusing terminal, the Auth0 sign-in in the browser beside it](/assets/opencode-auth0-side-by-side.png)

The model did not handle the authentication. The human did, in a browser, and the tool call survived the round trip.

## The authentication layer

No tool call answers until a real session exists. The gate is one wrapper around every tool callback:

```typescript
let token = await getHeldToken();
if (!token && linkShown) {
  token = (await waitForSession(90_000)) ?? undefined;
  if (!token) return loginRequired();
}
const claims = await verifyToken(token);
```

The first unauthenticated call refuses instantly, carrying the login link to provide better UX.  Later calls hold and poll, and can complete mid-call when the login lands.  Every held token gets verified fresh on every call: signature and expiry through jose, the issuer taken from the discovery document (Auth0 stamps a trailing slash), and the `urn:mcp` audience, which must ride `/authorize` or Auth0 aims the token at the wrong thing.

This is authN, plus the coarsest authZ a server can speak: you may call, or you may not.

## Where part two goes

The gate tonight treats every identity as royalty: log in and you read Tatooine, Luke, all of it.  Part two layers coarse-grained RBAC: Auth0 bakes a `permissions` claim into the token; the person tools demand `people:read` while film and planet tools keep answering.  Luke locks behind a permission he has guarded all along.  Same ladder, same repo, one commit at a time.

## Citations

- [I analyzed 1400 MCP servers - here's what I learned](https://bloomberry.com/blog/we-analyzed-1400-mcp-servers-heres-what-we-learned/) - Henley Wing Chiu
- [The State of Enterprise MCP and AI Agent Governance 2026](https://mcpmanager.ai/blog/mcp-statistics/) - Becky Brooks
- [Cisco AI Readiness Index 2025](https://www.cisco.com/c/dam/m/en_us/solutions/ai/readiness-index/2025-m10/documents/cisco-ai-readiness-index-2025-realizing-the-value-of-ai.pdf)
- [State of AI Security and Governance (CSA and Google Cloud)](https://cloudsecurityalliance.org/artifacts/the-state-of-ai-security-and-governance)