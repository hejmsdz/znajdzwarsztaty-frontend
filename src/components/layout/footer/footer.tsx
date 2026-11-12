import { Link } from '@tanstack/react-router';

const LINK_CLASS =
  'underline decoration-border underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground/50';

export function Footer() {
  return (
    <footer className="shrink-0 border-t bg-background">
      <div className="mx-auto w-full max-w-3xl px-4 py-6 text-center text-xs text-muted-foreground">
        © 2026{' '}
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
