// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.mp4$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/videos',
              outputPath: `${isServer ? '../' : ''}static/videos`,
              name: '[name].[hash].[ext]',
            },
          },
        ],
      });
  
      return config;
    },
    images: {
      domains: ['res.cloudinary.com'],
      formats: ['image/avif', 'image/webp'],
    },
     async headers() {
    return [
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'inline',
          },
        ],
      },
    ];
  },
    compiler: {
      removeConsole:  process.env.NEXT_PUBLIC_ENV =='production' ? true : false,
    },
  };
  
  
export default nextConfig;
