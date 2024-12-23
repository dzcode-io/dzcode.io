import React from "react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import logoWide from "src/assets/svg/logo-wide.svg";
import logoWideExtended from "src/assets/svg/logo-wide-extended.svg";
import { Image } from "src/components/image";
import { Link } from "src/components/link";
import { Locale, useLocale } from "src/components/locale";
import { DictionaryKeys } from "src/components/locale/dictionary";
import { changeLanguage } from "src/redux/actions/settings";
import { useAppSelector } from "src/redux/store";
import { stripLanguageCodeFromHRef } from "src/utils/website-language";

import { Language, Languages } from "./locale/languages";

export interface TopBarProps {
  version: string;
  links: Array<{ localeKey: DictionaryKeys<"navbar-section">; href: string }>;
}

export function TopBar({ version, links }: TopBarProps): JSX.Element {
  const { pathname } = useLocation();
  const languageLessPathname = useMemo(() => stripLanguageCodeFromHRef(pathname), [pathname]);
  const activeIndex = useMemo(() => {
    return links.findIndex(({ href }) => languageLessPathname.startsWith(href));
  }, [languageLessPathname, links]);

  const selectedLanguageCode = useAppSelector((state) => state.settings.languageCode);

  const { selectedLanguage, languageOptions } = useMemo(() => {
    let selectedLanguage!: Language;
    const languageOptions: Array<Language> = [];
    Languages.forEach((language) => {
      if (language.code === selectedLanguageCode) selectedLanguage = language;
      else languageOptions.push(language);
    });
    return { selectedLanguage, languageOptions };
  }, [selectedLanguageCode]);

  const { localize } = useLocale();

  return (
    <div className="bg-neutral">
      <div className="m-auto flex max-w-7xl flex-row gap-4 p-4">
        <Link href={"/"} className="flex lg:hidden">
          <Image
            className="-mt-6 h-9 w-auto self-center"
            src={logoWideExtended}
            alt="DzCode i/o SVG Logo wide"
          />
        </Link>
        <Link href={`https://github.com/dzcode-io/dzcode.io/releases/tag/${version}`}>
          {version}
        </Link>
        <div className="flex-1" />
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder={localize("navbar-section-search")} />
          <kbd className="kbd kbd-sm">⌘</kbd>
          <kbd className="kbd kbd-sm">S</kbd>
        </label>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            {selectedLanguage.label}
          </div>
          <ul tabIndex={0} className="menu dropdown-content z-[1] rounded-box bg-base-300">
            {languageOptions.map(({ code, label }, index) => (
              <li
                key={index}
                onClick={() => {
                  changeLanguage(code);
                  (document.activeElement as HTMLElement)?.blur();
                }}
                className="cursor-pointer"
              >
                <a>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label htmlFor="theme-toggle" className="flex cursor-pointer gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <input
              id="theme-toggle"
              type="checkbox"
              value="dzcodeLight"
              className="theme-controller toggle"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
          </label>
        </div>
      </div>
      <div className="m-auto flex max-w-7xl flex-row justify-center gap-2 lg:justify-between">
        <Link href={"/"} className="hidden lg:flex">
          <Image
            className="m-2 h-7 w-auto self-center"
            src={logoWide}
            alt="DzCode i/o SVG Logo wide"
          />
        </Link>
        <div
          role="tablist"
          className="tabs tabs-lifted tab-border-none pr-2 pl-2 tabs-lg overflow-x-auto"
        >
          {links.map(({ localeKey, href }, index) => (
            <Link
              href={href}
              key={index}
              role="tab"
              className={`tab ${activeIndex === index ? "tab-active" : ""}`}
              data-testid={`top-bar-to:${href}`}
            >
              <Locale {...{ localeKey }} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
