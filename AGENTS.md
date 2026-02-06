# AGENTS.md — Engineering Platform Data Model

## Project Overview

This repository contains a **Star Schema Data Model for Internal Developer Portals (IDP)** built with [LikeC4](https://likec4.dev/) following the [C4 Model](https://c4model.com/) methodology. All model files use the LikeC4 DSL (`.c4` extension).

## Key Architecture Concepts

- **13 Capability Stars**: Top-level groupings (Service Catalog, Organization, VCS, CI/CD, Resources, Artifacts, Security, Quality, Metrics, Features, Templates, GRC, Database)
- **Blueprints**: Data entities inside each star (e.g., `repository`, `ciPipeline`, `securityScorecard`)
- **Integration Layer**: ACL pattern connecting blueprints to external systems
- **4 Personas**: Developer, Platform Engineer, Tech Lead, Security Engineer
- **C4 Levels**: C1 (System Context), C2 (Containers/Stars), C3 (Components/Blueprints), Dynamic (Journeys)

## File Organization

| File/Directory | Purpose |
|----------------|---------|
| `likec4/specification.c4` | Element kinds, relationship kinds, tags — the model vocabulary |
| `likec4/model.c4` | Actors, external systems, IDP system with 13 stars + integration layer |
| `likec4/relations.c4` | Cross-star relations, actor↔capability, integration↔external |
| `likec4/blueprints/*.c4` | Blueprint definitions inside stars (one file per star) |
| `likec4/views/*.c4` | Views at each C4 level (landscape, containers, components, journeys) |
| `test/model.spec.ts` | Model validation tests (vitest) |

## Model Views

Views are organized by C4 level:

| Level | View ID | File | Shows |
|-------|---------|------|-------|
| **C1** | `index` | `views/landscape.c4` | IDP + actors + external systems |
| **C2** | `capabilities` | `views/containers.c4` | 13 Capability Stars |
| **C3** | `starCatalog`, `starVCS`, etc. | `views/components.c4` | Blueprints inside each star |
| **Dynamic** | `developerOnboarding`, etc. | `views/journeys.c4` | Persona workflow sequences |

### C3 Component Views

| View ID | Star | Blueprints |
|---------|------|------------|
| `starCatalog` | Service Catalog | technologyAsset, domain, system, api |
| `starOrganization` | Organization | _team, _user, group, githubUser, githubOrganization |
| `starVCS` | Version Control | repository, branch, pullRequest |
| `starCICD` | CI/CD Platform | ciPipeline, pipelineRun, deployment |
| `starSecurity` | Security | securityScorecard, securityAlert, secretVault |
| `starMetrics` | Engineering Metrics | engineeringMetrics, copilotMetrics |
| `starResource` | Resource Catalog | resource, ociResource, azureResource |
| `starTemplates` | Software Templates | template, scaffoldedEntity |
| `starQuality` | Code Quality | codeQuality, testCoverage |
| `starArtifacts` | Artifact Management | artifact, containerImage |
| `starGRC` | GRC | tier, policy, complianceRequirement |
| `starFeatures` | Feature Management | featureFlag, flagStrategy |
| `starDatabase` | Database Management | databaseSchema, migration |

### Dynamic Journey Views

| View ID | Persona | Description |
|---------|---------|-------------|
| `developerOnboarding` | Developer | SSO + GitHub mapping |
| `developerSelfService` | Developer | Creating service via Software Template |
| `developerDailyWork` | Developer | Code → PR → deploy |
| `platformEngineerTemplates` | Platform Engineer | Managing Software Templates |
| `platformEngineerMultiCloud` | Platform Engineer | Provisioning OCI + Azure resources |
| `platformEngineerIntegrations` | Platform Engineer | Managing integration connectors |
| `techLeadScorecard` | Tech Lead | Production Readiness evaluation |
| `techLeadMetrics` | Tech Lead | DORA Metrics and Copilot tracking |
| `securityEngineerPosture` | Security Engineer | Security posture overview |
| `securityEngineerIncident` | Security Engineer | Critical alert response (MTTR) |

## Resource Catalog Types

| Resource Type | Examples | Blueprint |
|---------------|----------|-----------|
| **Compute** | VMs, EC2, Azure VMs | `resource` (type: compute) |
| **Serverless** | Lambda, Azure Functions | `resource` (type: function) |
| **Storage** | S3, Blob Storage | `resource` (type: storage) |
| **Database** | RDS, Azure SQL | `resource` (type: database) |
| **Queue/Messaging** | SQS, Service Bus, Kafka | `resource` (type: queue) |
| **Cache** | ElastiCache, Redis | `resource` (type: cache) |
| **CDN** | CloudFront, Azure CDN | `resource` (type: cdn) |
| **Cluster** | EKS, AKS, GKE | `resource` (type: cluster) |
| **Network** | VPC, VNet, Load Balancers | `resource` (type: network) |

## Critical Rules

1. **Blueprints extend their Star**: Use `extend idp.starXxx { ... }` in blueprint files
2. **Cross-star relations go in `relations.c4`**, internal relations in blueprint files
3. **Bidirectional dataSource**: Blueprint→Integration `dataSource` + Integration→Blueprint `syncs`
4. **Full paths in relations.c4**: Use `idp.starVCS.repository`, never just `repository`
5. **All elements need descriptions**: Every element must have a `description` property
6. **Views respect C4 levels**: C2 = Stars, C3 = Blueprints inside ONE star

## Naming Conventions

- Element IDs: `camelCase` (e.g., `technologyAsset`)
- Star IDs: `starCamelCase` (e.g., `starCatalog`)
- Integration IDs: `intCamelCase` (e.g., `intGitHub`)
- View IDs: `personaAction` for journeys (e.g., `developerOnboarding`)

## Validation Commands

```bash
npm run validate   # Syntax check (dry-run build)
npm test           # Run vitest model tests
npm run dev        # Dev server with hot-reload
npm run build      # Build static site
npm run export     # Export diagrams as images
```

## Common Tasks

| Task | Files to Change |
|------|----------------|
| Add a blueprint | `blueprints/<star>.c4` + `relations.c4` |
| Add a capability star | `model.c4` + new `blueprints/<name>.c4` + `relations.c4` + `views/containers.c4` + `views/components.c4` |
| Add a persona | `model.c4` + `relations.c4` + `views/journeys.c4` |
| Add integration | `model.c4` + `relations.c4` + blueprint files |
| Add journey | `views/journeys.c4` + `relations.c4` (navigateTo) |

## AI-Assisted Development

This repository is **AI First** with GitHub Copilot support:

- **`.github/copilot-instructions.md`** — loaded automatically in every Copilot conversation
- **`.github/agents/c4-architect.agent.md`** — specialized "C4 Platform Architect" custom agent
- **`.github/agents/c4-prompts/`** — 9 structured guides for each operation type:
  - `blueprint-creation.md` — creating/editing blueprints
  - `capability-creation.md` — creating/editing capability stars
  - `persona-creation.md` — creating/editing personas
  - `relation-creation.md` — creating/editing relations
  - `journey-creation.md` — creating/editing dynamic journey views
  - `view-creation.md` — creating/editing C4 views
  - `integration-creation.md` — creating/editing integrations
  - `specification-creation.md` — editing element kinds, relationship kinds, tags
  - `likec4-cli-instructions.md` — CLI validation and build commands
