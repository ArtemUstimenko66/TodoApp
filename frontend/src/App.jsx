import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList'
import CreateTask from './pages/CreateTask'
import UpdateTask from './pages/UpdateTask';

function App() {
  return ( 
    <Router>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/update/:id" element={<UpdateTask />} />
        </Routes>
    </Router>
  )
}

export default App;
