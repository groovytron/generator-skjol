import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  moduleDirectories: ["node_modules", "src"],
  transform: {
    '^.+\\.spec.ts$': 'ts-jest',
  },
};

export default config;
