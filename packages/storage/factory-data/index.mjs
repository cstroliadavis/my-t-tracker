export const defaultTask = { productivityType: 'productive', isCounted: true, duration: 0.25 };

const created = new Date()
  .toISOString()
  .replace(/^(?<yr>\d+)\-(?<mo>\d+)\-(?<day>\d+).*$/, '$mo/$day/$year');

const awayTask = { ...defaultTask, created, productivityType: 'away'}

const initialEntry = {
  date: created,
  time: '12:00 AM',
  comment: 'Default log entry from initial creation',
  duration: 0.0,
  isBreak: false,
  isPersonal: false,
  isProductive: false,
  manual: true, // indicates that duration can only be changed manually for this item
  task: 'Admin',
};

const defaultProductivityType = { isProductive: false, isBreak: false, isPersonal: false, isCounted: true };

export const factoryData = {
  logs: [ initialEntry ],
  // productivityType flags here are defaults and can be modified in resulting table
  // and overridden in specific tasks.
  productivityTypes: [
    { name: 'administrative', ...defaultProductivityType },
    { name: 'away'          , ...defaultProductivityType, isBreak: true , isPersonal: true },
    { name: 'meeting'       , ...defaultProductivityType },
    { name: 'productive'    , ...defaultProductivityType, isProductive: true },
    { name: 'research'      , ...defaultProductivityType },
    { name: 'support'       , ...defaultProductivityType },
  ],
  // values for tasks are default values that will apply to log items on creation but will often be modified
  tasks: [
    { name: '[Break]'   , ...awayTask   , isCounted: false },
    { name: '[Holiday]' , ...awayTask   , duration: 8.0 },
    { name: '[Lunch]'   , ...awayTask   , isCounted: false, duration: 1.0 },
    { name: '[LWOP]'    , ...awayTask   , isCounted: false, duration: 8.0 },
    { name: '[Sick]'    , ...awayTask   , duration: 8.0 },
    { name: '[Vacation]', ...awayTask   , duration: 8.0 },
    { name: 'Admin'     , ...defaultTask, productivityType: 'administrative'}
  ],
};
