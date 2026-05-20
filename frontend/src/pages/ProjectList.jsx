import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import SegmentedControl from '../components/UI/SegmentedControl';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from '../components/ProjectCard';
import { fetchMyProjects } from '../store/slices/projectsSlice.js';

const ProjectList = () => {
  const dispatch = useDispatch();
  const { items, loading, status, error } = useSelector((state) => state.projects)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    dispatch(fetchMyProjects())
  }, [dispatch])

  return (
    <div>
      <div className="header flex items-center justify-between mb-5">
        <div className="title">
            <h1 className="font-bold text-foreground text-2xl">Your projects</h1>
            <p className="text-foreground/60 text-[16px]">Manage all your funding campaigns in one place.</p>
        </div>

        <Link 
          to={"/projects/create"} 
          className="flex items-center gap-2 bg-primary px-2 py-2 rounded-md text-white font-medium hover:bg-primary/50 transition-all duration-75"
        >
          <Plus />
            Create Project
        </Link>
      </div>

      <div className="filter flex items-center gap-3">
        <div className="search flex-1 border border-border rounded-lg flex items-center py-2 px-2">
          <Search />
          <input type="text" className="outline-0 px-5 w-full" />
        </div>

        <SegmentedControl 
          filter={ filter }
          setFilter={ setFilter }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {
          items.map((p) => (
            <ProjectCard key={p._id} project={p}/>
          ))
        }
      </div>

    </div>
  )
}

export default ProjectList
