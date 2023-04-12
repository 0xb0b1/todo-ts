import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import { timeFormat } from "../utils/timeFormat";
import { saveToLocalStorage } from "../utils/saveToLocalStorage";

interface TasksContextProviderProps {
  children: ReactNode;
}

type TaskStatus = "pending" | "in progress" | "done";

interface Task {
  title: string;
  description: string;
  id: number;
  creationDate: string;
  status: TaskStatus;
}

interface TasksContextProps {
  tasks: Task[];
  currentTask: Task;
  newTaskTitle: string;
  newTaskDescription: string;
  handleRemoveTask: (id: number) => void;
  handleSelectTask: (id: number) => void;
  handleToggleTaskStatus: (task: Task) => void;
  handleCreateTask: (title: string, description: string) => void;
  handleEditCurrentSelectedTask: (title: string, description: string) => void;
  handleTaskTitle: (event: {
    target: { value: SetStateAction<string> };
  }) => void;
  handleTaskDescription: (event: {
    target: { value: SetStateAction<string> };
  }) => void;
}

export const TasksContext = createContext({} as TasksContextProps);

export const TasksProvider = ({ children }: TasksContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const taskStorage = localStorage.getItem("@logwe:tasks");

    if (taskStorage) return JSON.parse(taskStorage);

    return [];
  });

  const [currentTask, setCurrentTask] = useState<Task>(() => {
    const currentTaskStorage = localStorage.getItem("@logwe:currentTask");

    if (currentTaskStorage) return JSON.parse(currentTaskStorage);

    return [];
  });

  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");

  const navigate = useNavigate();

  const handleToggleTaskStatus = (task: Task) => {
    const nextStatus = task.status === "pending" ? "in progress" : "done";

    const filteredTasks: Task[] = tasks.map((item) =>
      item.id === task.id
        ? {
            ...item,
            status: nextStatus
          }
        : item
    );

    setTasks(filteredTasks);
    saveToLocalStorage("@logwe:tasks", filteredTasks);
  };

  const handleEditCurrentSelectedTask = (
    title: string,
    description: string
  ) => {
    const editedTask = tasks.map((task) =>
      task.id === currentTask.id
        ? {
            ...task,
            title,
            description
          }
        : task
    );

    const editedCurrentTask = {
      ...currentTask,
      title,
      description
    };

    setCurrentTask(editedCurrentTask);

    setTasks(editedTask);

    saveToLocalStorage("@logwe:tasks", editedTask);
    saveToLocalStorage("@logwe:currentTask", editedCurrentTask);
  };

  const handleSelectTask = (id: number) => {
    if (!id) return;

    const current: any = tasks.find((task) => task.id === id);

    setCurrentTask(current);

    saveToLocalStorage("@logwe:currentTask", current);
  };

  const handleCreateTask = (title: string, description: string) => {
    if (title.length === 0 || description.length == 0) return;

    const newTask: any = {
      title,
      description,
      id: Math.floor(Math.random() * 100),
      creationDate: timeFormat(new Date()),
      status: "pending"
    };

    const newTasks = [...tasks, newTask];

    setTasks(newTasks);

    setCurrentTask(newTask);

    saveToLocalStorage("@logwe:tasks", newTasks);

    navigate("/task");

    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const handleRemoveTask = (id: number) => {
    const filteredtasks = tasks.filter((task) => task.id !== id);

    setTasks(filteredtasks);

    saveToLocalStorage("@logwe:tasks", filteredtasks);
  };

  const handleTaskTitle = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setNewTaskTitle(event.target.value);
  };

  const handleTaskDescription = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setNewTaskDescription(event.target.value);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        currentTask,
        newTaskTitle,
        newTaskDescription,
        handleTaskTitle,
        handleEditCurrentSelectedTask,
        handleSelectTask,
        handleTaskDescription,
        handleCreateTask,
        handleRemoveTask,
        handleToggleTaskStatus
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);

  return context;
};
