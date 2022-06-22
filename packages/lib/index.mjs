import {
  dayString,
  parse,
  round,
  timeString,
} from "./date-time.mjs";

export async function mtt(options) {

  const storage = options.storage ?? await import('@mtt/storage-mem');

  async function log(options) {
    let {
      date,
      time,
      duration,
      taskName,
      ...record
    } = options;

    date = date ? dayString(parse(date)) : dayString();
    time = time ? timeString(round(parse(`${date} ${time}`))) : timeString();
    const task = await storage.tasks.get(taskName);
    delete task.name;

    return storage.logs.upsert({
      date,
      time,
      ...task,
      duration,
      ...record,
    });
  }

  async function task(options) {
    const {
      date,
      duration,
      taskName,
      isProductive,
      isCounted,
    } = options;

    const task = storage.tasks.get(taskName);

    return storage.tasks.upsert()
  }

  return {
    log,
    task,
  }
}
