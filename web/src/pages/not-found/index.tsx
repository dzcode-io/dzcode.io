import React from "react";
import { Helmet } from "react-helmet-async";
import svg from "src/assets/svg/404.svg";
import { Link } from "src/components/link";
import { Locale, useLocale } from "src/components/locale";

// ts-prune-ignore-next
export default function Page(): JSX.Element {
  const { localize } = useLocale();
  return (
    <main className="flex justify-center">
      <Helmet>
        <title>{localize("notfound-title")}</title>
        <meta name="description" content={localize("notfound-description")} />
      </Helmet>
      <div className="text-center">
        <img src={svg} alt="404" className="m-auto w-1/2" />
        <Link href="/" className="btn btn-outline">
          <Locale notfound-back-home />
        </Link>
      </div>
    </main>
  );
}
