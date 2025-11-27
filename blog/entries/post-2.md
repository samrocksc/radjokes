---
title: "I made something stupid to help with interviews"
date: "2025-11-13"
author: "Sammy C."
tags: ["introduction", "second-post"]
---

# I made a something stupid to help with interviewing

I’ve recently returned to interviewing and quickly realized that my naturally animated speaking style can be more distracting than engaging on calls. Over the past few weeks I’ve focused on moderating my tone and listening to my own recordings.

One persistent frustration is the high cost of many job‑search tools, most of which rely on subscription models. To avoid those fees, I built a lightweight, extensible web‑based recorder using Goose (<https://block.github.io/goose>) in plan mode, combined with a small CSS library from an old side project and the Qwen3‑coder model from Ollama.

The app stores recordings locally in IndexedDB, eliminating any cloud dependency. I can record myself, review the playback with a timer, and track my answer quality over time. The result is a simple, cost‑free solution that helps me refine interview performance.

If you’re looking for an inexpensive way to practice and evaluate your interview answers, feel free to try the tool here: <https://look.imwithstupid.fun>.
