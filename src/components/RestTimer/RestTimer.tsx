import React, {FC, useEffect, useRef, useState} from 'react';
import c from './RestTimer.module.css'
import boop from '../../assets/sounds/microwave.mp3';
import useSound from "use-sound";
import {useStore} from "../../store";

interface iRestTimer {
  onSuccess: () => void
  isDarkTheme: boolean
  seconds: number
}

const RestTimer:FC<iRestTimer> = ({onSuccess, isDarkTheme, seconds}) => {
  const [play] = useSound(boop)
  const settings = useStore(state => state.settings)
  const setTimerState = useStore(state => state.setTimerState)
  const [time, setTime] = useState(seconds)
  const initTime = useRef(seconds)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevState => Math.max(prevState - 1 , 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [seconds])

  useEffect(() => {
    // console.log(time)
    setTimerState({restTimerTime: time})
    if (time === 0) timerEndHandler()
  }, [time])

  const timerEndHandler = () => {
    if (settings.notification) play()
    setTimeout(() => {
      setTimerState({restTimerTime: settings.shortRestTime})
      onSuccess()
    }, 2000)
  }
  const gradientColor = (time / initTime.current * 100).toFixed(1)
  const printTime = () => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60 > 9 ? (time % 60).toFixed(0) : '0'+(time % 60).toFixed(0)
    return `${minutes}:${seconds}`
  }

  return (
    <div className={`${c.timer} ${isDarkTheme ? c.darkTheme : ''}`}>
      <div className={c.head}>
        <h3 className={c.title}>Период отдыха</h3>
      </div>
      <div className={c.timerContainer}>
        <div
          className={c.timeRemaining}
          style={{backgroundImage: `linear-gradient(90deg, ${!isDarkTheme ? 'rgba(0, 0, 255, 0.65)' : '#ffffff'} ${gradientColor}%, ${isDarkTheme ? 'rgba(32,32,250,0.65)' : '#a8b64f'} ${gradientColor}%)`}}
        >
          <span>{printTime()}</span>
        </div>
        <div className={c.info}>
          Отдыхайте)
        </div>
        <div className={c.buttonGroup}>
          <button
            className={`btn`}
            onClick={onSuccess}
          >Пропустить</button>
        </div>
      </div>
    </div>
  );
};

export default RestTimer;