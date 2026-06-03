import { Trash, Wallet } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, Delete }) => {
  const { user } = useSelector((state) => state.auth);
  const isOpen = project.status === "open";
  const capital = project.capital;
  
  const progressWidth = ((project.initialInvestment / capital) * 100).toFixed(2);

  return (
    <div className="card p-5 flex flex-col gap-4 hover:shadow-md transition-shadow border border-border rounded-lg cursor-pointer">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link to={`/projects/${project._id}`} className="font-semibold text-base hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </Link>
          <p className="line-clamp-2 text-sm text-foreground/50 mt-1">
            {project.description}
          </p>
        </div>

        <span
          className={`flex items-center gap-2 p-1 px-2 text-[12px] rounded-full font-medium w-fit ${isOpen ? "text-muted-foreground bg-primary/10" : "text-foreground bg-foreground/5"}`}
        >
          <div className={`w-1 h-1 rounded-full animate-ping ${isOpen ? 'bg-primary' : 'bg-foreground'}`}></div>
          {project.status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
            <span className="text-foreground/65 ">
                MAD {project.initialInvestment} of MAD {capital}
            </span>
            <span className="font-medium">{progressWidth}%</span>
        </div>
        <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${progressWidth}%` }}></div>
        </div>
      </div>

      <div className="w-full border-t border-border pt-2 flex items-center justify-between gap-2">
        <Link to={`/projects/${project._id}`} className="flex-1 text-center hover:bg-primary/40 py-2 rounded-lg transition-all duration-75 cursor-pointer">
            View details
        </Link>
        {user?.role === "investor" && isOpen && (
          <Link 
            to={`/projects/${project._id}`} 
            className="flex-1 text-center bg-primary text-white py-2 rounded-lg hover:bg-primary/80 transition-all duration-75 flex items-center justify-center gap-2"
          >
            <Wallet size={"16px"}/>
            Invest
          </Link>
        )}
        {user?.role !== "investor" && (
          <div 
            onClick={ () => Delete(project) }
            className="p-2 hover:bg-red-400/10 rounded-[3px] transition-all duration-100">
              <Trash size={"20px"} className="text-red-500"/>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProjectCard;
