# C4 Capability Star Creation Guide

## Critical Requirements

🚨 **ALWAYS read `likec4/model.c4` before creating a new capability star**
🚨 **A new star requires changes in 5+ files — follow ALL steps below**
🚨 **ALWAYS validate with `npm run validate` after changes**

## Overview

Capability Stars are the top-level grouping mechanism in the data model. Each star represents a platform capability domain (e.g., Version Control, Security, CI/CD). Stars contain **blueprints** which are the actual data entities.

The current model has **13 Capability Stars**:

| # | Star | Variable | File |
|---|------|----------|------|
| 1 | Service Catalog | `starCatalog` | `blueprints/catalog.c4` |
| 2 | Organization | `starOrganization` | `blueprints/organization.c4` |
| 3 | Version Control | `starVCS` | `blueprints/vcs.c4` |
| 4 | CI/CD Platform | `starCICD` | `blueprints/cicd.c4` |
| 5 | Resource Catalog | `starResource` | `blueprints/resource.c4` |
| 6 | Artifact Management | `starArtifacts` | `blueprints/artifacts.c4` |
| 7 | Security | `starSecurity` | `blueprints/security.c4` |
| 8 | Code Quality | `starQuality` | `blueprints/quality.c4` |
| 9 | Engineering Metrics | `starMetrics` | `blueprints/metrics.c4` |
| 10 | Feature Management | `starFeatures` | `blueprints/features.c4` |
| 11 | Software Templates | `starTemplates` | `blueprints/templates.c4` |
| 12 | GRC | `starGRC` | `blueprints/grc.c4` |
| 13 | Database Management | `starDatabase` | `blueprints/database.c4` |

## Complete Steps to Create a New Capability Star

### Step 1: Define the star in `model.c4`

Add the new capability inside the `idp` system block:

```c4
model {
  // Inside the idp system...
  idp = system 'Internal Developer Portal' {
    // ... existing stars ...

    starObservability = capability 'Observability' {
      description 'Monitoring, logging, tracing and alerting capabilities'
      icon bootstrap:binoculars
      style {
        color sky
      }
    }
  }
}
```

**Rules:**
- Variable name: `starCamelCase` (e.g., `starObservability`)
- Kind: `capability`
- Style: color `sky` (consistent with other stars)

### Step 2: Create the blueprint file

Create a new file `likec4/blueprints/<star-name>.c4`:

```c4
// ================================================================
// Star: Observability
// Blueprints: logPipeline, metric, trace, alert
// ================================================================

extend idp.starObservability {

  logPipeline = blueprint 'Log Pipeline' {
    description 'Represents a centralized log collection and processing pipeline'
    icon bootstrap:journal-text
    technology 'ELK Stack / Loki'
    style {
      color green
    }
  }

  metric = blueprint 'Metric' {
    description 'Represents a metrics collection endpoint or dashboard'
    icon bootstrap:graph-up
    technology 'Prometheus / Grafana'
    style {
      color green
    }
  }

  // Internal relations
  metric -[dependsOn]-> logPipeline 'correlates with logs'

  // DataSource relations
  logPipeline -[dataSource]-> idp.integrationLayer.intObservability 'synced from monitoring stack' {
    #sync
  }
  metric -[dataSource]-> idp.integrationLayer.intObservability 'synced from monitoring stack' {
    #sync
  }

}
```

### Step 3: Add integration in `model.c4` (if needed)

If the star needs a new external system and/or integration:

```c4
// Add external system (outside idp)
grafana = externalSystem 'Grafana' {
  description 'Observability and monitoring platform'
  icon tech:grafana
}

// Add integration inside integrationLayer (inside idp)
idp = system 'Internal Developer Portal' {
  integrationLayer = capability 'Integration Layer' {
    // ... existing integrations ...

    intObservability = integration 'Observability Connector' {
      description 'Syncs monitoring data from Grafana/Prometheus'
      icon bootstrap:binoculars
    }
  }
}
```

### Step 4: Add relations in `relations.c4`

```c4
// ================================================================
// Actor → New Star
// ================================================================
idp.starObservability -> developer 'provides monitoring' {
  navigateTo developerMonitoring
}
idp.starObservability -> platformEngineer 'configures monitoring'

// ================================================================
// Integration ↔ External System
// ================================================================
idp.integrationLayer.intObservability -[syncs]-> grafana 'syncs from Grafana' {
  #sync
}

// ================================================================
// Integration → Blueprints
// ================================================================
idp.integrationLayer.intObservability -[syncs]-> idp.starObservability.logPipeline 'syncs logs' {
  #sync
}
idp.integrationLayer.intObservability -[syncs]-> idp.starObservability.metric 'syncs metrics' {
  #sync
}

// ================================================================
// Cross-star relations
// ================================================================
idp.starObservability.metric -[dependsOn]-> idp.starCatalog.technologyAsset 'monitors asset' {
  #dataFlow
}
```

### Step 5: Add C2 container view in `views/containers.c4`

The star should appear in the C2 capability overview. If the view uses `include *`, it will be auto-included. Otherwise, explicitly add it:

```c4
// In the capabilities view
view capabilities of idp {
  include *, starObservability
}
```

### Step 6: Add C3 component view in `views/components.c4`

Create a new view for the star's internal blueprints:

```c4
view starObservabilityView of idp.starObservability {
  title 'Observability Star'
  description 'Blueprints: logPipeline, metric, trace, alert'

  include *

  style logPipeline {
    color green
  }
  style metric {
    color green
  }
}
```

### Step 7: (Optional) Add dynamic journey views in `views/journeys.c4`

```c4
dynamic view developerMonitoring {
  title 'Developer: Monitoring & Alerting'
  description 'Developer checks observability dashboards'

  developer -> idp.starObservability 'checks monitoring dashboards' {
    notes 'Developer navigates to observability section'
  }
  idp.starObservability -> idp.starObservability.metric 'views metrics' {
    notes 'Prometheus metrics for the service'
  }
  idp.starObservability -> idp.starObservability.logPipeline 'views logs' {
    notes 'Centralized log pipeline'
  }
}
```

### Step 8: Validate

```bash
npm run validate
npm test
```

## Checklist for New Capability Star

- [ ] Star defined in `model.c4` with `capability` kind
- [ ] Blueprint file created in `blueprints/<name>.c4`
- [ ] At least one blueprint defined with `description` and `icon`
- [ ] Integration added in `model.c4` (if new external system)
- [ ] External system added in `model.c4` (if needed)
- [ ] Actor → Star relations in `relations.c4`
- [ ] Integration ↔ External System syncs in `relations.c4`
- [ ] Integration → Blueprint syncs in `relations.c4`
- [ ] Blueprint → Integration dataSource in blueprint file
- [ ] C2 container view updated in `views/containers.c4`
- [ ] C3 component view added in `views/components.c4`
- [ ] Dynamic journey views added (optional)
- [ ] `npm run validate` passes
- [ ] `npm test` passes

## Adding Blueprints to an Existing Star

To add new blueprints to an **existing** star, see the **blueprint-creation.md** guide. The process is simpler since the star infrastructure already exists.

## Editing a Capability Star

To modify an existing star:

1. **Rename**: Change variable name in `model.c4`, then update ALL references across `relations.c4`, blueprint files, and views
2. **Change description/icon**: Edit directly in `model.c4`
3. **Add blueprints**: See blueprint-creation.md
4. **Remove blueprints**: Delete from blueprint file, remove all relations in `relations.c4`, remove from views
5. **Always validate**: `npm run validate && npm test`
