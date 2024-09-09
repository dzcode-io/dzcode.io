export const environments = ["development", "staging", "production"] as const;

export type Environment = (typeof environments)[number];
