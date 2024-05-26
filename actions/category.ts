"use server";

import { APIError, Category, CategoryResponse } from "@/types";
import doFetch from "./fetch";

export async function getFilters() {
  return await doFetch<CategoryResponse>("filter");
}

export async function getFilterDetail(id: string) {
  return await doFetch<Category | APIError>(`filter/${id}`);
}
