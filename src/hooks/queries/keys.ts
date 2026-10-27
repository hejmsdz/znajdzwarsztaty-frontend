export const queryKeys = {
  workshopsSummary: (filtersString?: string) =>
    ['workshops', 'summary', filtersString] as const,
  workshopsFull: (filtersString?: string) =>
    ['workshops', 'full', filtersString] as const,
  workshop: (id: string) => ['workshop', id] as const,
  instructorsHead: (limit: number) => ['instructors', 'head', limit] as const,
  instructorsPages: (headNumItems: number, pageSize: number) =>
    ['instructors', 'pages', headNumItems, pageSize] as const,
} as const;
