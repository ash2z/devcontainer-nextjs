import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './', // Next.js project root directory
})

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom', // Simulate a browser environment using jsdom
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Setting up a custom matcher

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Setting up alias
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transforming TypeScript files with ts-jest
  },
  // Exclude the tests folder which contains standalone scripts
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/tests/', // Exclude tests folder with standalone scripts
  ],
  // Only run tests from src folder
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
}

module.exports = createJestConfig(customJestConfig)
