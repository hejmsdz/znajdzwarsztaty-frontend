import { CitiesCombobox } from '#/components/follow/cities-combobox';
import { SubscriptionErrorAlert } from '#/components/follow/subscription-error-alert';
import { SuccessMessage } from '#/components/messages/success-message';
import { TopBar } from '#/components/layout/top-bar/top-bar';
import { Button } from '#/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '#/components/ui/field';
import { Input } from '#/components/ui/input';
import { Slider } from '#/components/ui/slider';
import type { City } from '#/hooks/queries/use-cities-by-letter';
import { useCreateNotificationSubscription } from '#/hooks/queries/use-create-notification-subscription';
import { Turnstile } from '@marsidev/react-turnstile';
import type { TurnstileInstance } from '@marsidev/react-turnstile';
import { createFileRoute } from '@tanstack/react-router';
import { BellRingIcon, LoaderCircleIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import type { SubmitEvent } from 'react';

export const Route = createFileRoute('/follow')({
  component: RouteComponent,
});

const MIN_DISTANCE_KM = 10;
const MAX_DISTANCE_KM = 200;
const DEFAULT_DISTANCE_KM = 50;
const DISTANCE_STEP_KM = 5;

type FollowFormError = 'city' | 'antispamToken';
type FollowFormErrors = Partial<Record<FollowFormError, string>>;

function RouteComponent() {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState<City | null>(null);
  const [maxDistanceKm, setMaxDistanceKm] = useState(DEFAULT_DISTANCE_KM);
  const [errors, setErrors] = useState<FollowFormErrors>({});

  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const {
    mutate: submitNotificationSubscription,
    isPending,
    isSuccess,
    isError,
    error: mutationError,
  } = useCreateNotificationSubscription();

  const clearError = (key: FollowFormError) => {
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FollowFormErrors = {};

    if (!city) {
      nextErrors.city = 'Wybierz miasto.';
    }

    const antispamToken = turnstileRef.current?.getResponse();

    if (!antispamToken) {
      nextErrors.antispamToken = 'Potwierdź, że nie jesteś robotem.';
    }

    setErrors(nextErrors);

    if (!city || !antispamToken) {
      return;
    }

    submitNotificationSubscription(
      {
        email: email.trim(),
        lat: city.lat,
        lon: city.lon,
        maxDistanceKm,
        antispamToken,
      },
      {
        onError: () => {
          turnstileRef.current?.reset(); // Turnstile tokens are single-use, so request a fresh one on failure.
        },
      },
    );
  };

  return (
    <div className="flex min-h-svh flex-col">
      <TopBar />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-10 md:py-16">
        {isSuccess ? (
          <SuccessMessage title="Prawie gotowe!">
            Wysłaliśmy wiadomość z&nbsp;linkiem potwierdzającym na&nbsp;adres{' '}
            <span className="font-medium text-foreground">{email}</span>.
            Kliknij link w&nbsp;wiadomości, aby aktywować powiadomienia
            o&nbsp;nowych warsztatach w&nbsp;Twojej okolicy.
          </SuccessMessage>
        ) : (
          <>
            <section className="rounded-4xl border bg-card p-6 shadow-sm sm:p-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <BellRingIcon className="size-6" />
                </div>
                <h1 className="mt-4 font-heading text-2xl font-semibold tracking-tight">
                  Obserwuj warsztaty
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Wybierz miasto, a powiadomimy Cię e-mailem o&nbsp;nowych
                  warsztatach w&nbsp;okolicy.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8">
                <FieldGroup className="gap-5">
                  <Field>
                    <FieldLabel htmlFor="email">Adres e-mail</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="Wpisz adres e-mail"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </Field>

                  <Field data-invalid={errors.city ? true : undefined}>
                    <FieldLabel htmlFor="city">Miasto</FieldLabel>
                    <CitiesCombobox
                      id="city"
                      required
                      value={city}
                      onChange={(nextCity) => {
                        setCity(nextCity);
                        if (errors.city) {
                          clearError('city');
                        }
                      }}
                    />
                    <FieldError>{errors.city}</FieldError>
                  </Field>

                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel>Maksymalna odległość</FieldLabel>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-semibold text-primary tabular-nums">
                        {maxDistanceKm} km
                      </span>
                    </div>
                    <Slider
                      value={[maxDistanceKm]}
                      min={MIN_DISTANCE_KM}
                      max={MAX_DISTANCE_KM}
                      step={DISTANCE_STEP_KM}
                      onValueChange={(next) => {
                        if (Array.isArray(next)) {
                          setMaxDistanceKm(next[0]);
                        }
                      }}
                    />
                    <div
                      className="flex justify-between text-xs text-muted-foreground"
                      aria-hidden
                    >
                      <span>{MIN_DISTANCE_KM} km</span>
                      <span>{MAX_DISTANCE_KM} km</span>
                    </div>
                    <FieldDescription>
                      Powiadomimy Cię o warsztatach w&nbsp;promieniu do&nbsp;
                      {maxDistanceKm} km od&nbsp;
                      {city ? `miasta ${city.name}` : 'wybranego miasta'}.
                    </FieldDescription>
                  </Field>
                </FieldGroup>

                <div className="mt-6 flex flex-col gap-2">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    options={{ size: 'flexible', language: 'pl' }}
                    onSuccess={() => clearError('antispamToken')}
                    onExpire={() => turnstileRef.current?.reset()}
                    className="w-full"
                  />
                  <FieldError>{errors.antispamToken}</FieldError>

                  {isError ? (
                    <SubscriptionErrorAlert error={mutationError} />
                  ) : null}

                  <Button
                    type="submit"
                    size="lg"
                    className="mt-2 w-full"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <LoaderCircleIcon
                          className="animate-spin"
                          data-icon="inline-start"
                        />
                        Zapisywanie…
                      </>
                    ) : (
                      <>
                        <BellRingIcon data-icon="inline-start" />
                        Obserwuj warsztaty
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </section>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Zapisując się, zgadzasz się na otrzymywanie powiadomień e-mail
              o&nbsp;nowych warsztatach. Możesz zrezygnować w każdej chwili.
            </p>
          </>
        )}
      </main>
    </div>
  );
}
