"use server";

import { Restaurant, RestaurantResponse } from "@/types";
import doFetch from "./fetch";

export async function getRestaurants() {
  return doFetch<RestaurantResponse>("restaurants");
}

export async function getRestaurantDetail(id: string) {
  return doFetch<Restaurant>(`restaurants/${id}`);
}
