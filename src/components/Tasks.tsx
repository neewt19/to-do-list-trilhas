import { useState } from "react";
import style from "./Tasks.module.css";
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import Modal from "./Modal";

export interface TasksProps {
  content: string;
  id: number;
  description: string;
  deleteTask: (task: number, checked: boolean) => void;
  updateTask: (id: number, content: string, description: string) => void;
  countTask: (taskId: number, checked: boolean) => void;
  checked: boolean;
}

export function Tasks({
  content,
  description,
  id,
  deleteTask,
  updateTask,
  countTask,
  checked,
}: TasksProps) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleDeleteTask = () => {
    deleteTask(id, checked);
  };

  const handleTaskChange = () => {
    countTask(id, checked);
  };

  const handleSave = (newContent: string, newDescription: string) => {
    updateTask(id, newContent, newDescription);
  };

  return (
    <>
      <section className={style.container}>
        <div className={style.checkBox} onClick={toggleModal}>
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleTaskChange}
            />
            <span className={style.check}>
              <AiOutlineCheck />
            </span>
            <div className={style.content}>
              <span className={style.titleTask}>{content}</span>
              <hr />
              <span className={style.descriptionTask}>{description}</span>
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
              <FaTrash />
            </button>
          </div>
        </div>
      </section>
      <Modal
        isOpen={modal}
        onClose={toggleModal}
        onSave={handleSave}
        initialContent={content}
        initialDescription={description || ""}
      />
    </>
  );
}
