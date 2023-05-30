import './App.css';
import StartPage from './pages/StartPage';
import { Routes, Route } from'react-router-dom';
import History from './pages/History';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <Navbar/ >
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </>
  );
}

export default App;
