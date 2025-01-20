import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      all: true,
      exclude: ['**/*.spec.ts', 'stacks/flightcheck.cloud.ts', 'src/types/**'],
      include: ['src', 'stacks'],
    },
    poolOptions: { pool: 'forks' },
    server: {
      deps: {
        inline: ['vitest-mock-process'],
      },
    },
  },
});
