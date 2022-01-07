import { GraphQLClient } from "graphql-request";

type RequestParam = {
  query: string;
  variables?: Record<string, any>;
  preview?: boolean;
};
const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

export function request<T>({
  query,
  variables,
  preview,
}: RequestParam): Promise<T> {
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${
        preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN
      }`,
    },
  });
  return client.request(query, variables);
}
