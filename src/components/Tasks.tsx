import style from "./Tasks.module.css";
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";

export interface TasksProps {
  content: string;
  id: number;
  descrição: string;
  deleteTask: (Task: number, checked: boolean) => void;
  countTask: () => void;
  checked: boolean;
}

export function Tasks({
  content,
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
            <span>{content}</span>
          </label>
          <div className={style.buttonContainer}>
            <button className={style.editTaskButton}>
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
    </>
  );
}
