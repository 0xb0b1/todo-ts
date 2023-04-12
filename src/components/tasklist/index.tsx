import { CheckCircle, Circle, Pen, Spinner, Trash } from 'phosphor-react'
import { useTasks } from '../../contexts/TaskContext'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export const TaskList = () => {
  const { tasks, handleRemoveTask, handleSelectTask, handleToggleTaskStatus } =
    useTasks()

  const [filterStatus, setFilterStatus] = useState('')

  const filteredTasks = filterStatus.length
    ? tasks.filter((task) => task.status === filterStatus)
    : tasks

  const taskByStatusButton = {
    pending: (
      <button className='bg-orange-300 rounded-lg p-1 font-semibold'>
        Pendente
      </button>
    ),
    'in progress': (
      <button className='bg-blue-300 rounded-lg p-1 font-semibold'>
        Em andamento
      </button>
    ),
    done: (
      <button className='bg-green-300 rounded-lg p-1 font-semibold'>
        Concluída
      </button>
    ),
  }

  const taskCurrentStatusIcon = {
    pending: <Circle size={28} color='#FFF' />,
    'in progress': <Spinner className='animate-spin' size={28} color='#FFF' />,
    done: <CheckCircle size={28} color='#86efac' weight='fill' />,
  }

  return (
    <section className='w-full'>
      <div className=' text-xl my-4 flex gap-4 items-center'>
        <span className='text-gray-100'>filtrar por:</span>
        <select
          onChange={(event) => setFilterStatus(event.target.value)}
          className='rounded-md bg-gray-500 text-gray-100 px-4 py-1'
          name='hello'
          id='hello'
        >
          <option value=''>Todas</option>
          <option value='pending'>Pendente</option>
          <option value='in progress'>Em andamento</option>
          <option value='done'>Concluída</option>
        </select>
      </div>
      <ul className='flex flex-col gap-3'>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`relative shadow-md shadow-gray-700 flex gap-3 justify-between rounded-lg bg-gray-600 p-8 ${
              task.status === 'done'
                ? 'border-none '
                : 'border-solid border-1px border-gray-400'
            }`}
          >
            {' '}
            <div className='flex flex-col gap-6'>
              <div className='flex gap-2'>
                <span onClick={() => handleToggleTaskStatus(task)}>
                  {taskCurrentStatusIcon[task.status]}
                </span>
                <Link to='/task' onClick={() => handleSelectTask(task.id)}>
                  <h2
                    className={`text-gray-200  text-2xl ${
                      task.status === 'done' ? 'line-through' : ''
                    }`}
                  >
                    {task.title}
                  </h2>

                  <p className='text-gray-200 text-xl mr-12'>
                    {task.description}
                  </p>
                </Link>
              </div>

              <div className='flex gap-4 items-center'>
                {taskByStatusButton[task.status]}
                <span className='text-gray-300 '>{task.creationDate}</span>
              </div>
            </div>
            <div className='w-12 absolute right-0 top-4 flex flex-col gap-4'>
              <Trash
                className='hover:opacity-50 transition-opacity duration-200 ease-in-out'
                size={28}
                color='#FFF'
                onClick={() => handleRemoveTask(task.id)}
              />
              <Link to='/task' onClick={() => handleSelectTask(task.id)}>
                <Pen
                  className='hover:opacity-50 transition-opacity duration-200 ease-in-out'
                  size={28}
                  color='#FFF'
                />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
