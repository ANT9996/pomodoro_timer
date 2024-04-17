import React, {useEffect, useState} from 'react';
import c from './Stats.module.css'
import tomatoImg from '../../assets/img/png/tomato.png'
import tomatoHappyImg from '../../assets/img/png/tomatoHappy.png'
import GraphDay from "../../components/GraphDay/GraphDay";
import {minutesToHoursAndMinutes} from "../../helpers/minutesToHoursAndMinutes";
import {tDay, tWeek} from "../../types";
import {useStore} from "../../store";
import {DaysOfWeek, DaysOfWeekNumber, Week} from "../../enums";
import calcFocus from "../../helpers/calcFocus";
import {DAYS_OF_WEEK, WEEKS} from "../../constants";
import moment from "moment";

const Stats = () => {
  const days = useStore(state => state.days)
  const getToday = useStore(state => state.getToday)
  // const setDays = useStore(state => state.setDays)
  const theme = useStore(state => state.theme)
  const [currentDay, setCurrentDay] = useState<tDay>()
  const [week, setWeek] = useState<tWeek>(WEEKS.thisWeek)
  const [selectedWeekMenu, setSelectedWeekMenu] = useState(false)

  const changeCurrentDayInfo = (id: tDay['id'], name: tDay['name']) => {
    // console.log(id)
    const day = days.find(day => day.id === id)
    if (day) {
      setCurrentDay(day)
    } else {
      setCurrentDay({
        id: '',
        name,
        time: 0,
        pomodoros: 0,
        pauseCount: 0,
        pauseTime: 0
      })
    }
  }

  useEffect(() => {
    document.title = 'Pomodoro -> статистика'
    // Замена дней в localStorage на данный массив
    // setDays([
    //   {
    //     "id": "2024-04-03",
    //     "name": "Ср",
    //     "pomodoros": 1,
    //     "time": 25 * 60,
    //     "pauseCount": 0,
    //     "pauseTime": 0
    //   },
    //   {
    //     "id": "2024-04-02",
    //     "name": "Вт",
    //     "pomodoros": 1,
    //     "time": 25 * 60 * 2,
    //     "pauseCount": 0,
    //     "pauseTime": 0
    //   },
    //   {
    //     "id": "2024-04-01",
    //     "name": "Пн",
    //     "pomodoros": 1,
    //     "time": 25 * 60 * 3,
    //     "pauseCount": 0,
    //     "pauseTime": 0
    //   },
    //   {
    //     "id": "2024-03-31",
    //     "name": "Вс",
    //     "pomodoros": 1,
    //     "time": 25 * 60 * 4,
    //     "pauseCount": 0,
    //     "pauseTime": 0
    //   },
    //   {
    //     "id": "2024-03-30",
    //     "name": "Сб",
    //     "pomodoros": 1,
    //     "time": 25 * 60 * 5,
    //     "pauseCount": 0,
    //     "pauseTime": 0
    //   },
    //   {
    //     "id": "2024-03-29",
    //     "name": "Пт",
    //     "pomodoros": 1,
    //     "time": 25 * 60 * 6,
    //     "pauseCount": 0,
    //     "pauseTime": 0
    //   },
    //   {
    //     "id": "2024-03-28",
    //     "name": "Чт",
    //     "pomodoros": 1,
    //     "time": 25 * 60 * 7,
    //     "pauseCount": 0,
    //     "pauseTime": 0
    //   },
    //   {
    //     "id": "2024-03-27",
    //     "name": "Ср",
    //     "pomodoros": 1,
    //     "time": 25,
    //     "pauseCount": 0,
    //     "pauseTime": 0
    //   }
    // ])
  }, [])

  const filteredDays = days.filter(day => {
    const today = moment(getToday().id).subtract(week + 1, 'd')
    const todayDayOfWeekNumber = today.weekday() - 1
    const min = moment(today).subtract(todayDayOfWeekNumber, 'd')
    const max = moment(min).add(6, 'd')

    return max.format('x') >= moment(day.id).format('x') && moment(day.id).format('x') >= min.format('x')
  })
  const findDay = (dayOfWeek: tDay['name']) =>
    filteredDays.find(day =>
      (day.name === dayOfWeek) &&
      (week === 0 ? DaysOfWeekNumber[getToday().name] >= DaysOfWeekNumber[day.name] : true)
    );
  const isDarkTheme = theme === 'dark' ? c.darkTheme : ''

  return (
    <main className={isDarkTheme}>
      <header className={c.head}>
        <h2 className={c.title}>Ваша активность</h2>
        <div className={c.select} onClick={() => setSelectedWeekMenu(prevState => !prevState)}>
          <div className={`${c.option} ${c.selectArrow} ${selectedWeekMenu ? c.selectArrowActive : null}`}>{Week[week]}</div>
          {
            selectedWeekMenu && <>
              <div className={c.option} onClick={() => setWeek(WEEKS.thisWeek)} hidden={!selectedWeekMenu || week === WEEKS.thisWeek}>{Week[WEEKS.thisWeek]}</div>
              <div className={c.option} onClick={() => setWeek(WEEKS.previousWeek)} hidden={!selectedWeekMenu || week === WEEKS.previousWeek}>{Week[WEEKS.previousWeek]}</div>
              <div className={c.option} onClick={() => setWeek(WEEKS.twoWeeksAgo)} hidden={!selectedWeekMenu || week === WEEKS.twoWeeksAgo}>{Week[WEEKS.twoWeeksAgo]}</div>
            </>
          }

        </div>
      </header>
      <div className={c.activityContainer}>
        <div className={c.activity}>
          <div className={c.leftSide}>
            <article className={c.day}>
              <h3 className={c.dayTitle}>{currentDay ? DaysOfWeek[currentDay.name] : 'Выберите день'}</h3>
              {currentDay && currentDay.time
                ? <p className={c.dayParagraph}>Вы работали над задачами в течение <span>{minutesToHoursAndMinutes(currentDay.time / 60).long}</span></p>
                : <p className={c.dayParagraph}>Нет данных</p>
              }
            </article>
            <article className={c.pomodorosCount}>
              <div className={c.pomodoros}>
                {currentDay && currentDay.pomodoros
                  ? <>
                    <img src={tomatoImg} alt=""/>
                    <span>x {currentDay.pomodoros}</span>
                  </>
                  : <img src={tomatoHappyImg} alt=""/>
                }
              </div>
              {currentDay && currentDay.pomodoros > 0 && <div className={c.pomodorosFooter}>{currentDay.pomodoros} помидора</div>}
            </article>
          </div>
          <div className={c.rightSide}>
            <article className={c.graph}>
              <div className={c.graphStats}>
                {DAYS_OF_WEEK.map(dayOfWeek => {
                  const day = findDay(dayOfWeek)
                  if (day) return <GraphDay key={day.id} name={day.name} time={day.time / 60} selected={currentDay?.id === day.id} onClick={() => changeCurrentDayInfo(day.id, dayOfWeek)}/>
                  return <GraphDay key={dayOfWeek} name={dayOfWeek} selected={currentDay?.name === dayOfWeek} onClick={() => changeCurrentDayInfo('', dayOfWeek)}/>
                })}
              </div>
              <div className={c.graphTimes}>
                <h4 className={c.graphTime}>{minutesToHoursAndMinutes(25 * 4).short}</h4>
                <h4 className={c.graphTime}>{minutesToHoursAndMinutes(25 * 3).short}</h4>
                <h4 className={c.graphTime}>{minutesToHoursAndMinutes(25 * 2).short}</h4>
                <h4 className={c.graphTime}>{minutesToHoursAndMinutes(25).short}</h4>
              </div>
            </article>
          </div>
        </div>
        <div className={c.statsContainer}>
          <article className={`${c.stat} ${c.focus} ${currentDay && calcFocus(currentDay) > 0 ? '' : c.statEmpty}`}>
            <div className={c.statTitle}>Фокус</div>
            <div className={c.statValue}>{currentDay ? `${calcFocus(currentDay)}%` : '0%'}</div>
          </article>
          <article className={`${c.stat} ${c.timePaused} ${currentDay && currentDay.pauseTime > 0 ? '' : c.statEmpty}`}>
            <div className={c.statTitle}>Время на паузе</div>
            <div className={c.statValue}>{minutesToHoursAndMinutes(currentDay?.pauseTime || 0).short}</div>
          </article>
          <article className={`${c.stat} ${c.stopCount} ${currentDay && currentDay.pauseCount > 0 ? '' : c.statEmpty}`}>
            <div className={c.statTitle}>Остановки</div>
            <div className={c.statValue}>{currentDay ? currentDay.pauseCount : 0}</div>
          </article>
        </div>
      </div>
    </main>
  );
};

export default Stats;