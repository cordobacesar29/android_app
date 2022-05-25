import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.synagro7.app',
  appName: 'Synagro 7',
  webDir: 'build',
  bundledWebRuntime: false,
  hideLogs: true // para deshabilitar los logs por defecto de capacitor en ionic
};

export default config;
