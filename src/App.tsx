import { useState } from "react";
import styles from "./App.module.css";
import checklist from './assets/checklist.png'
import { Tasks } from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([
    { id: 0, content: " Estudar React ", description: "Amanha", checked: false },
  ]);
  const [newTask, setNewTask] = useState([]);
  const [newDesc, setNewDesc] = useState("");
  const [count, setCount] = useState(0);
  const [id, setId] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleCreateNewTask = () => {
    setId(id + 1);
    const newTaskObj = { id: id, content: newTask, description: newDesc, checked: false, isEditing: false };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
    setNewDesc("");
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

  const handleChangeDesc = (event) => {
    setNewDesc(event.target.value);
  }

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
          <form onSubmit={handleSubmit}>
            <section className={styles.imputArea}>
              <input
                value={newTask}
                type="text"
                onChange={handleChange}
                placeholder="Adicione uma nova tarefa"
              />
              <input
                type="text"
                value={newDesc}
                onChange={handleChangeDesc}
                placeholder="Adicione uma descrição"
              />
              <button onClick={handleCreateNewTask}>Adicionar</button>
            </section>
          </form>
          <section className={styles.tasksCount}>
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
          </section>
          {renderItem()}
          {tasks.map((tasks) => {
            return (
              <Tasks
                key={tasks.id}
                id={tasks.id}
                content={tasks.content}
                description={tasks.description}
                deleteTask={deleteTask}
                countTask={() => toggleTask(tasks.id, tasks.checked)}
                checked={tasks.checked}
              ></Tasks>
            );
          })}
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
