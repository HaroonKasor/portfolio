import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Haroon Kasor — Full-stack Developer",
    short_name: "Haroon Kasor",
    description:
      "Junior Developer @ Learn Tech · Next.js, React, Spring Boot · Bangkok",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF9F6",
    theme_color: "#1C70E6",
    icons: [{ src: "/icon", sizes: "32x32", type: "image/png" }],
  };
}
