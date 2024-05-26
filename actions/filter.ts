"use server";

import { Filter, FilterResponse } from "@/types";
import doFetch from "./fetch";

export async function getFilters() {
  return await doFetch<FilterResponse>("filter");
}

export async function getFilterDetail(id: string) {
  return await doFetch<Filter>(`filter/${id}`);
}
