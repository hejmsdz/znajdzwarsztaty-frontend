import { TopBar } from '#/components/layout/top-bar/top-bar';
import { createFileRoute, Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

const LINK_CLASS =
  'text-primary underline underline-offset-2 hover:text-primary/80';

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={LINK_CLASS}>
      {children}
    </a>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 first:mt-0">{children}</p>;
}

function AboutPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <TopBar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 md:py-16">
        <article className="text-sm leading-relaxed md:text-base">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            O&nbsp;stronie
          </h1>

          <div className="mt-8 text-muted-foreground">
            <P>
              <strong>Warsztaty muzyki liturgicznej</strong> to&nbsp;spotkania
              dla&nbsp;chórzystów i&nbsp;wszystkich, którzy&nbsp;śpiewają
              lub&nbsp;grają w&nbsp;Kościele. Pod&nbsp;okiem profesjonalistów –
              dyrygentów, kompozytorów i&nbsp;specjalistów od&nbsp;śpiewu –
              uczestnicy poznają nowy repertuar, doskonalą umiejętności wokalne
              i&nbsp;nawiązują znajomości z&nbsp;ludźmi o&nbsp;wspólnej pasji.
            </P>
            <P>
              Tego typu warsztaty odbywają się w&nbsp;różnych zakątkach Polski,
              a&nbsp;także w&nbsp;polskich parafiach i&nbsp;duszpasterstwach
              za&nbsp;granicą. Misją tej&nbsp;strony jest zebranie informacji
              o&nbsp;nich w&nbsp;jednym miejscu, w&nbsp;przejrzystej
              i&nbsp;łatwo dostępnej formie.
            </P>
            <P>
              Wydarzenia możesz przeglądać na&nbsp;
              <Link to="/" className={LINK_CLASS}>
                mapie
              </Link>{' '}
              lub&nbsp;na&nbsp;
              <Link to="/list" className={LINK_CLASS}>
                liście
              </Link>
              , filtrując je według kategorii, prowadzących i&nbsp;kosztu
              uczestnictwa.
            </P>
            <P>
              Jeśli chcesz dostawać informacje o&nbsp;nowo dodanych
              wydarzeniach, zapisz się na&nbsp;powiadomienia w&nbsp;zakładce{' '}
              <Link to="/follow" className={LINK_CLASS}>
                Bądź na&nbsp;bieżąco
              </Link>
              . Gdy tylko zostaną ogłoszone warsztaty w&nbsp;wybranym przez
              Ciebie promieniu od&nbsp;Twojego miasta, otrzymasz o&nbsp;nich
              wiadomość e-mail.
            </P>
            <P>
              Większość informacji o&nbsp;warsztatach pochodzi z&nbsp;profilu{' '}
              <ExternalLink href="https://www.facebook.com/p/Warsztaty-Muzyki-Liturgicznej-Baza-wydarze%C5%84-61585764502053/">
                Warsztaty Muzyki Liturgicznej: Baza wydarzeń
              </ExternalLink>{' '}
              na&nbsp;Facebooku – dziękujemy jego administracji
              za&nbsp;udostępnienie danych! Jeśli organizujesz warsztaty
              i&nbsp;chcesz, aby&nbsp;pojawiły się również tutaj, napisz
              do&nbsp;tego profilu przez{' '}
              <ExternalLink href="https://m.me/61585764502053">
                Messengera
              </ExternalLink>
              . W&nbsp;przyszłości planujemy uruchomić specjalną skrzynkę
              e-mailową, na&nbsp;którą będzie można nadsyłać informacje
              o&nbsp;wydarzeniach bezpośrednio do&nbsp;nas.
            </P>
          </div>
        </article>
      </main>
    </div>
  );
}
