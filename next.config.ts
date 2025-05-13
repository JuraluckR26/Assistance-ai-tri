import type { NextConfig } from "next";
const createNextIntlPlugin = require("next-intl/plugin")

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: true,
      },
    ]
  },
};

export default withNextIntl(nextConfig)