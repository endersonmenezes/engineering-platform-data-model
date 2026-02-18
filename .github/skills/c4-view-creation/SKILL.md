---
name: c4-view-creation
description: Guide for creating and editing LikeC4 views (C1 landscape, C2 containers, C3 components). Use when asked to add or modify architectural views at any C4 level in the Engineering Platform Data Model.
---

# C4 View Creation

## Critical Requirements

- ALWAYS read the relevant view file before creating or editing views
- C2 views show Stars, C3 views show Blueprints — NEVER mix levels
- ALWAYS validate with `npm run validate` after changes

## View Files

| File | Level | Purpose |
|------|-------|---------|
| `views/landscape.c4` | C1 | IDP as black box + actors + external systems |
| `views/containers.c4` | C2 | 13 Capability Stars (NOT individual blueprints) |
| `views/c3/<star>.c4` | C3 | Blueprints inside each star (one file per star) |
| `views/journeys.c4` | Dynamic | Persona workflow sequences (see c4-journey-creation skill) |

## C1: System Context View

Shows the IDP as a single system with its actors and external systems.
- Does NOT show internal capabilities or blueprints
- Audience: Everyone

## C2: Container View

Shows the 13 Capability Stars inside the IDP.
- Shows stars as `capability` elements
- Does NOT show individual blueprints
- Audience: Architects

## C3: Component View

Shows the blueprints inside ONE specific star. Each star has its own file under `views/c3/`.

| Star | File |
|------|------|
| Service Catalog | `views/c3/catalog.c4` |
| Organization | `views/c3/organization.c4` |
| Version Control | `views/c3/vcs.c4` |
| CI/CD Platform | `views/c3/cicd.c4` |
| Resource Catalog | `views/c3/resource.c4` |
| Artifact Management | `views/c3/artifacts.c4` |
| Security | `views/c3/security.c4` |
| Software Quality | `views/c3/quality.c4` |
| Engineering Metrics | `views/c3/metrics.c4` |
| Feature Management | `views/c3/features.c4` |
| Software Templates | `views/c3/templates.c4` |
| GRC | `views/c3/grc.c4` |
| Database Management | `views/c3/database.c4` |
| Multi-Cloud Detail | `views/c3/multicloud.c4` |

```c4
view starVCSView of idp.starVCS {
  title 'Version Control Star'
  description 'C3: Blueprints inside the Version Control capability'
  include *
  style repository { color green }
}
```

- One view per star, one file per star
- `of idp.starXxx` scopes the view to that star
- Audience: Developers

## View Naming Conventions

| Level | Pattern | Examples |
|-------|---------|----------|
| C1 | `index` | `index` |
| C2 | `capabilities` | `capabilities` |
| C3 | `star<Name>View` | `starVCSView`, `starCICDView` |
| Dynamic | `personaAction` | `developerOnboarding` |

## Available Colors

`amber`, `blue`, `green`, `indigo`, `muted`, `red`, `secondary`, `sky`, `slate`, `violet`

## Available Shapes

`person`, `rectangle`, `browser`, `cylinder`, `mobile`, `queue`, `storage`, `document`, `bucket`

## Include/Exclude Patterns

```c4
include *              // All direct children
include element1, element2  // Specific elements
exclude integrationLayer    // Exclude specific
include idp._          // IDP + direct children
include idp.**         // IDP + ALL nested
```

## Workflow

1. **Read** the relevant view file
2. **Determine** the C4 level (C1, C2, C3, or Dynamic)
3. **Create/edit** the view in the correct file
4. **Validate** with `npm run validate`
