import React from "react";
import { useTasks } from "../../contexts/TaskContext";
import { PlusCircle } from "phosphor-react";
import { Link } from "react-router-dom";

export const TaskInput = () => {
  const {
    newTaskTitle,
    newTaskDescription,
    handleTaskTitle,
    handleTaskDescription,
    handleCreateTask
  } = useTasks();

  return (
    <header className="flex flex-col justify-center gap-4">
      <div className="flex flex-col w-full">
        <label className="text-gray-100 font-bold text-xl" htmlFor="taskTitle">
          Titulo
        </label>
        <input
          className="w-full h-14 border-none rounded-xl p-4 bg-gray-600 font-bold text-gray-100 focus:outline-none"
          value={newTaskTitle}
          onChange={handleTaskTitle}
          type="text"
          placeholder="Titulo para a tarefa"
          required
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="text-gray-100 font-bold text-xl" htmlFor="taskTitle">
          Descrição
        </label>
        <textarea
          className="w-full h-32 border-none rounded-xl p-4 bg-gray-600 font-bold text-gray-100 focus:outline-none"
          value={newTaskDescription}
          onChange={handleTaskDescription}
          placeholder="Descrição da tarefa"
          required
        />
      </div>
      <button
        className="max-w-[5.625rem] h-14 border-none flex justify-center items-center gap-2 p-4 text-gray-100 bg-blue-500 rounded-xl font-bold hover:opacity-70 transition-opacity duration-200 ease-linear"
        onClick={() => handleCreateTask(newTaskTitle, newTaskDescription)}
      >
        Criar
        <PlusCircle size={32} />
      </button>
    </header>
  );
};
