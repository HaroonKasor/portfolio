import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Haroon Kasor — Developer",
    short_name: "Haroon Kasor",
    description:
      "Junior Developer @ Learn Tech · Next.js, React, Spring Boot · Bangkok",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF9F6",
    theme_color: "#1565D8",
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png" },
      { src: "/icon/512", sizes: "512x512", type: "image/png" },
    ],
  };
}
