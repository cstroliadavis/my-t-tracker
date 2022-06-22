import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdir } from 'fs/promises';

export default async function runMigrations(repo = {}) {
  repo.migrations = repo.migrations ?? {};
  const completedMigrations = Object.keys(repo.migrations);

  const dir = (await readdir(dirname(fileURLToPath(import.meta.url))))
    .filter(mod => !(mod === 'index.mjs' || completedMigrations.includes(mod)))
    .sort();

  for (const filename of dir) {
    const { default: migrate } = await import(`./${filename}`);

    // would normally want some sort of try/catch block around this if it were an actual db connection
    // to make sure we release stuff. In this case, if there's an error I do want it to stop processing
    // and the error will get logged upstream, so no need to log it here, too.
    await migrate(repo);
    repo.migrations[filename] = new Date().toISOString();
  }

  return repo;
}
