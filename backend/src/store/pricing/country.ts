export type PricedCountry = 'USA' | 'Bolivia' | 'India' | 'Other';

export function normalizeCountry(raw: string): PricedCountry {
  const key = raw.trim().toLowerCase();
  if (
    key === 'usa' ||
    key === 'united states' ||
    key === 'united states of america'
  ) {
    return 'USA';
  }
  if (key === 'bolivia') {
    return 'Bolivia';
  }
  if (key === 'india') {
    return 'India';
  }
  return 'Other';
}
