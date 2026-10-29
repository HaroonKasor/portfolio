import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Case studies retired in the 2026 redesign. Old links (CVs, search results)
// land on the home page's Work section instead of a 404.
const RETIRED_PROJECTS = ['learntech-lms', 'membership-booking', 'obec-vr-learning'];

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return RETIRED_PROJECTS.flatMap((slug) => [
      { source: `/projects/${slug}`, destination: '/#work', permanent: true },
      { source: `/th/projects/${slug}`, destination: '/th#work', permanent: true },
      { source: `/en/projects/${slug}`, destination: '/#work', permanent: true },
    ]);
  },
};

export default withNextIntl(nextConfig);
