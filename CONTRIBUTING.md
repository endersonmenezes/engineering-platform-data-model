# Contributing to Engineering Platform Data Model

Thank you for your interest in contributing! This guide covers the **process** for contributing. For architecture details, file organization, naming conventions, and common tasks, see [AGENTS.md](AGENTS.md).

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **22+** (see `.nvmrc`)
- [LikeC4 VS Code Extension](https://marketplace.visualstudio.com/items?itemName=likec4.likec4-vscode) (recommended)

### Setup

```bash
# Fork the repository and clone your fork
git clone https://github.com/YOUR_USERNAME/engineering-platform-data-model.git
cd engineering-platform-data-model
nvm use && npm install
npm run dev       # Dev server with hot-reload
npm run validate  # Syntax check
npm test          # Model validation tests
```

### AI-Assisted Contributing

This repository is **AI First**. If you use GitHub Copilot in VS Code:

1. Select the **"C4 Platform Architect"** custom agent for guided editing
2. Copilot automatically loads project context via `.github/copilot-instructions.md`
3. Structured guides in `.github/agents/c4-prompts/` cover every operation type

### LikeC4 Resources

- [Tutorial](https://likec4.dev/tutorial/) · [DSL Reference](https://likec4.dev/dsl/intro/) · [CLI Reference](https://likec4.dev/tooling/cli/) · [Views](https://likec4.dev/dsl/views/) · [Validation](https://likec4.dev/guides/validate-your-model/)

## What Can I Contribute?

See [AGENTS.md — Common Tasks](AGENTS.md#common-tasks) for which files to edit for each type of change. Common contributions:

- **Add a blueprint** to an existing capability star
- **Add a new capability star** (new domain)
- **Add a persona** and their journey views
- **Add an integration** (new external system connector)
- **Add or improve views** (C1/C2/C3/Dynamic)
- **Fix or improve relations** between elements

## Key Rules

> Full details in [AGENTS.md — Critical Rules](AGENTS.md#critical-rules)

## Style Guidelines

### .c4 Files

- Identifiers in `camelCase`, 2-space indentation
- Comments in English, group related elements together
- Stars: `starCamelCase` · Integrations: `intCamelCase` · Views: `personaAction`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Usage |
|--------|-------|
| `feat:` | New blueprint, star, persona, view |
| `fix:` | Bug fixes |
| `docs:` | Documentation changes |
| `refactor:` | Code refactoring |
| `test:` | Adding or updating tests |

## Troubleshooting

### Integration → Blueprint navigation not working

Ensure **bidirectional relations** exist:

```c4
// ✅ Both directions
idp.integrationLayer.intGitHub -[syncs]-> idp.starVCS.repository 'syncs repos'
idp.starVCS.repository -[dataSource]-> idp.integrationLayer.intGitHub { #dataFlow }
```

### Model validation fails

1. Check syntax in recently edited `.c4` files
2. Ensure all referenced elements exist with full namespace paths
3. Run `npm run dev` for detailed error messages with line numbers

### Views not showing elements

1. Check `include` statements in the view
2. Verify elements are within the correct namespace
3. See [LikeC4 Views Documentation](https://likec4.dev/dsl/views/)

## Pull Request Process

1. **Fork** the repository
2. **Branch**: `git checkout -b feature/your-feature-name`
3. **Change**: edit `.c4` files following [AGENTS.md](AGENTS.md) guidelines
4. **Validate**:
   ```bash
   npm run validate && npm test && npm run build
   ```
5. **Commit** using conventional commits
6. **Push** and open a Pull Request with:
   - Clear description of changes
   - Reference to related issues
   - Screenshots for visual changes (use `npm run export` to generate diagrams)

## Reporting Issues

1. Check [existing issues](../../issues) first
2. [Create a new issue](../../issues/new) with a clear title, description, and steps to reproduce

## Questions?

[Discussions](../../discussions) · [Issues](../../issues) with the "question" label

Thank you for contributing! 🎉
