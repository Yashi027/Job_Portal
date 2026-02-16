//const Sentry = require("@sentry/node");
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://abfdd8742d12275a5ec29eb498b71594@o4510890213638144.ingest.us.sentry.io/4510890229235712",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  integrations: [Sentry.mongooseIntegration()],
  sendDefaultPii: true,
});