import winston from "winston";
import * as appInsights from "applicationinsights";
import { envs } from "./envs";

appInsights
    .setup(envs.APPINSIGHTS_CONNECTION_STRING)
    .setAutoCollectConsole(false)
    .setSendLiveMetrics(true)
    .start()

const aiClient = appInsights.defaultClient;
 
const appInsightsTransport = new winston.transports.Console({
  level: "info",
  format: winston.format.printf(({ level, message, timestamp }) => {
    aiClient.trackTrace({
      message: `[${level}] ${message}`,
      properties: { timestamp },
    });
    return `${timestamp} [${level}] ${message}`;
  }),
});
 
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    appInsightsTransport,
  ],
});