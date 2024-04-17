import {FC, useEffect} from 'react';
import c from './DeleteModal.module.css'

interface iDeleteModal {
  deleteTaskById: ()=> void
  clearId: () => void
  darkTheme: boolean
}

const DeleteModal:FC<iDeleteModal> = ({deleteTaskById, clearId, darkTheme}) => {

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'initial'
    }
  }, [])

  return (
    <div className={`${c.modal} ${darkTheme ? c.darkTheme : ''}`}>
      <div className={c.content}>
        <div className={c.closeModal} onClick={clearId}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9115 13.8058L6.84406 18.9567L4.96166 17.0433L10.0291 11.8924L5.0675 6.84914L6.85992 5.02721L11.8215 10.0705L16.7673 5.04334L18.6497 6.95672L13.7039 11.9839L18.6655 17.0272L16.8731 18.8491L11.9115 13.8058Z" fill="#C4C4C4" />
          </svg>
        </div>
        <h3 className={c.head}>Удалить задачу?</h3>
        <button className={`btn btn_red ${c.deleteButton}`} onClick={deleteTaskById}>Удалить</button>
        <span className={c.cancel} onClick={clearId}>Отмена</span>
      </div>
    </div>
  );
};

export default DeleteModal;