// avoid using or exposing 'dayjs' directly, outside this module.
// we want to keep our external dependencies as loosely coupled with our app as possible
// why? So that if we ever need to update our date library (for instance, momentjs used
// to be the library for dates, but it stopped being supported), we only need to handle
// it in one spot.

import * as dayjs from 'dayjs';
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
  MILLIS,
} from './constants.mjs';


export const now = () => new Date();

export const dayString = (date = now()) => dayjs(date).format(DEFAULT_DATE_FORMAT);

export const parse = (dateString) => new Date(dayjs(dateString).valueOf());

export const timeString = (date = now()) => dayjs(date).format(DEFAULT_TIME_FORMAT);

export function round(date = now(), increment = MILLIS.QUARTER_HOUR) {
  return new Date(Math.round(date.getTime() / increment) * increment);
}
