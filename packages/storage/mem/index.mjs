import { default as migrate } from './migrations'

const _repo = migrate();
const _index = _repo.index;

async function standardUpsert(table) {
  return data => {
    const { name } = data;
    const existing = _index[table][name];

    if (existing) {
      Object.assign(existing, data)
    } else {
      _index[table][name] = data;
      _repo[table].push(data)
    }
    return data;
  }
}

const _storage = {
  logs: {
    async upsert(data) {
      const { date, time } = data;
      const existing = _index.logs[date]?.[time];

      if (existing) {
        Object.assign(existing, data);
      } else {
        if(!_index.logs[date]) {
          _index.logs[date] = {};
        }
        _index.logs[date][time] = data;
        _repo.logs.push(data);
      }
      return data;
    },
    get: async ({ date, time }) => ({ ..._index.logs[date]?.[time] }),
    getByDate: async (date) => Object.values(_index.logs[date]).map(log => ({ ...log })),
  },
  productivityTypes: {
    upsert: standardUpsert('productivityTypes'),
  },
  tasks: {
    upsert: standardUpsert('tasks'),
    get: async (name) => _index.tasks[name],
  }
}

export default _storage;
