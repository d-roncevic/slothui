import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Navigation from './components/layouts/Navigation';
import { TaskProvider } from './components/context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <div id="app" className="app flex h-screen overflow-y-auto sm:overflow-hidden">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </TaskProvider>
  );
}

export default App;
