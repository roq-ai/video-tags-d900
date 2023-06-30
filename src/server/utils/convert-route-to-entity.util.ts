const mapping: Record<string, string> = {
  businesses: 'business',
  keywords: 'keyword',
  tags: 'tag',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
