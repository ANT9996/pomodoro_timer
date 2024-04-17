import {create, StateCreator} from "zustand";
import {tDay, tSettings, tTask, tTheme, tTimerState} from "./types";
import LocalStorage from "./helpers/LocalStorage";
import createDayId from "./helpers/createDayId";
import {DaysOfWeekReverse} from "./enums";
import {devtools} from "zustand/middleware";

interface iStore {
  tasks: tTask[]
  days: tDay[]

  settings: tSettings
  updateSettings: (properties: Partial<tSettings>) => void

  theme:tTheme
  changeTheme: () => void

  getToday: () => tDay

  timerState: tTimerState
  setTimerState: (properties: Partial<tTimerState>) => void

  setTasks: (tasks: tTask[]) => void
  setDays: (days: tDay[]) => void

  addTask: (task: tTask['name']) => void
  addDay: (day: tDay) => void

  deleteTask: (id: tTask['id']) => void
  deleteDay: (id: tDay['id']) => void

  editTask: (id: tTask['id'], newTaskProperties: Partial<tTask>) => void
  editDay: (id: tDay['id'], newDayProperties: Partial<tDay>) => void

  clearTimerState: () => void
}

type tStore = StateCreator<iStore>

const store:tStore = (set) => ({
  tasks: LocalStorage.getTasksFromStorage(),
  days: LocalStorage.getDaysFromStorage(),

  settings: LocalStorage.getSettingsFromStorage(),
  updateSettings: (properties) => {
    set(state => {
      const updatedSettings = {...state.settings,  ...properties}
      LocalStorage.setSettingsToStorage(updatedSettings)
      // console.log({properties: properties, updatedSettings: updatedSettings})
      return ({settings: updatedSettings})
    })
  },

  theme: LocalStorage.getThemeFromStorage(),
  changeTheme: () => {
    set(state => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      return ({theme: LocalStorage.setThemeToStorage(newTheme)})
    })
  },

  getToday: () => {
    const day = LocalStorage.getDaysFromStorage().find(day => createDayId() === day.id)
    if (day) {
      // console.log('Найден день', day)
      return day
    }
    const dayOfWeek = new Date().toLocaleDateString('ru-Ru', {weekday: 'long'}).replace(/^[а-я]/g, function (el, index) {
      return index === 0 ? el.toUpperCase() : el
    })
    // console.log(dayOfWeek)
    const newDay = {
      id: createDayId(),
      name: DaysOfWeekReverse[dayOfWeek],
      pomodoros: 0,
      time: 0,
      pauseCount: 0,
      pauseTime: 0,
    }
    set(() => {
      const newDays = [...LocalStorage.getDaysFromStorage(), newDay]
      return {days: LocalStorage.saveDaysToStorage(newDays)}
    })
    // console.log(newDay)
    return newDay
  },

  timerState: {
    timeLeft: LocalStorage.getSettingsFromStorage().pomodoroTimeCost,
    pauseCount: 0,
    pauseTime: 0,
    theme: '',
    restTimer: false,
    restTimerTime: null,
    currentTaskIndex: 1
  },
  setTimerState: (properties) => {
    set(state => {
      const newTimerState = {...state.timerState, ...properties}
      return ({timerState: newTimerState})
    })
  },

  setTasks: (tasks) => {
    LocalStorage.saveTasksToStorage(tasks)
    set({tasks: [...tasks]})
  },
  setDays: (days) => {
    LocalStorage.saveDaysToStorage(days)
    set({days: [...days]})
  },

  addTask: (name) => {
    const task: tTask = {
      id: crypto.randomUUID(),
      pomodoroCost: 1,
      name
    }
    set((state) => {
      const newTasks = LocalStorage.saveTasksToStorage([...state.tasks, task])
      return ({tasks: newTasks})
    })
  },
  addDay: (day) => {
    set((state) => ({days: [...state.days, day]}))
  },

  deleteTask: (id) => {
    set((state) => {
      const newTasks = [...state.tasks.filter(task => task.id !== id)]
      LocalStorage.saveTasksToStorage(newTasks)
      return {tasks: newTasks}
    })
  },
  deleteDay: (id) => {
    set((state) => ({days: [...state.days.filter(day => day.id !== id)]}))
  },

  editTask: (id, newTaskProperties) => {
    set((state) => {
      const task = state.tasks.find(task => task.id === id)
      // console.log(task)
      for (const taskElement of Object.keys(newTaskProperties)) {
        task[taskElement] = newTaskProperties[taskElement]
      }
      const newTasks = [...state.tasks].map(task => {
        if (task.id === id) return {...task, ...newTaskProperties}
        return task
      })
      return ({tasks: LocalStorage.saveTasksToStorage(newTasks)})
    })
  },
  editDay: (id, newDayProperties) => {
    set((state) => {
      const day = state.days.find(task => task.id === id)
      if (!day) return (state)
      // console.log('изменение дня', day)
      for (const dayElement of Object.keys(newDayProperties)) {
        day[dayElement] = newDayProperties[dayElement]
      }
      const newDays = [...state.days].map(day => {
        if (day.id === id) return {...day, ...newDayProperties}
        return day
      })
      return ({days: LocalStorage.saveDaysToStorage(newDays)})
    })
  },

  clearTimerState: () => {
    set((state) => {
      const newState = {
        timeLeft: (LocalStorage.getSettingsFromStorage().pomodoroTimeCost),
        pauseCount: 0,
        pauseTime: 0,
        theme: '',
      }
      return ({timerState: {...state.timerState, ...newState}})
    })
  }
})

export const useStore = create<iStore>()(devtools(store))