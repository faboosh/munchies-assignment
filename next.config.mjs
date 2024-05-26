/** @type {import('next').NextConfig} */
import path from "path";
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(import.meta.dirname, "styles")],
  },
};

export default nextConfig;
