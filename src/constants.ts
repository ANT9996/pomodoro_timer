import {tDay} from "./types";

export const DAYS_OF_WEEK: tDay['name'][] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
export const WEEKS: {
  thisWeek: 0,
  previousWeek: 7,
  twoWeeksAgo: 14
} = {
  thisWeek: 0,
  previousWeek: 7,
  twoWeeksAgo: 14
}

// Наименования ключей в localStorage
export const LOCAL_NAME_DAYS = 'days'
export const LOCAL_NAME_TASKS = 'tasks'
export const LOCAL_NAME_THEME = 'theme'
export const LOCAL_NAME_SETTINGS = 'settings'

// Значения по умолчанию, в случае если в localStorage отсутствует ключ 'settings'
export const POMIDORO_TIME_COST = 25 * 60
export const SHORT_REST_TIME = 5 * 60
export const LONG_REST_TIME = 15 * 60
export const LONG_REST_RATE = 4
export const NOTIFICATION = true