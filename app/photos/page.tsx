import React from "react";
import type { Metadata } from "next";
import { ImageGrid } from "app/components/image-grid";

export const metadata: Metadata = {
  title: "Photos",
  description: "My Photos",
};

export default function Photos() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium tracking-tight">Photos</h1>
      <ImageGrid
        columns={3}
        images={[
          {
            src: "",
            alt: "",
            href: "",
          },
          {
            src: "",
            alt: "",
            href: "",
          },
          {
            src: "",
            alt: "",
            href: "",
          },
          {
            src: "",
            alt: "",
            href: "",
          },
          {
            src: "",
            alt: "",
            href: "",
          },
          {
            src: "",
            alt: "",
            href: "",
          },
        ]}
      />

      <ImageGrid
        columns={2}
        images={[
          { src: "", alt: "" },
          { src: "", alt: "" },
          { src: "", alt: "" },
          { src: "", alt: "" },
        ]}
      />

      <ImageGrid
        columns={4}
        images={[
          { src: "", alt: "" },
          { src: "", alt: "" },
          { src: "", alt: "" },
          { src: "", alt: "" },
          { src: "", alt: "" },
          { src: "", alt: "" },
        ]}
      />
    </section>
  );
}
