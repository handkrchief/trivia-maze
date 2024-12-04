import type { Config } from 'jest';

const config: Config = {
  // Automatically clear mock calls, instances, contexts, and results before every test
  clearMocks: true,

  // Specify the Jest preset for TypeScript
  preset: 'ts-jest',

  // Use Node.js environment (use 'jsdom' for browser-like environment)
  testEnvironment: 'node',

  // Specify file extensions Jest will process
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Patterns Jest uses to detect test files
  testMatch: ['**/tests/**/*.ts', '**/?(*.)+(spec|test).ts'],

  // Transform TypeScript files using ts-jest
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  // Ignore transformation of node_modules except for special cases
  transformIgnorePatterns: ['node_modules'],
};

export default config;
