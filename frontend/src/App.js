import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ClearkDashboard from "./pages/ClearkDashboard"
import AdminUpload from "./pages/AdminUpload";
import ResourceViewer from './pages/ResourceViewer';
import ResourceDetail from "./pages/ResourceDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/clerk/dashboard" element={<ClearkDashboard/>} />
        <Route path="/admin/upload" element={<AdminUpload />} />
        <Route path="/resources/:type" element={<ResourceViewer />} />
        <Route path="/resources/:type/:id" element={<ResourceDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
