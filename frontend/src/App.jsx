import { Navigate, Route, Routes } from "react-router-dom"
import DashboardLayout from "./layout/DashboardLayout"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectList from "./pages/ProjectList";
import ProjectDetails from "./pages/ProjectDetails";
import Investors from "./pages/Investors";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AuthRedirect from "./components/AuthRedirect";
import CreateProject from "./pages/CreateProject";
import Wallet from "./pages/Wallet";
import Portfolio from "./pages/Portfolio";
import RoleRoutes from "./components/RoleRoutes";


function App() {

  return (
    <Routes>

      <Route path="/login" element={
        <AuthRedirect>
          <Login />
        </AuthRedirect>
        } 
      />
      <Route path="/register" element={
        <AuthRedirect>
          <Register/>
        </AuthRedirect>
        } 
      />

      <Route 
         element={ 
          <ProtectedRoutes>
            <DashboardLayout />
          </ProtectedRoutes> 
          }
      >

        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/create" element={
          <RoleRoutes role={"owner"}>
            <CreateProject />
          </RoleRoutes>
          } 
        />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/projects/:id/edit" element={<h1>Update Project</h1>} />
        <Route path="/projects/:id/investors" element={<Investors />} />
        <Route path="/wallet" element={
          <RoleRoutes role={'investor'}>
            <Wallet />
          </RoleRoutes>
          } 
        />
        <Route path="/portfolio" element={
          <RoleRoutes role={'investor'}>
            <Portfolio />
          </RoleRoutes>
        } 
        />
      </Route>

      <Route path="*" element={ <Navigate to={"/"} replace /> } />

    </Routes>
  )
}

export default App
