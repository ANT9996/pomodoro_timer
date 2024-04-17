import React, {FC, useEffect, useRef, useState} from 'react';
import c from './Timer.module.css'
import {tTask} from "../../types";
import {useStore} from "../../store";
import EmptyTimer from "../EmptyTimer/EmptyTimer";
import boop from '../../assets/sounds/microwave.mp3';
import useSound from "use-sound";

interface iTask {
  num: number
  task: tTask
  onSuccess: () => void
  darkTheme: boolean
}

const Timer:FC<iTask> = ({num, task, onSuccess, darkTheme}) => {
  const setTimerState = useStore(state => state.setTimerState)
  const timerState = useStore(state => state.timerState)
  const settings = useStore(state => state.settings)
  const isFirstRender = useRef(true);
  const timerIsRunning = useRef(false);
  const [enabled, setEnabled] = useState(false)
  const [time, setTime] = useState(timerState.timeLeft)
  const initTime = useRef(timerState.timeLeft)
  const [themeState, setThemeState] = useState<typeof c.head_paused | typeof c.head_started | ''>(timerState.theme)
  const [pauseTime, setPauseTime] = useState(timerState.pauseTime)
  const [pauseCount, setPauseCount] = useState(timerState.pauseCount)
  const [play] = useSound(boop)

  useEffect(() => {
    if (!enabled) return
    const timer = setInterval(() => {
      if (timerIsRunning.current) setTime(prevState => Math.max(prevState - 1 / task.pomodoroCost, 0))
      if (!timerIsRunning.current) setPauseTime(prevState => prevState + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [enabled])

  useEffect(() => {
    // console.log(time)
    if (task)
    // console.log(time)
    if (time === 0) timerEndHandler()
  }, [time])

  useEffect(() => {
    saveStateToStore()
  }, [time, themeState, pauseCount, pauseTime])

  useEffect(() => {
    setThemeState('')
  }, [])

  const saveStateToStore = () => {
    setTimerState({
      timeLeft: time,
      theme: themeState,
      pauseCount: pauseCount,
      pauseTime: pauseTime,
    })
  }

  const clickHandler = async (changeBool: boolean) => {
    if (isFirstRender.current) setEnabled(true)
    isFirstRender.current = false
    timerIsRunning.current = changeBool
    if (changeBool) {
      setThemeState(c.head_started)
    } else {
      setThemeState(c.head_paused)
      setPauseCount(prevState => prevState + 1)
    }
  }

  const timerEndHandler = () => {
    if (settings.notification) play()
    clearTimer()
    onSuccess()
  }

  const clearTimer = () => {
    setTime(settings.pomodoroTimeCost)
    isFirstRender.current = true
    timerIsRunning.current = false
    setEnabled(false)
    setThemeState('')
    setPauseTime(0)
    setPauseCount(0)
    initTime.current = settings.pomodoroTimeCost
  }

  const printTime = () => {
    const minutes = Math.floor(time * task.pomodoroCost / 60)
    const seconds = time * task.pomodoroCost % 60 > 9 ? (time * task.pomodoroCost % 60).toFixed(0) : '0'+(time * task.pomodoroCost % 60).toFixed(0)
    return `${minutes}:${seconds}`
  }

  const gradientColor = (time / initTime.current * 100).toFixed(1)

  if (!task) return <EmptyTimer darkTheme={darkTheme}/>;
  return (
    <div className={`${c.timer} ${darkTheme ? c.darkTheme : ''}`}>
      <div className={`${c.head} ${themeState}`}>
        <h3 className={c.title}>{task.name}</h3>
        <div className={c.count}>Помидор {task.pomodoroCost}</div>
      </div>
      <div className={c.timerContainer}>
        <div className={c.timeRemaining} style={{backgroundImage: `linear-gradient(90deg, ${!darkTheme ? '#333333' : '#ffffff'} ${gradientColor}%, #a8b64f ${gradientColor}%)`}}>
          <span>{printTime()}</span>
          <div className={c.addTimeButton}>
            {!timerIsRunning.current &&
              <svg onClick={() => setTime(prevState => prevState + (settings.pomodoroTimeCost) / task.pomodoroCost)} width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none">
              <circle cx="25" cy="25" r="25"/>
              <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill="white"/>
            </svg>}
          </div>
        </div>
        <div className={c.info}>
          Задача {num} - <span>{task.name}</span>
        </div>
        <div className={c.buttonGroup}>
          <button
            className={`btn ${timerIsRunning.current ? 'btn_disabled' : ''}`}
            onClick={() => clickHandler(true)}
          >{!timerIsRunning.current && themeState === c.head_started ? 'Старт' : (themeState === c.head_paused ? 'Продолжить' : 'Старт')}</button>
          <button
            className={`btn btn_stop ${themeState === '' ? (!isFirstRender.current ? '' : 'btn_disabled') : ''}`}
            disabled={timerState.theme === ''}
            onClick={timerIsRunning.current
              ? () => clickHandler(false)
              : clearTimer
          }>{themeState === c.head_started ? 'Стоп' : 'Сбросить'}</button>
        </div>
      </div>
    </div>
  );
};

export default Timer;