import { fullstackConfig } from "src/utils/config";

export const generateProjectsSitemap = async () => {
  return `<?xml version="1.0" encoding="UTF-8"?>${fullstackConfig.api.url}`;
};
