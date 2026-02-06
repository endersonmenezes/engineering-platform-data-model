# C4 Specification Guide (Element Kinds, Relationship Kinds, Tags)

## Critical Requirements

🚨 **ALWAYS read `likec4/specification.c4` before modifying the specification**
🚨 **Changes to specification affect the ENTIRE model**
🚨 **ALWAYS validate with `npm run validate` after changes**

## Overview

The `specification.c4` file defines the vocabulary of the entire C4 model:
- **Element kinds**: Types of elements (actor, system, capability, blueprint, integration, externalSystem)
- **Relationship kinds**: Types of connections (syncs, dataSource, owns, governs, etc.)
- **Tags**: Labels for categorization and filtering

## Current Element Kinds

| Kind | Usage | Shape | Color |
|------|-------|-------|-------|
| `actor` | Personas (Developer, Tech Lead, etc.) | person | amber |
| `system` | The IDP system | browser | indigo |
| `externalSystem` | SaaS/Cloud providers (GitHub, OCI, Azure) | rectangle | slate |
| `capability` | Stars (blueprint groups) | bucket | sky |
| `blueprint` | Data entities in the Portal | document | green |
| `integration` | Connectors in the Integration Layer | storage | gray |

## Current Relationship Kinds

| Kind | Syntax | Color/Style | Purpose |
|------|--------|-------------|---------|
| `syncs` | `-[syncs]->` | blue | Data synchronization |
| `dataSource` | `-[dataSource]->` | blue, dashed | Data source declaration |
| `produces` | `-[produces]->` | green | Generates/creates |
| `owns` | `-[owns]->` | amber | Ownership |
| `governs` | `-[governs]->` | red | Governance/controls |
| `dependsOn` | `-[dependsOn]->` | slate | Dependencies |
| `includes` | `-[includes]->` | sky | Containment |
| `triggers` | `-[triggers]->` | amber | Initiates action |
| `deploys` | `-[deploys]->` | green | Deployment |
| `authenticates` | `-[authenticates]->` | violet | Authentication |

## Current Tags

### Element Tags
| Tag | Purpose |
|-----|---------|
| `#core` | Core platform element |
| `#oci` | Oracle Cloud Infrastructure related |
| `#azure` | Microsoft Azure related |
| `#github` | GitHub related |
| `#security` | Security related |
| `#metrics` | Metrics related |
| `#selfservice` | Self-service capability |

### Relationship Tags
| Tag | Purpose |
|-----|---------|
| `#sync` | Data synchronization relation |
| `#ownership` | Ownership relation |
| `#dataFlow` | Data flow relation |
| `#governance` | Governance/compliance relation |

## Adding a New Element Kind

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

### When to Add a New Element Kind

- When existing kinds don't fit a new concept
- When you need different visual styling for a category
- When the element behaves fundamentally differently

### When NOT to Add a New Element Kind

- If a tag on an existing kind suffices (e.g., use `blueprint` + `#github` instead of creating `githubBlueprint`)
- If it's just a visual preference (use `style` blocks in views instead)

## Adding a New Relationship Kind

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

### Relationship Style Options

| Property | Values |
|----------|--------|
| `color` | amber, blue, green, indigo, muted, red, secondary, sky, slate, violet |
| `line` | solid, dashed, dotted |
| `head` | normal, diamond, crow, open, none |
| `tail` | normal, diamond, crow, open, none |

### When to Add a New Relationship Kind

- When existing kinds don't capture the semantic meaning
- When you need to visualize a new type of connection
- When filtering by relationship type is important

## Adding a New Tag

```c4
specification {
  tag myNewTag
}
```

Tags are used for:
1. **Filtering views**: Show/hide elements based on tags
2. **Visual styling**: Apply styles per tag in views
3. **Categorization**: Group elements by concern

### When to Add a New Tag

- When you need to categorize elements beyond what kinds provide
- When you need to filter views by a specific concern
- When multiple elements share a cross-cutting attribute

## Complete Specification Example

```c4
specification {
  // ================================================================
  // Element Kinds
  // ================================================================
  element actor {
    style {
      shape person
      color amber
    }
  }

  element system {
    style {
      shape browser
      color indigo
    }
  }

  element capability {
    style {
      shape bucket
      color sky
    }
  }

  element blueprint {
    style {
      shape document
      color green
    }
  }

  element integration {
    style {
      shape storage
      color gray
      border dashed
    }
  }

  element externalSystem {
    style {
      shape rectangle
      color slate
    }
  }

  // ================================================================
  // Relationship Kinds
  // ================================================================
  relationship syncs {
    color blue
    line solid
  }

  relationship dataSource {
    color blue
    line dashed
  }

  relationship produces {
    color green
    line solid
  }

  relationship owns {
    color amber
    line solid
  }

  relationship governs {
    color red
    line solid
  }

  relationship dependsOn {
    color slate
    line solid
  }

  relationship includes {
    color sky
    line solid
  }

  relationship triggers {
    color amber
    line dashed
  }

  relationship deploys {
    color green
    line solid
  }

  relationship authenticates {
    color violet
    line solid
  }

  // ================================================================
  // Tags
  // ================================================================
  tag core
  tag oci
  tag azure
  tag github
  tag security
  tag metrics
  tag selfservice
  tag sync
  tag ownership
  tag dataFlow
  tag governance
}
```

## Impact Analysis

Before modifying the specification, understand the impact:

| Change | Impact | Risk |
|--------|--------|------|
| Add element kind | Low — no existing elements affected | Low |
| Rename element kind | HIGH — all elements of that kind break | High |
| Remove element kind | HIGH — all elements of that kind break | High |
| Add relationship kind | Low — no existing relations affected | Low |
| Rename relationship kind | HIGH — all relations of that kind break | High |
| Add tag | Low — no impact | None |
| Remove tag | Medium — elements using that tag get warning | Medium |

## Validation Rules

1. Element kind names must be unique
2. Relationship kind names must be unique
3. Tag names must be unique
4. Style properties must use valid values
5. All kinds/tags referenced in model files must be defined here

## Checklist for Specification Changes

- [ ] Read current `specification.c4` first
- [ ] Verify the change is necessary (can't be solved with existing kinds/tags)
- [ ] Name follows conventions (lowercase camelCase)
- [ ] Style is consistent with similar elements
- [ ] `npm run validate` passes
- [ ] `npm test` passes
- [ ] No existing elements broken by the change
