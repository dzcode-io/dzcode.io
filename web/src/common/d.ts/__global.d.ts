export {};

declare global {
  interface Window {
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/command-queue-reference#adding-commands-to-the-queue
    ga: (command: string, ...fields: Array<string>) => void;
    fbq: (command: string, ...fields: Array<string>) => void;
    FB: { XFBML: { parse: () => void } };
  }
}
