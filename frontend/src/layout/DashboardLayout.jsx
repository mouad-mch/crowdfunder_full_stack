import Sidebar from "../components/Sidebar"
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="md:pl-64">
        <div className="px-4 py-6 sm:px-6 md:px-8 md:py-8 max-w-7xl mx-auto">
            <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
