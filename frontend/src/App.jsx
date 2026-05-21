import { Navigate, Route, Routes } from "react-router-dom"
import DashboardLayout from "./layout/DashboardLayout"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectList from "./pages/ProjectList";
import ProjectDetails from "./pages/ProjectDetails";
import Investors from "./pages/Investors";


function App() {

  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />

      <Route 
         element={ <DashboardLayout /> }
      >

        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/create" element={<h1>Create Project</h1>} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/projects/:id/edit" element={<h1>Update Project</h1>} />
        <Route path="/projects/:id/investors" element={<Investors />} />
      </Route>

      <Route path="*" element={ <Navigate to={"/"} replace /> } />

    </Routes>
  )
}

export default App
