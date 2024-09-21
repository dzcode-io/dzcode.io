import React from "react";

export interface FooterProps {
  sections: Array<{
    localeKey: string;
    links: Array<{
      localeKey: string;
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
            <span className="footer-title">{localeKey}</span>
            {links.map(({ localeKey, href }, linkIndex) => (
              <a key={`link-${linkIndex}`} className="link-hover link" href={href}>
                {localeKey}
              </a>
            ))}
          </nav>
        ))}
        <aside>
          <p className="pl-2">global-algeria-codes</p>
          <p className="pl-2">landing-heading-title</p>
        </aside>
      </div>
    </footer>
  );
}
