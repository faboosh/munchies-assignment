"use server";

import { PriceRange } from "@/types";
import doFetch from "./fetch";

export async function getPriceRangeDetail(id: string) {
  return await doFetch<PriceRange>(`price-range/${id}`);
}
