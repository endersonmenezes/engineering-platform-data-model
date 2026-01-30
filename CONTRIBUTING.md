# Contributing to Engineering Platform Data Model

Thank you for your interest in contributing! This document provides guidelines, architecture details, and step-by-step instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Architecture Overview](#architecture-overview)
- [How to Add a New Blueprint](#how-to-add-a-new-blueprint)
- [How to Add a New Integration](#how-to-add-a-new-integration)
- [Style Guidelines](#style-guidelines)
- [Troubleshooting](#troubleshooting)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

By participating in this project, you agree to be respectful, inclusive, and constructive in all interactions.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/)
- [LikeC4 CLI](https://likec4.dev/docs/tools/cli/) or [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=likec4.likec4-vscode)

### Setup

```bash
# Clone and install
git clone https://github.com/YOUR_USERNAME/engineering-platform-data-model.git
cd engineering-platform-data-model
npm install

# Start development server
npm run dev

# Validate model
npm run validate

# Run tests
npm test
```

### LikeC4 Resources

- **Getting Started**: [likec4.dev/tutorial](https://likec4.dev/tutorial/)
- **DSL Reference**: [likec4.dev/dsl/intro](https://likec4.dev/dsl/intro/)
- **CLI Reference**: [likec4.dev/tooling/cli](https://likec4.dev/tooling/cli/)
- **Views Documentation**: [likec4.dev/dsl/views](https://likec4.dev/dsl/views/)
- **Model Validation**: [likec4.dev/guides/validate-your-model](https://likec4.dev/guides/validate-your-model/)
- **GitHub Pages Deployment**: [likec4.dev/guides/deploy-github-pages](https://likec4.dev/guides/deploy-github-pages/)

## Architecture Overview

### Project Structure

```
likec4/
├── specification.c4              # Element kinds, tags, relationships
├── model.c4                      # Actors, External Systems, IDP, Capabilities
├── relations.c4                  # Cross-star + DataSource bidirectional relations
│
├── blueprints/                   # 40+ Blueprints organized by Star
│   ├── catalog.c4                # technologyAsset, domain, system, api
│   ├── organization.c4           # _team, _user, group
│   ├── resource.c4               # resource, ociResource, azureResource
│   ├── templates.c4              # template, scaffoldedEntity
│   ├── vcs.c4                    # repository, pullRequest, branch
│   ├── cicd.c4                   # ciPipeline, pipelineRun, deployment
│   ├── artifacts.c4              # artifact, containerImage
│   ├── security.c4               # securityScorecard, securityAlert, secretVault
│   ├── quality.c4                # codeQuality, testCoverage
│   ├── features.c4               # featureFlag, flagStrategy
│   ├── database.c4               # databaseSchema, migration
│   ├── metrics.c4                # engineeringMetrics, copilotMetrics
│   └── grc.c4                    # tier, dataClassification, policy, etc.
│
└── views/                        # Organized by C4 level
    ├── landscape.c4              # C1 - System Context
    ├── containers.c4             # C2 - Container (Stars as containers)
    ├── components.c4             # C3 - Component (Blueprints inside Stars)
    └── journeys.c4               # Dynamic - Persona workflows
```

### C4 Model Levels

This model follows the [C4 Model](https://c4model.com/) methodology:

| Level | File | What it Shows | Audience |
|-------|------|---------------|----------|
| **C1 - System Context** | `landscape.c4` | IDP as a black box + personas + external systems | Everyone |
| **C2 - Container** | `containers.c4` | 13 Stars as containers (WITHOUT internal blueprints) | Architects |
| **C3 - Component** | `components.c4` | Blueprints inside each Star | Developers |
| **Dynamic** | `journeys.c4` | Usage flows per persona | Everyone |

> **Note**: C4 is not generic zoom - each level answers a specific question:
> - **C1**: "What is this system and who interacts with it?"
> - **C2**: "What are the major functional blocks?"
> - **C3**: "What components exist inside each block?"

### Relations Architecture

The model uses **three types of relations**:

1. **Cross-Star Relations**: Relations between blueprints from different Stars (e.g., `technologyAsset -> repository`)
2. **Integration → Blueprint**: Integration feeds/syncs data into blueprints
3. **Blueprint → Integration (dataSource)**: Blueprint declares which integration is its data source

#### Bidirectional Navigation (dataSource)

Each blueprint has an **explicit `dataSource` relation** pointing to its integration:

```c4
// Integration feeds Blueprint
idp.integrationLayer.intGitHub -> idp.starVCS.repository 'syncs repos'

// Blueprint declares its data source (IMPORTANT!)
idp.starVCS.repository -> idp.integrationLayer.intGitHub 'dataSource'
```

**Benefits:**
- ✅ Expanding **GitHub Integration** shows: `repository`, `pullRequest`, `branch`, `ciPipeline`, etc.
- ✅ Expanding **repository** shows: its dataSource is `intGitHub`
- ✅ Complete traceability: `GitHub` → `intGitHub` → `repository` → `technologyAsset`

#### Data Source Map

| Integration | Supplied Blueprints | External System |
|-------------|---------------------|-----------------|
| `intGitHub` | repository, pullRequest, branch, ciPipeline, pipelineRun, deployment, environment, githubUser, githubOrganization | GitHub |
| `intRegistry` | artifact, containerImage | GitHub Packages |
| `intSecurity` | securityScorecard, securityAlert | GitHub GHAS |
| `intSecrets` | secretVault | Azure Key Vault, OCI Vault |
| `intIdentity` | identity | Azure Entra ID |
| `intOCI` | ociResource | Oracle Cloud |
| `intAzure` | azureResource | Microsoft Azure |
| `intQuality` | codeQuality, testCoverage | SonarQube |
| `intFeatureFlags` | featureFlag, flagStrategy | Unleash |
| `intMigration` | databaseSchema, migration | Liquibase |
| `intMetrics` | engineeringMetrics, copilotMetrics | LinearB, GitHub |
| `intPortal` | _team, _user, group, technologyAsset, domain, system, api, template, tier, policy, etc. | Port.io Native |

### Naming Conventions

#### Element Kinds

| Kind | Usage | Color |
|------|-------|-------|
| `actor` | Personas (developer, tech lead...) | muted |
| `system` | IDP, external systems | primary/secondary |
| `capability` | Stars (blueprint groupings) | green shades |
| `blueprint` | Port.io entities | slate |
| `integration` | Data sources / ACL | slate |

#### Tags

| Tag | Meaning |
|-----|---------|
| `#oci` | Oracle Cloud resource |
| `#azure` | Microsoft Azure resource |
| `#github` | GitHub related |
| `#dora` | DORA Metrics |
| `#ghas` | GitHub Advanced Security |

### LikeC4 → Port.io Mapping

| LikeC4 | Port.io |
|--------|---------|
| `blueprint` element | Blueprint definition |
| `metadata {}` | Blueprint properties |
| `-> relationship` | Relation |
| `integration` element | Data source |
| `dynamic view` | Self-service action flow |

## How to Add a New Blueprint

1. **Identify the Star** - Determine which Star (capability) the blueprint belongs to

2. **Add the blueprint** in the corresponding file in `likec4/blueprints/`:
   ```c4
   // Example: adding to vcs.c4
   myNewBlueprint = blueprint 'myNewBlueprint' {
     description 'Description of what this blueprint represents'
     icon tech:git
     
     // Define data source directly in the blueprint
     this -[dataSource]-> idp.integrationLayer.intGitHub { #dataFlow }
     
     // Cross-star relations using 'this'
     this -[dependsOn]-> idp.starCatalog.technologyAsset 'relatesTo'
   }
   ```

3. **Create internal relations** (if needed) in the same blueprints file using kinded syntax:
   ```c4
   existingBlueprint -[includes]-> myNewBlueprint 'contains'
   ```

4. **Validate your changes**:
   ```bash
   npm run validate
   npm test
   ```

> **Note:** The `relations.c4` file is used only for:
> - Actor → Capability relations (with `navigateTo`)
> - Integration → External Systems relations
> - Integration → Blueprint relations (`syncs` direction)

## How to Add a New Integration

1. **Add the integration** in `likec4/model.c4` inside `idp.integrationLayer`:
   ```c4
   intMyService = integration 'My Service Integration' {
     description 'Connector for My External Service'
     icon tech:api
   }
   ```

2. **Add relation to external system** in `likec4/relations.c4`:
   ```c4
   idp.integrationLayer.intMyService -[syncs]-> externalSystem 'syncs with' {
     #sync
     technology 'REST API'
   }
   ```

3. **Add the `syncs` relation** in `likec4/relations.c4` (Integration → Blueprint):
   ```c4
   idp.integrationLayer.intMyService -[syncs]-> idp.starX.blueprint1 'syncs data' {
     #sync #dataFlow
   }
   ```

4. **Update the blueprint** to declare its data source (in `likec4/blueprints/`):
   ```c4
   blueprint1 = blueprint 'blueprint1' {
     // ... other properties
     this -[dataSource]-> idp.integrationLayer.intMyService { #dataFlow }
   }
   ```

5. **Validate your changes**:
   ```bash
   npm run validate
   npm test
   ```

## Style Guidelines

### LikeC4 Files (.c4)

- Use descriptive identifiers in `camelCase`
- Add comments (in English) to explain complex relationships
- Group related elements together
- Use consistent indentation (2 spaces)
- Reference: [LikeC4 DSL Specification](https://likec4.dev/dsl/intro/)

### Documentation

- Write all documentation in **English**
- Use clear, concise language
- Include examples where helpful
- Keep code blocks properly formatted

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Usage |
|--------|-------|
| `feat:` | New features (new blueprint, new view) |
| `fix:` | Bug fixes |
| `docs:` | Documentation changes |
| `refactor:` | Code refactoring |
| `test:` | Adding or updating tests |

## Troubleshooting

### ❌ Can't navigate from Integration → Blueprint

**Problem:** Clicking on an integration doesn't show related blueprints.

**Solution:** Ensure you have **bidirectional relations**:

```c4
// ✅ Correct: both directions defined
idp.integrationLayer.intGitHub -> idp.starVCS.repository 'syncs repos'
idp.starVCS.repository -> idp.integrationLayer.intGitHub 'dataSource'

// ❌ Wrong: only one direction
idp.integrationLayer.intGitHub -> idp.starVCS.repository 'syncs repos'
```

### ❌ Model validation fails

**Problem:** `npm run validate` returns errors.

**Solution:**
1. Check for syntax errors in recently edited `.c4` files
2. Ensure all referenced elements exist
3. Verify relation targets are correctly namespaced (e.g., `idp.starVCS.repository`)

Reference: [LikeC4 Validation Guide](https://likec4.dev/guides/validate-your-model/)

### ❌ Views not showing elements

**Problem:** A view appears empty or missing elements.

**Solution:**
1. Check the view's `include` statements
2. Verify elements are within the correct namespace
3. Ensure elements have proper `style` definitions

Reference: [LikeC4 Views Documentation](https://likec4.dev/dsl/views/)

## Pull Request Process

### Before Submitting

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**
4. **Validate**:
   ```bash
   npm run validate
   npm test
   npm run build
   ```
5. **Commit** using conventional commits

### PR Guidelines

- Provide a clear description of changes
- Reference any related issues
- Include screenshots for visual changes
- Ensure all CI checks pass
- Request review from maintainers

### After Review

- Address reviewer feedback
- Squash commits if requested
- Ensure CI passes before merge

## Reporting Issues

If you find a bug or have a feature request:

1. Check [existing issues](../../issues) first
2. [Create a new issue](../../issues/new) with:
   - Clear, descriptive title
   - Detailed description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots (if helpful)

## Questions?

- Open a [Discussion](../../discussions)
- Create an [Issue](../../issues) with the "question" label

Thank you for contributing! 🎉
