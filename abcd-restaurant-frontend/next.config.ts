import type { NextConfig } from "next";
import os from "os";

// Collect all local IPv4 addresses to allow access from any phone/tablet on LAN
const getLocalDevOrigins = (): string[] => {
  const origins: string[] = [
    "localhost",
    "localhost:3000",
    "127.0.0.1",
    "127.0.0.1:3000",
    "*.local",
    
  ];
  try {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      const addrs = interfaces[name];
      if (addrs) {
        for (const addr of addrs) {
          if (addr.family === "IPv4" || (addr as unknown as { family: number }).family === 4) {
            origins.push(addr.address);
            origins.push(`${addr.address}:3000`);
          }
        }
      }
    }
  } catch {
    // ignore
  }
  return Array.from(new Set(origins));
};

const nextConfig: NextConfig = {
  allowedDevOrigins: getLocalDevOrigins(),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;



