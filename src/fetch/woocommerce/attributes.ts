import { env } from "@/env";

//couldn't find any way to do this with WooGraphQL, and WC doesn't provide any way to get all attributes and their nested terms in one request.
//created a simple custom endpoint instead to return this nested structure.
export function getAttributes() {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(
    "Authorization",
    `Basic ${btoa(`${env.WORDPRESS_APPLICATION_USERNAME}:${env.WORDPRESS_APPLICATION_PASSWORD}`)}`
  );

  const requestOptions = {
    method: "GET",
    headers: headers,
  };
  return fetch(
    `${env.WOOCOMMERCE_STORE_URL}/wp-json/custom/v1/attributes`,
    requestOptions
  );
}
