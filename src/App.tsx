import { useState, useEffect, ChangeEvent } from "react";
import styles from "./App.module.css";
import { Tasks, TasksProps } from "./components/Tasks";

const App = () => {
  const getSavedTasks = (): TasksProps[] => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  };

  const getInitialId = (): number => {
    const savedTasks = getSavedTasks();
    return savedTasks.length ? savedTasks[savedTasks.length - 1].id + 1 : 1;
  };

  const getCheckedCount = (tasks: TasksProps[]): number =>
    tasks.filter((task) => task.checked).length;

  const [tasks, setTasks] = useState<TasksProps[]>(getSavedTasks);
  const [newTask, setNewTask] = useState<string>("");
  const [description, setNewDescription] = useState<string>("");
  const [count, setCount] = useState<number>(getCheckedCount(tasks));
  const [id, setId] = useState<number>(getInitialId());

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateNewTask = () => {
    if (!newTask.trim()) return;
    const newTaskObj: TasksProps = {
      id,
      content: newTask.trim(),
      checked: false,
      description: description.trim(),
      deleteTask,
      updateTask,
      countTask: handleTaskChange,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
    setNewDescription("");
    setId(id + 1);
  };

  const deleteTask = (taskId: number, checked: boolean) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    if (count > 0 && checked) setCount(count - 1);
  };

  const handleTaskChange = (taskId: number, checked: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task
      )
    );
    setCount(checked ? count - 1 : count + 1);
  };

  const updateTask = (id: number, content: string, description: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, content, description } : task
      )
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTask(e.target.value);

  const renderNoTasksMessage = () =>
    tasks.length === 0 && (
      <div className={styles.noTasks}>
        <span className={styles.spanBold}>
          Você ainda não tem tarefas cadastradas
        </span>
      </div>
    );

  return (
    <main className={styles.fundo}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>to-do-list</h1>
        </header>
        <section className={styles.imputArea}>
          <input
            value={newTask}
            type="text"
            onChange={handleChange}
            placeholder="Adicione uma nova tarefa"
          />
          <button onClick={handleCreateNewTask} disabled={!newTask.trim()}>
            Adicionar
          </button>
        </section>
        <section className={styles.tasksCount}>
          <div>
            <span>Tarefas criadas</span>
            <span className={styles.taskCountNumbers}>{tasks.length}</span>
          </div>
          <div>
            <span>Concluídas</span>
            <span className={styles.taskCountNumbers}>
              {count} de {tasks.length}
            </span>
          </div>
        </section>
        {renderNoTasksMessage()}
        {tasks.map((task) => (
          <Tasks
            key={task.id}
            {...task}
            deleteTask={deleteTask}
            updateTask={updateTask}
            countTask={handleTaskChange}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
