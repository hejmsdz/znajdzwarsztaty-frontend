export function anyOfGroup(field: string, values: readonly string[]): string {
  return `(${values.map((value) => `${field} ?~ '${value}'`).join(' || ')})`;
}
