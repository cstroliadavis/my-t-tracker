const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const QUARTER_HOUR = HOUR / 4;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

export const MILLIS = {
  SECOND,
  MINUTE,
  QUARTER_HOUR,
  HOUR,
  DAY,
  WEEK,
};

// TODO: consider replacing these with env vars
export const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';
export const DEFAULT_TIME_FORMAT = 'hh:mm A';
