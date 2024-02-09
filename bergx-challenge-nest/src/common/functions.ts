import { join } from 'path';

export function toJsonString(data: unknown) {
  return JSON.stringify(data, (_, v) => (typeof v === 'bigint' ? `${v}n` : v));
}

export function basePath(path: string): string {
  return join(process.cwd(), path);
}
