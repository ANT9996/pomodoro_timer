import {FormEvent, useEffect, useRef, useState} from 'react';
import c from './Home.module.css'
import Timer from "../../components/Timer/Timer";
import Task from "../../components/Task/Task";
import TasksList from "../../components/TasksList/TasksList";
import {useStore} from "../../store";
import {tTask} from "../../types";
import {minutesToHoursAndMinutes} from "../../helpers/minutesToHoursAndMinutes";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import FormInput from "../../components/FormInput/FormInput";
import RestTimer from "../../components/RestTimer/RestTimer";

const Home = () => {
  const {
    tasks, addTask, editTask, deleteTask, editDay, getToday,
    timerState, clearTimerState, settings, theme, setTimerState
  } = useStore(state => state)
  const [taskName, setTaskName] = useState<string>('')
  const [idToDelete, setIdToDelete] = useState<tTask['id']>('')
  const [disableInteractive, setDisableInteractive] = useState<boolean>(false)
  const [currentTaskEdit, setCurrentTaskEdit] = useState<tTask['id'] | null>(null)
  const [restTimer, setRestTimer] = useState(timerState.restTimer)
  const taskListRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    document.title = 'Pomodoro'
  }, [])

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentTaskEdit === null) {
      addTask(taskName)
      setTaskName('')
    } else {
      // console.log(currentTaskEdit, {name: taskName})
      editTask(currentTaskEdit, {name: taskName})
      setTaskName('')
      setCurrentTaskEdit(null)
    }
  }

  const onTimerSuccess = () => {
    taskListRef.current?.children[0].classList.add('deleting')
    setDisableInteractive(true)
    restTimerHandler(true)
    setTimeout(() => {
      setTimerState({currentTaskIndex: timerState.currentTaskIndex + 1})
      // console.log('таска выполнена', tasks[0])
      const today = getToday()
      clearTimerState()
      editDay(today.id, {
        pomodoros: today.pomodoros + tasks[0].pomodoroCost,
        time: today.time + tasks[0].pomodoroCost * settings.pomodoroTimeCost,
        pauseCount: today.pauseCount + timerState.pauseCount,
        pauseTime: today.pauseTime + timerState.pauseTime
      })
      deleteTask(tasks[0].id)
      setDisableInteractive(false)
    }, 700)
  }

  const taskEditHandler = (id: tTask['id'], changeProperties: Partial<tTask>) => {
    editTask(id, changeProperties)
  }

  const restTimerHandler = (enable: boolean) => {
      setRestTimer(enable)
      setTimerState({
        restTimer: enable,
        restTimerTime: enable ? timerState.restTimerTime : null
      })
  }

  const isDarkTheme = theme === 'dark'

  return (
    <div className={`${c.homeContainer} ${isDarkTheme ? c.darkHome : ''}`} style={{pointerEvents: disableInteractive ? 'none' : 'initial'}}>
      {idToDelete && <DeleteModal darkTheme={isDarkTheme} deleteTaskById={() => {
        deleteTask(idToDelete)
        setIdToDelete(null)
      }} clearId={() => setIdToDelete(null)}/>}
      <div className={c.tasks}>
        <h2 className={c.head}>Ура! Теперь можно начать работать:</h2>
        <ul className={c.infoList}>
          <li className={c.infoElem}>Выберите категорию и напишите название текущей задачи</li>
          <li className={c.infoElem}>Запустите таймер («помидор»)</li>
          <li className={c.infoElem}>Работайте пока «помидор» не прозвонит</li>
          <li className={c.infoElem}>Сделайте короткий перерыв (3-5 минут)</li>
          <li className={c.infoElem}>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</li>
        </ul>
        <div className={c.tasksContainer}>
          <form className={c.taskCreateForm} onSubmit={submitHandler}>
            <FormInput onChange={setTaskName} value={taskName} isDarkTheme={isDarkTheme}/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <button className={'btn'}>{currentTaskEdit ? 'Сохранить' : 'Добавить'}</button>
              {taskName && <button className={'btn btn_stop'} onClick={() => {setTaskName(''); setCurrentTaskEdit(null)}}>Отменить</button>}
            </div>
          </form>
          <TasksList refFunc={(ref) => {taskListRef.current = ref}} darkTheme={isDarkTheme}>
            {tasks.map((el) => <Task
              onEdit={taskEditHandler}
              onChangeName={() => {setTaskName(el.name); setCurrentTaskEdit(el.id)}}
              selectId={() => setIdToDelete(el.id)}
              key={el.id} {...el}/>)}
          </TasksList>
          <div className={c.totalMinutes}>{tasks.length > 0 && minutesToHoursAndMinutes(tasks.reduce((prev, cur) => prev + cur.pomodoroCost, 0) / 60 * settings.pomodoroTimeCost).long}</div>
        </div>
      </div>
      {restTimer
        ? <RestTimer onSuccess={() => restTimerHandler(false)} isDarkTheme={isDarkTheme} seconds={timerState.restTimerTime === null ? (timerState.currentTaskIndex % settings.longRestRate === 0 ? (settings.longRestTime) : (settings.shortRestTime)) : timerState.restTimerTime}/>
        : <Timer num={timerState.currentTaskIndex} task={tasks[0]} onSuccess={onTimerSuccess} darkTheme={isDarkTheme}/>}
    </div>
  );
};

export default Home;