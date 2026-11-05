import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "Error 404 wak",
};

export default function NotFound() {
  return (
    <section>
      <h1 className="type-display mb-8 text-[clamp(1.6rem,4.4vw,2.35rem)]">
        404 - Page not found ^_^
      </h1>
      <p className="mb-4">
        Oops! The page you're looking for doesn't seem to exist.
      </p>
    </section>
  );
}
