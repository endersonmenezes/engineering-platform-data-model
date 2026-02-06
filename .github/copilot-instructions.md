# GitHub Copilot Instructions — Engineering Platform Data Model

## Project Overview

This repository contains a **Star Schema Data Model for Internal Developer Portals (IDP)** built with [LikeC4](https://likec4.dev/) following the [C4 Model](https://c4model.com/) methodology.

The model is organized into **13 Capability Stars** (clusters of related blueprints), where each star represents a platform capability domain. The **Technology Asset** (`technologyAsset`) serves as the central hub connecting all stars.

The model draws from two key references: [Backstage](https://backstage.io/) for the core entity architecture (Component, API, System, Domain, Resource, Group, User, Template) and [Port.io's Blueprint model](https://docs.port.io/build-your-software-catalog/customize-integrations/configure-data-model/setup-blueprint/) for the concept of *Blueprints* as configurable data entities. The data model is **tool-agnostic** — it can be implemented in Backstage, Port.io, Cortex, OpsLevel, or any IDP with a configurable data model. When generating code or documentation, never assume a specific portal tool.

## Technology Stack

- **Language**: LikeC4 DSL (`.c4` files)
- **Build Tool**: LikeC4 CLI v1.48+
- **Test Framework**: Vitest
- **Runtime**: Node.js 22+
- **Configuration**: `likec4.config.mjs`

> **Official Documentation**: For any doubts about LikeC4 DSL syntax, element kinds, views, or features, consult the official tutorial and docs starting at: https://likec4.dev/tutorial/

## Repository Structure

```
likec4/
├── specification.c4              # Element kinds, relationship kinds, tags
├── model.c4                      # Personas, External Systems, IDP + 13 Stars
├── relations.c4                  # Cross-star + Integration → Blueprint relations
├── blueprints/                   # 40+ Blueprints organized by Star
│   ├── catalog.c4                # technologyAsset, domain, system, api
│   ├── organization.c4           # _team, _user, group, githubUser, githubOrganization
│   ├── resource.c4               # resource, ociResource, azureResource
│   ├── templates.c4              # template, scaffoldedEntity
│   ├── vcs.c4                    # repository, pullRequest, branch
│   ├── cicd.c4                   # ciPipeline, pipelineRun, deployment, environment
│   ├── artifacts.c4              # artifact, containerImage
│   ├── security.c4               # securityScorecard, securityAlert, secretVault, identity
│   ├── quality.c4                # codeQuality, testCoverage
│   ├── features.c4               # featureFlag, flagStrategy
│   ├── database.c4               # databaseSchema, migration
│   ├── metrics.c4                # engineeringMetrics, copilotMetrics
│   └── grc.c4                    # tier, dataClassification, lifecycleState, policy, etc.
└── views/
    ├── landscape.c4              # C1 - System Context
    ├── containers.c4             # C2 - Container (Stars)
    ├── components.c4             # C3 - Component (Blueprints inside Stars)
    └── journeys.c4               # Dynamic Views (persona workflows)
```

## Architecture Concepts

### C4 Model Levels

| Level | File | Shows | Audience |
|-------|------|-------|----------|
| **C1** | `landscape.c4` | IDP as black box + personas + external systems | Everyone |
| **C2** | `containers.c4` | 13 Capability Stars (NOT individual blueprints) | Architects |
| **C3** | `components.c4` | Blueprints inside each Star | Developers |
| **Dynamic** | `journeys.c4` | Persona workflow sequences | Everyone |

### The 13 Capability Stars

| Star | Variable | Blueprints |
|------|----------|------------|
| Service Catalog | `starCatalog` | technologyAsset, domain, system, api |
| Organization | `starOrganization` | _team, _user, group, githubUser, githubOrganization |
| Version Control | `starVCS` | repository, branch, pullRequest |
| CI/CD Platform | `starCICD` | ciPipeline, pipelineRun, deployment, environment |
| Resource Catalog | `starResource` | resource, ociResource, azureResource |
| Artifact Management | `starArtifacts` | artifact, containerImage |
| Security | `starSecurity` | securityScorecard, securityAlert, secretVault, identity |
| Code Quality | `starQuality` | codeQuality, testCoverage |
| Engineering Metrics | `starMetrics` | engineeringMetrics, copilotMetrics |
| Feature Management | `starFeatures` | featureFlag, flagStrategy |
| Software Templates | `starTemplates` | template, scaffoldedEntity |
| GRC | `starGRC` | tier, dataClassification, lifecycleState, policy, policyException, complianceRequirement, complianceEvidence, auditRecord |
| Database Management | `starDatabase` | databaseSchema, migration |

### 6 Personas (Actors)

Based on [Port.io End User Personas](https://docs.getport.io/) and IDP best practices:

| Persona | Variable | Primary Capabilities | Port.io Alignment |
|---------|----------|---------------------|--------------------|
| Application Developer | `developer` | starTemplates, starCatalog, starVCS | Delivery View, Service Catalog, My Day |
| Platform Engineer | `platformEngineer` | starTemplates, integrationLayer, starResource | Blueprints, Integrations, Governance |
| Engineering Manager | `engineeringManager` | starMetrics, starQuality, starOrganization, starGRC | DORA Metrics, Scorecards, Team Delivery |
| Site Reliability Engineer | `sre` | starCICD, starResource, starMetrics, starSecurity | SLOs, Incidents, Operations, Infrastructure |
| Security Engineer | `securityEngineer` | starSecurity, starGRC | Vulnerabilities, Compliance, Secrets, Audit |
| Technology Executive | `executive` | starMetrics, starGRC, starOrganization, starResource | Executive Dashboard, Costs, Strategic Initiatives |

### Element Kinds (from specification.c4)

| Kind | Usage | Default Style |
|------|-------|---------------|
| `actor` | Personas | person shape, amber |
| `system` | IDP system | browser shape, indigo |
| `externalSystem` | SaaS/Cloud providers | rectangle, slate |
| `capability` | Stars (blueprint groups) | bucket, sky |
| `blueprint` | Data entities in Portal | document, green |
| `integration` | Connectors for external systems | storage, gray dotted |

### Relationship Kinds (from specification.c4)

| Kind | Syntax | Purpose |
|------|--------|---------|
| `syncs` | `-[syncs]->` | Data sync (integration ↔ blueprint) |
| `dataSource` | `-[dataSource]->` | Blueprint declares its data source |
| `produces` | `-[produces]->` | Produces/generates |
| `owns` | `-[owns]->` | Ownership |
| `governs` | `-[governs]->` | Governance/controls |
| `dependsOn` | `-[dependsOn]->` | Dependencies |
| `includes` | `-[includes]->` | Contains |
| `triggers` | `-[triggers]->` | Triggers/initiates |
| `deploys` | `-[deploys]->` | Deploys to |
| `authenticates` | `-[authenticates]->` | Authentication |

### Tags

Element tags: `#core`, `#oci`, `#azure`, `#github`, `#security`, `#metrics`, `#selfservice`
Relationship tags: `#sync`, `#ownership`, `#dataFlow`, `#governance`

## Naming Conventions

- **Element IDs**: `camelCase` (e.g., `technologyAsset`, `ciPipeline`)
- **Star IDs**: `starCamelCase` (e.g., `starCatalog`, `starVCS`)
- **Integration IDs**: `intCamelCase` (e.g., `intGitHub`, `intOCI`)
- **View IDs**: descriptive `camelCase` (e.g., `developerOnboarding`)
- **File names**: `kebab-case.c4`

## Critical Architecture Rules

1. **Blueprints extend their Star**: Blueprint files use `extend` to add children to capabilities defined in `model.c4`.
2. **Relations go in the right file**:
   - Internal blueprint relations → in the blueprint file itself
   - Cross-star relations (actor→capability, integration→external, integration→blueprint) → in `relations.c4`
3. **Bidirectional dataSource**: Every blueprint MUST have a `dataSource` relation to its integration AND the integration must `syncs` to it.
4. **Views respect C4 levels**: C2 shows Stars (NOT blueprints), C3 shows blueprints inside ONE star.
5. **navigateTo for journeys**: Actor→capability relations in `relations.c4` use `navigateTo` to link to dynamic views.
6. **All elements need descriptions**: Every element must have `description`.
7. **Namespacing**: Always use full paths like `idp.starVCS.repository` in relations.

## Common Tasks & Where to Edit

| Task | File(s) to Edit |
|------|----------------|
| Add a new persona | `model.c4` (actor) + `relations.c4` (relations) + `journeys.c4` (views) |
| Add a new capability star | `model.c4` (capability) + new `blueprints/xyz.c4` + `relations.c4` + `containers.c4` + `components.c4` |
| Add a blueprint to existing star | `blueprints/<star>.c4` (extend) + `relations.c4` (dataSource + syncs) |
| Add a new integration | `model.c4` (inside integrationLayer) + `relations.c4` (syncs to external + blueprints) |
| Add a new external system | `model.c4` (externalSystem) + `relations.c4` (integration syncs) |
| Add a dynamic journey | `journeys.c4` (dynamic view) + `relations.c4` (navigateTo on actor relation) |
| Add a C3 component view | `components.c4` |
| Add element kind or tag | `specification.c4` |

## Validation & Testing

```bash
# Validate model syntax
npm run validate

# Run tests (vitest)
npm test

# Start dev server with hot-reload
npm run dev

# Build static site
npm run build
```

## Code Style for .c4 Files

- 2-space indentation
- Comments in English
- Section headers with `// ===` blocks
- Group related elements together
- Always include `description` on elements
- Use icons from `tech:`, `azure:`, or `bootstrap:` namespaces
- Follow Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`

## Integration Layer Pattern

The Integration Layer is an ACL (Anti-Corruption Layer) that abstracts external providers:

```
Blueprint ←→ Integration ←→ External System
```

Each integration has:
1. **syncs relation to external system** (in relations.c4)
2. **syncs relation to blueprints it feeds** (in relations.c4)
3. **dataSource relation from blueprint back to integration** (in blueprint file)

## LikeC4 DSL Quick Reference

For complete syntax and advanced features, see the [official LikeC4 tutorial](https://likec4.dev/tutorial/).

```c4
// Element definition
myElement = blueprint 'Display Name' {
  description 'What this element does'
  icon tech:github
  technology 'REST API'
  style { color amber }
}

// Extend a parent to add children
extend idp.starVCS {
  myBlueprint = blueprint 'My Blueprint' { ... }
}

// Kinded relationship
source -[syncs]-> target 'label' { #tag }

// View with include/style
view myView of someElement {
  title 'My View Title'
  description 'What this shows'
  include element1, element2
  style element1 { color amber }
}

// Dynamic view with sequence
dynamic view myJourney {
  title 'My Journey'
  actor -> system 'does something' { notes 'Details...' }
  parallel { ... }
}
```
