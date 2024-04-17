import {FC} from 'react';
import happyTomatoImg from '../../assets/img/png/tomatoHappy.png';
import c from './EmptyTimer.module.css';

const EmptyTimer:FC<{darkTheme:boolean}> = ({darkTheme}) => {


  return (
    <div className={`${c.emptyTimer} ${darkTheme ? c.darkTheme : ''}`}>
      <h2 className={c.title}>/// Список ваших задач пуст ///</h2>
      <div className={c.imageContainer}>
        <img className={c.emptyImage} src={happyTomatoImg} alt=""/>
      </div>
      <p className={c.info}>/// Создайте задачу, чтобы увидеть таймер и начать работу ///</p>
    </div>
  );
};

export default EmptyTimer;