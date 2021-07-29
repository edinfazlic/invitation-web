export function getKey(storageKey: string, prefix = ''): string {
  return (prefix ? prefix + '_' : '') + storageKey;
}
