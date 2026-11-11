import { TopBar } from '#/components/layout/top-bar/top-bar';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '#/lib/utils';
import type { ReactNode } from 'react';

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
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

function TableWrap({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border bg-card">
      <table className={cn('w-full border-collapse text-left', className)}>
        {children}
      </table>
    </div>
  );
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

function PrivacyPage() {
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

          <section className="mt-8 rounded-2xl border bg-card p-5">
            <h2 className="font-heading text-base font-semibold tracking-tight">
              W skrócie
            </h2>
            <Ul>
              <li>
                Z&nbsp;mapy i&nbsp;listy warsztatów można korzystać{' '}
                <strong>bez podawania jakichkolwiek danych</strong>. Serwis nie
                ma kont użytkowników, reklam ani&nbsp;narzędzi analitycznych.
              </li>
              <li>
                Dane podajesz tylko wtedy, gdy zapisujesz się na&nbsp;
                <strong>powiadomienia e-mail</strong>: adres e-mail, miasto
                i&nbsp;maksymalną odległość. Powiadomienia wysyłam dopiero
                po&nbsp;potwierdzeniu adresu, a&nbsp;zrezygnować możesz jednym
                kliknięciem.
              </li>
              <li>
                Nie sprzedaję danych i&nbsp;nie wykorzystuję ich do&nbsp;reklamy
                ani&nbsp;profilowania.
              </li>
              <li>
                Wpisy o&nbsp;warsztatach przygotowuję z&nbsp;pomocą sztucznej
                inteligencji (otwarty model GLM, uruchamiany na&nbsp;serwerach
                w&nbsp;Europie). Trafiają do&nbsp;niej{' '}
                <strong>wyłącznie publiczne ogłoszenia</strong>, nigdy dane
                subskrybentów ani&nbsp;odwiedzających.{' '}
                <AnchorLink id="4-ai">Szczegóły w&nbsp;punkcie 4</AnchorLink>.
              </li>
            </Ul>
          </section>

          <H2 id="1-administrator">1. Kto jest administratorem danych</H2>
          <P>
            Serwis <strong>ZnajdzWarsztaty.pl</strong> (dalej: „Serwis”) to
            bezpłatny katalog i wyszukiwarka warsztatów muzyki liturgicznej.
            Pokazuje je na&nbsp;mapie i&nbsp;na liście oraz pozwala zapisać się
            na&nbsp;powiadomienia e-mail o&nbsp;nowych warsztatach
            w&nbsp;okolicy. Polityka dotyczy Serwisu dostępnego pod adresem{' '}
            <strong>znajdzwarsztaty.pl</strong>.
          </P>
          <P>
            Administratorem danych osobowych jest osoba fizyczna:{' '}
            <strong>Mikołaj Rozwadowski</strong>. We wszystkich sprawach
            związanych z&nbsp;prywatnością i&nbsp;danymi osobowymi możesz
            się&nbsp;ze&nbsp;mną skontaktować pod adresem{' '}
            <a href="mailto:mikolaj@mrozwadowski.com" className={LINK_CLASS}>
              mikolaj@mrozwadowski.com
            </a>
            . Nie powołałem inspektora ochrony danych.
          </P>
          <P>
            Przetwarzanie danych odbywa się zgodnie z&nbsp;rozporządzeniem
            Parlamentu Europejskiego i&nbsp;Rady (UE) 2016/679 (RODO) oraz
            przepisami prawa polskiego.
          </P>

          <H2 id="2-dane">2. Jakie dane przetwarzam i&nbsp;po co</H2>

          <H3 id="2-1-powiadomienia">
            2.1. Powiadomienia e-mail o&nbsp;nowych warsztatach
          </H3>
          <P>
            Jeśli zapiszesz się na&nbsp;obserwowanie warsztatów (strona „Bądź
            na&nbsp;bieżąco”), zapisuję:
          </P>
          <TableWrap className="min-w-lg">
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
                  wybrane miasto (zapisuję jego współrzędne geograficzne) oraz
                  maksymalna odległość
                </Td>
                <Td>ustalenie, o&nbsp;których warsztatach Cię powiadomić</Td>
              </tr>
              <tr>
                <Td>
                  losowy token, informacja o&nbsp;potwierdzeniu zapisu, data
                  utworzenia i&nbsp;aktualizacji subskrypcji
                </Td>
                <Td>
                  potwierdzanie zapisu, rezygnacja i&nbsp;obsługa subskrypcji
                </Td>
              </tr>
              <tr>
                <Td>
                  historia powiadomień (powiązanie subskrypcji
                  z&nbsp;warsztatem, data wysyłki, liczba prób)
                </Td>
                <Td>niewysyłanie tego samego powiadomienia wielokrotnie</Td>
              </tr>
            </tbody>
          </TableWrap>
          <P>Co jeszcze warto wiedzieć:</P>
          <Ul>
            <li>
              Zapisuję{' '}
              <strong>współrzędne wybranego przez Ciebie miasta</strong>,
              a&nbsp;nie Twoją dokładną lokalizację. Serwis nie korzysta
              z&nbsp;geolokalizacji w&nbsp;przeglądarce.
            </li>
            <li>
              Po zapisie wysyłam wiadomość z&nbsp;linkiem potwierdzającym
              (podwójne potwierdzenie, <em>double opt-in</em>).{' '}
              <strong>
                Powiadomienia dostaniesz dopiero po&nbsp;kliknięciu linku.
              </strong>
            </li>
            <li>Jeden adres e-mail może mieć najwyżej 10 subskrypcji.</li>
            <li>
              Gdy opublikuję nowe warsztaty w&nbsp;Twojej okolicy, wysyłam
              wiadomość z&nbsp;ich terminem, miejscem, odległością
              od&nbsp;wybranego miasta, prowadzącymi, kosztem i&nbsp;odnośnikami
              (zapisy, informacje, kontakt). Wiadomości są wysyłane
              w&nbsp;partiach, co pół godziny.
            </li>
            <li>
              Każda wiadomość zawiera link do&nbsp;rezygnacji, a&nbsp;także
              nagłówek <Code>List-Unsubscribe</Code>, który pozwala zrezygnować
              jednym kliknięciem w&nbsp;programie pocztowym.
            </li>
          </Ul>
          <P>
            <strong>Podstawa prawna:</strong> Twoja zgoda (art. 6 ust. 1 lit. a
            RODO), czyli zapis i&nbsp;potwierdzenie adresu. Zgodę możesz wycofać
            w&nbsp;każdej chwili. Wycofanie nie wpływa na&nbsp;zgodność
            z&nbsp;prawem przetwarzania, którego dokonano przed&nbsp;jej
            wycofaniem.
          </P>

          <H3 id="2-2-turnstile">
            2.2. Ochrona przed spamem (Cloudflare Turnstile)
          </H3>
          <P>
            Formularz zapisu na&nbsp;powiadomienia jest chroniony przez{' '}
            <strong>Cloudflare Turnstile</strong>. Na&nbsp;tej jednej stronie
            Twoja przeglądarka wykonuje krótką weryfikację, że formularz
            wypełnia człowiek. Po&nbsp;wysłaniu formularza mój serwer przekazuje
            do&nbsp;Cloudflare token weryfikacyjny oraz Twój{' '}
            <strong>adres IP</strong>. Cloudflare może przy tym zapisywać
            lub&nbsp;odczytywać dane w&nbsp;Twojej przeglądarce
            i&nbsp;analizować jej parametry według własnej polityki prywatności:{' '}
            <ExternalLink href="https://www.cloudflare.com/privacypolicy/">
              cloudflare.com/privacypolicy
            </ExternalLink>
            .
          </P>
          <P>
            Serwer stosuje też limity liczby żądań z&nbsp;jednego adresu IP, np.
            nie więcej niż 3&nbsp;próby zapisu na&nbsp;powiadomienia
            w&nbsp;ciągu 10&nbsp;minut.
          </P>
          <P>
            <strong>Podstawa prawna:</strong> prawnie uzasadniony interes
            administratora, czyli ochrona Serwisu przed nadużyciami
            i&nbsp;spamem (art. 6 ust. 1 lit. f RODO).
          </P>

          <H3 id="2-3-logi">2.3. Dane techniczne i&nbsp;logi serwera</H3>
          <P>
            Jak każdy serwer WWW, serwer Serwisu przetwarza dane techniczne
            żądań: <strong>adres IP</strong>, adres żądanego zasobu, kod
            odpowiedzi, czas żądania i&nbsp;dane przeglądarki (np. nagłówek{' '}
            <Code>User-Agent</Code>). Dzienniki żądań są przechowywane przez
            ograniczony czas (około <strong>5&nbsp;dni</strong>), po&nbsp;czym
            są automatycznie usuwane. Zwykli odwiedzający nie mają kont,
            więc&nbsp;logi nie zawierają identyfikatorów użytkowników. Podobne
            dane techniczne przetwarza Cloudflare, który udostępnia pliki strony
            (Cloudflare Pages), oraz Mikr.us, na&nbsp;którego serwerze działa
            baza danych i&nbsp;API.
          </P>
          <P>
            <strong>Podstawa prawna:</strong> prawnie uzasadniony interes
            administratora, czyli bezpieczeństwo i&nbsp;prawidłowe działanie
            Serwisu (art. 6 ust. 1 lit. f RODO).
          </P>

          <H3 id="2-4-dane-publiczne">
            2.4. Dane o&nbsp;warsztatach i&nbsp;prowadzących
          </H3>
          <P>
            Serwis prezentuje informacje o&nbsp;warsztatach: tytuł, termin,
            miejsce, koszt, rodzaj i&nbsp;poziom, odnośniki do&nbsp;zapisów,
            informacji i&nbsp;kontaktu oraz <strong>prowadzących</strong>. Przy
            prowadzących mogą się pojawić:
          </P>
          <Ul>
            <li>
              imię i&nbsp;nazwisko, wraz z&nbsp;tytułami, jeśli prowadzący sam
              tak się przedstawia w&nbsp;ogłoszeniu,
            </li>
            <li>specjalizacja muzyczna (np. dyrygent, kompozytor),</li>
            <li>
              fotografia – dodawana przeze mnie ręcznie{' '}
              <strong>wyłącznie za zgodą prowadzącego</strong>.
            </li>
          </Ul>
          <P>
            Informacje o&nbsp;warsztatach pobieram{' '}
            <strong>
              wyłącznie ze&nbsp;stron i&nbsp;kanałów, których właściciele
              (organizatorzy) wyrazili wyraźną zgodę
            </strong>{' '}
            na&nbsp;ich wykorzystanie w&nbsp;Serwisie. Mogą to być kanały
            Atom/RSS, wpisy i&nbsp;wydarzenia na&nbsp;Facebooku albo materiały
            przesłane mi przez organizatorów. Zbieram tylko informacje potrzebne
            do&nbsp;opisania wydarzenia. Jako dane kontaktowe podaję wyłącznie
            te, które organizator sam opublikował w&nbsp;ogłoszeniu (adres
            e-mail, telefon lub&nbsp;strona kontaktowa), i&nbsp;tylko jako
            odnośnik do&nbsp;kontaktu z&nbsp;organizatorem.
          </P>
          <P>
            Jeśli jesteś prowadzącym lub&nbsp;organizatorem i&nbsp;chcesz
            poprawić, uzupełnić lub&nbsp;usunąć swoje dane albo zdjęcie, napisz
            do&nbsp;mnie. Zob. <AnchorLink id="9-prawa">punkt 9</AnchorLink>.
          </P>
          <P>
            <strong>Podstawa prawna:</strong>
          </P>
          <Ul>
            <li>
              <strong>imię, nazwisko i&nbsp;specjalizacja prowadzącego</strong>{' '}
              – mój prawnie uzasadniony interes, czyli informowanie
              o&nbsp;wydarzeniach muzycznych i&nbsp;ułatwienie znalezienia
              warsztatów (art. 6 ust. 1 lit. f RODO). Zgoda organizatora
              na&nbsp;wykorzystanie jego ogłoszeń nie zastępuje zgody
              prowadzącego, dlatego prowadzącemu przysługują wszystkie prawa
              opisane w&nbsp;<AnchorLink id="9-prawa">punkcie 9</AnchorLink>,
              w&nbsp;tym prawo sprzeciwu;
            </li>
            <li>
              <strong>fotografia prowadzącego</strong> – zgoda prowadzącego
              (art. 6 ust. 1 lit. a RODO). Zgodę można wycofać w&nbsp;każdej
              chwili, a&nbsp;wtedy usuwam zdjęcie;
            </li>
          </Ul>
          <P>
            Ponieważ dane prowadzących nie pochodzą bezpośrednio od&nbsp;nich
            samych, informuję o&nbsp;tym tutaj (art. 14 RODO).
          </P>

          <H3 id="2-5-wiadomosci">2.5. Wiadomości przesyłane do&nbsp;mnie</H3>
          <P>
            Jeśli napiszesz do&nbsp;mnie (np. żeby zgłosić warsztaty albo
            poprosić o&nbsp;usunięcie danych), przetwarzam Twój adres e-mail
            i&nbsp;treść wiadomości, żeby Ci odpowiedzieć. Podstawą jest mój
            prawnie uzasadniony interes, czyli obsługa korespondencji (art. 6
            ust. 1 lit. f RODO). Wiadomości przechowuję do&nbsp;czasu
            załatwienia sprawy, a&nbsp;następnie przez okres potrzebny
            do&nbsp;ewentualnego dochodzenia lub&nbsp;obrony przed roszczeniami.
          </P>

          <H2 id="3-cookies">3. Cookies i&nbsp;dane w&nbsp;przeglądarce</H2>
          <Ul>
            <li>
              Serwis{' '}
              <strong>nie używa narzędzi analitycznych ani reklamowych</strong>{' '}
              i&nbsp;nie śledzi Cię między stronami.
            </li>
            <li>
              Wygląd Serwisu (jasny lub&nbsp;ciemny) dopasowuje się
              do&nbsp;ustawień Twojego systemu. Do&nbsp;zapamiętania wyboru
              motywu Serwis może używać pamięci lokalnej przeglądarki (
              <Code>localStorage</Code>, klucz <Code>uiTheme</Code>). Ta wartość
              nie zawiera danych osobowych i&nbsp;nie jest wysyłana na&nbsp;mój
              serwer.
            </li>
            <li>
              Czcionki są dostarczane razem z&nbsp;Serwisem, a&nbsp;nie
              z&nbsp;zewnętrznych serwerów.
            </li>
            <li>
              Zewnętrzne usługi opisane w&nbsp;
              <AnchorLink id="5-odbiorcy">punkcie 5</AnchorLink> (Cloudflare
              Turnstile, kafelki mapy OpenStreetMap) działają według własnych
              zasad i&nbsp;mogą zapisywać dane w&nbsp;Twojej przeglądarce.
            </li>
          </Ul>

          <H2 id="4-ai">
            4. Sztuczna inteligencja przy przygotowywaniu wpisów
          </H2>
          <P>
            Informacje o&nbsp;warsztatach zbieram częściowo automatycznie.
            Ogłoszenia pochodzą z&nbsp;kanałów Atom/RSS organizatorów,
            z&nbsp;ich wpisów i&nbsp;wydarzeń na&nbsp;Facebooku oraz
            z&nbsp;materiałów (tekst, plakat), które wprowadzam ręcznie.
            Korzystam tylko ze&nbsp;źródeł, których właściciele wyrazili
            na&nbsp;to zgodę. Wstępnie odczytuje je model językowy{' '}
            <strong>GLM 5.3 Flash</strong> opracowany przez chińską firmę Z.ai.
            Model ma otwarte wagi, więc nie korzystam z&nbsp;usług Z.ai:
            zapytania wysyłam przez serwis <strong>OpenRouter</strong>{' '}
            w&nbsp;trybie routingu regionalnego UE. Model uruchamia wybrany
            przez OpenRouter europejski dostawca chmurowy, który dzięki
            wymuszonym przeze mnie ustawieniom (Zero Data Retention)
            nie&nbsp;zapisuje treści zapytań i&nbsp;nie trenuje na&nbsp;nich
            modeli.
          </P>

          <H3 id="4-1-co-robi-ai">
            4.1. Co robi model i&nbsp;jakie dane dostaje
          </H3>
          <Ul>
            <li>
              Model sprawdza, czy ogłoszenie dotyczy warsztatów muzyki
              liturgicznej, wyciąga z&nbsp;niego termin, miejsce, koszt,
              prowadzących i&nbsp;odnośniki, a&nbsp;następnie zapisuje wpis
              w&nbsp;bazie.
            </li>
            <li>
              <strong>Do modelu trafiają:</strong> treść ogłoszenia, plakat
              (zmniejszony, wraz z&nbsp;odczytanymi z&nbsp;niego adresami
              z&nbsp;kodów QR), treść stron, do&nbsp;których ogłoszenie prowadzi
              (informacje, zapisy), oraz wyniki wyszukiwania w&nbsp;mojej bazie
              (tytuły i&nbsp;miejsca warsztatów, nazwiska prowadzących), żeby
              uniknąć duplikatów. W&nbsp;tych treściach mogą występować imiona
              i&nbsp;nazwiska prowadzących lub&nbsp;organizatorów oraz dane
              kontaktowe, które sami opublikowali.
            </li>
            <li>
              <strong>Do modelu nie trafiają:</strong> adresy e-mail
              subskrybentów, dane o&nbsp;subskrypcjach, adresy IP ani&nbsp;żadne
              inne dane odwiedzających Serwis.
            </li>
            <li>
              Model pomaga też odfiltrować wiadomości niezwiązane
              z&nbsp;warsztatami lub&nbsp;będące spamem. Takie treści nie
              są&nbsp;zapisywane.
            </li>
          </Ul>

          <H3 id="4-2-region">4.2. Gdzie przetwarzane są ogłoszenia</H3>
          <P>
            Zapytania do&nbsp;modelu kieruję na&nbsp;regionalny adres OpenRouter
            dla Europy (<Code>eu.openrouter.ai</Code>). Treść zapytań
            i&nbsp;odpowiedzi jest wtedy przetwarzana wyłącznie
            na&nbsp;serwerach w&nbsp;Europie, a&nbsp;gdy żaden europejski
            dostawca nie może obsłużyć zapytania, zostaje ono odrzucone, zamiast
            trafić do&nbsp;serwera poza Europą. Model GLM 5.3 Flash uruchamia
            na&nbsp;takich serwerach dostawca chmurowy wybrany przez OpenRouter.
            Wymuszam przy tym ustawienie „Zero Data Retention”, więc treści
            zapytań nie są zapisywane ani przez tego dostawcę, ani przez
            OpenRouter. Firma Z.ai, autor modelu, nie otrzymuje tych danych.
          </P>
          <P>
            OpenRouter jest firmą z&nbsp;USA. Dane mojego konta i&nbsp;dane
            operacyjne (np. rozliczenia, dzienniki bezpieczeństwa) mogą być tam
            przechowywane, ale nie obejmują one treści ogłoszeń przekazywanych
            modelowi. Zasady OpenRouter i&nbsp;poszczególnych dostawców:{' '}
            <ExternalLink href="https://openrouter.ai/privacy">
              openrouter.ai/privacy
            </ExternalLink>
            ,{' '}
            <ExternalLink href="https://openrouter.ai/docs/guides/privacy/provider-logging">
              openrouter.ai/docs/guides/privacy/provider-logging
            </ExternalLink>
            . Jeśli masz zastrzeżenia do&nbsp;przetwarzania Twoich danych
            z&nbsp;ogłoszeń, możesz wnieść sprzeciw, zob.{' '}
            <AnchorLink id="9-prawa">punkt 9</AnchorLink>.
          </P>

          <H3 id="4-3-weryfikacja">4.3. Weryfikacja i&nbsp;decyzje</H3>
          <Ul>
            <li>
              Wpisy przygotowane przez model trafiają do&nbsp;mnie jako szkice
              lub&nbsp;wpisy „gotowe do&nbsp;sprawdzenia”. Publikuję je
              po&nbsp;weryfikacji. Wyjątkiem są źródła, które oznaczyłem jako
              zaufane: wpis uznany przez model za kompletny publikuje
              się&nbsp;tam&nbsp;automatycznie.
            </li>
            <li>
              Model może się mylić. Jeśli zauważysz błąd w&nbsp;opisie
              warsztatów albo&nbsp;w&nbsp;swoich danych, napisz do&nbsp;mnie,
              a&nbsp;poprawię go.
            </li>
            <li>
              Model{' '}
              <strong>nie podejmuje żadnych decyzji dotyczących osób</strong>{' '}
              korzystających z&nbsp;Serwisu i&nbsp;nie profiluje ich. Nie
              dochodzi do&nbsp;zautomatyzowanego podejmowania decyzji, które
              wywoływałoby skutki prawne lub&nbsp;w&nbsp;podobny sposób istotnie
              na&nbsp;Ciebie wpływało (art. 22 RODO).
            </li>
          </Ul>

          <H2 id="5-odbiorcy">5. Odbiorcy danych i&nbsp;usługi zewnętrzne</H2>
          <P>
            Dane powierzam lub&nbsp;udostępniam tylko podmiotom, które są
            potrzebne do&nbsp;działania Serwisu.
          </P>
          <H3 id="5-1-uzytkownicy">
            5.1. Usługi związane z&nbsp;odwiedzającymi i&nbsp;subskrybentami
          </H3>
          <TableWrap className="min-w-[42rem]">
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
                <Td>
                  hosting serwera aplikacji i&nbsp;bazy danych (serwer
                  w&nbsp;Finlandii, w&nbsp;Unii Europejskiej)
                </Td>
                <Td>
                  dane subskrybentów, wpisy o&nbsp;warsztatach, logi serwera
                </Td>
              </tr>
              <tr>
                <Td>
                  <strong>Resend</strong> (
                  <ExternalLink href="https://resend.com/legal/privacy-policy">
                    resend.com
                  </ExternalLink>
                  )
                </Td>
                <Td>
                  wysyłka wiadomości e-mail (potwierdzenia i&nbsp;powiadomienia)
                </Td>
                <Td>adres e-mail odbiorcy, treść wiadomości</Td>
              </tr>
              <tr>
                <Td>
                  <strong>Cloudflare</strong> (
                  <ExternalLink href="https://www.cloudflare.com/privacypolicy/">
                    cloudflare.com
                  </ExternalLink>
                  )
                </Td>
                <Td>
                  hosting plików strony (Cloudflare Pages) oraz weryfikacja
                  antyspamowa formularza zapisu (Turnstile)
                </Td>
                <Td>
                  adres IP i&nbsp;dane przeglądarki każdego odwiedzającego
                  (Pages); dodatkowo token weryfikacyjny (Turnstile)
                </Td>
              </tr>
              <tr>
                <Td>
                  <strong>OpenStreetMap Foundation</strong> (
                  <ExternalLink href="https://osmfoundation.org/wiki/Privacy_Policy">
                    osmfoundation.org
                  </ExternalLink>
                  )
                </Td>
                <Td>kafelki mapy wyświetlanej w&nbsp;przeglądarce</Td>
                <Td>
                  Twoja przeglądarka pobiera kafelki bezpośrednio
                  z&nbsp;serwerów OpenStreetMap, które widzą jej adres IP
                  i&nbsp;dane przeglądarki
                </Td>
              </tr>
            </tbody>
          </TableWrap>

          <H3 id="5-2-redakcja">
            5.2. Usługi używane tylko do&nbsp;przygotowywania wpisów
          </H3>
          <P>
            Poniższe usługi służą wyłącznie do&nbsp;opracowywania danych
            o&nbsp;warsztatach. Nie trafiają do&nbsp;nich dane odwiedzających
            ani&nbsp;subskrybentów.
          </P>
          <Ul>
            <li>
              <strong>OpenRouter</strong> (pośrednik) oraz europejscy dostawcy
              chmurowi uruchamiający model – odczyt ogłoszeń przez model
              językowy (<AnchorLink id="4-ai">punkt 4</AnchorLink>).
            </li>
            <li>
              <strong>Google Maps Platform (Places API)</strong> – ustalanie
              współrzędnych i&nbsp;województwa miejsca warsztatów
              na&nbsp;podstawie jego nazwy lub&nbsp;adresu (
              <ExternalLink href="https://policies.google.com/privacy">
                policies.google.com/privacy
              </ExternalLink>
              ).
            </li>
            <li>
              <strong>Apify</strong> – pobieranie wpisów i&nbsp;wydarzeń
              z&nbsp;Facebooka (
              <ExternalLink href="https://docs.apify.com/legal/privacy-policy">
                apify.com
              </ExternalLink>
              ).
            </li>
          </Ul>

          <P>
            Nie sprzedaję danych i&nbsp;nie wykorzystuję ich do&nbsp;reklamy
            ani&nbsp;profilowania. Dane mogę ujawnić organom publicznym tylko
            wtedy, gdy wymaga tego prawo. Serwis nie zawiera osadzonych wtyczek
            mediów społecznościowych. Odnośniki do&nbsp;zewnętrznych stron (np.
            zapisów na&nbsp;warsztaty) prowadzą do&nbsp;serwisów, za&nbsp;które
            nie odpowiadam – ich polityki prywatności obowiązują
            po&nbsp;przejściu na&nbsp;te strony.
          </P>

          <H2 id="6-transfer">6. Przekazywanie danych poza EOG</H2>
          <P>
            Serwer z&nbsp;bazą danych (w&nbsp;tym dane subskrybentów) znajduje
            się w&nbsp;Finlandii, czyli w&nbsp;Unii Europejskiej, a&nbsp;jego
            dostawcą jest polska firma Mikr.us.
          </P>
          <P>
            Niektórzy dostawcy (Resend, Cloudflare, Google, Apify oraz
            OpenRouter w&nbsp;zakresie danych konta) mogą przetwarzać dane poza
            Europejskim Obszarem Gospodarczym, w&nbsp;szczególności
            w&nbsp;Stanach Zjednoczonych. Przekazanie opiera się wtedy
            na&nbsp;mechanizmach przewidzianych w&nbsp;RODO, takich jak decyzja
            Komisji Europejskiej o&nbsp;odpowiednim stopniu ochrony (np. EU–US
            Data Privacy Framework dla certyfikowanych firm z&nbsp;USA) albo
            standardowe klauzule umowne.
          </P>
          <P>
            Treści ogłoszeń przekazywane modelowi językowemu są przetwarzane
            w&nbsp;Europie (<AnchorLink id="4-2-region">punkt 4.2</AnchorLink>
            ).
          </P>

          <H2 id="7-retencja">7. Jak długo przechowuję dane</H2>
          <TableWrap className="min-w-[36rem]">
            <thead>
              <tr className="border-b bg-muted/50">
                <Th>Dane</Th>
                <Th>Okres przechowywania</Th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <Td>
                  potwierdzona subskrypcja (e-mail, miasto, promień, token)
                </Td>
                <Td>
                  do&nbsp;rezygnacji z&nbsp;subskrypcji lub&nbsp;usunięcia
                  na&nbsp;Twoją prośbę
                </Td>
              </tr>
              <tr>
                <Td>niepotwierdzona subskrypcja</Td>
                <Td>
                  usuwana automatycznie, najpóźniej po&nbsp;48&nbsp;godzinach
                  od&nbsp;zapisu, jeśli nie klikniesz linku potwierdzającego
                </Td>
              </tr>
              <tr>
                <Td>historia powiadomień</Td>
                <Td>
                  do&nbsp;usunięcia subskrypcji lub&nbsp;powiązanych warsztatów
                  (są&nbsp;wtedy usuwane automatycznie)
                </Td>
              </tr>
              <tr>
                <Td>logi serwera</Td>
                <Td>około 5&nbsp;dni</Td>
              </tr>
              <tr>
                <Td>dane o&nbsp;warsztatach</Td>
                <Td>
                  usuwane automatycznie do&nbsp;2&nbsp;tygodni
                  po&nbsp;zakończeniu warsztatów; wcześniej na&nbsp;Twoją prośbę
                </Td>
              </tr>
              <tr>
                <Td>
                  dane o&nbsp;prowadzących (imię i&nbsp;nazwisko, specjalizacja)
                </Td>
                <Td>
                  do&nbsp;czasu, gdy są potrzebne do&nbsp;prezentowania wydarzeń
                  w&nbsp;Serwisie, lub&nbsp;do&nbsp;usunięcia na&nbsp;Twoją
                  prośbę
                </Td>
              </tr>
              <tr>
                <Td>zdjęcia prowadzących</Td>
                <Td>
                  do&nbsp;wycofania zgody przez prowadzącego
                  lub&nbsp;do&nbsp;usunięcia na&nbsp;jego prośbę
                </Td>
              </tr>
              <tr>
                <Td>korespondencja</Td>
                <Td>
                  do&nbsp;załatwienia sprawy i&nbsp;przez czas potrzebny
                  do&nbsp;ewentualnej obrony przed roszczeniami
                </Td>
              </tr>
            </tbody>
          </TableWrap>
          <P>
            Dostawcy usług zewnętrznych przechowują dane według własnych zasad,
            np. Resend może przez pewien czas zachować dzienniki wysłanych
            wiadomości. Kopie zapasowe bazy danych mogą istnieć jeszcze przez
            krótki czas po&nbsp;usunięciu danych z&nbsp;systemu produkcyjnego.
          </P>

          <H2 id="8-rezygnacja">8. Rezygnacja z&nbsp;powiadomień</H2>
          <P>
            W&nbsp;każdej wiadomości z&nbsp;powiadomieniem jest link
            do&nbsp;rezygnacji (oraz przycisk rezygnacji w&nbsp;programach
            pocztowych, które obsługują nagłówek <Code>List-Unsubscribe</Code>).
            Po&nbsp;kliknięciu subskrypcja jest <strong>trwale usuwana</strong>{' '}
            razem z&nbsp;powiązaną historią powiadomień.
          </P>
          <P>
            Jeśli nie potwierdzisz zapisu, nie wyślę Ci żadnych powiadomień,
            a&nbsp;niepotwierdzony wpis zostanie usunięty automatycznie. Jeśli
            ktoś wpisał Twój adres bez&nbsp;Twojej wiedzy, zignoruj wiadomość
            z&nbsp;potwierdzeniem albo napisz do&nbsp;mnie, a&nbsp;usunę wpis
            od&nbsp;razu.
          </P>

          <H2 id="9-prawa">9. Twoje prawa</H2>
          <P>Na podstawie RODO masz prawo do:</P>
          <Ul>
            <li>dostępu do&nbsp;swoich danych i&nbsp;otrzymania ich kopii,</li>
            <li>sprostowania danych,</li>
            <li>usunięcia danych („prawo do&nbsp;bycia zapomnianym”),</li>
            <li>ograniczenia przetwarzania,</li>
            <li>
              przenoszenia danych (dotyczy danych przetwarzanych
              na&nbsp;podstawie zgody),
            </li>
            <li>
              <strong>sprzeciwu</strong> wobec przetwarzania opartego
              na&nbsp;prawnie uzasadnionym interesie, np. danych prowadzących
              z&nbsp;<AnchorLink id="2-4-dane-publiczne">punktu 2.4</AnchorLink>
              ,
            </li>
            <li>
              <strong>wycofania zgody</strong> w&nbsp;dowolnym momencie (dotyczy
              też zgody na&nbsp;publikację zdjęcia).
            </li>
          </Ul>
          <P>
            Aby skorzystać z&nbsp;tych praw, napisz na&nbsp;adres podany w&nbsp;
            <AnchorLink id="1-administrator">punkcie 1</AnchorLink>. Żeby mieć
            pewność, że dane wydaję lub&nbsp;usuwam właściwej osobie, mogę
            poprosić o&nbsp;napisanie z&nbsp;adresu e-mail, którego dotyczy
            prośba. Odpowiem w&nbsp;ciągu miesiąca.
          </P>
          <P>
            Masz też prawo wnieść skargę do&nbsp;organu nadzorczego:{' '}
            <strong>Prezesa Urzędu Ochrony Danych Osobowych</strong> (ul.
            Moniuszki 1A, 00-014 Warszawa,{' '}
            <ExternalLink href="https://uodo.gov.pl">uodo.gov.pl</ExternalLink>
            ).
          </P>

          <H2 id="10-dobrowolnosc">
            10. Dobrowolność i&nbsp;osoby niepełnoletnie
          </H2>
          <P>
            Podanie danych jest dobrowolne. Bez adresu e-mail, miasta
            i&nbsp;promienia nie mogę jednak wysyłać powiadomień. Z&nbsp;mapy
            i&nbsp;listy warsztatów możesz korzystać bez podawania żadnych
            danych.
          </P>
          <P>
            Serwis nie jest skierowany do&nbsp;dzieci. Na&nbsp;powiadomienia
            e-mail mogą zapisywać się osoby, które ukończyły 16&nbsp;lat.
            Młodsze osoby mogą to zrobić za zgodą rodzica lub&nbsp;opiekuna.
          </P>

          <H2 id="11-bezpieczenstwo">11. Bezpieczeństwo</H2>
          <P>
            Stosuję środki techniczne i&nbsp;organizacyjne adekwatne
            do&nbsp;ryzyka, m.in.:
          </P>
          <Ul>
            <li>
              dane subskrybentów i&nbsp;historia powiadomień są zabezpieczone
              przed nieuprawnionym dostępem; ogólnodostępne są tylko
              opublikowane informacje o&nbsp;warsztatach i&nbsp;prowadzących,
            </li>
            <li>
              potwierdzenie i&nbsp;rezygnacja z&nbsp;subskrypcji wymagają
              losowego tokena z&nbsp;wiadomości e-mail,
            </li>
            <li>
              formularz zapisu jest chroniony przed automatami (Turnstile)
              i&nbsp;limitami liczby żądań,
            </li>
            <li>
              automatyczne pobieranie stron zewnętrznych jest ograniczone
              mechanizmami chroniącymi przed nadużyciami,
            </li>
            <li>
              klucze dostępowe do&nbsp;usług zewnętrznych są przechowywane poza
              kodem źródłowym,
            </li>
            <li>panel administracyjny jest dostępny wyłącznie dla mnie.</li>
          </Ul>
          <P>
            Żaden system nie jest w&nbsp;pełni bezpieczny. W&nbsp;razie
            naruszenia ochrony danych, które powodowałoby wysokie ryzyko dla
            Twoich praw lub&nbsp;wolności, powiadomię Cię o&nbsp;tym zgodnie
            z&nbsp;RODO.
          </P>

          <H2 id="12-zmiany">12. Zmiany polityki</H2>
          <P>
            Mogę aktualizować tę politykę, np. gdy zmieni się sposób działania
            Serwisu, korzystane usługi lub&nbsp;przepisy. Aktualna wersja jest
            zawsze dostępna w&nbsp;Serwisie, a&nbsp;data ostatniej zmiany
            znajduje się na&nbsp;początku dokumentu. O&nbsp;istotnych zmianach
            dotyczących powiadomień poinformuję w&nbsp;wiadomości e-mail
            lub&nbsp;w&nbsp;Serwisie.
          </P>
        </article>
      </main>
    </div>
  );
}
