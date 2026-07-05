import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 מגביל כברירת מחדל ל-[75]; נדרש להתיר איכויות גבוהות במפורש
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
