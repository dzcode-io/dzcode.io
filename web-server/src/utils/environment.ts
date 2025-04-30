import { environments } from "@dzcode.io/utils/dist/config/environment";

export const getEnv = () => {
  let stage = process.env.STAGE;
  if (!environments.includes(stage)) {
    console.log(`No STAGE provided, falling back to "development"`);
    stage = "development";
  }

  return stage;
};
