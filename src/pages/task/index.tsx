import React, { useState } from "react";
import { useTasks } from "../../contexts/TaskContext";
import { ArrowLeft, Pen, Trash } from "phosphor-react";
import { Link } from "react-router-dom";

export default function Task() {
  const { currentTask, handleEditCurrentSelectedTask } = useTasks();

  const [editTask, setEditTask] = useState(false);

  const [newTitle, setNewTitle] = useState(currentTask.title);
  const [newDescription, setNewDescription] = useState(currentTask.description);

  const toggleEditCurrentTask = () => {
    handleEditCurrentSelectedTask(newTitle, newDescription);
    setEditTask(false);
  };

  return (
    <div className="max-w-[1120px] m-auto my-4 px-4 py-12 bg-gray-800 rounded-xl">
      <Link
        to="/"
        className="flex items-center gap-4 text-gray-100 font-medium my-4"
      >
        <ArrowLeft size={22} />
        <span className="text-xl">Voltar</span>
      </Link>
      <section className="w-full">
        <ul className="flex flex-col gap-3">
          <li
            key={currentTask.id}
            className={`relative flex gap-3 justify-between items-center rounded-lg bg-gray-600 p-4 ${
              currentTask.status === "done"
                ? "border-none "
                : "border-solid border-1px border-gray-400"
            } `}
          >
            {editTask ? (
              <div className="w-full p-2 flex flex-col gap-2">
                <div className="flex flex-col items-center gap-2">
                  <input
                    className="w-full h-14 border-none rounded-xl p-4 bg-gray-500 font-bold text-gray-100 focus:outline-none"
                    value={newTitle}
                    onChange={(event) => setNewTitle(event.target.value)}
                    type="text"
                    placeholder="Titulo para a tarefa"
                    required
                  />
                  <textarea
                    className="w-full h-32 border-none rounded-xl p-4 bg-gray-500 font-bold text-gray-100 focus:outline-none"
                    name="title"
                    value={newDescription}
                    onChange={(event) => setNewDescription(event.target.value)}
                    id=""
                  />
                </div>

                <button
                  onClick={toggleEditCurrentTask}
                  className="self-end bg-blue-300 rounded-xl py-2 px-8 hover:bg-blue-400"
                >
                  Salvar
                </button>
              </div>
            ) : (
              <div className="p-2">
                <div className="">
                  <h2
                    className={`text-gray-200 font-semibold text-xl ${
                      currentTask.status === "done" ? "line-through" : ""
                    }`}
                  >
                    {currentTask.title}
                  </h2>

                  <p className="text-gray-200 mr-12">
                    {currentTask.description}
                  </p>
                </div>

                <span className="text-gray-400">
                  {currentTask.creationDate}
                </span>
              </div>
            )}

            {!editTask ? (
              <div className="w-12 absolute right-0 top-4 flex flex-col gap-4">
                <Pen
                  onClick={() => setEditTask(true)}
                  size={20}
                  color="#FFF"
                  weight="duotone"
                />
              </div>
            ) : null}
          </li>
        </ul>
      </section>
    </div>
  );
}
