---
name: c4-journey-creation
description: Guide for creating and editing LikeC4 dynamic views (persona journey workflows). Use when asked to create user journeys, workflow sequences, or dynamic views in the Engineering Platform Data Model.
---

# C4 Journey Creation

## Critical Requirements

- ALWAYS read `likec4/views/journeys.c4` before creating journeys
- Journey IDs must match the `navigateTo` references in `relations.c4`
- ALWAYS validate with `npm run validate` after changes

## Overview

Dynamic views (journeys) represent persona workflows — step-by-step sequences showing how a persona interacts with the platform.

## Current Journeys

### Developer Journeys
| View ID | Title |
|---------|-------|
| `developerOnboarding` | Platform Onboarding |
| `developerSelfService` | Self-Service Creation |
| `developerDailyWork` | Daily Development |

### Platform Engineer Journeys
| View ID | Title |
|---------|-------|
| `platformEngineerTemplates` | Template Management |
| `platformEngineerMultiCloud` | Multi-Cloud Resources |
| `platformEngineerIntegrations` | Integration Management |

### Tech Lead Journeys
| View ID | Title |
|---------|-------|
| `techLeadScorecard` | Production Readiness |
| `techLeadMetrics` | DORA Metrics & Copilot |

### Security Engineer Journeys
| View ID | Title |
|---------|-------|
| `securityEngineerPosture` | Security Posture |
| `securityEngineerIncident` | Critical Alert Response |

## Journey Structure

```c4
dynamic view myJourneyId {
  title 'Persona: Journey Title'
  description 'Brief description of what the persona does'

  persona -> idp 'accesses the portal' {
    notes 'Persona navigates to the Internal Developer Portal'
  }
  idp -> idp.starCapability 'browses capability' {
    notes 'Details about what they see'
  }
  idp.starCapability -> idp.starCapability.blueprint 'interacts with entity' {
    notes 'Specific details about the interaction'
  }
}
```

### Journey with Parallel Steps

```c4
dynamic view myJourney {
  title 'Persona: Multi-path Journey'
  description 'Journey with parallel activities'

  persona -> idp 'starts workflow'

  parallel {
    idp -> idp.starCICD 'runs CI pipeline' {
      notes 'Build and test in parallel'
    }
    idp -> idp.starSecurity 'runs security scan' {
      notes 'SAST/DAST scanning'
    }
  }
}
```

## Journey Design Principles

1. **Tell a story**: Each journey should narrate a complete workflow
2. **One persona, one goal**: Focus on a single persona achieving one objective
3. **Include notes**: Every step should have `notes`
4. **3-8 steps**: Keep journeys focused
5. **Cross boundaries**: Show how multiple stars work together

## Naming Convention

Pattern: `personaNameAction`
- `developerOnboarding`
- `techLeadScorecard`
- `securityEngineerIncident`

## After Creating a Journey

Link it in `relations.c4` with a `navigateTo` reference:

```c4
idp.starCICD -> qaEngineer 'provides test pipelines' {
  navigateTo qaEngineerTestExecution
}
```

## Workflow

1. **Read** `likec4/views/journeys.c4`
2. **Read** `likec4/relations.c4`
3. **Create** dynamic view in `journeys.c4`
4. **Add** `navigateTo` reference in `relations.c4`
5. **Validate** with `npm run validate`
