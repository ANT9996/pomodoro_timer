import {FC, PropsWithChildren, useEffect, useRef} from 'react';
import c from "./TasksList.module.css";

interface iTaskList {
  refFunc: (link: HTMLUListElement | null) => void,
  darkTheme: boolean
}

const TasksList:FC<PropsWithChildren<iTaskList>> = ({children, refFunc, darkTheme}) => {
  const ulRef = useRef(null)

  useEffect(() => {
    if (ulRef.current) refFunc(ulRef.current)
    // console.log(darkTheme)
  }, [])

  return (
    <ul className={`${c.tasksList} ${darkTheme ? c.darkTheme : ''}`} ref={ulRef}>
      {children}
    </ul>
  );
};

export default TasksList;