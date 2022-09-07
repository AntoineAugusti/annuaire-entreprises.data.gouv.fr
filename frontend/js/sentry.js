import * as Sentry from '@sentry/browser';
var dsn = import.meta.env.VITE_SENTRY_FRONT_DSN;

if (import.meta.env.PROD && Sentry && dsn) {
  console.log('Sentry Init');
  Sentry.init({
    dsn: dsn,
    tracesSampleRate: 1.0,
  });
}
