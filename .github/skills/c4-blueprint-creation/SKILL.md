---
name: c4-blueprint-creation
description: Guide for creating and editing LikeC4 blueprints (data entities) inside capability stars. Use when asked to add, modify, or delete a blueprint in the Engineering Platform Data Model.
---

# C4 Blueprint Creation

## Critical Requirements

- ALWAYS read the target star's blueprint file before creating or editing blueprints
- ALWAYS validate with `npm run validate` after changes

## Overview

Blueprints are the data entities of the Internal Developer Portal. Each blueprint belongs to exactly one Capability Star and represents a concept that the portal manages (e.g., a repository, a CI pipeline, a security scorecard).

## Blueprint File Location

Blueprints are defined in `likec4/blueprints/<star-name>.c4` and use `extend` to add children to their parent capability star.

| Star | File | Existing Blueprints |
|------|------|--------------------|
| Service Catalog | `blueprints/catalog.c4` | technologyAsset, domain, system, api |
| Organization | `blueprints/organization.c4` | _team, _user, group, githubUser, githubOrganization |
| Version Control | `blueprints/vcs.c4` | repository, branch, pullRequest |
| CI/CD Platform | `blueprints/cicd.c4` | ciPipeline, pipelineRun, deployment, environment |
| Resource Catalog | `blueprints/resource.c4` | resource, ociResource, azureResource |
| Artifact Management | `blueprints/artifacts.c4` | artifact, containerImage |
| Security | `blueprints/security.c4` | securityScorecard, securityAlert, secretVault, identity |
| Software Quality | `blueprints/quality.c4` | codeQuality, testCoverage, technicalDebt, report |
| Engineering Metrics | `blueprints/metrics.c4` | engineeringMetrics, copilotMetrics |
| Feature Management | `blueprints/features.c4` | featureFlag, flagStrategy |
| Software Templates | `blueprints/templates.c4` | template, scaffoldedEntity |
| GRC | `blueprints/grc.c4` | tier, dataClassification, lifecycleState, policy, policyException, complianceRequirement, complianceEvidence, auditRecord |
| Database Management | `blueprints/database.c4` | databaseSchema, migration |

## Blueprint Structure

Blueprint files contain **only element definitions** — no relations. All relations (dataSource, internal, cross-star) go in `likec4/relations.c4`.

### Basic Blueprint

```c4
extend idp.starVCS {

  myNewBlueprint = blueprint 'Display Name' {
    description 'Clear description of what this blueprint represents in the portal'
    icon tech:relevant-icon
    technology 'Data source technology'
    style {
      color green
    }
  }

}
```

## Required Properties

Every blueprint MUST have:

| Property | Required | Description |
|----------|----------|-------------|
| `description` | Yes | Clear explanation of what this entity represents |
| `icon` | Yes | Icon from `tech:`, `azure:`, or `bootstrap:` namespaces |
| `technology` | Optional | Technology or data source type |
| `style` | Optional | Visual style (default: green for blueprints) |

## Naming Conventions

- **Element ID**: `camelCase` — e.g., `technologyAsset`, `ciPipeline`, `securityScorecard`
- **Display Name**: Title Case with spaces — e.g., `'Technology Asset'`, `'CI Pipeline'`
- **Description**: Full sentence starting with uppercase — e.g., `'Represents a deployable software component'`

## After Creating a Blueprint

After creating a new blueprint, you MUST also add relations in `likec4/relations.c4`:

### 1. Add dataSource relation

Every `dataSource` relation **MUST have a label** — relations without labels appear blank in the LikeC4 UI.

```c4
// In relations.c4 — BLUEPRINTS -> INTEGRATIONS section
idp.starVCS.myNewBlueprint -[dataSource]-> idp.integrationLayer.intGitHub 'synced from GitHub' { #dataFlow #sync }
```

### 2. Add syncs relation from integration

```c4
// In relations.c4 — INTEGRATIONS -> BLUEPRINTS section
idp.integrationLayer.intGitHub -[syncs]-> idp.starVCS.myNewBlueprint 'syncs blueprint data' { #sync #dataFlow }
```

### 3. Add internal star relations if needed

```c4
// In relations.c4 — INTERNAL STAR RELATIONS section
idp.starVCS.myNewBlueprint -[dependsOn]-> idp.starVCS.repository 'belongs to repo'
```

### 4. Add cross-star relations if needed

```c4
// In relations.c4 — CROSS-STAR RELATIONS section
idp.starVCS.myNewBlueprint -[dependsOn]-> idp.starCatalog.technologyAsset 'linked to asset'
```

### 5. Add to C3 component view (in views/c3/<star>.c4)

If the star already has a C3 view file in `views/c3/`, the blueprint may be auto-included. Otherwise, explicitly include it in the star's dedicated C3 file.

## Complete Example: Adding a Blueprint

**Scenario**: Add `gitTag` blueprint to the Version Control star.

### Step 1: Edit `blueprints/vcs.c4` (element only)

```c4
extend idp.starVCS {

  gitTag = blueprint 'Git Tag' {
    description 'Represents a tagged version or release point in a Git repository'
    icon tech:git
    technology 'Git'
  }

}
```

### Step 2: Edit `relations.c4` (all relations)

```c4
// BLUEPRINTS -> INTEGRATIONS section
idp.starVCS.gitTag -[dataSource]-> idp.integrationLayer.intGitHub 'synced from GitHub' { #dataFlow #sync }

// INTEGRATIONS -> BLUEPRINTS section
idp.integrationLayer.intGitHub -[syncs]-> idp.starVCS.gitTag 'syncs tag data' { #sync #dataFlow }

// INTERNAL STAR RELATIONS section
idp.starVCS.gitTag -[dependsOn]-> idp.starVCS.repository 'belongs to repository'
```

### Step 3: Validate

```bash
npm run validate
npm test
```

## Icon Reference

| Category | Icons |
|----------|-------|
| VCS | `tech:git`, `tech:github` |
| CI/CD | `tech:githubactions`, `tech:docker` |
| Cloud | `azure:all`, specific azure icons |
| Security | `bootstrap:shield-check`, `bootstrap:shield-lock` |
| Database | `tech:postgresql`, `tech:oracle` |
| Metrics | `bootstrap:graph-up`, `bootstrap:speedometer2` |
| General | `bootstrap:file-earmark-code`, `bootstrap:diagram-3` |

## Validation Rules

1. Blueprint ID must be unique across the entire model
2. Blueprint must be inside an `extend idp.star*` block
3. Must have a `description` property
4. Must have a `dataSource` relation in `relations.c4`
5. The integration must have a corresponding `syncs` back to the blueprint in `relations.c4`
6. **No relations in blueprint files** — all relations go in `relations.c4`
7. All relations must use full paths (e.g., `idp.starVCS.repository`)
8. All relations must have a label

## Workflow

1. **Read** the target blueprint file (`likec4/blueprints/<star>.c4`)
2. **Read** `likec4/relations.c4`
3. **Create** the blueprint in the extend block (element definition only)
4. **Add** all relations in `relations.c4` (dataSource, syncs, internal, cross-star)
5. **Validate** with `npm run validate`
