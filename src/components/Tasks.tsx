import { useState } from "react";
import style from "./Tasks.module.css";
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import './modal/modal.css'


export interface TasksProps {
  content: string;
  id: number;
  description: string;
  deleteTask: (Task: number, checked: boolean) => void;
  countTask: () => void;
  checked: boolean;
}

export function Tasks({
  content,
  description,
  id,
  deleteTask,
  countTask,
  checked,
}: TasksProps) {
  const handleDeleteTask = () => {
    deleteTask(id, checked);
  };
  const handleTaskChange = () => {
    countTask();
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <section className={style.container}>
        <div className={style.checkBox}>
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleTaskChange}
            />
            <span className={style.check}>
              <AiOutlineCheck></AiOutlineCheck>
            </span>
            <div className={style.content}>
            <span className={style.titleTask}>{content}</span>
            <hr />
            <span className={style.description}>{description}</span>
            </div>
          </label>
          <div className={style.buttonContainer}>
            <button onClick={toggleModal} className={style.editTaskButton}>
              <RiPencilFill />
            </button>
            <button
              className={style.deleteTaskButton}
              onClick={handleDeleteTask}
            >
              <FaTrash></FaTrash>
            </button>
          </div>
        </div>
      </section>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <button className="close-modal" onClick={toggleModal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#030303" fill="none">
              <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            </button>
            <div className="container__input">
              <input type="text" placeholder="Nome da tarefa"/>
              <textarea className="descricao" placeholder="Descrição"></textarea>
              <button type="submit">Editar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
