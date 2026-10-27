export const queryKeys = {
  workshopsSummary: (filtersString?: string) =>
    ['workshops', 'summary', filtersString] as const,
  workshopsFull: (filtersString?: string, page?: number) =>
    ['workshops', 'full', filtersString, page ?? 1] as const,
  workshop: (id: string) => ['workshop', id] as const,
  voivodeships: () => ['voivodeships'] as const,
  instructorsHead: (limit: number) => ['instructors', 'head', limit] as const,
  instructorsPages: (headNumItems: number, pageSize: number) =>
    ['instructors', 'pages', headNumItems, pageSize] as const,
} as const;
