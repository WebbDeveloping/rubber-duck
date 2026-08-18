export const DUCK_COLORS = ['Red', 'Green', 'Yellow', 'Black'] as const;
export const DUCK_SIZES = ['XLarge', 'Large', 'Medium', 'Small', 'XSmall'] as const;

export type DuckColor = (typeof DUCK_COLORS)[number];
export type DuckSize = (typeof DUCK_SIZES)[number];

export type Duck = {
  id: number;
  color: DuckColor;
  size: DuckSize;
  price: number;
  quantity: number;
};

export type CreateDuckInput = {
  color: DuckColor;
  size: DuckSize;
  price: number;
  quantity: number;
};

export type UpdateDuckInput = {
  price?: number;
  quantity?: number;
};
