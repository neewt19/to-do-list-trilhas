import { useState } from "react";
import styles from "./App.module.css";
import { Tasks } from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([
    { id: 0, content: " Estudar React ", checked: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [count, setCount] = useState(0);
  const [id, setId] = useState(1);

  const handleCreateNewTask = () => {
    setId(id + 1);
    const newTaskObj = { id: id, content: newTask, checked: false };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const deleteTask = (TaskId: number, checked: boolean) => {
    const DeletedTask = tasks.filter((task) => {
      return task.id !== TaskId;
    });
    setTasks(DeletedTask);
    if (count > 0) {
      setCount(!checked ? count + 0 : count - 1);
    }
  };

  const toggleTask = (taskId: number, checked: boolean) => {
    const updatedTasks = tasks.map((task) => {
      const tasksreturn =
        task.id === taskId ? { ...task, checked: !task.checked } : task;
      return tasksreturn;
    });
    setTasks(updatedTasks);
    setCount(checked ? count - 1 : count + 1);
  };

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  function renderItem() {
    if (tasks.length === 0) {
      return (
        <div className={styles.noTasks}>
          <span className={styles.spanBold}>
            Você ainda não tem tarefas cadastradas
          </span>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
      );
    }
  }

  return (
    <>
      <div className={styles.fundo}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>to-do-list</h1>
          </div>
          <div className={styles.imputArea}>
            <input
              value={newTask}
              type="text"
              onChange={handleChange}
              placeholder="Adicione uma nova tarefa"
            />
            <button onClick={handleCreateNewTask}>Adicionar</button>
          </div>
          <div className={styles.tasksCount}>
            <div>
              <span>Tarefas criadas</span>
              <span className={styles.taskCountNumbers}>{tasks.length}</span>
            </div>
            <div>
              <span>Concluidas</span>
              <span className={styles.taskCountNumbers}>
                {count} de {tasks.length}
              </span>
            </div>
          </div>
          {renderItem()}
          {tasks.map((tasks) => {
            return (
              <Tasks
                key={tasks.id}
                id={tasks.id}
                content={tasks.content}
                descrição="oi"
                deleteTask={deleteTask}
                countTask={() => toggleTask(tasks.id, tasks.checked)}
                checked={tasks.checked}
              ></Tasks>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
