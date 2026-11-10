import { ApiError } from '#/api/api';
import { ErrorMessage } from '#/components/messages/error-message';
import { LoadingMessage } from '#/components/messages/loading-message';
import { SuccessMessage } from '#/components/messages/success-message';
import { TopBar } from '#/components/layout/top-bar/top-bar';
import { useUnsubscribeNotificationSubscription } from '#/hooks/queries/use-unsubscribe-notification-subscription';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { z } from 'zod';

const unsubscribeSearchSchema = z.object({
  token: z.string().optional(),
});

export const Route = createFileRoute('/follow_/unsubscribe/$id')({
  component: RouteComponent,
  validateSearch: unsubscribeSearchSchema,
});

function getErrorDescription(error: Error | null): string {
  if (
    error === null ||
    (error instanceof ApiError &&
      (error.status === 400 || error.status === 404))
  ) {
    return 'Ten link do rezygnacji jest nieprawidłowy lub wygasł.';
  }

  return 'Wystąpił błąd podczas rezygnacji z powiadomień. Spróbuj ponownie później.';
}

function RouteComponent() {
  const { id } = Route.useParams();
  const { token } = Route.useSearch();
  const {
    mutate: unsubscribe,
    isPending,
    isSuccess,
    error,
  } = useUnsubscribeNotificationSubscription();

  useEffect(() => {
    if (token) {
      unsubscribe({ id, token });
    }
  }, [unsubscribe, id, token]);

  return (
    <div className="flex min-h-svh flex-col">
      <TopBar />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-10 md:py-16">
        {isSuccess ? (
          <SuccessMessage title="Powiadomienia anulowane">
            Twój zapis do powiadomień o&nbsp;nowych warsztatach został
            anulowany. Nie będziemy już wysyłać Ci żadnych wiadomości. Jeśli
            zmienisz zdanie, możesz zapisać się ponownie w&nbsp;każdej chwili.
          </SuccessMessage>
        ) : isPending ? (
          <LoadingMessage title="Rezygnacja z powiadomień…">
            Trwa anulowanie Twojego zapisu do powiadomień o&nbsp;nowych
            warsztatach.
          </LoadingMessage>
        ) : (
          <ErrorMessage title="Nie udało się anulować subskrypcji">
            {getErrorDescription(error)}
          </ErrorMessage>
        )}
      </main>
    </div>
  );
}
