import { ApiError } from '#/api/api';
import { ErrorMessage } from '#/components/messages/error-message';
import { LoadingMessage } from '#/components/messages/loading-message';
import { SuccessMessage } from '#/components/messages/success-message';
import { TopBar } from '#/components/layout/top-bar/top-bar';
import { Main } from '#/components/layout/main';
import { useConfirmNotificationSubscription } from '#/hooks/queries/use-confirm-notification-subscription';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { z } from 'zod';

const confirmSearchSchema = z.object({
  token: z.string().optional(),
});

export const Route = createFileRoute('/follow_/confirm/$id')({
  component: RouteComponent,
  validateSearch: confirmSearchSchema,
});

function getErrorDescription(error: Error | null): string {
  if (
    error === null ||
    (error instanceof ApiError &&
      (error.status === 400 || error.status === 404))
  ) {
    return 'Ten link potwierdzający jest nieprawidłowy albo wygasł. Zapisz się ponownie, aby otrzymać nowy link.';
  }

  return 'Wystąpił błąd podczas potwierdzania subskrypcji. Spróbuj ponownie później.';
}

function RouteComponent() {
  const { id } = Route.useParams();
  const { token } = Route.useSearch();
  const {
    mutate: confirmSubscription,
    isPending,
    isSuccess,
    error,
  } = useConfirmNotificationSubscription();

  useEffect(() => {
    if (token) {
      confirmSubscription({ id, token });
    }
  }, [confirmSubscription, id, token]);

  return (
    <div className="flex min-h-svh flex-col">
      <TopBar />
      <Main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-10 md:py-16">
        {isSuccess ? (
          <SuccessMessage title="Powiadomienia aktywowane!">
            Twój zapis do powiadomień o&nbsp;nowych warsztatach został
            potwierdzony. Od teraz będziemy wysyłać Ci e-maile, gdy
            w&nbsp;Twojej okolicy pojawią się nowe warsztaty.
          </SuccessMessage>
        ) : isPending ? (
          <LoadingMessage title="Potwierdzanie subskrypcji…">
            Trwa potwierdzanie Twojego zapisu do powiadomień o&nbsp;nowych
            warsztatach.
          </LoadingMessage>
        ) : (
          <ErrorMessage title="Nie udało się potwierdzić subskrypcji">
            {getErrorDescription(error)}
          </ErrorMessage>
        )}
      </Main>
    </div>
  );
}
