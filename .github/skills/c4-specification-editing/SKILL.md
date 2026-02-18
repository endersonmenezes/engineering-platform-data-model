---
name: c4-specification-editing
description: Guide for editing the LikeC4 specification (element kinds, relationship kinds, tags). Use when asked to add new element types, relationship types, or tags in the Engineering Platform Data Model.
---

# C4 Specification Editing

## Critical Requirements

- ALWAYS read `likec4/specification.c4` before modifying the specification
- Changes to specification affect the ENTIRE model
- ALWAYS validate with `npm run validate` after changes

## Overview

The `specification.c4` file defines the vocabulary of the entire C4 model:
- **Element kinds**: Types of elements (actor, system, capability, blueprint, integration, externalSystem)
- **Relationship kinds**: Types of connections (syncs, dataSource, owns, governs, etc.)
- **Tags**: Labels for categorization and filtering

## Current Element Kinds

| Kind | Shape | Color | Usage |
|------|-------|-------|-------|
| `actor` | person | amber | Personas |
| `system` | browser | indigo | The IDP system |
| `externalSystem` | rectangle | slate | SaaS/Cloud providers |
| `capability` | bucket | sky | Stars (blueprint groups) |
| `blueprint` | document | green | Data entities |
| `integration` | storage | gray | Connectors |

## Current Relationship Kinds

| Kind | Color/Style | Purpose |
|------|-------------|---------|
| `syncs` | blue, solid | Data synchronization |
| `dataSource` | blue, dashed | Data source declaration |
| `produces` | green, solid | Generates/creates |
| `owns` | amber, solid | Ownership |
| `governs` | red, solid | Governance/controls |
| `dependsOn` | slate, solid | Dependencies |
| `includes` | sky, solid | Containment |
| `triggers` | amber, dashed | Initiates action |
| `deploys` | green, solid | Deployment |
| `authenticates` | violet, solid | Authentication |

## Current Tags

**Element tags**: `#core`, `#oci`, `#azure`, `#github`, `#security`, `#metrics`, `#selfservice`
**Relationship tags**: `#sync`, `#ownership`, `#dataFlow`, `#governance`

## Adding Elements

### New Element Kind

```c4
specification {
  element myNewKind {
    style {
      shape rectangle
      color violet
      icon bootstrap:lightning
    }
  }
}
```

### New Relationship Kind

```c4
specification {
  relationship monitors {
    color violet
    line dashed
    head diamond
    tail none
  }
}
```

### New Tag

```c4
specification {
  tag myNewTag
}
```

## Impact Analysis

| Change | Risk |
|--------|------|
| Add element kind | Low |
| Rename element kind | HIGH — breaks all elements |
| Remove element kind | HIGH — breaks all elements |
| Add relationship kind | Low |
| Rename relationship kind | HIGH — breaks all relations |
| Add tag | None |
| Remove tag | Medium — warnings |

## Workflow

1. **Read** `likec4/specification.c4`
2. **Verify** the change is necessary
3. **Add/edit** the specification
4. **Validate** with `npm run validate`
