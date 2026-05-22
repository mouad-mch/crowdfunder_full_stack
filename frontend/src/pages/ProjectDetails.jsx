import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  fetchProjectById,
  deleteProject,
  closeProject,
  clearSelected,
} from "../store/slices/projectsSlice";
import { clearError } from "../store/slices/authSlice";
import { ArrowLeft, ArrowRight, Edit, Trash } from "lucide-react";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatMoney = (amount) =>
  `MAD ${Number(amount ?? 0).toLocaleString()}`;

const ProjectDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selected: project, loading, error } = useSelector(
    (state) => state.projects,
  );

  useEffect(() => {
    dispatch(fetchProjectById(id));
    return () => dispatch(clearSelected());
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="card p-8 animate-pulse space-y-4">
        <div className="h-6 bg-muted rounded w-1/2" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-3/4" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="card p-8 text-center text-muted-foreground">
        {error || "Project not found."}
      </div>
    );
  }

  const isOpen = project.status === "open";
  const target = project.capital ?? 0;
  const current = project.initialInvestment ?? 0;
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete project "${project.title}"? This cannot be undone.`,
    );
    if (!confirmed) return;

    const result = await dispatch(deleteProject(project._id));
    if (deleteProject.fulfilled.match(result)) {
      toast.success("Project deleted");
      navigate("/projects");
    } else {
      toast.error(result.payload || "Delete failed");
      dispatch(clearError());
    }
  };

  const handleClose = async () => {
    const confirmed = window.confirm(
      `Close project "${project.title}"? Investors will no longer be able to contribute.`,
    );
    if (!confirmed) return;

    const result = await dispatch(closeProject(project._id));
    if (closeProject.fulfilled.match(result)) {
      toast.success("Project closed");
    } else {
      toast.error(result.payload || "Failed to close project");
    }
  };

  return (
    <div className="space-y-6">
      <Link
        to="/projects"
        className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
      >
          <ArrowLeft size={"16px"} />
        Back to projects
      </Link>

      <div className="card p-6 sm:p-8 border border-border rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-2xl font-semibold tracking-tight">
                {project.title}
              </h1>
              <span
                className={`flex items-center gap-1.5 px-2 py-0.5 text-xs rounded-md font-medium ${
                  isOpen
                    ? "text-muted-foreground bg-primary/10"
                    : "text-foreground bg-foreground/5"
                }`}
              >
                <div className={`w-1 h-1 rounded-full animate-ping ${isOpen ? "bg-primary": "bg-foreground"}`}></div>
                {project.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Created on {formatDate(project.createdAt)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {isOpen && (
              <>
                <Link
                  to={`/projects/${id}/edit`}
                  className="btn-outline rounded-lg bg-primary/70 text-white hover:bg-primary/50 flex items-center gap-2 h-9 px-3 text-sm"
                >
                    <Edit size={"16"}/>
                  Edit
                </Link>
                <button
                  onClick={handleClose}
                  className="btn-outline h-9 px-3 text-sm  rounded-lg bg-foreground/50 text-white hover:bg-foreground/70"
                >
                  Close project
                </button>
              </>
            )}
            <button
              onClick={handleDelete}
              className="btn-destructive  rounded-lg bg-red-500/70 text-white hover:bg-red-500/50 flex items-center gap-2 h-9 px-3 text-sm"
            >
                <Trash size={"16px"}/>
              Delete
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 mb-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Description
          </h3>
          <p className="text-foreground whitespace-pre-wrap">
            {project.description}
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-3 pb-6 border-b border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Funding progress</span>
            <span className="font-semibold">{percentage.toFixed(1)}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">
                {formatMoney(current)}
              </span>{" "}
              raised
            </span>
            <span className="text-muted-foreground">
              of{" "}
              <span className="font-semibold text-foreground">
                {formatMoney(target)}
              </span>{" "}
              target
            </span>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Target Capital
            </p>
            <p className="text-lg font-semibold">{formatMoney(target)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Current Capital
            </p>
            <p className="text-lg font-semibold">{formatMoney(current)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Max % per investor
            </p>
            <p className="text-lg font-semibold">
              {project.maxInvestmentPercentage}%
            </p>
          </div>
            </div>
      </div>

      {/* Investors link */}
      <div className="card p-6 flex items-center justify-between border border-border rounded-lg">
        <div>
          <h3 className="font-semibold mb-1">Project investors</h3>
          <p className="text-sm text-muted-foreground">
            See everyone who has invested in this project.
          </p>
        </div>
        <Link
          to={`/projects/${id}/investors`}
          className="btn-outline h-10 px-4 border border-border rounded-lg flex items-center gap-3"
        >
          View investors
          <ArrowRight size={"16px"} />
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetails;
