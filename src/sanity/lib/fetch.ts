import { createClient } from "next-sanity";

const client =createClient({
    projectId : "apl974qz",
    dataset : "production",
    useCdn : true,
    apiVersion : "2023-10-10"
})

export async function sanityFetch({
    query,
    params = {},
  }: {
    query: string;
    params?: Record<string, unknown>;
  }) {
    return await client.fetch(query, params);
  }
  