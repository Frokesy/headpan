import Fastify from "fastify";
import cors from "@fastify/cors";
import { config } from "./config.js";
import database from "./plugins/database.js";
import healthRoute from "./routes/health.js";

export async function buildApp() {
  const app = Fastify({ logger: true });
  await app.register(cors, { origin: config.WEB_ORIGIN, credentials: true });
  await app.register(database);
  await app.register(healthRoute, { prefix: "/api/v1" });
  return app;
}
