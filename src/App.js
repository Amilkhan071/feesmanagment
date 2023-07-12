
import './App.css';
import CreateOrganization from './Component/Admin/Organization/CreateOrganization';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Component/Administrator/Dashboard';


function App() {
  return (
    <Router>
    <Routes>
    <Route element={<Dashboard />} path={"/dashboard/*"} />

     
    </Routes>
    </Router>
  );
}

export default App;
