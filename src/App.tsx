import { BrowserRouter } from 'react-router-dom'
import { TasksProvider } from './contexts/TaskContext'
import { MyRoutes } from './Routes'

function App() {
  return (
    <BrowserRouter>
      <TasksProvider>
        <MyRoutes />
      </TasksProvider>
    </BrowserRouter>
  )
}

export default App
