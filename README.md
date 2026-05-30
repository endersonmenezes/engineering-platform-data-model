# Engineering Platform Data Model

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![LikeC4](https://img.shields.io/badge/LikeC4-v1.48+-blue?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIvPjwvc3ZnPg==)](https://likec4.dev/)

> **Star Schema Data Model for Internal Developer Portals (IDP)**  
> Built with [LikeC4](https://likec4.dev/) following the [C4 Model](https://c4model.com/) methodology

## Overview

A **reference data model** for building Internal Developer Portals, organized into **Capability Galaxy Data Model** where each star is a platform capability domain. The **Atomic Technology Asset** is the central hub connecting all stars.

The model draws from two key references: [Backstage](https://backstage.io/) for the core entity architecture (Component, API, System, Domain, Resource, Group, User, Template) and [Port.io's Blueprint model](https://docs.port.io/build-your-software-catalog/customize-integrations/configure-data-model/setup-blueprint/) for the concept of *Blueprints* as configurable data entities. However, this data model is **tool-agnostic** — it can be implemented in Backstage, Port.io, Cortex, OpsLevel, or any IDP that supports a configurable data model.

> [!IMPORTANT]
> As the information that is here is going through a review, I am creating a [Data Engineering for Platform Engineering: A Reference Data Model for Internal Developer Portals](https://github.com/endersonmenezes/talks/blob/main/talk-data-engineering-to-platform-engineering.md). Based on lessons in Data Engineering and DevOps, this content will be visually transformed for better visualization using LikeC4.

## License

[Creative Commons Attribution 4.0 International](LICENSE) — Share and adapt freely with attribution.

## Acknowledgments

[LikeC4](https://likec4.dev/) · [C4 Model](https://c4model.com/) · [Backstage](https://backstage.io/) · [Port.io](https://www.getport.io/)

---

> **Note:** This repository contains only the **conceptual model** in LikeC4. Actual YAML blueprint implementations, data sources, and automations should live in your organization's private repository.
