
import './App.css';
import CreateOrganization from './Component/Admin/Organization/CreateOrganization';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Component/Administrator/Dashboard';
import OrgAdminLogin from './Component/OrgAdminLogin';
import AdminLogin from './Component/Administrator/AdminLogin';
import MainDashboard from './Component/Administrator/MainDashboard';
import MainSidebar from './Component/Administrator/MainSidebar';


function App() {
  return (
    <Router>
    <Routes>
    <Route element={<Dashboard />} path={"/dashboard/*"} />
    <Route element={<OrgAdminLogin />} path={"/orgadminlogin"} />
    <Route element={<AdminLogin />} path={"/"} />
    <Route element={<MainDashboard />} path={"/MainDashboard/*"} />
    {/* <Route element={<MainSidebar />} path={"/MainDashboard"} /> */}




     
    </Routes>
    </Router>
  );
}

export default App;
