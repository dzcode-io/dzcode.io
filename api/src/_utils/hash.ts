import { createHash } from "crypto";

export function generateShortHash(input: string): string {
  const hash = createHash("sha256").update(input).digest("hex");
  return hash.substring(0, 16); // First 16 chars (64 bits) should be sufficient
}
