import { CitiesCombobox } from '#/components/follow/cities-combobox';
import type { City } from '#/hooks/queries/use-cities-by-letter';
import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import type { TurnstileInstance } from '@marsidev/react-turnstile';
import { Button } from '#/components/ui/button';

export const Route = createFileRoute('/follow')({
  component: RouteComponent,
});

function RouteComponent() {
  const [city, setCity] = useState<City | null>(null);

  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [token, setToken] = useState<string>('');

  return (
    <div>
      <CitiesCombobox value={city} onChange={setCity} />
      {JSON.stringify(city)}
      <Turnstile
        ref={turnstileRef}
        siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
      />
      <Button
        onClick={() => setToken(turnstileRef.current?.getResponse() || '')}
      >
        Verify
      </Button>
      <code>{token}</code>
    </div>
  );
}
