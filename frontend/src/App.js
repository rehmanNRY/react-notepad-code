import Navbar from './components/Navbar';
import './App.css';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/home' element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
