"use server";

import { APIError, PriceRange } from "@/types";
import doFetch from "./fetch";

export async function getPriceRanges() {
  return await doFetch<PriceRange[]>(`price-range`); // Undocumented endpoint
}

export async function getPriceRangeDetail(id: string) {
  return await doFetch<PriceRange | APIError>(`price-range/${id}`);
}
