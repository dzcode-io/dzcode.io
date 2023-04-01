export {};

declare global {
  export const bundleInfo: BundleInfo;
  interface Window {
    bundleInfo: {
      version: string;
    };
  }
}
