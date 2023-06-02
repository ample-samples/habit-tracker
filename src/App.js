import './App.css';
import StartPage from './pages/StartPage';
import { Routes, Route } from'react-router-dom';
import History from './pages/History';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import HabitEntry from './pages/HabitEntry';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="App">
        <Navbar/ >
        <div className="main">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/history' element={<History />} />
            <Route path='/habit/:date' element={<HabitEntry date={new Date().toISOString().slice(0, 10)} />}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
