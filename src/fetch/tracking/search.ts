import { env } from "@/env";

export function trackSearchString(str: string) {
  return fetch(
    `${env.DATA_MANAGEMENT_URL}/api/tracking/dignity-apparel/search`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: str }),
    }
  );
}
