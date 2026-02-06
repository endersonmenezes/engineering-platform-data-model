# C4 Journey (Dynamic View) Creation Guide

## Critical Requirements

🚨 **ALWAYS read `likec4/views/journeys.c4` before creating journeys**
🚨 **Journey IDs must match the `navigateTo` references in `relations.c4`**
🚨 **ALWAYS validate with `npm run validate` after changes**

## Overview

Dynamic views (journeys) represent persona workflows — step-by-step sequences showing how a persona interacts with the platform. They are the most expressive views in the model, telling a **story** about how the platform is used.

## Current Journeys

### Developer Journeys
| View ID | Title | Steps |
|---------|-------|-------|
| `developerOnboarding` | Platform Onboarding | SSO → GitHub mapping → team join → catalog discovery |
| `developerSelfService` | Self-Service Creation | Template → scaffold → repository → pipeline → deploy |
| `developerDailyWork` | Daily Development | Code → PR → review → pipeline → deploy |

### Platform Engineer Journeys
| View ID | Title | Steps |
|---------|-------|-------|
| `platformEngineerTemplates` | Template Management | Create → test → publish → scaffold |
| `platformEngineerMultiCloud` | Multi-Cloud Resources | OCI + Azure provisioning |
| `platformEngineerIntegrations` | Integration Management | Configure → sync → validate |

### Tech Lead Journeys
| View ID | Title | Steps |
|---------|-------|-------|
| `techLeadScorecard` | Production Readiness | Quality → security → coverage → scorecard |
| `techLeadMetrics` | DORA Metrics & Copilot | Engineering metrics → trends → actions |

### Security Engineer Journeys
| View ID | Title | Steps |
|---------|-------|-------|
| `securityEngineerPosture` | Security Posture | Scorecard → alerts → remediation |
| `securityEngineerIncident` | Critical Alert Response | Alert → triage → investigation → remediation |

## Journey Structure

### Basic Journey

```c4
dynamic view myJourneyId {
  title 'Persona: Journey Title'
  description 'Brief description of what the persona does'

  // Step 1: Entry point
  persona -> idp 'accesses the portal' {
    notes 'Persona navigates to the Internal Developer Portal'
  }

  // Step 2: Navigate to capability
  idp -> idp.starCapability 'browses capability' {
    notes 'Details about what they see'
  }

  // Step 3: Interact with blueprint
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

  idp.starCICD -> idp.starCICD.deployment 'deploys if all pass' {
    notes 'Only deploys if both CI and security pass'
  }
}
```

### Journey with Cross-Star Flow

```c4
dynamic view crossStarJourney {
  title 'Developer: Full Development Cycle'
  description 'End-to-end from code to production'

  developer -> idp.starVCS 'pushes code' {
    notes 'Pushes to feature branch'
  }
  idp.starVCS -> idp.starVCS.pullRequest 'creates PR' {
    notes 'PR triggers automated checks'
  }
  idp.starVCS.pullRequest -> idp.starCICD.ciPipeline 'triggers CI' {
    notes 'CI pipeline starts automatically'
  }
  idp.starCICD.ciPipeline -> idp.starCICD.pipelineRun 'executes pipeline' {
    notes 'Build, test, security scan'
  }
  idp.starCICD.pipelineRun -> idp.starQuality.codeQuality 'reports quality' {
    notes 'SonarQube results posted to PR'
  }
  idp.starCICD.pipelineRun -> idp.starCICD.deployment 'deploys' {
    notes 'Auto-deploy to staging'
  }
}
```

## Journey Design Principles

1. **Tell a story**: Each journey should narrate a complete workflow from start to finish
2. **One persona, one goal**: Each journey focuses on a single persona achieving one objective
3. **Include notes**: Every step should have `notes` explaining what happens
4. **Follow the arrows**: Steps flow naturally from entry to completion
5. **Cross boundaries**: Good journeys show how multiple stars work together
6. **Real scenarios**: Base journeys on actual day-to-day activities
7. **3-8 steps**: Keep journeys focused; too many steps lose clarity

## Step-by-Step Creation

### Step 1: Define the journey ID

Choose a descriptive `camelCase` ID following the pattern: `personaNameAction`

Examples:
- `developerOnboarding`
- `techLeadScorecard`
- `securityEngineerIncident`
- `qaEngineerTestExecution`

### Step 2: Write the dynamic view

```c4
dynamic view qaEngineerTestExecution {
  title 'QA Engineer: Test Execution'
  description 'QA Engineer triggers test pipeline and reviews results'

  qaEngineer -> idp 'accesses portal' {
    notes 'QA navigates to the Internal Developer Portal'
  }
  idp -> idp.starCatalog 'finds service' {
    notes 'Searches for the service to test'
  }
  idp.starCatalog -> idp.starCICD 'opens CI/CD' {
    notes 'Navigates to pipeline section'
  }
  idp.starCICD -> idp.starCICD.ciPipeline 'triggers test pipeline' {
    notes 'Runs integration test suite'
  }
  idp.starCICD.ciPipeline -> idp.starCICD.pipelineRun 'pipeline executes' {
    notes 'Tests run in CI environment'
  }
  idp.starCICD.pipelineRun -> idp.starQuality.testCoverage 'reports coverage' {
    notes 'Test results and coverage metrics'
  }
}
```

### Step 3: Link in relations.c4

Add a `navigateTo` reference from the capability→persona relation:

```c4
idp.starCICD -> qaEngineer 'provides test pipelines' {
  navigateTo qaEngineerTestExecution
}
```

### Step 4: Validate

```bash
npm run validate
npm test
```

## Notes Best Practices

Notes should explain:
- **What** the persona sees or does
- **Why** this step matters
- **What data** is involved
- **Integration details** (which external system is involved)

```c4
// ✅ Good notes
developer -> idp.starVCS.pullRequest 'creates pull request' {
  notes 'PR triggers GitHub Actions CI pipeline, code review by team, and automated security scan via CodeQL'
}

// ❌ Bad notes (too vague)
developer -> idp.starVCS.pullRequest 'creates PR' {
  notes 'Creates a PR'
}
```

## Validation Rules

1. Journey ID must be unique across all views
2. Journey ID must match `navigateTo` references in `relations.c4`
3. All referenced elements must exist in the model
4. Steps must use valid element paths
5. Dynamic views must have `title` and `description`
6. `notes` are optional but strongly recommended

## Checklist for New Journey

- [ ] Descriptive `camelCase` view ID
- [ ] `title` in format `'Persona: Action Description'`
- [ ] `description` explaining the workflow
- [ ] 3-8 steps with clear progression
- [ ] `notes` on each step explaining what happens
- [ ] `navigateTo` reference added in `relations.c4`
- [ ] All element references use correct full paths
- [ ] `npm run validate` passes
