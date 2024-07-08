export {};

declare global {
  interface Window {
    bundleInfo: {
      version: string;
    };
  }
}
