import { ErrorMessage } from '#/components/messages/error-message';
import { TopBar } from '#/components/layout/top-bar/top-bar';
import { Footer } from '#/components/layout/footer/footer';
import { Link } from '@tanstack/react-router';

const LINK_CLASS =
  'text-primary underline underline-offset-2 hover:text-primary/80';

export function NotFound() {
  return (
    <div className="flex min-h-svh flex-col">
      <TopBar />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-10 md:py-16">
        <ErrorMessage title="Nie znaleziono strony">
          Strona, której szukasz, nie istnieje albo została przeniesiona. Wróć
          na&nbsp;
          <Link to="/" className={LINK_CLASS}>
            mapę
          </Link>{' '}
          lub&nbsp;do&nbsp;
          <Link to="/list" className={LINK_CLASS}>
            listy warsztatów
          </Link>
          .
        </ErrorMessage>
      </main>
      <Footer />
    </div>
  );
}
