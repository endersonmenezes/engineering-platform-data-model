# Engineering Platform Data Model

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Deploy to GitHub Pages](https://img.shields.io/github/actions/workflow/status/endersonmenezes/engineering-platform-data-model/deploy-pages.yml?label=docs&logo=github)](https://endersonmenezes.github.io/engineering-platform-data-model/)
[![Validate Model](https://img.shields.io/github/actions/workflow/status/endersonmenezes/engineering-platform-data-model/pr-validation.yml?label=model&logo=github)](https://github.com/endersonmenezes/engineering-platform-data-model/actions)
[![LikeC4](https://img.shields.io/badge/LikeC4-v1.48+-blue?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIvPjwvc3ZnPg==)](https://likec4.dev/)

> **Star Schema Data Model for Internal Developer Portals (IDP)**  
> Built with [LikeC4](https://likec4.dev/) following the [C4 Model](https://c4model.com/) methodology

## Overview

A **reference data model** for building Internal Developer Portals, organized into **13 Capability Stars** where each star is a platform capability domain. The **Technology Asset** (`technologyAsset`) is the central hub connecting all stars.

The model draws from two key references: [Backstage](https://backstage.io/) for the core entity architecture (Component, API, System, Domain, Resource, Group, User, Template) and [Port.io's Blueprint model](https://docs.port.io/build-your-software-catalog/customize-integrations/configure-data-model/setup-blueprint/) for the concept of *Blueprints* as configurable data entities. However, this data model is **tool-agnostic** — it can be implemented in Backstage, Port.io, Cortex, OpsLevel, or any IDP that supports a configurable data model.

📖 **[View Interactive Diagrams](https://endersonmenezes.github.io/engineering-platform-data-model/)** · 📂 **[Technical Reference (AGENTS.md)](AGENTS.md)**

## The 13 Capability Stars

| Star | Blueprints | Purpose |
|------|------------|---------|
| **Service Catalog** | `technologyAsset`, `domain`, `system`, `api` | Central asset catalog |
| **Organization** | `_team`, `_user`, `group` | Organizational structure |
| **Version Control** | `repository`, `branch`, `pullRequest` | Source code management |
| **CI/CD Platform** | `ciPipeline`, `pipelineRun`, `deployment` | Build and deploy |
| **Resource Catalog** | `resource`, `ociResource`, `azureResource` | Multi-cloud infrastructure |
| **Artifact Management** | `artifact`, `containerImage` | Artifacts and images |
| **Security** | `securityScorecard`, `securityAlert`, `secretVault` | Technical security |
| **Code Quality** | `codeQuality`, `testCoverage` | Quality metrics |
| **Engineering Metrics** | `engineeringMetrics`, `copilotMetrics` | DORA and productivity |
| **Feature Management** | `featureFlag`, `flagStrategy` | Feature flags |
| **Software Templates** | `template`, `scaffoldedEntity` | Self-service |
| **GRC** | `tier`, `policy`, `complianceRequirement` | Governance and compliance |
| **Database Management** | `databaseSchema`, `migration` | Schemas and migrations |

## Quick Start

**Prerequisites:** [Node.js 22+](https://nodejs.org/) · [LikeC4 VS Code Extension](https://marketplace.visualstudio.com/items?itemName=likec4.likec4-vscode) (recommended)

```bash
git clone https://github.com/endersonmenezes/engineering-platform-data-model.git
cd engineering-platform-data-model
nvm use && npm install
npm run dev        # Dev server with hot-reload
```

```bash
npm run validate   # Syntax check
npm test           # Model validation tests
npm run build      # Static site for GitHub Pages
npm run export     # Export diagrams as images
```

## Customizing for Your Organization

This model is designed to be **adapted**. The reference implementation assumes:

- **VCS**: GitHub (replaceable with GitLab, Bitbucket, etc.)
- **Multi-Cloud**: Oracle Cloud (OCI) + Microsoft Azure (add/remove providers)
- **Identity**: Azure Entra ID for SSO (replaceable with Okta, Auth0, etc.)

### Integration Architecture

```plaintext
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BLUEPRINTS (Concepts)                             │
│   technologyAsset │ repository │ ciPipeline │ artifact │ resource │ etc.    │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │ dataSource (bidirectional)
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      INTEGRATIONS (Integration Layer / ACL)                 │
├─────────────┬─────────────┬─────────────┬─────────────┬─────────────────────┤
│ VCS         │ Cloud       │ Identity    │ Quality     │ Metrics             │
│ Provider    │ Providers   │ Provider    │ Provider    │ Provider            │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────────────┘
```

## Ownership Model

### Organizational Hierarchy

```plaintext
group (Tribe/Area)
  └── _team (Squad)
        └── _user (Member)
```

### Governance Attributes

Every catalog element has: `ownedBy` (required), `supportedBy`, `tier` (required), `dataClassification`, `lifecycleState` (required), `contactChannel` (required).

## Suggested Scorecards

### Production Readiness

| Rule | Condition | Weight |
|------|-----------|--------|
| Quality Gate passed | `codeQuality.quality_gate_status = 'passed'` | 20% |
| No Critical Vulns | `securityScorecard.critical_count = 0` | 25% |
| Coverage > 80% | `codeQuality.coverage_percentage > 80` | 15% |
| CI/CD Active | `ciPipeline.status != 'inactive'` | 15% |
| Has Documentation | `technologyAsset.documentation_url != null` | 10% |
| Secrets in Vault | `secretVault` relation exists | 15% |

### Developer Experience

| Rule | Condition | Weight |
|------|-----------|--------|
| Copilot Enabled | `copilotMetrics.active_users > 0` | 20% |
| Feature Flags | `featureFlag.count > 0` | 15% |
| Fast Cycle Time | `engineeringMetrics.cycle_time_hours < 48` | 25% |
| Low Review Time | `engineeringMetrics.review_time_hours < 4` | 20% |
| Automated Tests | `testCoverage.line_coverage > 70` | 20% |

### Compliance Readiness

| Rule | Condition | Weight |
|------|-----------|--------|
| Has Owner | `technologyAsset.ownedBy != null` | 25% |
| Tier Defined | `tier` relation exists | 20% |
| Data Classified | `dataClassification` relation exists | 20% |
| Lifecycle Active | `lifecycleState.state = 'active'` | 15% |
| Evidence Exists | `complianceEvidence.count > 0` | 20% |

## Backstage Alignment

| Backstage Entity | Equivalent Blueprint |
|------------------|----------------------|
| **Component** | `technologyAsset` |
| **API** | `api` |
| **System** | `system` |
| **Domain** | `domain` |
| **Resource** | `resource`, `ociResource`, `azureResource` |
| **Group** | `_team`, `group` |
| **User** | `_user`, `githubUser` |
| **Template** | `template` |
| **Location** | (implicit in `repository`) |

## Platform Engineering Goals

| # | Goal | Related Stars |
|---|------|---------------|
| 1 | Infrastructure Automation | Database Management, CI/CD |
| 2 | CI/CD Manager | CI/CD, Artifacts |
| 3 | Developer Experience | Catalog, Features, Metrics |
| 4 | Testing Platform | Quality, CI/CD |
| 5 | Security & Compliance | Security, GRC |
| 6 | Observability & Monitoring | Metrics |
| 7 | Container Platform | Artifacts, CI/CD |
| 8 | API Management | Catalog (`api`) |
| 9 | Cost Management | Metrics, Organization |
| 10 | Governance & Controls | GRC, Quality |

## AI-Assisted Development

This repository is **AI First** with GitHub Copilot support:

- **Custom Agent**: Select **"C4 Platform Architect"** in the VS Code agents dropdown for intelligent C4 editing
- **Copilot Instructions**: Automatically loaded context for every conversation
- **9 Structured Guides**: Step-by-step instructions for blueprints, stars, personas, relations, journeys, views, integrations, specification, and CLI
- **Agent Support**: `AGENTS.md` provides context for autonomous agents

See [AGENTS.md](AGENTS.md) for file organization, views reference, resource types, naming conventions, and technical details.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

```bash
git checkout -b feature/amazing-feature
# Make changes
npm run validate && npm test
git commit -m 'feat: add amazing feature'
git push origin feature/amazing-feature
# Open a Pull Request
```

## License

[Creative Commons Attribution 4.0 International](LICENSE) — Share and adapt freely with attribution.

## Acknowledgments

[LikeC4](https://likec4.dev/) · [C4 Model](https://c4model.com/) · [Backstage](https://backstage.io/) · [Port.io](https://www.getport.io/)

---

> **Note:** This repository contains only the **conceptual model** in LikeC4. Actual YAML blueprint implementations, data sources, and automations should live in your organization's private repository.
