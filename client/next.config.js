/** @type {import('next').NextConfig} */

POLL_INTERVAL_IN_MILLISECONDS = 300;

const nextConfig = {
  webpack: (config) => {
    if (config.watchOptions.poll) {
      config.watchOptions.poll = POLL_INTERVAL_IN_MILLISECONDS;
    }
    return config;
  },
};

module.exports = nextConfig;
