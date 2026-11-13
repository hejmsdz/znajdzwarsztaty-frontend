import { Link } from '@tanstack/react-router';

const LINK_CLASS =
  'underline decoration-border underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground/50';

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="shrink-0 border-t bg-background">
      <div className="mx-auto w-full max-w-3xl px-4 py-6 text-center text-xs text-muted-foreground">
        © {year}{' '}
        <a
          href="https://mrozwadowski.com"
          target="_blank"
          rel="noreferrer"
          className={LINK_CLASS}
        >
          Mikołaj Rozwadowski
        </a>{' '}
        &middot;{' '}
        <Link to="/privacy" className={LINK_CLASS}>
          Polityka prywatności
        </Link>
      </div>
    </footer>
  );
}
