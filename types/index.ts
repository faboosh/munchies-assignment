export type APIError = {
  error: boolean;
  reason: string;
};

export type Category = {
  id: string;
  name: string;
  image_url: string;
};

export type CategoryResponse = {
  filters: Category[];
};

export type Restaurant = {
  id: string;
  name: string;
  rating: number;
  filter_ids: string[]; // incorrectly called filterIds in schema, actual response contains filter_ids
  image_url: string;
  delivery_time_minutes: number;
  price_range_id: string; // undocumented in API schema
};

export type RestaurantResponse = {
  restaurants: Restaurant[];
};

export type OpenStatus = {
  restaurant_id: string;
  is_open: boolean;
};

export type PriceRange = {
  id: string;
  range: string;
};

export enum DeliveryTimeEnum {
  ZeroToTen,
  TenToThirty,
  ThirtyToSixty,
  OneHourOrMore,
}

export type DeliveryTime = {
  id: DeliveryTimeEnum;
  min: number;
  max: number;
  text: string;
};
