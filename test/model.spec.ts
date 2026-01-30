import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'child_process';

describe('LikeC4 Model Validation', () => {
  beforeAll(() => {
    // Ensure the model compiles before running tests
    try {
      execSync('npx likec4 validate --dry-run', { stdio: 'pipe' });
    } catch (error) {
      console.error('Model validation failed during setup');
      throw error;
    }
  });

  describe('Model Structure', () => {
    it('should have valid syntax', () => {
      const result = execSync('npx likec4 validate --dry-run 2>&1', { encoding: 'utf-8' });
      expect(result).not.toContain('error');
    });

    it('should compile without errors', () => {
      expect(() => {
        execSync('npx likec4 validate --dry-run', { stdio: 'pipe' });
      }).not.toThrow();
    });
  });

  describe('Required Files', () => {
    it('should have specification.c4', () => {
      expect(() => {
        execSync('test -f likec4/specification.c4', { stdio: 'pipe' });
      }).not.toThrow();
    });

    it('should have model.c4', () => {
      expect(() => {
        execSync('test -f likec4/model.c4', { stdio: 'pipe' });
      }).not.toThrow();
    });

    it('should have relations.c4', () => {
      expect(() => {
        execSync('test -f likec4/relations.c4', { stdio: 'pipe' });
      }).not.toThrow();
    });
  });

  describe('Views', () => {
    it('should have landscape view', () => {
      expect(() => {
        execSync('test -f likec4/views/landscape.c4', { stdio: 'pipe' });
      }).not.toThrow();
    });

    it('should have containers view', () => {
      expect(() => {
        execSync('test -f likec4/views/containers.c4', { stdio: 'pipe' });
      }).not.toThrow();
    });

    it('should have components view', () => {
      expect(() => {
        execSync('test -f likec4/views/components.c4', { stdio: 'pipe' });
      }).not.toThrow();
    });

    it('should have journeys view', () => {
      expect(() => {
        execSync('test -f likec4/views/journeys.c4', { stdio: 'pipe' });
      }).not.toThrow();
    });
  });

  describe('Blueprints', () => {
    const blueprintFiles = [
      'catalog.c4',
      'organization.c4',
      'resource.c4',
      'templates.c4',
      'vcs.c4',
      'cicd.c4',
      'artifacts.c4',
      'security.c4',
      'quality.c4',
      'features.c4',
      'database.c4',
      'metrics.c4',
      'grc.c4'
    ];

    blueprintFiles.forEach(file => {
      it(`should have ${file}`, () => {
        expect(() => {
          execSync(`test -f likec4/blueprints/${file}`, { stdio: 'pipe' });
        }).not.toThrow();
      });
    });
  });
});
