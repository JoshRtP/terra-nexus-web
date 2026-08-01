---
type: Editorial Rule
title: Source Precedence and Conflict Resolution
description: Rules for resolving conflicts between source documents, normalized concepts,
  and generated website content.
tags:
- governance
- sources
- editorial
status: stable
generated:
  by: openai/gpt-5.6-thinking
  at: '2026-08-01T20:48:00Z'
sources:
- id: service-architecture
  resource: /references/source-documents/service-architecture.md
  title: Terra Nexus Service Architecture
  author: human:terra-nexus-owner
- id: topics-value-chains
  resource: /references/source-documents/topics-and-value-chains.md
  title: Terra Nexus Topics and Value Chains
  author: human:terra-nexus-owner
- id: core-branding
  resource: /references/source-documents/core-messaging-and-branding.md
  title: Terra Nexus Core Messaging and Branding
  author: human:terra-nexus-owner
- id: confirmed-architecture
  resource: /references/decisions/confirmed-knowledge-architecture.md
  title: Confirmed Terra Nexus Knowledge Architecture
  author: human:terra-nexus-owner
---

# Precedence

1. Explicitly approved human decisions recorded in `/references/decisions/`.
2. The three approved source-document mirrors in `/references/source-documents/`.
3. Stable normalized concepts in this bundle.
4. Draft website architecture, templates, and generated recommendations.
5. Agent inference.

# Conflict Rule

When content conflicts, do not silently reconcile it. Surface the conflict and follow the higher-precedence source.

# Examples

* A listed example company is an illustrative market participant unless a separate approved case study identifies it as a client.
* Carbon & Ecosystem Services offering names are approved, but detailed descriptions are not supplied in the service source document.
* Multiple brand narrative options exist; no single option should be treated as final without approval.
