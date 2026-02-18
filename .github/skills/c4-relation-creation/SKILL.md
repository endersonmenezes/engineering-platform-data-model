---
name: c4-relation-creation
description: Guide for creating and editing LikeC4 relations (connections between elements). Use when asked to add, modify, or delete relationships between blueprints, stars, actors, or integrations in the Engineering Platform Data Model.
---

# C4 Relation Creation

## Critical Requirements

- ALWAYS read `likec4/relations.c4` before creating relations
- **ALL relations go in `relations.c4`** — blueprint files contain only element definitions
- **ALWAYS include a label (name) on every relation** — unnamed relations appear blank in the UI
- ALWAYS validate with `npm run validate` after changes

## Relation Kinds

| Kind | Syntax | Purpose |
|------|--------|---------|
| `syncs` | `-[syncs]->` | Data synchronization |
| `dataSource` | `-[dataSource]->` | Declares where data comes from |
| `produces` | `-[produces]->` | Generates/creates |
| `owns` | `-[owns]->` | Ownership relationship |
| `governs` | `-[governs]->` | Governance/control |
| `dependsOn` | `-[dependsOn]->` | Dependency |
| `includes` | `-[includes]->` | Containment |
| `triggers` | `-[triggers]->` | Initiates an action |
| `deploys` | `-[deploys]->` | Deployment |
| `authenticates` | `-[authenticates]->` | Authentication |

## Where Relations Go

**ALL relations go in `likec4/relations.c4`**. Blueprint files (`blueprints/*.c4`) contain only element definitions.

The relations.c4 file is organized into these sections:

| Section | Content |
|---------|--------|
| ACTOR -> IDP CAPABILITIES | Actor-to-star relations (with `navigateTo`) |
| INTEGRATION LAYER -> EXTERNAL SYSTEMS | Integration-to-external syncs |
| INTEGRATIONS -> BLUEPRINTS | `syncs` from integration to blueprint |
| BLUEPRINTS -> INTEGRATIONS | `dataSource` from blueprint to integration |
| INTERNAL STAR RELATIONS | Relations between blueprints within same star |
| CROSS-STAR RELATIONS | Relations between blueprints across different stars |

## Full Path Requirements

All elements in `relations.c4` MUST use full paths:

```c4
// Correct
idp.starVCS.repository -[dependsOn]-> idp.starCatalog.technologyAsset 'linked to asset'

// Wrong
repository -[dependsOn]-> technologyAsset 'linked to asset'
```

## Tags

| Tag | Purpose |
|-----|---------|
| `#sync` | Data synchronization |
| `#ownership` | Ownership semantics |
| `#dataFlow` | Data movement |
| `#governance` | Governance/control |

## Bidirectional DataSource Pattern

Every blueprint MUST have a bidirectional data source connection:

```
Blueprint ---[dataSource]---> Integration ---[syncs]---> External System
```

**Both directions MUST have labels. Both go in `relations.c4`:**

```c4
// BLUEPRINTS -> INTEGRATIONS section
idp.starVCS.repository -[dataSource]-> idp.integrationLayer.intGitHub 'synced from GitHub' { #dataFlow #sync }

// INTEGRATIONS -> BLUEPRINTS section
idp.integrationLayer.intGitHub -[syncs]-> idp.starVCS.repository 'syncs repo data' { #sync #dataFlow }
```

## Common Patterns

### Star-to-Actor
```c4
idp.starCatalog -> developer 'provides service discovery' {
  navigateTo developerSelfService
}
```

### Blueprint-to-Blueprint (Cross-Star)
```c4
idp.starCICD.deployment -[deploys]-> idp.starResource.resource 'deploys to' { #dataFlow }
```

### Governance Relations
```c4
idp.starGRC.policy -[governs]-> idp.starCatalog.technologyAsset 'governs asset' { #governance }
```

### Ownership Relations
```c4
idp.starOrganization._team -[owns]-> idp.starCatalog.technologyAsset 'owns asset' { #ownership }
```

## Workflow

1. **Read** `likec4/relations.c4`
2. **Read** relevant blueprint file(s)
3. **Determine** correct file for the relation
4. **Add** relation with correct kind, path, and tags
5. **Validate** with `npm run validate`
