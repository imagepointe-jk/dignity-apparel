//make TS treat all as defined, but immediately check the values at runtime
export const env = {
  WOOCOMMERCE_API_KEY: process.env.WOOCOMMERCE_API_KEY!,
  WOOCOMMERCE_API_SECRET: process.env.WOOCOMMERCE_API_SECRET!,
  WOOCOMMERCE_STORE_URL: process.env.WOOCOMMERCE_STORE_URL!,
  WORDPRESS_APPLICATION_USERNAME: process.env.WORDPRESS_APPLICATION_USERNAME!,
  WORDPRESS_APPLICATION_PASSWORD: process.env.WORDPRESS_APPLICATION_PASSWORD!,
  SIMPLE_CACHE_TIME: +process.env.SIMPLE_CACHE_TIME!,
  DEVELOPER_PASSWORD: process.env.DEVELOPER_PASSWORD!,
  REDIS_URL: process.env.REDIS_URL!,
};

for (const [key, value] of Object.entries(env)) {
  if (value === undefined) {
    throw new Error(`Missing envioronment variable "${key}"!`);
  }
}
