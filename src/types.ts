export type tTask = {
  id: string,
  pomodoroCost: number,
  name: string
}

export type tDayOfWeek = 'Понедельник' |'Вторник' |'Среда' |'Четверг' |'Пятница' |'Суббота' |'Воскресенье'

export type tDay = {
  id: string,
  name: 'Пн' | 'Вт' | 'Ср' | 'Чт' | 'Пт' | 'Сб' | 'Вс',
  pomodoros: number,
  time: number,
  pauseCount: number,
  pauseTime: number,
}

export type tWeek = 0 | 7 | 14

export type tTheme = 'dark' | 'light'

export type tSettings = {
  pomodoroTimeCost: number
  shortRestTime: number
  longRestTime: number
  longRestRate: number
  notification: boolean
}

export type tTimerState = {
  timeLeft: number
  pauseCount: number
  pauseTime: number
  theme: CSSRule | ''
  restTimer: boolean
  restTimerTime: number | null
  currentTaskIndex: number
}