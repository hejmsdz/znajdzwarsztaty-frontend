export const queryKeys = {
  workshops: (filtersString?: string) => ['workshops', filtersString] as const,
  workshop: (id: string) => ['workshop', id] as const,
  instructorsHead: (limit: number) => ['instructors', 'head', limit] as const,
  instructorsPages: (headNumItems: number, pageSize: number) =>
    ['instructors', 'pages', headNumItems, pageSize] as const,
} as const;
