import { ApiError } from '#/api/api';
import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert';
import { CircleAlertIcon } from 'lucide-react';

function getErrorDescription(error: Error): string {
  if (!(error instanceof ApiError)) {
    return 'Wystąpił nieoczekiwany błąd.';
  }

  switch (error.status) {
    case 400: {
      const emailErrorCode = (error.body as any)?.data?.email?.code;
      if (emailErrorCode === 'validation_too_many_subscriptions')
        return 'Na podany adres e-mail masz już zapisanych zbyt wiele powiadomień.';

      if (emailErrorCode === 'email_quota_low')
        return 'Osiągnęliśmy już dzienny limit wysyłki maili potwierdzających. Spróbuj zapisać się na powiadomienia jutro.';

      return 'Formularz zawiera błędy.';
    }
    case 403: {
      if ((error.body as any).message === 'Antispam verification failed.') {
        return 'Weryfikacja antyspamowa się nie udała. Spróbuj jeszcze raz.';
      }

      return 'Odmowa dostępu.' + JSON.stringify(error.body);
    }
    case 429:
      return 'Formularz wysłano zbyt wiele razy w krótkim czasie. Spróbuj ponownie za kilka minut.';
    default:
      return 'Wystąpił błąd.';
  }
}

type SubscriptionErrorAlertProps = {
  error: Error;
};

export function SubscriptionErrorAlert({ error }: SubscriptionErrorAlertProps) {
  const description = getErrorDescription(error);

  return (
    <Alert variant="destructive">
      <CircleAlertIcon />
      <AlertTitle>Nie udało się zapisać powiadomienia.</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
