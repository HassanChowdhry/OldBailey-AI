/** @type {import('next').NextConfig} */

import path from 'path';
const __dirname = import.meta.dirname;

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
};

export default nextConfig;
