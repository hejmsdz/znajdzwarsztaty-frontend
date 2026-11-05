export function anyOfGroup(field: string, values: readonly string[]): string {
  return `(${values.map((value) => `${field} ?~ '${value}'`).join(' || ')})`;
}

export function anyFieldLike(fields: readonly string[], value: string): string {
  return `(${fields.map((field) => `${field} ?~ '${value}'`).join(' || ')})`;
}
