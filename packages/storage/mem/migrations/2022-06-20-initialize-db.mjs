import { factoryData } from '@mtt/factory-data'

const deepCopy = obj => JSON.parse(JSON.stringify(obj));

export default async function migrate(repo) {
  Object.assign(repo, deepCopy(factoryData));

  const index = repo.index = { logs: {}, tasks: {}, productivityTypes: {} };

  for (const log of repo.logs) {
    const { date, time } = log;
    if(!index.logs[date]) {
      index.logs[date] = {};
    }
    index.logs[date][time] = log;
  }

  for (const task of repo.tasks) {
    const { name } = task;
    index.tasks[name] = task;
  }

  for (const type of _repo.productivityTypes) {
    const { name } = type;
    index.productivityTypes[name] = type;
  }
}
