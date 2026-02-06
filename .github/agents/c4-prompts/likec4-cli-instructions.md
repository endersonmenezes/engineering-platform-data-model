# LikeC4 CLI & Validation Instructions

## Critical Requirements

🚨 **ALWAYS validate after making changes to any `.c4` file**
🚨 **Run tests to ensure structural integrity**

## Available Commands

### Development

```bash
# Start dev server with hot-reload (opens browser)
npm run dev
```

This starts the LikeC4 development server with live preview. Changes to `.c4` files are reflected immediately.

### Validation

```bash
# Validate model syntax (dry-run build)
npm run validate
```

This runs `likec4 build --dry-run` to check for syntax errors without generating output. Use this after every change.

**What it validates:**
- LikeC4 DSL syntax
- Element references (all referenced elements must exist)
- Relation targets (source and target must exist)
- View references (included elements must exist)
- Tag references (must be defined in specification)
- Duplicate IDs

### Testing

```bash
# Run model validation tests (vitest)
npm test
```

This runs the test suite in `test/model.spec.ts` which validates:
- Model can be built successfully
- Expected elements exist
- Expected views exist
- Expected relations exist

### Building

```bash
# Build static site for deployment
npm run build
```

Generates a static website in the output directory configured in `likec4.config.mjs`.

### Exporting

```bash
# Export diagrams as images
npm run export
```

Exports all views as PNG/SVG images.

## Common Validation Errors

### Element Not Found

```
Error: Element 'idp.starVCS.nonExistent' not found
```

**Fix**: Check the element ID in the blueprint file. Ensure it's defined and the path is correct.

### Duplicate ID

```
Error: Duplicate element ID 'myElement'
```

**Fix**: Element IDs must be unique across the entire model. Rename one of the duplicates.

### Invalid Relation Target

```
Error: Relation target 'idp.starXxx.element' not found
```

**Fix**: The target element doesn't exist. Check:
1. The element is defined in its blueprint file
2. The `extend` block references the correct star
3. Full path is used in `relations.c4`

### Missing Description

```
Warning: Element 'myElement' has no description
```

**Fix**: Add a `description` property to the element.

### View Reference Error

```
Error: View includes element 'xxx' which doesn't exist
```

**Fix**: The view references an element that doesn't exist. Update the `include` list.

## Validation Workflow

### After Creating/Editing a Blueprint

```bash
npm run validate   # Check syntax
npm test           # Check structural integrity
```

### After Creating a New Star

```bash
npm run validate   # Check all files
npm test           # Verify star appears in model
npm run dev        # Visual verification (optional)
```

### After Editing relations.c4

```bash
npm run validate   # Check all relation targets
npm test           # Check structural integrity
```

### Before Committing

```bash
npm run validate && npm test
```

## LikeC4 Configuration

The `likec4.config.mjs` file configures the LikeC4 build:

```javascript
import { defineConfig } from 'likec4/config'

export default defineConfig({
  // Output directory for build
  outputDir: 'dist',
  // Base path for GitHub Pages deployment
  base: '/engineering-platform-data-model/',
})
```

## CI/CD Validation

The project has GitHub Actions workflows:

- **PR Validation** (`pr-validation.yml`): Runs `npm run validate` and `npm test` on every PR
- **Deploy Pages** (`deploy-pages.yml`): Builds and deploys to GitHub Pages on merge to main

## Troubleshooting

### "Command not found: likec4"

```bash
npm install  # Ensure dependencies are installed
npx likec4 --help  # Use npx if not in PATH
```

### Node.js version error

```bash
nvm use  # Switch to correct Node version from .nvmrc
# or
fnm use  # Using fnm
```

The project requires **Node.js 22+** (configured in `.nvmrc`).

### Model too large / slow preview

- Break very large views into focused sub-views
- Use `include` with specific elements instead of `include *` for complex stars
- Use `exclude` to remove irrelevant elements

### Hot-reload not working

```bash
# Restart the dev server
npm run dev
```

If hot-reload stops, restart the development server. LikeC4 watches all `.c4` files.
