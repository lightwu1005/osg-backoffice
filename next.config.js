const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        isGateway: (process.env.NODE_ENV === 'production' ? 'true' : 'false') ||
            (process.env.NODE_ENV === 'development' ? 'true' : 'false'),
        isMock: process.env.APP_ENV === 'mock' ? 'true' : 'false',
    },
    experimental: {
        middleware: true,
    },
    webpack: (config, { isServer }) => {
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.FUNCTIONALITY': JSON.stringify(process.env.FUNCTIONALITY)
            })
        );
        return config;
    },
    reactStrictMode: true,
}

module.exports = nextConfig;
