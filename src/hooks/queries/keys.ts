export const queryKeys = {
  workshops: (filtersString?: string) => ['workshops', filtersString] as const,
  workshop: (id: string) => ['workshop', id] as const,
  instructors: () => ['instructors'] as const,
} as const;
