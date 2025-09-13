import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Navigation from './components/layouts/Navigation';

function App() {
  return (
    <div id="app" className="app flex min-h-screen">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
