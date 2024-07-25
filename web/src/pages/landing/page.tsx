import { Link } from "src/components/link";
import { Locale } from "src/components/locale";

export default function Page(): JSX.Element {
  return (
    <main>
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
