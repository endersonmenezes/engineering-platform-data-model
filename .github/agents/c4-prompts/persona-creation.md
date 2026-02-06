# C4 Persona (Actor) Creation Guide

## Critical Requirements

🚨 **ALWAYS read `likec4/model.c4` and `likec4/relations.c4` before creating or editing personas**
🚨 **Personas require changes in 3+ files — follow ALL steps**
🚨 **ALWAYS validate with `npm run validate` after changes**

## Overview

Personas (actors) represent the different types of users who interact with the Internal Developer Portal. Each persona has specific capabilities they access and specific workflows (journeys) they follow.

## Current Personas (Port.io Aligned)

Based on [Port.io End User Personas](https://docs.getport.io/), the model has 6 personas:

| Persona | Variable | Port.io Role | Primary Stars | Journeys |
|---------|----------|-------------|---------------|----------|
| Application Developer | `developer` | Member | starTemplates, starCatalog, starVCS, starCICD, starArtifacts | developerOnboarding, developerSelfService, developerDailyWork |
| Platform Engineer | `platformEngineer` | Admin/Builder | starTemplates, integrationLayer, starResource, starCICD | platformEngineerTemplates, platformEngineerMultiCloud, platformEngineerIntegrations |
| Engineering Manager | `engineeringManager` | Member | starMetrics, starQuality, starOrganization, starGRC, starCatalog | engineeringManagerScorecard, engineeringManagerMetrics, engineeringManagerDelivery |
| Site Reliability Engineer | `sre` | Member | starCICD, starResource, starMetrics, starSecurity | sreReliability, sreIncidentResponse, sreOperations |
| Security Engineer | `securityEngineer` | Member | starSecurity, starGRC, starCatalog | securityEngineerPosture, securityEngineerIncident |
| Technology Executive | `executive` | Member | starMetrics, starGRC, starOrganization, starResource | executiveOverview, executiveGovernance |

## Persona Structure in model.c4

Personas are defined at the top level of the model, outside the `idp` system:

```c4
model {

  developer = actor 'Developer' {
    description 'Software engineer who uses the portal for daily development workflows'
    style {
      shape person
      color amber
    }
  }

  // ... other actors ...

  idp = system 'Internal Developer Portal' { ... }
}
```

## Complete Steps to Create a New Persona

### Step 1: Define the actor in `model.c4`

Add a new actor at the model root level (before the `idp` system):

```c4
model {

  // ... existing actors ...

  qaEngineer = actor 'QA Engineer' {
    description 'Quality assurance engineer who validates releases and manages test environments'
    style {
      shape person
      color amber
    }
  }

  // ... idp system ...
}
```

**Rules:**
- Variable name: `camelCase` (e.g., `qaEngineer`)
- Kind: `actor`
- Style: `shape person`, `color amber` (consistent with other personas)
- Must have `description`

### Step 2: Add capability relations in `relations.c4`

Define which stars the persona interacts with and link to their journey views:

```c4
// ================================================================
// QA Engineer → Capabilities
// ================================================================
idp.starQuality -> qaEngineer 'provides quality dashboards' {
  navigateTo qaEngineerQualityReview
}
idp.starCICD -> qaEngineer 'provides pipeline visibility' {
  navigateTo qaEngineerTestExecution
}
idp.starCatalog -> qaEngineer 'provides service catalog' {
  navigateTo qaEngineerServiceDiscovery
}
```

**Relation Pattern:**
- Direction: `idp.star* -> persona` (star provides value TO persona)
- Include `navigateTo` referencing the dynamic view ID
- Each relation represents a primary interaction

### Step 3: Create journey views in `views/journeys.c4`

Create at least one dynamic view for the persona:

```c4
// ================================================================
// QA Engineer Journeys
// ================================================================

dynamic view qaEngineerQualityReview {
  title 'QA Engineer: Quality Review'
  description 'QA Engineer reviews quality gates and test coverage for a service'

  qaEngineer -> idp 'navigates to Developer Portal' {
    notes 'QA Engineer accesses the portal to review quality metrics'
  }
  idp -> idp.starCatalog 'browses service catalog' {
    notes 'Finds the service to review'
  }
  idp.starCatalog -> idp.starQuality 'checks quality metrics' {
    notes 'Reviews code quality, test coverage, and quality gates'
  }
  idp.starQuality -> idp.starQuality.codeQuality 'views quality gate status' {
    notes 'SonarQube quality gate: passed/failed'
  }
  idp.starQuality -> idp.starQuality.testCoverage 'views test coverage' {
    notes 'Line coverage, branch coverage, test results'
  }
}

dynamic view qaEngineerTestExecution {
  title 'QA Engineer: Test Execution'
  description 'QA Engineer triggers and monitors test pipelines'

  qaEngineer -> idp.starCICD 'triggers test pipeline' {
    notes 'Starts integration/E2E test pipeline'
  }
  idp.starCICD -> idp.starCICD.pipelineRun 'executes tests' {
    notes 'Pipeline run with test stage'
  }
  idp.starCICD.pipelineRun -> idp.starQuality.testCoverage 'reports results' {
    notes 'Test results and coverage uploaded'
  }
}
```

### Step 4: Add to C1 landscape view (if not auto-included)

Check `views/landscape.c4` — if it uses `include *`, the persona is auto-included. Otherwise:

```c4
view index {
  include *, qaEngineer
}
```

### Step 5: Validate

```bash
npm run validate
npm test
```

## Editing an Existing Persona

### Change Description or Style

Edit directly in `model.c4`:

```c4
developer = actor 'Developer' {
  description 'Updated description for the developer persona'
  style {
    shape person
    color amber  // or change color
  }
}
```

### Add New Capability Access

Add a new relation in `relations.c4`:

```c4
// Give developer access to Feature Management
idp.starFeatures -> developer 'provides feature flags' {
  navigateTo developerFeatureFlags
}
```

Then create the corresponding journey in `views/journeys.c4`.

### Remove Capability Access

1. Remove the relation from `relations.c4`
2. Remove or update the corresponding journey from `views/journeys.c4`
3. Validate

## Persona Design Principles

1. **Clear responsibility**: Each persona has distinct, non-overlapping primary responsibilities
2. **Minimal overlap**: Shared capabilities (like starCatalog) are OK, but primary focus differs
3. **Journey-driven**: Every persona→capability relation should have at least one dynamic journey
4. **Real workflows**: Journeys should reflect actual day-to-day workflows
5. **Incremental access**: Start with minimum capabilities, add more as needed

## Current Persona Capability Matrix

| Capability | Developer | Platform Eng | Eng Manager | SRE | Security Eng | Executive |
|-----------|:---------:|:------------:|:-----------:|:---:|:------------:|:---------:|
| starCatalog | ✅ | ⬜ | ✅ | ⬜ | ✅ | ⬜ |
| starOrganization | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ✅ |
| starVCS | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| starCICD | ✅ | ✅ | ⬜ | ✅ | ⬜ | ⬜ |
| starResource | ⬜ | ✅ | ⬜ | ✅ | ⬜ | ✅ |
| starArtifacts | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| starSecurity | ⬜ | ⬜ | ⬜ | ✅ | ✅ | ⬜ |
| starQuality | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ⬜ |
| starMetrics | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ✅ |
| starFeatures | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| starTemplates | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| starGRC | ⬜ | ⬜ | ✅ | ⬜ | ✅ | ✅ |
| starDatabase | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| integrationLayer | ⬜ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |

## Checklist for New Persona

- [ ] Actor defined in `model.c4` with `actor` kind
- [ ] Has `description` and `style { shape person; color amber }`
- [ ] At least 2-3 capability relations in `relations.c4`
- [ ] Each relation has `navigateTo` pointing to a journey view
- [ ] At least 1 dynamic journey view in `views/journeys.c4`
- [ ] Appears in C1 landscape view
- [ ] `npm run validate` passes
- [ ] `npm test` passes
