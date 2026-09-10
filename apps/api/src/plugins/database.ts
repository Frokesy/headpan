import fp from "fastify-plugin";
import type { Pool } from "pg";
import { pool } from "../database/pool.js";

declare module "fastify" {
  interface FastifyInstance {
    db: Pool;
  }
}

export default fp(async (app) => {
  app.decorate("db", pool);
  app.addHook("onClose", async () => pool.end());
});
