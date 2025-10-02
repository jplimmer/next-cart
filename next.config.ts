import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '*',
      } /* This is needed since we can not track every possible endpoints that user randomly uploads,
                            malicious svg for example will be blocked by nextjs anyway (if we dont enable to allow it) ... */,
    ],
  },
};

export default nextConfig;
