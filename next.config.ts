import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // 빌드 산출물의 경로 prefix 설정
  // assetPrefix: './',

  // 만약 하위 디렉터리에 배포할 경우 basePath 설정
  // 예: https://example.com/portfolio 에 배포할 경우
  basePath: '/portfolio',
  assetPrefix: '/portfolio/',
  
  // compress: false,
  // distDir: 'out/portfolio',
  // output: 'export',
  // productionBrowserSourceMaps: true,
  // reactStrictMode: true,
  // swcMinify: false,
  // trailingSlash: true,
  // images: {
  //   unoptimized: true
  // }
};

export default nextConfig;
