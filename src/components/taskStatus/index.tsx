import React from "react";

export const TaskStatusDropdown = ({ status }: any) => {
  const taskByStatusButton = [
    {
      pending: (
        <button className="bg-orange-300 rounded-lg p-2">Pendente</button>
      )
    },
    {
      "in progress": (
        <button className="bg-blue-300 rounded-lg p-2">Em andamento</button>
      )
    },
    {
      done: <button className="bg-green-300 rounded-lg p-2">Concluída</button>
    }
  ];

  return (
    <div className="mb-3 ">
      <select
        className="border-none rounded-lg p-2"
        data-te-select-init
        // data-te-select-visible-options="3"
      >
        {/* {taskByStatusButton.map((item, index) => (
          <option value={index}>{item[status]}</option>
        ))} */}
        <option value="pending" className="bg-orange-300 rounded-lg p-2">
          Pendente
        </option>
        <option value="in progress" className="bg-blue-300 rounded-lg p-2">
          Em andamento
        </option>
        <option value="done" className="bg-green-300 rounded-lg p-2">
          Concluída
        </option>
      </select>
    </div>
  );
};
