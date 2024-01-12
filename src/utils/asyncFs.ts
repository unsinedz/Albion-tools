import { writeFile } from "fs";

export function writeFileAsync(fileName: string, content: string): Promise<void> {
  return new Promise((res) => writeFile(fileName, content, () => res()));
}