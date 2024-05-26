"use server";

import { OpenStatus } from "@/types";
import doFetch from "./fetch";

export async function getOpenDetail(id: string) {
  return await doFetch<OpenStatus>(`open/${id}`);
}
