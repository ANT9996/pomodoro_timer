import {tDay, tSettings, tTask, tTheme} from "../types";
import {
  LOCAL_NAME_TASKS,
  LOCAL_NAME_THEME,
  LOCAL_NAME_DAYS,
  LOCAL_NAME_SETTINGS,
  POMIDORO_TIME_COST, SHORT_REST_TIME, LONG_REST_TIME, LONG_REST_RATE, NOTIFICATION
} from "../constants";

const getTasksFromStorage = (): tTask[] => {
  const parsed = JSON.parse(localStorage.getItem(LOCAL_NAME_TASKS) || '[]')
  // console.log(parsed)
  return parsed || []
}
const saveTasksToStorage = (tasks: tTask[]) => {
  // console.log(tasks)
  localStorage.setItem(LOCAL_NAME_TASKS, JSON.stringify(tasks))
  return tasks
}

const getDaysFromStorage = (): tDay[] => {
  const parsed = JSON.parse(localStorage.getItem(LOCAL_NAME_DAYS) || '[]')
  // console.log(parsed)
  return parsed || []
}
const saveDaysToStorage = (days: tDay[]) => {
  // console.log(days)
  localStorage.setItem(LOCAL_NAME_DAYS, JSON.stringify(days))
  return days
}

const getThemeFromStorage = (): tTheme => {
  const parsed = localStorage.getItem(LOCAL_NAME_THEME)
  if (!parsed) localStorage.setItem(LOCAL_NAME_THEME, 'light')
  if (parsed !== 'light' && parsed !== 'dark') {
    localStorage.setItem(LOCAL_NAME_THEME, 'light')
    return 'light'
  }
  // console.log(parsed)
  return parsed
}
const setThemeToStorage = (theme: tTheme): tTheme => {
  // console.log('setThemeToStorage', theme)
  localStorage.setItem(LOCAL_NAME_THEME, theme)
  return theme
}

const getSettingsFromStorage = (): tSettings => {
  const newSettings: tSettings = {
    pomodoroTimeCost: POMIDORO_TIME_COST,
    shortRestTime: SHORT_REST_TIME,
    longRestTime: LONG_REST_TIME,
    longRestRate: LONG_REST_RATE,
    notification: NOTIFICATION,
  }
  const data = localStorage.getItem(LOCAL_NAME_SETTINGS)
  if (!data) {
    localStorage.setItem(LOCAL_NAME_SETTINGS, JSON.stringify(newSettings))
    return newSettings
  }
  
  // console.log(parsed)
  return JSON.parse(data)
}

const setSettingsToStorage = (settings: tSettings): tSettings => {
  localStorage.setItem(LOCAL_NAME_SETTINGS, JSON.stringify(settings))
  return settings
}

export default {
  getTasksFromStorage,
  saveTasksToStorage,

  getDaysFromStorage,
  saveDaysToStorage,

  getThemeFromStorage,
  setThemeToStorage,

  getSettingsFromStorage,
  setSettingsToStorage,
}