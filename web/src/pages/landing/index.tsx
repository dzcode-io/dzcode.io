import { Helmet } from "react-helmet-async";
import { Link } from "src/components/link";
import { Locale, useLocale } from "src/components/locale";
import React from "react";

// ts-prune-ignore-next
export default function Page(): JSX.Element {
  const { localize } = useLocale();

  return (
    <main className="flex flex-col self-center">
      <Helmet>
        <title>{localize("landing-title")}</title>
        <meta name="description" content={localize("landing-description")} />
      </Helmet>
      <div className="hero pb-40 pt-40">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold">
              <Locale landing-heading-title />
            </h1>
            <p className="py-6">
              <Locale landing-heading-subtitle />
            </p>
            <div className="flex flex-col gap-4 md:flex-row md:justify-center">
              <Link className="btn btn-primary" href="/projects">
                <Locale landing-cta-button-1 />
              </Link>
              <Link className="btn btn-link" href="/contribute">
                <Locale landing-cta-button-2 />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
