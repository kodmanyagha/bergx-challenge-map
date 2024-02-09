import { join } from 'path';

export function toJsonString(data: unknown) {
  return JSON.stringify(data, (_, v) => (typeof v === 'bigint' ? `${v}n` : v));
}

export function basePath(path: string): string {
  return join(process.cwd(), path);
}

export const bufferToString = (
  buffer: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>,
  encoding: BufferEncoding = 'utf-8',
) => {
  return Buffer.from(buffer).toString(encoding);
};
