# C4 View Creation Guide

## Critical Requirements

🚨 **ALWAYS read the relevant view file before creating or editing views**
🚨 **C2 views show Stars, C3 views show Blueprints — NEVER mix levels**
🚨 **ALWAYS validate with `npm run validate` after changes**

## Overview

Views are visual representations of the architecture at different levels of detail. They follow the C4 Model methodology with four levels: System Context (C1), Container (C2), Component (C3), and Dynamic Views.

## View Files

| File | Level | Purpose |
|------|-------|---------|
| `views/landscape.c4` | C1 | IDP as black box + actors + external systems |
| `views/containers.c4` | C2 | 13 Capability Stars (NOT individual blueprints) |
| `views/components.c4` | C3 | Blueprints inside each star |
| `views/journeys.c4` | Dynamic | Persona workflow sequences |

## C1: System Context View

Shows the IDP as a single system with its actors and external systems.

```c4
views {
  view index {
    title 'Engineering Platform - System Context'
    description 'C1: The IDP as a black box with personas and external systems'

    include
      developer,
      platformEngineer,
      techLead,
      securityEngineer,
      idp,
      github,
      oci,
      azure,
      entraId

    style developer {
      color amber
    }
  }
}
```

**Rules:**
- Shows actors, the IDP system, and external systems
- Does NOT show internal capabilities or blueprints
- Audience: Everyone

## C2: Container View

Shows the 13 Capability Stars inside the IDP.

```c4
views {
  view capabilities of idp {
    title 'Engineering Platform - Capabilities'
    description 'C2: The 13 Capability Stars of the IDP'

    include *

    style starCatalog { color sky }
    style starVCS { color sky }
    // ... style for each star
  }
}
```

**Rules:**
- Shows stars as `capability` elements
- Shows the `integrationLayer`
- Does NOT show individual blueprints
- Audience: Architects

## C3: Component View

Shows the blueprints inside ONE specific star.

```c4
views {
  view starVCSView of idp.starVCS {
    title 'Version Control Star'
    description 'C3: Blueprints inside the Version Control capability'

    include *

    style repository { color green }
    style pullRequest { color green }
    style branch { color green }
  }
}
```

**Rules:**
- One view per star
- `of idp.starXxx` scopes the view to that star
- Shows all blueprints and their internal relations
- Audience: Developers

### Creating a C3 View for a New Star

```c4
view starObservabilityView of idp.starObservability {
  title 'Observability Star'
  description 'C3: Monitoring, logging, and alerting blueprints'

  include *

  style logPipeline { color green }
  style metric { color green }
  style trace { color green }
  style alert { color green }
}
```

## Dynamic Views

See **journey-creation.md** for detailed guidance on creating dynamic views.

## View Properties

### Required Properties

| Property | Required | Description |
|----------|----------|-------------|
| `title` | ✅ | Display title for the view |
| `description` | ✅ | Explanation of what the view shows |

### Optional Properties

| Property | Description |
|----------|-------------|
| `include` | Elements to include (use `*` for all children) |
| `exclude` | Elements to exclude |
| `style` | Visual styles for specific elements |

## Include/Exclude Patterns

### Include All Children

```c4
view myView of idp.starVCS {
  include *           // All direct children
}
```

### Include Specific Elements

```c4
view myView of idp.starVCS {
  include repository, pullRequest  // Only these
}
```

### Exclude Specific Elements

```c4
view myView of idp {
  include *
  exclude integrationLayer  // Everything except integrations
}
```

### Include with Expanding

```c4
view myView {
  include idp._         // IDP and its direct children
  include idp.**        // IDP and ALL nested children
}
```

## Style Properties

```c4
style elementName {
  color green         // Element color
  shape rectangle     // Element shape
  opacity 50%         // Transparency
}
```

### Available Colors

`amber`, `blue`, `green`, `indigo`, `muted`, `red`, `secondary`, `sky`, `slate`, `violet`

### Available Shapes

`person`, `rectangle`, `browser`, `cylinder`, `mobile`, `queue`, `storage`, `document`, `bucket`

## View Naming Conventions

| Level | Pattern | Examples |
|-------|---------|----------|
| C1 | `index` | `index` |
| C2 | `capabilities` | `capabilities` |
| C3 | `star<Name>View` | `starVCSView`, `starCICDView` |
| Dynamic | `personaAction` | `developerOnboarding`, `techLeadScorecard` |

## Adding Views for New Elements

### When adding a new star

1. The star auto-appears in C2 (if view uses `include *`)
2. Create a new C3 view in `components.c4`
3. Create journey views in `journeys.c4`

### When adding a new blueprint

1. The blueprint auto-appears in C3 (if view uses `include *`)
2. Add style for the new blueprint if needed

### When adding a new persona

1. The persona auto-appears in C1 (if view uses `include *`)
2. Create journey views in `journeys.c4`
3. Add style for the new persona in C1

## Validation Rules

1. View ID must be unique across all view files
2. `of` clause must reference an existing element
3. All elements in `include`/`exclude`/`style` must exist
4. Dynamic view steps must reference valid elements
5. `title` and `description` are required

## Checklist for New View

- [ ] Appropriate C4 level chosen
- [ ] View added to correct file (landscape/containers/components/journeys)
- [ ] `title` and `description` provided
- [ ] Elements included correctly (`include *` or specific list)
- [ ] Styles applied for visual clarity
- [ ] View ID follows naming convention
- [ ] `npm run validate` passes
