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
  filterIds: string[];
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

export type DeliveryTime = {
  min: number;
  max: number;
  text: string;
};
