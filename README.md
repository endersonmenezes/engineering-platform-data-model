# Engineering Platform Data Model

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Deploy to GitHub Pages](https://img.shields.io/github/actions/workflow/status/endersonmenezes/engineering-platform-data-model/deploy-pages.yml?label=docs&logo=github)](https://endersonmenezes.github.io/engineering-platform-data-model/)
[![Validate Model](https://img.shields.io/github/actions/workflow/status/endersonmenezes/engineering-platform-data-model/pr-validation.yml?label=model&logo=github)](https://github.com/endersonmenezes/engineering-platform-data-model/actions)
[![LikeC4](https://img.shields.io/badge/LikeC4-v1.48+-blue?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIvPjwvc3ZnPg==)](https://likec4.dev/)

> **Star Schema Data Model for Internal Developer Portals (IDP)**  
> Built with [LikeC4](https://likec4.dev/) following the [C4 Model](https://c4model.com/) methodology

## Overview

This repository provides a **reference data model** for building Internal Developer Portals. The model is organized into **13 Capability Stars** (clusters of related blueprints), where each star represents a platform capability domain. The **Technology Asset** serves as the central hub connecting all stars.

The model follows **Backstage** core entity architecture: Component, API, System, Domain, Resource, Group, User, and **Template** (Software Templates for self-service).

**Live Documentation:** [View Interactive Diagrams](https://endersonmenezes.github.io/engineering-platform-data-model/)

## The 13 Capability Stars

The **Service Catalog** (with `technologyAsset` at the center) connects all other Capability Stars:

| Star | Blueprints | Purpose |
|------|------------|---------|
| **Service Catalog** | `technologyAsset`, `domain`, `system`, `api` | Central asset catalog |
| **Organization** | `_team`, `_user`, `group` | Organizational structure and ownership |
| **Version Control** | `repository`, `branch`, `pullRequest` | Source code management |
| **CI/CD Platform** | `ciPipeline`, `pipelineRun`, `deployment` | Build and deploy automation |
| **Resource Catalog** | `resource`, `ociResource`, `azureResource` | Multi-cloud infrastructure |
| **Artifact Management** | `artifact`, `containerImage` | Artifacts and container images |
| **Security** | `securityScorecard`, `securityAlert`, `secretVault` | Technical security |
| **Code Quality** | `codeQuality`, `testCoverage` | Quality and coverage metrics |
| **Engineering Metrics** | `engineeringMetrics`, `copilotMetrics` | DORA and productivity metrics |
| **Feature Management** | `featureFlag`, `flagStrategy` | Feature flags |
| **Software Templates** | `template`, `scaffoldedEntity` | Self-service |
| **GRC** | `tier`, `policy`, `complianceRequirement` | Governance and compliance |
| **Database Management** | `databaseSchema`, `migration` | Schemas and migrations |

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/)
- [LikeC4 VS Code Extension](https://marketplace.visualstudio.com/items?itemName=likec4.likec4-vscode) (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/endersonmenezes/engineering-platform-data-model.git
cd engineering-platform-data-model

# Install dependencies
npm install

# Start development server with hot-reload
npm run dev
```

### VS Code (Recommended)

```bash
# Install LikeC4 extension
code --install-extension likec4.likec4-vscode

# Open any .c4 file and use Cmd+Shift+P → "LikeC4: Preview"
```

### NPM Scripts

```bash
# Development
npm run dev          # Start LikeC4 dev server with hot-reload

# Building
npm run build        # Build static site for GitHub Pages
npm run export       # Export diagrams as images

# Testing
npm run test         # Run model validation tests
npm run validate     # Validate model syntax (dry-run)
```

## Model Views

Views are organized by C4 level:

### C1: System Context

| View | Audience | Description |
|------|----------|-------------|
| **index** | Everyone | IDP as a "black box", actors and external systems |

### C2: Containers

| View | Audience | Description |
|------|----------|-------------|
| **capabilities** | Architects | 13 Capability Stars and their dependencies |

### C3: Star Components

Each view shows the **internal blueprints** of a specific Star:

| View | Star | Blueprints |
|------|------|------------|
| **starCatalog** | Service Catalog | technologyAsset, domain, system, api |
| **starOrganization** | Organizational Semantic | _team, _user, group, githubUser, githubOrganization |
| **starVCS** | Version Control | repository, branch, pullRequest |
| **starCICD** | CI/CD Platform | ciPipeline, pipelineRun, deployment |
| **starSecurity** | Security | securityScorecard, securityAlert, secretVault |
| **starMetrics** | Engineering Metrics | engineeringMetrics, copilotMetrics |
| **starResource** | Resource Catalog | resource, ociResource, azureResource |
| **starTemplates** | Software Templates | template, scaffoldedEntity |
| **starQuality** | Code Quality | codeQuality, testCoverage |
| **starArtifacts** | Artifact Management | artifact, containerImage |
| **starGRC** | GRC | tier, policy, complianceRequirement |
| **starFeatures** | Feature Management | featureFlag, flagStrategy |
| **starDatabase** | Database Management | databaseSchema, migration |

### Dynamic Views (Persona Journeys)

| View | Persona | Description |
|------|---------|-------------|
| **developerOnboarding** | Developer | Platform onboarding (SSO + GitHub mapping) |
| **developerSelfService** | Developer | Creating service via Software Template |
| **developerDailyWork** | Developer | Flow: code → PR → deploy |
| **platformEngineerTemplates** | Platform Engineer | Creating and maintaining Software Templates |
| **platformEngineerMultiCloud** | Platform Engineer | Provisioning OCI + Azure resources |
| **techLeadScorecard** | Tech Lead | Evaluating team's Production Readiness |
| **techLeadMetrics** | Tech Lead | Tracking DORA Metrics and Copilot |
| **securityEngineerPosture** | Security Engineer | Security posture overview |
| **securityEngineerIncident** | Security Engineer | Responding to critical alert (MTTR) |

## Resource Catalog

Infrastructure that components **depend on** or **consume**:

| Resource Type | Examples | Blueprint |
|---------------|----------|-----------|
| **Compute** | VMs, EC2, Azure VMs, GCE | `resource` (type: compute) |
| **Serverless** | Lambda, Azure Functions, Cloud Functions | `resource` (type: function) |
| **Storage** | S3, Blob Storage, GCS, NFS | `resource` (type: storage) |
| **Database** | RDS, Azure SQL, Cloud SQL, MongoDB Atlas | `resource` (type: database) |
| **Queue/Messaging** | SQS, Service Bus, Pub/Sub, Kafka | `resource` (type: queue) |
| **Cache** | ElastiCache, Redis, Memcached | `resource` (type: cache) |
| **CDN** | CloudFront, Azure CDN, Cloud CDN | `resource` (type: cdn) |
| **Cluster** | EKS, AKS, GKE, OpenShift | `resource` (type: cluster) |
| **Network** | VPC, VNet, Load Balancers | `resource` (type: network) |

## Customizing for Your Organization

This model is designed to be **adapted** to your organization's specific needs. The reference implementation assumes:

- **Single VCS**: GitHub as the corporate VCS (you can replace with GitLab, Bitbucket, etc.)
- **Multi-Cloud**: Oracle Cloud (OCI) and Microsoft Azure (add/remove providers as needed)
- **Identity**: Azure Entra ID for SSO (replaceable with Okta, Auth0, etc.)

### Integration Architecture

```plaintext
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BLUEPRINTS (Concepts)                             │
│   technologyAsset │ repository │ ciPipeline │ artifact │ resource │ etc.    │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │ dataSource (bidirectional relation)
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      INTEGRATIONS (Integration Layer)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌─────────────────────────────────────────────┐     │
│  │   VCS Provider  │    │         Cloud Provider (Agnostic)           │     │
│  │  (GitHub, etc)  │    │     ┌──────────────┴──────────────┐         │     │
│  ├─────────────────┤    │     │                             │         │     │
│  │ - Repositories  │    │  ┌──┴───────────┐    ┌────────────┴──┐      │     │
│  │ - Pull Requests │    │  │ Your Cloud 1 │    │ Your Cloud 2  │      │     │
│  │ - Actions/CI    │    │  │   (OCI, AWS) │    │ (Azure, GCP)  │      │     │
│  │ - Packages      │    │  └──────────────┘    └───────────────┘      │     │
│  │ - Security Scan │    └─────────────────────────────────────────────┘     │
│  └─────────────────┘                                                        │
├─────────────┬─────────────┬─────────────┬─────────────┬─────────────────────┤
│ Portal      │ Identity    │ Secrets     │ Quality     │ Metrics             │
│ Native      │ Provider    │ Management  │ Provider    │ Provider            │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────────────┘
```

**What you can customize:**
- Replace GitHub with GitLab, Bitbucket, or other VCS
- Add or remove cloud providers (AWS, GCP, etc.)
- Customize governance blueprints for your compliance requirements
- Add new capability stars for your specific needs

## Ownership Model

The ownership model defines organizational responsibilities:

### Organizational Hierarchy

```plaintext
group (Tribe/Area: IT Engineering, AI Platform, Data Platform)
  └── _team (Squad: Platform Engineering, MLOps, Data Engineering)
        └── _user (Team members)
```

### Ownership by Entity

| Entity | ownedBy | supportedBy | Rationale |
|--------|---------|-------------|-----------|
| `domain` | `group` | - | Domain is a broad business area |
| `system` | `_team` | `_team[]` | System is a team's product, others can support |
| `technologyAsset` | `_team` | `_team[]` | Technical component, main team + support teams |
| `api` | `_team` | - | API belongs to the exposing team |

### Governance Attributes

Every catalog element has:

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `ownedBy` | relation | ✅ | Primary responsible team/group |
| `supportedBy` | relation[] | ⚪ | Support teams (on-call, L2) |
| `tier` | relation | ✅ | Criticality classification |
| `dataClassification` | relation | ⚪ | Data classification |
| `lifecycleState` | relation | ✅ | Lifecycle state |
| `contactChannel` | string | ✅ | Slack channel (e.g., #platform-engineering) |

## Suggested Scorecards

### Production Readiness

| Rule | Blueprint | Condition | Weight |
|------|-----------|-----------|--------|
| Quality Gate | `codeQuality` | quality_gate_status = 'passed' | 20% |
| No Critical Vulns | `securityScorecard` | critical_count = 0 | 25% |
| Coverage > 80% | `codeQuality` | coverage_percentage > 80 | 15% |
| CI/CD Active | `ciPipeline` | status != 'inactive' | 15% |
| Has Documentation | `technologyAsset` | documentation_url != null | 10% |
| Secrets in Vault | `secretVault` | relation exists | 15% |

### Developer Experience

| Rule | Blueprint | Condition | Weight |
|------|-----------|-----------|--------|
| Copilot Enabled | `copilotMetrics` | active_users > 0 | 20% |
| Feature Flags | `featureFlag` | count > 0 | 15% |
| Fast Cycle Time | `engineeringMetrics` | cycle_time_hours < 48 | 25% |
| Low Review Time | `engineeringMetrics` | review_time_hours < 4 | 20% |
| Automated Tests | `testCoverage` | line_coverage > 70 | 20% |

### Compliance Readiness

| Rule | Blueprint | Condition | Weight |
|------|-----------|-----------|--------|
| Has Owner | `technologyAsset` | ownedBy != null | 25% |
| Tier Defined | `tier` | relation exists | 20% |
| Data Classified | `dataClassification` | relation exists | 20% |
| Lifecycle Active | `lifecycleState` | state = 'active' | 15% |
| Compliance Evidence | `complianceEvidence` | count > 0 | 20% |

## Backstage Alignment

| Backstage Entity | Equivalent Blueprint | Description |
|------------------|----------------------|-------------|
| **Component** | `technologyAsset` | Any software: service, library, website |
| **API** | `api` | Interface exposed by a component |
| **System** | `system` | Collection of components forming a product |
| **Domain** | `domain` | Business area grouping systems |
| **Resource** | `resource`, `ociResource`, `azureResource` | Infrastructure: databases, storage, clusters |
| **Group** | `_team`, `group` | Teams and organizational structure |
| **User** | `_user`, `githubUser` | Portal user and GitHub identity |
| **Template** | `template` | Software Template for scaffolding |
| **Location** | (implicit in `repository`) | Reference to definition files |

## Repository Structure

```
engineering-platform-data-model/
├── README.md                           # This file
├── LICENSE                             # CC BY 4.0 License
├── CONTRIBUTING.md                     # Contribution guidelines
├── package.json                        # npm scripts
├── likec4.config.mjs                   # LikeC4 configuration
│
├── .github/
│   └── workflows/
│       ├── deploy-pages.yml            # GitHub Pages deployment
│       └── pr-validation.yml           # PR validation and testing
│
├── test/                               # Model validation tests
│   └── model.spec.ts                   # Model validation tests
│
└── likec4/                             # C4 Model files
    ├── specification.c4                # Element kinds + tags
    ├── model.c4                        # Actors, External Systems, IDP, Capabilities
    ├── relations.c4                    # Cross-star + dataSource relationships
    │
    ├── blueprints/                     # 40 Blueprints organized by Star
    │   ├── catalog.c4                  # technologyAsset, domain, system, api
    │   ├── organization.c4             # _team, _user, group
    │   ├── resource.c4                 # resource, ociResource, azureResource
    │   ├── templates.c4                # template, scaffoldedEntity
    │   ├── vcs.c4                      # repository, pullRequest, branch
    │   ├── cicd.c4                     # ciPipeline, pipelineRun, deployment
    │   ├── artifacts.c4                # artifact, containerImage
    │   ├── security.c4                 # securityScorecard, securityAlert
    │   ├── quality.c4                  # codeQuality, testCoverage
    │   ├── features.c4                 # featureFlag, flagStrategy
    │   ├── database.c4                 # databaseSchema, migration
    │   ├── metrics.c4                  # engineeringMetrics, copilotMetrics
    │   └── grc.c4                      # tier, policy, complianceRequirement
    │
    └── views/                          # Views organized by C4 level
        ├── landscape.c4                # C1 - System Context
        ├── containers.c4               # C2 - Container (Stars)
        ├── components.c4               # C3 - Component (Blueprints)
        └── journeys.c4                 # Dynamic Views (persona flows)
```

## Platform Engineering Goals

| # | Goal | Related Stars |
|---|------|---------------|
| 1 | Infrastructure Automation | Database Management, CI/CD Platform |
| 2 | CI/CD Manager | CI/CD Platform, Artifact Management |
| 3 | Developer Experience | Service Catalog, Feature Management, Engineering Metrics |
| 4 | Testing Platform | Code Quality, CI/CD Platform |
| 5 | Security & Compliance | Security & Compliance |
| 6 | Observability & Monitoring | Engineering Metrics |
| 7 | Container Platform | Artifact Management, CI/CD Platform |
| 8 | API Management | Service Catalog (api blueprint) |
| 9 | Cost Management | Engineering Metrics, Organizational Semantic |
| 10 | Governance & Controls | Security & Compliance, Code Quality |

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run validation (`npm run validate && npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This work is licensed under a [Creative Commons Attribution 4.0 International License](LICENSE).

You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:
- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made.

## Acknowledgments

- [LikeC4](https://likec4.dev/) - Architecture modeling tool
- [C4 Model](https://c4model.com/) - Architecture visualization methodology
- [Backstage](https://backstage.io/) - Developer portal framework
- [Port.io](https://www.getport.io/) - Internal Developer Portal platform

---

**Note:** This repository contains only the **conceptual model** in LikeC4. The actual YAML blueprint implementations, data sources, and automations should be done in your organization's private repository.
