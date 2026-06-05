import { useState } from "react";
import toast from "react-hot-toast";
import { createProject, clearError } from "../store/slices/projectsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const CreateProject = () => {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        capital: "",
        maxInvestmentPercentage: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.projects);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            capital: Number(formData.capital),
            maxInvestmentPercentage: formData.maxInvestmentPercentage
                ? Number(formData.maxInvestmentPercentage)
                : undefined,
        };

        const res = await dispatch(createProject(payload));
        if (createProject.fulfilled.match(res)) {
            toast.success("Project created successfully!");
            navigate("/projects");
        } else {
            toast.error(res.payload || "Failed to create project");
            dispatch(clearError());
        }
    }

  return (
    <div>
        <h1 className="font-bold text-2xl text-foreground">Create New Project</h1>
        <p className="text-foreground/60 text-[16px] mb-5">
            Start a new funding campaign and bring your ideas to life.
        </p>

        <form onSubmit={handleSubmit} className="bg-background/50 p-5 rounded-lg">
            <div className="mb-4">
                <label className="block text-foreground mb-1">Project Title</label>
                <input 
                    type="text" 
                    className="w-full border border-border rounded-md p-2" 
                    placeholder="Enter project title" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
            </div>
            <div className="mb-4">
                <label className="block text-foreground mb-1">Description</label>
                <textarea 
                    className="w-full border border-border rounded-md p-2" 
                    placeholder="Describe your project"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-foreground mb-1">Capital</label>
                <input 
                    type="number" 
                    className="w-full border border-border rounded-md p-2" 
                    placeholder="Enter capital amount" 
                    value={formData.capital}
                    onChange={(e) => setFormData({...formData, capital: e.target.value})}
                />
            </div>
            <div className="mb-4">
                <label className="block text-foreground mb-1">Max Investment Percentage</label>
                <input 
                    type="number" 
                    className="w-full border border-border rounded-md p-2" 
                    placeholder="Enter max investment percentage" 
                    value={formData.maxInvestmentPercentage}
                    onChange={(e) => setFormData({...formData, maxInvestmentPercentage: e.target.value})}
                />
            </div>
            <button type="submit" disabled={loading} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-all duration-75 cursor-pointer disabled:bg-primary/50">
                {loading ? "Creating..." : "Create Project"}
            </button>
        </form>

    </div>
  )
}

export default CreateProject
