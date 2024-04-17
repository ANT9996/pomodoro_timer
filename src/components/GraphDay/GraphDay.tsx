import {FC, memo} from 'react';
import c from "./GraphDay.module.css";
import {tDay} from "../../types";

interface iDay {
  id?: tDay['id']
  name: tDay['name']
  time?: tDay['time']
  onClick?: () => void
  selected?: boolean
}

const GraphDay:FC<iDay> = memo(({name, time, onClick, selected}) => {
  const onePomodoro = 25;
  const score = time ? (time / (onePomodoro * 5) * 100) : 0;

  return (
    <div className={`${c.graphDay} ${score === 0 ? c.graphDayEmpty : ''}`} onClick={onClick}>
      <div
        className={`${c.graphDayScore} ${selected ? c.graphDayScoreSelected : ''}` }
        style={{height: `${score === 0 ? 1 : score}%`}}
      ></div>
      <div className={c.graphDayText}>{name}</div>
    </div>
  );
});

export default GraphDay;