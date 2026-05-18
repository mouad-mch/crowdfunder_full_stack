import Investments from "../models/Investment.js";
import Projects from "../models/Project.js";



export const createProject_s = async (ownerId, data) => {
    const newProject = await Projects.create({ownerId, ...data});

    return newProject
}

export const updateProject_s = async (project, data) => {
    if(project.status === 'closed') {
        return { success: false, message: "cannot update a closed project" }
    }
    const update = await Projects.findByIdAndUpdate(
        {_id: project.id},
        {$set: data},
        {returnDocument: 'after'}
    );
    return update
}

export const deleteProject_s = async (project) => {
    if(project.status === "closed") {
        return { success: false, message: "cannot delete a closed project" }
    }


    const investmentCount = await Investments.countDocuments({projectId: project._id});

    if(investmentCount > 0) {
        return { success: false, message: "Cannot delete a project that already has investments." }
    }

    await Projects.deleteOne(project);

    return {
        success: true,
        message: "Project deleted successfuly"
    }
}

export const getOwnerProjects_s = async (ownerId) => {
    const allProjects = await Projects.find({ownerId}).sort({createAt: -1});

    return allProjects
}

export const closeProject_s = async (project) => {
    if(project.status === 'closed') {
        return { success: false, message: 'project alrady closed' }
    }

    project.status = 'closed';
    const updatedProject = await project.save()
    return {
        success: true,
        project: updatedProject
    }
}

export const getProjectInvestors_s = async (project) => {
    const investments = await Investments.find({ projectId: project._id })
        .sort({ createAt: -1 })

    return investments.map((inve) => ({
        investor: inve.investorId,
        amount: inve.amount,
        percentage: ((inve.amount / project.capital) * 100).toFixed(2) + "%",
        investedAt: inve.createdAt
    }))

}

// Investor

export const getOpenProjects_s = async () => {
    const projects = await Projects.find({ status: 'open' })
        .populate('ownerId', 'name email')
        .sort({ createAt: -1 });

    return projects;
}

export const getProjectById_s = async (id) => {
    const project = await Projects.findById(id).populate('ownerId', 'name email');

    if (!project) {
        return { success: false, message: 'Project not found.' }
    }

    return { success: true, project };
}

// admin

export const getAllProjects_s = async () => {
    return Projects.find()
        .populate('ownerId', 'name email')
        .sort({ createAt: -1 });
}


