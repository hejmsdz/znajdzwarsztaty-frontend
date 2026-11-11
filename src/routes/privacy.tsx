import { TopBar } from '#/components/layout/top-bar/top-bar';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '#/lib/utils';
import type { ReactNode } from 'react';

export const Route = createFileRoute('/privacy')({
  component: PrivacyPolicyPage,
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

function AnchorLink({ id, children }: { id: string; children: ReactNode }) {
  return (
    <a href={`#${id}`} className={LINK_CLASS}>
      {children}
    </a>
  );
}

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-12 font-heading text-xl font-semibold tracking-tight"
    >
      {children}
    </h2>
  );
}

function H3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3
      id={id}
      className="mt-8 font-heading text-base font-semibold tracking-tight"
    >
      {children}
    </h3>
  );
}

function P({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <p className={cn('mt-3', className)}>{children}</p>;
}

function Ul({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-muted-foreground">
      {children}
    </ul>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]">
      {children}
    </code>
  );
}

function Th({ children }: { children: ReactNode }) {
  return <th className="px-4 py-2.5 text-left font-semibold">{children}</th>;
}

function Td({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <td className={cn('px-4 py-2.5 align-top', className)}>{children}</td>;
}

function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <TopBar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 md:py-16">
        <article className="text-sm leading-relaxed">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Polityka prywatności serwisu ZnajdzWarsztaty.pl
          </h1>
          <p className="mt-2 text-muted-foreground">
            Data ostatniej aktualizacji: 11 listopada 2026&nbsp;r.
          </p>

          <H2 id="1-kim-jestesmy">1. Kim jesteśmy</H2>
          <P>
            Serwis <strong>ZnajdzWarsztaty.pl</strong> (dalej: „Serwis") to
            darmowa wyszukiwarka warsztatów muzyki liturgicznej w&nbsp;Polsce.
            Pokazuje je na&nbsp;mapie i&nbsp;na liście. Pozwala też zapisać się
            na&nbsp;powiadomienia e-mail o&nbsp;nowych warsztatach
            w&nbsp;okolicy.
          </P>
          <P>
            Administratorem danych osobowych jest Mikołaj Rozwadowski (kontakt
            w&nbsp;sprawach prywatności:{' '}
            <a href="mailto:mikolaj@mrozwadowski.com" className={LINK_CLASS}>
              mikolaj@mrozwadowski.com
            </a>
            ).
          </P>

          <H2 id="2-jakie-dane">2. Jakie dane przetwarzamy i&nbsp;po co</H2>

          <H3 id="2-1-powiadomienia">
            2.1. Powiadomienia e-mail o&nbsp;nowych warsztatach
          </H3>
          <P>Jeśli zapiszesz się na&nbsp;obserwowanie warsztatów, zbieramy:</P>
          <div className="mt-4 overflow-x-auto rounded-2xl border bg-card">
            <table className="w-full min-w-[32rem] border-collapse text-left">
              <thead>
                <tr className="border-b bg-muted/50">
                  <Th>Dane</Th>
                  <Th>Cel</Th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <Td>adres e-mail</Td>
                  <Td>
                    wysyłka wiadomości z&nbsp;potwierdzeniem i&nbsp;powiadomień
                  </Td>
                </tr>
                <tr>
                  <Td>
                    wybrane miasto (zapisujemy jego współrzędne geograficzne)
                    oraz maksymalna odległość w&nbsp;km (10–200)
                  </Td>
                  <Td>ustalenie, o&nbsp;których warsztatach Cię powiadomić</Td>
                </tr>
                <tr>
                  <Td>
                    znacznik potwierdzenia subskrypcji, data utworzenia
                    i&nbsp;aktualizacji
                  </Td>
                  <Td>obsługa subskrypcji</Td>
                </tr>
                <tr>
                  <Td>
                    historia wysłanych powiadomień (powiązanie subskrypcji
                    z&nbsp;warsztatem, data wysyłki, liczba prób)
                  </Td>
                  <Td>niewysyłanie tego samego powiadomienia wielokrotnie</Td>
                </tr>
              </tbody>
            </table>
          </div>
          <P>Szczegóły:</P>
          <Ul>
            <li>
              Zapisujemy{' '}
              <strong>współrzędne wybranego przez Ciebie miasta</strong>,
              a&nbsp;nie Twoją dokładną lokalizację. Serwis nie korzysta
              z&nbsp;geolokalizacji w&nbsp;przeglądarce.
            </li>
            <li>
              Po zapisie wysyłamy wiadomość z&nbsp;linkiem potwierdzającym
              (podwójne potwierdzenie, <em>double opt-in</em>).{' '}
              <strong>Powiadomienia wysyłamy tylko po kliknięciu linku.</strong>
            </li>
            <li>
              Jeśli nie potwierdzisz zapisu, niepotwierdzony wpis usuwamy
              automatycznie maksymalnie po <strong>48 godzinach</strong>.
            </li>
            <li>
              Adres e-mail zapisujemy małymi literami. Jeden adres może mieć
              najwyżej 10 subskrypcji.
            </li>
            <li>
              Gdy opublikujemy nowy warsztat w&nbsp;Twojej okolicy, wysyłamy
              wiadomość z&nbsp;jego datą, miejscem, odległością
              od&nbsp;wybranego miasta, prowadzącymi, kosztem i&nbsp;odnośnikami
              (zapisy, informacje, kontakt). Każda wiadomość zawiera link
              do&nbsp;rezygnacji, a&nbsp;także nagłówki{' '}
              <Code>List-Unsubscribe</Code> do&nbsp;rezygnacji jednym
              kliknięciem w&nbsp;programie pocztowym.
            </li>
            <li>Powiadomienia wysyłamy partiami co pół godziny.</li>
          </Ul>
          <P>
            <strong>Podstawa prawna:</strong> Twoja zgoda (art. 6 ust. 1 lit. a
            RODO), czyli zapis i&nbsp;potwierdzenie adresu. Zgodę możesz wycofać
            w&nbsp;każdej chwili. Wycofanie nie wpływa na&nbsp;zgodność
            z&nbsp;prawem przetwarzania sprzed wycofania.
          </P>

          <H3 id="2-2-turnstile">
            2.2. Ochrona przed spamem (Cloudflare Turnstile)
          </H3>
          <P>
            Formularz zapisu na&nbsp;powiadomienia jest chroniony przez{' '}
            <strong>Cloudflare Turnstile</strong>. Przeglądarka wykonuje wtedy
            krótką weryfikację, że formularz wypełnia człowiek. Nasz serwer
            przekazuje do&nbsp;Cloudflare token weryfikacyjny oraz Twój{' '}
            <strong>adres IP</strong>. Cloudflare może przy tym zapisywać
            lub&nbsp;odczytywać dane w&nbsp;Twojej przeglądarce
            i&nbsp;analizować jej parametry. Robi to według własnej polityki
            prywatności:{' '}
            <ExternalLink href="https://www.cloudflare.com/privacypolicy/">
              cloudflare.com/privacypolicy
            </ExternalLink>
            .
          </P>
          <P>
            Serwer stosuje też limity liczby żądań na&nbsp;adres IP, np. nie
            więcej niż 3 próby zapisu na&nbsp;powiadomienia w&nbsp;ciągu 10
            minut.
          </P>
          <P>
            <strong>Podstawa prawna:</strong> prawnie uzasadniony interes
            administratora, czyli zabezpieczenie Serwisu przed nadużyciami
            i&nbsp;spamem (art. 6 ust. 1 lit. f RODO).
          </P>

          <H3 id="2-3-logi">2.3. Dane techniczne i&nbsp;logi serwera</H3>
          <P>
            Jak każdy serwer WWW, nasz serwer przetwarza dane techniczne żądań,
            w&nbsp;tym <strong>adres IP</strong>, adres żądanego zasobu, kod
            odpowiedzi i&nbsp;czas. Dzienniki żądań są przechowywane
            przez&nbsp;ograniczony czas (domyślnie <strong>5 dni</strong>), po
            czym są automatycznie usuwane. Nie zapisujemy w&nbsp;nich
            identyfikatorów zalogowanych użytkowników, bo zwykli odwiedzający
            nie mają kont.
          </P>
          <P>
            <strong>Podstawa prawna:</strong> prawnie uzasadniony interes
            administratora, czyli bezpieczeństwo i&nbsp;prawidłowe działanie
            Serwisu (art. 6 ust. 1 lit. f RODO).
          </P>

          <H3 id="2-4-dane-publiczne">
            2.4. Dane publiczne o&nbsp;warsztatach i&nbsp;prowadzących
          </H3>
          <P>
            Serwis prezentuje publicznie dostępne informacje o&nbsp;warsztatach:
            tytuł, termin, miejsce, koszt, odnośniki do&nbsp;zapisów
            i&nbsp;kontaktu, poziom i&nbsp;rodzaj warsztatów oraz{' '}
            <strong>prowadzących</strong>. Przy prowadzących mogą się pojawić:
          </P>
          <Ul>
            <li>
              imię i&nbsp;nazwisko (wraz z&nbsp;tytułem lub&nbsp;oznaczeniem
              zakonu, jeśli występuje),
            </li>
            <li>fotografia,</li>
            <li>specjalizacja muzyczna (np. dyrygent, kompozytor).</li>
          </Ul>
          <P>
            Dane te pochodzą z&nbsp;<strong>publicznych źródeł</strong>: stron
            i&nbsp;kanałów organizatorów (kanały Atom/RSS, publiczne wpisy
            i&nbsp;wydarzenia na&nbsp;Facebooku) oraz materiałów przekazanych
            przez&nbsp;organizatorów. Zbieramy tylko informacje potrzebne
            do&nbsp;opisania wydarzenia. Jako dane kontaktowe podajemy te, które
            organizator sam opublikował w&nbsp;ogłoszeniu o&nbsp;warsztatach
            (adres e-mail, telefon lub&nbsp;strona kontaktowa), i&nbsp;tylko
            jako odnośnik do&nbsp;kontaktu z&nbsp;organizatorem.
          </P>
          <P>
            Jeśli jesteś prowadzącym lub&nbsp;organizatorem i&nbsp;chcesz
            poprawić, uzupełnić lub&nbsp;usunąć swoje dane albo zdjęcie, napisz
            do&nbsp;nas. Zob. <AnchorLink id="7-prawa">punkt 7</AnchorLink>.
          </P>
          <P>
            <strong>Podstawa prawna:</strong> prawnie uzasadniony interes
            administratora, czyli informowanie o&nbsp;wydarzeniach muzycznych
            i&nbsp;ułatwienie znalezienia warsztatów (art. 6 ust. 1 lit. f
            RODO). Ponieważ dane nie pochodzą bezpośrednio od&nbsp;osoby, której
            dotyczą, informujemy o&nbsp;tym tutaj (art. 14 RODO). Przysługuje Ci
            prawo sprzeciwu. Zob. <AnchorLink id="7-prawa">punkt 7</AnchorLink>.
          </P>

          <H3 id="2-5-wiadomosci">2.5. Wiadomości przesyłane do&nbsp;nas</H3>
          <P>
            Jeśli napiszesz do&nbsp;nas (np. żeby dodać warsztaty
            albo&nbsp;poprosić o&nbsp;usunięcie danych), przetwarzamy Twój adres
            e-mail oraz treść wiadomości, żeby Ci odpowiedzieć. Podstawą jest
            nasz prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO). Dane
            przechowujemy do&nbsp;czasu załatwienia sprawy, a&nbsp;następnie
            przez&nbsp;okres potrzebny do&nbsp;ewentualnego dochodzenia
            lub&nbsp;obrony przed&nbsp;roszczeniami.
          </P>

          <H2 id="3-cookies">3. Cookies i&nbsp;dane w&nbsp;przeglądarce</H2>
          <Ul>
            <li>
              Serwis{' '}
              <strong>nie używa narzędzi analitycznych ani reklamowych</strong>{' '}
              i&nbsp;nie śledzi Cię między stronami.
            </li>
            <li>
              W&nbsp;pamięci lokalnej przeglądarki (<Code>localStorage</Code>)
              zapisujemy wyłącznie Twój wybór motywu wyglądu (jasny / ciemny /
              systemowy). To ustawienie nie zawiera danych osobowych i&nbsp;nie
              jest wysyłane na&nbsp;nasz serwer.
            </li>
            <li>
              Czcionki są dostarczane razem z&nbsp;Serwisem, a&nbsp;nie
              z&nbsp;zewnętrznych serwerów.
            </li>
            <li>
              Zewnętrzne usługi opisane w&nbsp;
              <AnchorLink id="4-odbiorcy">punkcie 4</AnchorLink> (Turnstile,
              kafelki mapy) mogą zapisywać własne dane w&nbsp;Twojej
              przeglądarce.
            </li>
          </Ul>

          <H2 id="4-odbiorcy">4. Odbiorcy danych i&nbsp;usługi zewnętrzne</H2>
          <P>
            Dane powierzamy lub&nbsp;udostępniamy tylko tym podmiotom, które są
            potrzebne do&nbsp;działania Serwisu:
          </P>
          <div className="mt-4 overflow-x-auto rounded-2xl border bg-card">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <thead>
                <tr className="border-b bg-muted/50">
                  <Th>Podmiot</Th>
                  <Th>Do czego</Th>
                  <Th>Jakie dane</Th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <Td>
                    <strong>Mikr.us</strong> (
                    <ExternalLink href="https://mikr.us">mikr.us</ExternalLink>)
                  </Td>
                  <Td>hosting aplikacji i&nbsp;bazy danych</Td>
                  <Td>wszystkie dane przetwarzane w&nbsp;Serwisie</Td>
                </tr>
                <tr>
                  <Td>
                    <strong>Resend</strong> (
                    <ExternalLink href="https://resend.com">
                      resend.com
                    </ExternalLink>
                    )
                  </Td>
                  <Td>
                    wysyłka wiadomości e-mail (potwierdzenia
                    i&nbsp;powiadomienia)
                  </Td>
                  <Td>adres e-mail odbiorcy, treść wiadomości</Td>
                </tr>
                <tr>
                  <Td>
                    <strong>Cloudflare, Inc.</strong> (Turnstile)
                  </Td>
                  <Td>weryfikacja antyspamowa formularza</Td>
                  <Td>token weryfikacyjny, adres IP, dane przeglądarki</Td>
                </tr>
                <tr>
                  <Td>
                    <strong>OpenStreetMap</strong> (kafelki mapy)
                  </Td>
                  <Td>wyświetlanie mapy w&nbsp;przeglądarce</Td>
                  <Td>
                    Twoja przeglądarka pobiera kafelki bezpośrednio
                    z&nbsp;serwerów OpenStreetMap, które widzą jej adres IP;
                    obowiązuje polityka OSMF:{' '}
                    <ExternalLink href="https://osmfoundation.org/wiki/Privacy_Policy">
                      osmfoundation.org/wiki/Privacy_Policy
                    </ExternalLink>
                  </Td>
                </tr>
              </tbody>
            </table>
          </div>
          <P>
            Dodatkowo,{' '}
            <strong>
              wyłącznie przy opracowywaniu danych o&nbsp;warsztatach
            </strong>{' '}
            (bez udziału danych odwiedzających Serwis i&nbsp;subskrybentów)
            korzystamy z&nbsp;usług:
          </P>
          <Ul>
            <li>
              <strong>OpenRouter</strong> i&nbsp;wskazanego w&nbsp;nim dostawcy
              modelu językowego (AI) – chińskiej firmy Z.ai – do&nbsp;wstępnego
              odczytu ogłoszeń o&nbsp;warsztatach i&nbsp;przygotowania wpisów,
            </li>
            <li>
              <strong>Google Maps Platform (Places API)</strong> –
              do&nbsp;ustalania współrzędnych i&nbsp;województwa miejsca
              warsztatów,
            </li>
            <li>
              <strong>Apify</strong> – do&nbsp;pobierania publicznych wpisów
              i&nbsp;wydarzeń z&nbsp;Facebooka.
            </li>
          </Ul>
          <P>
            Do tych usług trafiają treści publicznych ogłoszeń, które mogą
            zawierać dane prowadzących lub&nbsp;organizatorów (imię, nazwisko,
            dane kontaktowe z&nbsp;ogłoszenia). Nie trafiają do&nbsp;nich adresy
            e-mail subskrybentów. Wpisy przygotowane automatycznie są następnie
            weryfikowane przez&nbsp;administratora, zanim zostaną opublikowane,
            chyba&nbsp;że pochodzą ze&nbsp;źródła oznaczonego jako zaufane.
          </P>
          <P>
            Niektórzy z&nbsp;tych dostawców (Cloudflare, Resend, OpenRouter,
            Google, Apify, Z.ai) mogą przetwarzać dane poza Europejskim Obszarem
            Gospodarczym, w&nbsp;tym w&nbsp;USA i&nbsp;Chinach. Opieramy się
            wtedy na&nbsp;mechanizmach zapewniających odpowiedni poziom ochrony,
            takich jak standardowe klauzule umowne lub&nbsp;decyzja Komisji
            Europejskiej o&nbsp;odpowiednim stopniu ochrony (EU–US Data Privacy
            Framework), jeśli dany dostawca z&nbsp;niej korzysta.
          </P>
          <P>
            Nie sprzedajemy danych i&nbsp;nie wykorzystujemy ich do&nbsp;reklamy
            ani&nbsp;profilowania. Dane możemy ujawnić organom publicznym tylko
            wtedy, gdy wymaga tego prawo.
          </P>

          <H2 id="5-retencja">5. Jak długo przechowujemy dane</H2>
          <div className="mt-4 overflow-x-auto rounded-2xl border bg-card">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <thead>
                <tr className="border-b bg-muted/50">
                  <Th>Dane</Th>
                  <Th>Okres przechowywania</Th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <Td>subskrypcja (e-mail, miasto, promień, token)</Td>
                  <Td>
                    do&nbsp;rezygnacji z&nbsp;subskrypcji lub&nbsp;usunięcia
                    na&nbsp;Twoją prośbę
                  </Td>
                </tr>
                <tr>
                  <Td>niepotwierdzona subskrypcja</Td>
                  <Td>
                    automatycznie po&nbsp;maks. 48 godzinach od&nbsp;zapisu,
                    jeśli nie klikniesz linku potwierdzającego
                  </Td>
                </tr>
                <tr>
                  <Td>historia powiadomień</Td>
                  <Td>
                    do&nbsp;usunięcia subskrypcji lub&nbsp;powiązanego warsztatu
                    (są wtedy usuwane automatycznie)
                  </Td>
                </tr>
                <tr>
                  <Td>logi serwera</Td>
                  <Td>domyślnie 5 dni</Td>
                </tr>
                <tr>
                  <Td>dane o&nbsp;warsztatach</Td>
                  <Td>
                    maks. 2 tygodnie po&nbsp;zakończeniu warsztatów (usuwamy je
                    wtedy automatycznie); wcześniej na&nbsp;prośbę
                  </Td>
                </tr>
                <tr>
                  <Td>dane o&nbsp;prowadzących</Td>
                  <Td>
                    do&nbsp;czasu, gdy będą potrzebne do&nbsp;prezentacji
                    wydarzeń w&nbsp;Serwisie, lub&nbsp;do&nbsp;usunięcia
                    na&nbsp;Twoją prośbę
                  </Td>
                </tr>
                <tr>
                  <Td>korespondencja</Td>
                  <Td>
                    do&nbsp;załatwienia sprawy i&nbsp;przez&nbsp;czas potrzebny
                    do&nbsp;ewentualnej obrony przed&nbsp;roszczeniami
                  </Td>
                </tr>
              </tbody>
            </table>
          </div>
          <P>
            Kopie zapasowe bazy danych mogą istnieć jeszcze przez&nbsp;krótki
            czas po&nbsp;usunięciu danych z&nbsp;systemu produkcyjnego.
          </P>

          <H2 id="6-rezygnacja">6. Rezygnacja z&nbsp;powiadomień</H2>
          <P>
            W&nbsp;każdej wiadomości z&nbsp;powiadomieniem jest link
            do&nbsp;rezygnacji (oraz przycisk rezygnacji w&nbsp;programie
            pocztowym obsługującym nagłówek <Code>List-Unsubscribe</Code>). Po
            kliknięciu subskrypcja jest <strong>trwale usuwana</strong> razem
            z&nbsp;powiązaną historią powiadomień.
          </P>
          <P>
            Jeśli nie potwierdzisz zapisu, nie wyślemy Ci żadnych powiadomień,
            a&nbsp;niepotwierdzony wpis usuniemy automatycznie po 48 godzinach.
            Jeśli ktoś wpisał Twój adres bez&nbsp;Twojej wiedzy, zignoruj
            wiadomość z&nbsp;potwierdzeniem; możesz też napisać do&nbsp;nas,
            a&nbsp;usuniemy niepotwierdzony wpis od&nbsp;razu.
          </P>

          <H2 id="7-prawa">7. Twoje prawa</H2>
          <P>Na podstawie RODO masz prawo do:</P>
          <Ul>
            <li>dostępu do&nbsp;swoich danych i&nbsp;otrzymania ich kopii,</li>
            <li>sprostowania danych,</li>
            <li>usunięcia danych („prawo do&nbsp;bycia zapomnianym"),</li>
            <li>ograniczenia przetwarzania,</li>
            <li>
              przenoszenia danych (dla danych przetwarzanych na&nbsp;podstawie
              zgody),
            </li>
            <li>
              <strong>sprzeciwu</strong> wobec&nbsp;przetwarzania opartego
              na&nbsp;prawnie uzasadnionym interesie (np. danych prowadzących
              w&nbsp;
              <AnchorLink id="2-4-dane-publiczne">punkcie 2.4</AnchorLink>
              ),
            </li>
            <li>
              <strong>wycofania zgody</strong> w&nbsp;dowolnym momencie (bez
              wpływu na&nbsp;zgodność z&nbsp;prawem wcześniejszego
              przetwarzania).
            </li>
          </Ul>
          <P>
            Aby skorzystać z&nbsp;tych praw, napisz na&nbsp;adres podany w&nbsp;
            <AnchorLink id="1-kim-jestesmy">punkcie 1</AnchorLink>. Odpowiemy
            w&nbsp;ciągu miesiąca. Masz też prawo wnieść skargę do&nbsp;organu
            nadzorczego:{' '}
            <strong>Prezesa Urzędu Ochrony Danych Osobowych</strong> (ul.
            Moniuszki 1A, 00-014 Warszawa,{' '}
            <ExternalLink href="https://uodo.gov.pl">uodo.gov.pl</ExternalLink>
            ).
          </P>
          <P>
            Podanie danych jest dobrowolne, ale&nbsp;bez&nbsp;adresu e-mail,
            miasta i&nbsp;promienia nie możemy wysyłać powiadomień. Korzystanie
            z&nbsp;mapy i&nbsp;listy warsztatów nie wymaga podawania żadnych
            danych.
          </P>

          <H2 id="8-ai">8. Zautomatyzowane przetwarzanie i&nbsp;AI</H2>
          <P>
            Nie podejmujemy wobec&nbsp;Ciebie decyzji opartych wyłącznie
            na&nbsp;zautomatyzowanym przetwarzaniu, które wywoływałyby skutki
            prawne lub&nbsp;podobnie istotnie na&nbsp;Ciebie wpływały. Sztuczna
            inteligencja pomaga tylko przy redagowaniu wpisów o&nbsp;warsztatach
            (<AnchorLink id="4-odbiorcy">punkt 4</AnchorLink>).{' '}
            <strong>
              Nie profiluje użytkowników Serwisu ani&nbsp;subskrybentów.
            </strong>
          </P>

          <H2 id="9-bezpieczenstwo">9. Bezpieczeństwo</H2>
          <P>
            Stosujemy środki techniczne i&nbsp;organizacyjne adekwatne
            do&nbsp;ryzyka, m.in.:
          </P>
          <Ul>
            <li>
              dostęp do&nbsp;danych przez&nbsp;API jest ograniczony regułami
              dostępu: dane subskrybentów i&nbsp;historia powiadomień nie
              są&nbsp;publicznie dostępne, a&nbsp;publicznie można odczytać
              tylko opublikowane informacje o&nbsp;warsztatach
              i&nbsp;prowadzących,
            </li>
            <li>
              rezygnacja i&nbsp;potwierdzenie subskrypcji wymagają losowego
              tokena,
            </li>
            <li>
              pobieranie stron zewnętrznych przez&nbsp;automat jest ograniczone
              mechanizmami przeciw atakom typu SSRF,
            </li>
            <li>
              klucze dostępowe do&nbsp;usług zewnętrznych są przechowywane
              w&nbsp;zmiennych środowiskowych serwera, poza&nbsp;kodem
              źródłowym,
            </li>
            <li>
              panel administracyjny jest dostępny wyłącznie dla administratora.
            </li>
          </Ul>

          <H2 id="10-zmiany">10. Zmiany polityki</H2>
          <P>
            Możemy aktualizować tę politykę, np. gdy zmieni się sposób działania
            Serwisu lub&nbsp;przepisy. Aktualna wersja jest zawsze dostępna
            w&nbsp;Serwisie, a&nbsp;data ostatniej zmiany znajduje się
            na&nbsp;początku dokumentu. O&nbsp;istotnych zmianach
            dotyczących&nbsp;powiadomień poinformujemy w&nbsp;wiadomości e-mail
            lub&nbsp;w&nbsp;Serwisie.
          </P>
        </article>
      </main>
    </div>
  );
}
