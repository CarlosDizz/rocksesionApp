import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.rocksessions',
  appName: 'rocksessions-app',
  webDir: 'www',
  plugins: {
    Keyboard: {
      resize: 'body'  // o 'none' si aún falla, depende de tu layout
    }
  }
};

export default config;
