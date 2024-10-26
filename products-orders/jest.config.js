globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: 'tsconfig.spec.json',
};

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|ngx-socket-io)' // Añade otros paquetes que necesiten ser transformados
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: {
        before: [
          'jest-preset-angular/build/InlineFilesTransformer',
          'jest-preset-angular/build/StripStylesTransformer'
        ]
      }
    }
  }
};

