import logoSquare from "src/assets/svg/logo-square.svg";
import { Image } from "src/components/image";
import { Link } from "src/components/link";

import { Locale } from "./locale";
import { DictionaryKeys } from "./locale/dictionary";

interface FooterProps {
  sections: Array<{
    localeKey: DictionaryKeys<"footer">;
    links: Array<{
      localeKey: DictionaryKeys<"footer">;
      href: string;
    }>;
  }>;
}

export function Footer({ sections }: FooterProps): JSX.Element {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="footer m-auto max-w-7xl p-10">
        {sections.map(({ localeKey, links }, sectionIndex) => (
          <nav key={`section-${sectionIndex}`}>
            <h6 className="footer-title">
              <Locale localeKey={localeKey} />
            </h6>
            {links.map(({ localeKey, href }, linkIndex) => (
              <Link key={`link-${linkIndex}`} className="link-hover link" href={href}>
                <Locale localeKey={localeKey} />
              </Link>
            ))}
          </nav>
        ))}
        <aside>
          <Image src={logoSquare} alt="DzCode i/o SVG log square" width={80} height={80} />
          <p className="pl-2">
            <Locale global-algeria-codes />
          </p>
          <p className="pl-2">
            <Locale landing-heading-title />
          </p>
        </aside>
      </div>
    </footer>
  );
}
