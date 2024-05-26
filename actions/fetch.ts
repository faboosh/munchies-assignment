"use server";

const baseURL = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api";

export default async function doFetch<T>(url: string) {
  return (await fetch(`${baseURL}/${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())) as Promise<T>;
}
