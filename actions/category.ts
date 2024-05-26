"use server";

import { APIError, Category, CategoryResponse } from "@/types";
import doFetch from "./fetch";

export async function getCategories() {
  return await doFetch<CategoryResponse>("filter");
}

export async function getCategoryDetail(id: string) {
  return await doFetch<Category | APIError>(`filter/${id}`);
}
