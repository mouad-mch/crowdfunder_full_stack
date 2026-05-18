import { Folder, LayoutDashboard } from 'lucide-react'
import { NavLink } from 'react-router-dom';

const NAVLINK = [
    {
        to: '/',
        label: 'Dashboard',
        icon: <LayoutDashboard />
    },

    {
        to: '/projects',
        label: 'Projects',
        icon: <Folder />
    }
]

const Sidebar = () => {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-card border-r border-border">
      <div className="flex flex-col h-full">

        <div className="flex items-center gap-2 h-16 px-6 border-b border-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight">
            InvoiceFund
          </span>
        </div>

        <nav className='flex-1 px-3 py-4 space-y-1'>
            {
                NAVLINK.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) => 
                         `flex items-center gap-3 mb-5 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            isActive
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground '
                         }`
                      }
                    >
                        {item.icon}
                        {item.label}
                    </NavLink>
                ))
            }
        </nav>

      </div>
    </aside>
  );
};

export default Sidebar;
