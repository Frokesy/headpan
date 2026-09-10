import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { pool } from "./pool.js";

const migrationsDirectory = fileURLToPath(new URL("../../migrations/", import.meta.url));

await pool.query(`
  create table if not exists schema_migrations (
    name text primary key,
    applied_at timestamptz not null default now()
  )
`);

const applied = new Set(
  (await pool.query<{ name: string }>("select name from schema_migrations")).rows.map((row) => row.name),
);

for (const name of (await readdir(migrationsDirectory)).filter((file) => file.endsWith(".sql")).sort()) {
  if (applied.has(name)) continue;
  const sql = await readFile(`${migrationsDirectory}/${name}`, "utf8");
  const client = await pool.connect();
  try {
    await client.query("begin");
    await client.query(sql);
    await client.query("insert into schema_migrations (name) values ($1)", [name]);
    await client.query("commit");
    console.log(`Applied ${name}`);
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}

await pool.end();
