---
type: Reference
title: Open Knowledge Format v0.2
description: Implementation notes for the OKF version targeted by this bundle.
tags:
- okf
- specification
- reference
status: stable
resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
generated:
  by: openai/gpt-5.6-thinking
  at: '2026-08-01T20:48:00Z'
sources:
- id: okf-spec
  resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
  title: Open Knowledge Format v0.2 Specification
  author: team:google-cloud-platform
- id: coleam-bundle
  resource: https://github.com/coleam00/cole-medin-ai-coding
  title: Cole Medin AI Coding OKF Bundle
  author: human:coleam00
---

# Target Version

This bundle targets OKF version **0.2**.[^okf-spec]

# Applied Conventions

* Concepts are Markdown files with YAML frontmatter.
* Every non-reserved Markdown file contains a non-empty `type`.
* Root and directory `index.md` files support progressive disclosure.
* `log.md` records changes.
* `sources`, `generated`, `verified`, and `status` provide provenance, trust, and lifecycle signals.
* Standard Markdown links create relationships between concepts.

# Cole Medin Bundle

The Cole Medin repository is used as a practical example of a clone-and-search knowledge bundle with a small CLI. Its root index declares OKF 0.1, so this Terra Nexus bundle follows the newer 0.2 specification rather than copying the older metadata model.[^coleam-bundle]

[^okf-spec]: Open Knowledge Format v0.2 Specification
[^coleam-bundle]: Cole Medin AI Coding OKF Bundle
