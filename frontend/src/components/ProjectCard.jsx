import { Trash } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const isOpen = project.status === "open";
  const progressWidth = "w-[35%]"

  return (
    <div className="card p-5 flex flex-col gap-4 hover:shadow-md transition-shadow border border-border rounded-lg cursor-pointer">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link className="font-semibold text-base hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </Link>
          <p className="line-clamp-2 text-sm text-foreground/50 mt-1">
            {project.description}
          </p>
        </div>

        <span
          className={`p-1 px-2 text-[12px] rounded-full font-medium w-fit ${isOpen ? "text-muted-foreground bg-primary/10" : "text-foreground bg-foreground/5"}`}
        >
          {project.status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
            <span className="text-foreground/65 ">
                MAD 0 of MAD 300,000
            </span>
            <span className="font-medium">0.0%</span>
        </div>
        <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
          <div className={`h-full bg-primary rounded-full ${progressWidth}`}></div>
        </div>
      </div>

      <div className="w-full border-t border-border pt-2 flex items-center justify-between">
        <Link to={'/projects/:id'} className="flex-1 text-center hover:bg-primary/40 py-2 rounded-lg transition-all duration-75 cursor-pointer">
            View details
        </Link>
        <div className="p-2 hover:bg-red-400/10 rounded-[3px] transition-all duration-100">
            <Trash size={"20px"} className="text-red-500"/>
        </div>
      </div>

    </div>
  );
};

export default ProjectCard;
