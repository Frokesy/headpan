import type { FastifyPluginAsync } from "fastify";

const healthRoute: FastifyPluginAsync = async (app) => {
  app.get("/health", async () => {
    const result = await app.db.query<{ now: Date }>("select now()");
    return { status: "ok", database: "connected", timestamp: result.rows[0].now };
  });
};

export default healthRoute;
