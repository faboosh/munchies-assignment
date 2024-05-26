export type APIError = {
  error: boolean;
  reason: string;
};

export type Filter = {
  id: string;
  name: string;
  image_url: string;
};

export type FilterResponse = {
  filters: Filter[];
};

export type Restaurant = {
  id: string;
  name: string;
  rating: number;
  filterIds: string[];
  image_url: string;
  delivery_time_minutes: number;
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
