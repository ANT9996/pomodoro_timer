import {FC, useEffect, useRef, useState} from 'react';
import c from './Task.module.css'
import dotsImg from "../../assets/img/svg/taskOptions.svg";
import plusImg from "../../assets/img/svg/plus.svg";
import minusImg from "../../assets/img/svg/minus.svg";
import editImg from "../../assets/img/svg/edit.svg";
import deleteImg from "../../assets/img/svg/delete.svg";
import {tTask} from "../../types";

type iTask = tTask & {
  onEdit: (name: tTask['name'], id: tTask['id'], newProperties: Partial<tTask>) => void
  onChangeName: () => void
  selectId: () => void
}

const Task:FC<iTask> = ({pomodoroCost, name, id, onEdit, onChangeName, selectId}) => {
  const [showOptions, setShowOptions] = useState(false);
  const dots = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (dots.current) {
      document.addEventListener('click', (e) => {
        if (e.target !== dots.current) {
          setShowOptions(false)
        }
      })
    }
  }, [])

  const clickHandler = () => {
    setShowOptions(!showOptions)
    // console.log('task click')
  }

  return (
      <li className={c.task}>
        <div className={c.taskNumber}>{pomodoroCost}</div>
        <div className={c.taskName}>{name}</div>
        <div ref={dots} className={`${c.taskOptionsDots} ${showOptions ? c.changeOpacityMode : ''}`} onClick={clickHandler}>
          <img className={c.dotsImage} src={dotsImg} alt={''}/>
          {showOptions && <ul className={c.taskOptions}>
            <li className={c.taskOption} onClick={() => onEdit(name, id,{pomodoroCost: pomodoroCost + 1})}>
              <img src={plusImg} alt=""/>
              <span>Увеличить</span>
            </li>
            <li className={c.taskOption} onClick={() => onEdit(name, id, {pomodoroCost: Math.max(pomodoroCost - 1, 1)})}>
              <img src={minusImg} alt=""/>
              <span>Уменьшить</span>
            </li>
            <li className={c.taskOption} onClick={onChangeName}>
              <img src={editImg} alt=""/>
              <span>Редактировать</span>
            </li>
            <li className={c.taskOption} onClick={selectId}>
              <img src={deleteImg} alt=""/>
              <span>Удалить</span>
            </li>
          </ul>}
        </div>
      </li>
  );
};

export default Task;