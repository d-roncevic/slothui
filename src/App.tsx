import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Navigation from './components/layouts/Navigation';
import Project from './components/pages/Project';
import { ProjectProvider } from './components/context/ProjectContext';

function App() {
  return (
    <ProjectProvider>
      <div
        id="app"
        className="app flex flex-col sm:flex-row h-screen overflow-y-auto sm:overflow-hidden relative"
      >
        <Navigation />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/projects/:id" element={<Project />} />
        </Routes>
      </div>
    </ProjectProvider>
  );
}

export default App;
