import { useState, useEffect, Key, SetStateAction } from "react";
import styles from "./App.module.css";
import { Tasks } from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [description, setNewDescription] = useState("");

  const [count, setCount] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks).filter(
          (task: { checked: boolean }) => task.checked
        ).length
      : 0;
  });

  const [id, setId] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks).length > 0
        ? JSON.parse(savedTasks)[JSON.parse(savedTasks).length - 1].id + 1
        : 1
      : 1;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateNewTask = () => {
    if (newTask.trim() === "") return;
    const newTaskObj = {
      id: id,
      content: newTask.trim(),
      checked: false,
      description: description.trim(),
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
    setNewDescription("");
    setId(id + 1);
  };

  const deleteTask = (taskId: number, checked: boolean) => {
    const deletedTask = tasks.filter(
      (task: { id: number }) => task.id !== taskId
    );
    setTasks(deletedTask);
    if (count > 0) {
      setCount(!checked ? count + 0 : count - 1);
    }
  };

  const toggleTask = (taskId: number, checked: boolean) => {
    const updatedTasks = tasks.map(
      (task: { id: Key | null | undefined; checked: boolean }) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task
    );
    setTasks(updatedTasks);
    setCount(checked ? count - 1 : count + 1);
  };

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
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
            <button
              onClick={handleCreateNewTask}
              disabled={newTask.trim() === ""}
            >
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
          {renderItem()}
          {tasks.map(
            (task: {
              id: number;
              content: string;
              description: string;
              checked: boolean;
            }) => (
              <Tasks
                key={task.id}
                id={task.id}
                content={task.content}
                description={task.description}
                deleteTask={deleteTask}
                countTask={() => toggleTask(task.id, task.checked)}
                checked={task.checked}
              />
            )
          )}
        </div>
      </main>
    </>
  );
}

export default App;
