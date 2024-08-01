import { useState, useEffect, Key, SetStateAction } from "react";
import styles from "./App.module.css";
import checklist from './assets/checklist.png'
import { Tasks } from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([
    { id: 0, content: " Estudar React ", checked: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [count, setCount] = useState(0);
  const [id, setId] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleCreateNewTask = () => {
    setId(id + 1);
    const newTaskObj = { id: id, content: newTask, checked: false };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
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
          <span className={styles.subtitle}>Crie tarefas e organize seus itens a fazer</span>
        </div>
      );
    }
  }

  return (
    <>
      <main className={styles.fundo}>
        <div className={styles.container}>
          <header className={styles.header}>
          <img src={checklist} />
            <h1>Todo List</h1>
          </header>
          <section className={styles.imputArea}>
            <input
              value={newTask}
              type="text"
              onChange={handleChange}
              placeholder="Adicione uma nova tarefa"
            />
            <button onClick={handleCreateNewTask}>Adicionar</button>
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
                key={tasks.id}
                id={tasks.id}
                content={tasks.content}
                descrição="oi"
                deleteTask={deleteTask}
                countTask={() => toggleTask(task.id, task.checked)}
                checked={task.checked}
              />
            )
          )}
        </div>
      </main>
      <footer className={styles.creditos}>
          <div className={styles.creditosContainer}>
            <h2>
              Desenvolvido por: Alexsandro e Netw
            </h2>
            <h3>
              Criador do projeto: Netw
            </h3>
          </div>
        </footer>
    </>
  );
}

export default App;
