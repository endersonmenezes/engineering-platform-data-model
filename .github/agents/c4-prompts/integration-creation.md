# C4 Integration Creation Guide

## Critical Requirements

🚨 **ALWAYS read `likec4/model.c4` and `likec4/relations.c4` before creating integrations**
🚨 **Every integration needs: external system + integration element + syncs relations**
🚨 **ALWAYS validate with `npm run validate` after changes**

## Overview

The Integration Layer is an ACL (Anti-Corruption Layer) that abstracts external providers from the internal data model. Each integration connects an external system to one or more blueprints.

```
Blueprint ←[dataSource]← Integration ←[syncs]← External System
                          |
                          └─[syncs]→ Blueprint (in relations.c4)
```

## Current Integrations

| Integration | Variable | External System | Blueprints Fed |
|-------------|----------|-----------------|----------------|
| GitHub Connector | `intGitHub` | `github` | repository, pullRequest, branch, ciPipeline, pipelineRun, artifact, containerImage, securityScorecard, securityAlert |
| OCI Connector | `intOCI` | `oci` | ociResource, resource |
| Azure Connector | `intAzure` | `azure` | azureResource, resource |
| Entra ID Connector | `intEntraId` | `entraId` | _user, identity, group |
| SonarQube Connector | `intSonarQube` | `sonarqube` | codeQuality, testCoverage |
| Portal Native | `intPortal` | (internal) | technologyAsset, domain, system, api, _team, template, tier, policy, etc. |
| Unleash Connector | `intUnleash` | `unleash` | featureFlag, flagStrategy |
| Liquibase Connector | `intLiquibase` | `liquibase` | databaseSchema, migration |
| LinearB Connector | `intLinearB` | `linearb` | engineeringMetrics |
| Copilot Metrics | `intCopilotMetrics` | `github` | copilotMetrics |

## Complete Steps to Create a New Integration

### Step 1: Add the External System in `model.c4`

Define the external system at the model root level (outside `idp`):

```c4
model {
  // ... existing external systems ...

  datadog = externalSystem 'Datadog' {
    description 'Monitoring and observability platform for infrastructure and applications'
    icon tech:datadog
    style {
      color slate
    }
  }

  // ... idp system ...
}
```

**Rules:**
- Kind: `externalSystem`
- Style: `color slate` (consistent with other external systems)
- Must have `description`

### Step 2: Add the Integration in `model.c4`

Add the integration inside the `integrationLayer` capability:

```c4
idp = system 'Internal Developer Portal' {
  integrationLayer = capability 'Integration Layer' {
    // ... existing integrations ...

    intDatadog = integration 'Datadog Connector' {
      description 'Syncs monitoring metrics, alerts, and dashboards from Datadog'
      icon tech:datadog
      style {
        color gray
        border dashed
      }
    }
  }
}
```

**Rules:**
- Variable name: `intCamelCase` (e.g., `intDatadog`)
- Kind: `integration`
- Style: `color gray`, `border dashed` (consistent with other integrations)
- Must have `description`

### Step 3: Add Relations in `relations.c4`

#### Integration ↔ External System

```c4
// ================================================================
// Integration ↔ Datadog
// ================================================================
idp.integrationLayer.intDatadog -[syncs]-> datadog 'syncs from Datadog API' {
  #sync
}
```

#### Integration → Blueprints

```c4
// Integration → Observability Blueprints
idp.integrationLayer.intDatadog -[syncs]-> idp.starObservability.metric 'syncs metrics' {
  #sync
}
idp.integrationLayer.intDatadog -[syncs]-> idp.starObservability.alert 'syncs alerts' {
  #sync
}
```

### Step 4: Add dataSource in Blueprint Files

In the blueprint file, add the reverse `dataSource` relation:

```c4
// In blueprints/observability.c4
extend idp.starObservability {
  metric = blueprint 'Metric' {
    description '...'
    icon bootstrap:graph-up
  }

  // DataSource to integration
  metric -[dataSource]-> idp.integrationLayer.intDatadog 'synced from Datadog' {
    #sync
  }
}
```

### Step 5: Validate

```bash
npm run validate
npm test
```

## Integration Design Principles

1. **One integration per external system**: Each external system has exactly one integration connector
2. **Bidirectional sync**: Every `dataSource` from blueprint must have a corresponding `syncs` from integration
3. **ACL pattern**: Integrations abstract the external system's specifics
4. **Multiple blueprints**: One integration can feed multiple blueprints across different stars
5. **Portal Native**: Entities managed directly in the portal use `intPortal`

## Exception: Multiple Integrations to Same External System

GitHub is an exception — it connects through `intGitHub` for most data and `intCopilotMetrics` for Copilot-specific metrics. This is acceptable when:
- Different API endpoints or data sources
- Different sync cadences
- Logically separate concerns

## Checklist for New Integration

- [ ] External system defined in `model.c4` with `externalSystem` kind
- [ ] Integration defined in `model.c4` inside `integrationLayer` with `integration` kind
- [ ] Integration → External System `syncs` in `relations.c4`
- [ ] Integration → Blueprint `syncs` in `relations.c4` (for each blueprint)
- [ ] Blueprint → Integration `dataSource` in blueprint file (for each blueprint)
- [ ] Variable follows `intCamelCase` naming
- [ ] Style: `color gray`, `border dashed`
- [ ] `npm run validate` passes
- [ ] `npm test` passes
