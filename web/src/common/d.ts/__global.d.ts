export {};

declare global {
  interface Window {
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/command-queue-reference#adding-commands-to-the-queue
    ga: (command: string, ...fields: Array<Record<string, unknown>>) => void;
    fbq: (command: string, ...fields: Array<Record<string, unknown>>) => void;
    FB: Record<string, unknown>;
  }
}
