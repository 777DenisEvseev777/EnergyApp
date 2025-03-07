import './App.css';
import Worker from './pages/Worker.js';
import Client_citys from './pages/Client_citys.js';
import Client_community from './pages/Client_community.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
                
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/client_citys" element={<Client_citys/>} />
        <Route path="/client_community" element={<Client_community/>} />
        <Route path="/worker" element={<Worker/>} />

        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
