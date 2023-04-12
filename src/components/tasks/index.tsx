import React from "react";
import { TaskList } from "../tasklist";
import { ClipboardText } from "phosphor-react";
import { useTasks } from "../../contexts/TaskContext";
import { TaskInput } from "../taskInput";

export const Tasks = () => {
  const { tasks } = useTasks();

  return (
    <section className="mt-[-1.5rem] m-auto">
      <TaskInput />

      <div className=" mx-auto my-16">
        <div className="flex-col pb-4 flex items-start gap-4 justify-between sm:flex-row sm:items-center">
          <p className="text-blue-500  text-xl">
            Tarefas criadas{" "}
            <span className="text-gray-300 bg-gray-600 rounded-full px-2 py-0.5">
              {tasks.length}
            </span>
          </p>
          <p className="text-purple-400 text-xl">
            Concluidas{" "}
            <span className="text-gray-100 bg-gray-600 rounded-full px-2 py-0.5">
              {tasks.filter((item: any) => item.status === "done").length} de{" "}
              {tasks.length}
            </span>
          </p>
        </div>

        {tasks.length ? (
          <TaskList />
        ) : (
          <section className="pt-16 border-px border-solid border-gray-400 flex flex-col items-center justify-center">
            <ClipboardText size={72} color="#999" />
            <p className="mt-3 font-bold text-gray-500">
              Você ainda não tem tarefas cadastradas
            </p>
            <span className="text-gray-500">
              Crie tarefas e organize seus itens a fazer
            </span>
          </section>
        )}
      </div>
    </section>
  );
};
