import { CirclePlus, Folder, LayoutDashboard, LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice.js';
import toast from 'react-hot-toast';

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
    },

    {
      to: '/projects/create',
      label: 'Create Project',
      icon: <CirclePlus />
    }
]

const Sidebar = () => {

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully')
    navigate('/login');
  }

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

        <div className="border-t border-border p-3 space-y-2">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full">
                <img src="../../public/avatar.jpg" alt="avatar"  className='w-full h-full'/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{ user?.name ?? "Mouad"}</p>
                <p className="text-xs text-muted-foreground truncate">
                  { user?.email ?? "Mouad@gmail.com" }
                </p>
              </div>
            </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut/>
            Logout
          </button>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;
