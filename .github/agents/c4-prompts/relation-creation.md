# C4 Relation Creation Guide

## Critical Requirements

🚨 **ALWAYS read `likec4/relations.c4` and the relevant blueprint file before creating relations**
🚨 **Cross-star relations go in `relations.c4`, internal relations go in the blueprint file**
🚨 **ALWAYS validate with `npm run validate` after changes**

## Overview

Relations define how elements in the C4 model connect to each other. The model uses **kinded relationships** with specific semantics, direction, and tags.

## Relation Kinds

| Kind | Syntax | Purpose | Common Usage |
|------|--------|---------|-------------|
| `syncs` | `-[syncs]->` | Data synchronization | Integration ↔ Blueprint, Integration ↔ External System |
| `dataSource` | `-[dataSource]->` | Declares where data comes from | Blueprint → Integration |
| `produces` | `-[produces]->` | Generates/creates | Blueprint → Blueprint |
| `owns` | `-[owns]->` | Ownership relationship | Team → Asset |
| `governs` | `-[governs]->` | Governance/control | GRC blueprint → Governed entity |
| `dependsOn` | `-[dependsOn]->` | Dependency | Blueprint → Blueprint |
| `includes` | `-[includes]->` | Containment | System → Component |
| `triggers` | `-[triggers]->` | Initiates an action | Event → Pipeline |
| `deploys` | `-[deploys]->` | Deployment | Pipeline → Environment |
| `authenticates` | `-[authenticates]->` | Authentication | Identity → User |

## Where Relations Go

### In blueprint files (`blueprints/*.c4`)

- Relations between blueprints **within the same star**
- `dataSource` relations from blueprint to integration

```c4
// In blueprints/vcs.c4
extend idp.starVCS {
  // ... blueprint definitions ...

  // Internal relations (same star)
  pullRequest -[dependsOn]-> repository 'belongs to repository'
  branch -[dependsOn]-> repository 'belongs to repository'

  // DataSource relations
  repository -[dataSource]-> idp.integrationLayer.intGitHub 'synced from GitHub' { #sync }
}
```

### In `relations.c4`

- **Actor → Capability** relations (with `navigateTo`)
- **Integration ↔ External System** syncs
- **Integration → Blueprint** syncs
- **Cross-star** blueprint relations
- **Capability → Capability** dependencies

```c4
// relations.c4

// Actor → Capability
idp.starVCS -> developer 'provides source code management' {
  navigateTo developerDailyWork
}

// Integration ↔ External System
idp.integrationLayer.intGitHub -[syncs]-> github 'syncs from GitHub API' { #sync }

// Integration → Blueprint
idp.integrationLayer.intGitHub -[syncs]-> idp.starVCS.repository 'syncs repos' { #sync }

// Cross-star
idp.starCICD.deployment -[deploys]-> idp.starResource.resource 'deploys to resource' { #dataFlow }
```

## Relation Structure

### Basic Relation

```c4
source -[relationKind]-> target 'label text'
```

### Relation with Tags

```c4
source -[syncs]-> target 'syncs data' {
  #sync
}
```

### Relation with navigateTo (for actor→capability)

```c4
idp.starCatalog -> developer 'provides service catalog' {
  navigateTo developerSelfService
}
```

## Tags

| Tag | Purpose | Used On |
|-----|---------|---------|
| `#sync` | Data synchronization | syncs, dataSource relations |
| `#ownership` | Ownership semantics | owns relations |
| `#dataFlow` | Data movement | cross-star data relations |
| `#governance` | Governance/control | governs relations |

## Full Path Requirements

🚨 **All elements in `relations.c4` MUST use full paths**:

```c4
// ✅ Correct: Full paths
idp.starVCS.repository -[dependsOn]-> idp.starCatalog.technologyAsset 'linked to asset'

// ❌ Wrong: Relative paths (only works inside same extend block)
repository -[dependsOn]-> technologyAsset 'linked to asset'
```

Inside a blueprint `extend` block, relative paths work for elements in the **same star**:

```c4
extend idp.starVCS {
  // ✅ Correct: Relative within same star
  pullRequest -[dependsOn]-> repository 'belongs to repo'
  
  // ✅ Correct: Full path for cross-star
  repository -[dependsOn]-> idp.starCatalog.technologyAsset 'linked to asset'
}
```

## Bidirectional DataSource Pattern

Every blueprint MUST have a bidirectional data source connection:

```
Blueprint ---[dataSource]---> Integration ---[syncs]---> External System
                    ↑                           |
                    |   <---[syncs]---          |
                    +---------------------------+
```

### In the blueprint file:

```c4
repository -[dataSource]-> idp.integrationLayer.intGitHub 'synced from GitHub' { #sync }
```

### In relations.c4:

```c4
idp.integrationLayer.intGitHub -[syncs]-> idp.starVCS.repository 'syncs repo data' { #sync }
```

## Common Relation Patterns

### Star-to-Actor (Capability provides value)

```c4
idp.starCatalog -> developer 'provides service discovery' {
  navigateTo developerSelfService
}
```

### Blueprint-to-Blueprint (Same Star)

```c4
// In blueprints/cicd.c4
pipelineRun -[dependsOn]-> ciPipeline 'executed by pipeline'
deployment -[triggers]-> pipelineRun 'triggers pipeline run'
```

### Blueprint-to-Blueprint (Cross-Star)

```c4
// In relations.c4
idp.starCICD.deployment -[deploys]-> idp.starResource.resource 'deploys to' { #dataFlow }
idp.starVCS.pullRequest -[triggers]-> idp.starCICD.ciPipeline 'triggers CI' { #dataFlow }
```

### Governance Relations

```c4
// In relations.c4
idp.starGRC.policy -[governs]-> idp.starCatalog.technologyAsset 'governs asset' { #governance }
idp.starGRC.tier -[governs]-> idp.starCatalog.technologyAsset 'classifies criticality' { #governance }
```

### Ownership Relations

```c4
// In relations.c4
idp.starOrganization._team -[owns]-> idp.starCatalog.technologyAsset 'owns asset' { #ownership }
idp.starOrganization.group -[owns]-> idp.starCatalog.domain 'owns domain' { #ownership }
```

## Validation Rules

1. Relation source and target must exist in the model
2. Relation kind must be defined in `specification.c4`
3. Cross-star relations must use full paths
4. Every blueprint must have at least one `dataSource` relation
5. Every `dataSource` must have a corresponding `syncs` from the integration
6. `navigateTo` must reference an existing dynamic view ID
7. Tags must be defined in `specification.c4`

## Checklist for New Relations

- [ ] Correct relation kind chosen (syncs, dataSource, dependsOn, etc.)
- [ ] Placed in correct file (blueprint file vs relations.c4)
- [ ] Full paths used for cross-star references
- [ ] Tags added where appropriate
- [ ] `navigateTo` added for actor→capability relations
- [ ] Bidirectional dataSource pattern followed
- [ ] `npm run validate` passes
