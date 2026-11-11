export function pick<T extends object, TKey extends keyof T>(
  obj: T | undefined,
  keys: TKey[],
): Pick<T, TKey> {
  const result: any = {};

  if (obj == undefined) {
    return result;
  }

  keys.forEach((key: TKey) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}
