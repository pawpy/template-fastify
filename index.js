import Fastify from "fastify";

const app = Fastify({ logger: true });

app.get("/", async () => ({ message: "Hello from Fastify!" }));

app.get("/health", async (_req, reply) => reply.type("text/plain").send("ok\n"));

const port = Number(process.env.PORT ?? 8080);

// "::" listens on every IPv6 and IPv4 address.
app.listen({ port, host: "::" }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});

for (const signal of ["SIGTERM", "SIGINT"]) {
  process.on(signal, () => app.close().then(() => process.exit(0)));
}
