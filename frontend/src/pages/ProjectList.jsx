import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import SegmentedControl from "../components/UI/SegmentedControl";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../components/ProjectCard";
import { deleteProject, fetchMyProjects, getAllProject } from "../store/slices/projectsSlice.js";
import toast from "react-hot-toast";
import { clearError } from "../store/slices/authSlice.js";

const ProjectList = () => {
  const dispatch = useDispatch();
  const { items, loading, status, error } = useSelector(
    (state) => state.projects,
  );

  const {user} = useSelector((state) => state.auth);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    user?.role === "investor"
    ? dispatch(getAllProject())
    : dispatch(fetchMyProjects());
  }, [dispatch]);

  const filtered = items.filter((p) => {
    const filterMatches = filter === "all" || p.status === filter;
    const searchMatches = p.title
      ?.toLowerCase()
      .includes(search.toLowerCase().trim());

    return filterMatches && searchMatches;
  });

  const handleDelete = async (project) => {
       const confirmed = window.confirm(
      `Delete project "${project.title}"? This cannot be undone.`
    );

    if(!confirmed) return;

    const result = await dispatch(deleteProject(project._id));

    if(deleteProject.fulfilled.match(result)) {
      toast.success('Project deleted')
    }else {
      toast.error(result.payload || "Delete failed")
      dispatch(clearError())
    }
  }

  return (
    <div>
      <div className="header flex items-center justify-between mb-5">
        <div className="title">
          <h1 className="font-bold text-foreground text-2xl">
            {user?.role === "investor" ? "All projects" : "Your projects"}
          </h1>
          <p className="text-foreground/60 text-[16px]">
            {user?.role === "investor" 
              ? "Discover and invest in new funding campaigns."
              : "Manage all your funding campaigns in one place."}
          </p>
        </div>

        {user?.role !== "investor" && (
          <Link
            to={"/projects/create"}
            className="flex items-center gap-2 bg-primary px-2 py-2 rounded-md text-white font-medium hover:bg-primary/50 transition-all duration-75"
          >
            <Plus />
            Create Project
          </Link>
        )}
      </div>

      <div className="filter flex items-center gap-3">
        <div className="search flex-1 border border-border rounded-lg flex items-center py-2 px-2">
          <Search />
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="outline-0 px-5 w-full"
          />
        </div>

        <SegmentedControl filter={filter} setFilter={setFilter} />
      </div>

      {loading && items.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card p-5 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-3" />
              <div className="h-3 bg-muted rounded w-full mb-2" />
              <div className="h-3 bg-muted rounded w-2/3 mb-4" />
              <div className="h-2 bg-muted rounded w-full" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <p>no project</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {filtered.map((p) => (
            <ProjectCard key={p._id} project={p} Delete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
