import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/", // เมื่อเข้าหน้าหลัก
        destination: "/homelist", // เปลี่ยนเส้นทางไปยัง "/login"
        permanent: true, // true หมายถึงใช้การ redirect แบบ 301 (permanent)
      },
    ];
  },
};

export default nextConfig;
