"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Blog from "./Blog";

export default function BlogPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";

  useEffect(() => {
    const cap = capitalize(category);
    const title =
      cap.toLowerCase() === "news"
        ? `${cap} - Hire Arrive`
        : cap
        ? `${cap} Blogs - Hire Arrive`
        : "Blogs - Hire Arrive";

    document.title = title;
  }, [category]);

  return <Blog />;
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
