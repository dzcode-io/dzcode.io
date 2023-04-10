export {};

declare global {
  export const bundleInfo: BundleInfo;
  interface Window {
    bundleInfo: {
      version: string;
      environment: "production" | "stage" | "development";
    };
  }
}
