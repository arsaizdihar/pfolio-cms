import { GraphQLClient } from "graphql-request";

type RequestParam = {
  query: string;
  variables?: Record<string, any>;
  preview?: boolean;
};

export function request<T>({
  query,
  variables,
  preview,
}: RequestParam): Promise<T> {
  const endpoint = preview
    ? "https://graphql.datocms.com/preview"
    : "https://graphql.datocms.com";
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
  });
  return client.request(query, variables);
}
