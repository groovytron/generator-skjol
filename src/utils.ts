import path from "path";
import { fileURLToPath } from "url";

export function getFilename(metaUrl: string): string {
  return fileURLToPath(metaUrl);
}

export function getDirname(metaUrl: string): string {
  return path.dirname(getFilename(metaUrl));
}
