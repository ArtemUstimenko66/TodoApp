import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList'
import CreateTask from './components/CreateTask'
import UpdateTask from './components/UpdateTask';

function App() {
  return ( 
    <Router>
      <div>
        <Routes>
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/update/:id" element={<UpdateTask />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
