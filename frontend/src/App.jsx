import { Route, Routes } from "react-router-dom"
import DashboardLayout from "./layout/DashboardLayout"


function App() {

  return (
    <Routes>

      <Route 
         element={ <DashboardLayout /> }
      >

        <Route path="/" element={'<Dashboard />'} />
        <Route path="/projects" element={'<ProjectList />'} />
        <Route path="/projects/create" element={'<ProjectCreate />'} />
        <Route path="/projects/:id" element={'<ProjectDetail />'} />
        <Route path="/projects/:id/edit" element={'<ProjectUpdate />'} />
        <Route path="/projects/:id/investors" element={'<InvestorList />'} />
      </Route>

    </Routes>
  )
}

export default App
