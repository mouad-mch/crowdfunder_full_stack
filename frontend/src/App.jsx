import { Route, Routes } from "react-router-dom"
import DashboardLayout from "./layout/DashboardLayout"
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {

  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />

      <Route 
         element={ <DashboardLayout /> }
      >

        <Route path="/" element={<h1>Dashboard</h1>} />
        <Route path="/projects" element={<h1>Project List</h1>} />
        <Route path="/projects/create" element={<h1>Create Project</h1>} />
        <Route path="/projects/:id" element={<h1>Project Detail</h1>} />
        <Route path="/projects/:id/edit" element={<h1>Update Project</h1>} />
        <Route path="/projects/:id/investors" element={<h1>Investors</h1>} />
      </Route>

    </Routes>
  )
}

export default App
