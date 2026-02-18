---
name: c4-validation
description: Guide for validating the LikeC4 model, running tests, and CLI operations. Use when asked to validate, test, build, or check the Engineering Platform Data Model for errors.
---

# C4 Validation

## Available Commands

### Validation (syntax check)

```bash
npm run validate
```

Runs `likec4 build --dry-run` to check for syntax errors without generating output.

**What it validates:**
- LikeC4 DSL syntax
- Element references (all referenced elements must exist)
- Relation targets (source and target must exist)
- View references (included elements must exist)
- Tag references (must be defined in specification)
- Duplicate IDs

### Testing (structural integrity)

```bash
npm test
```

Runs the test suite in `test/model.spec.ts` which validates:
- Model can be built successfully
- Expected elements exist
- Expected views exist
- Expected relations exist

### Development Server

```bash
npm run dev
```

Starts the LikeC4 development server with live preview.

### Build

```bash
npm run build
```

Generates a static website.

## Common Errors and Fixes

| Error | Fix |
|-------|-----|
| `Element 'x' not found` | Check element ID and full path |
| `Duplicate element ID` | Rename one of the duplicates |
| `Invalid relation target` | Ensure target exists and path is correct |
| `Missing description` | Add `description` property |
| `View includes element 'x' which doesn't exist` | Update the `include` list |

## Workflow

1. **Run** `npm run validate`
2. **If errors**: Fix them with file and line references
3. **Run** `npm test`
4. **If failures**: Fix test names and errors
