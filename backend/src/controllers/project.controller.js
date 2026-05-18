import { createProject_s, updateProject_s, deleteProject_s, getOwnerProjects_s, closeProject_s, getProjectInvestors_s, getOpenProjects_s, getProjectById_s, getAllProjects_s } from "../services/project.service.js";


export const createProject = async (req, res) => {
    try {
        const project = await createProject_s(req.user.id, req.body);

        res.status(201).json({
            success: true,
            message: 'project is created',
            project
        })
    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Interval server',
            error: error.message
        })
    }
}

export const updateProject = async (req, res) => {
    try {
        const project = await updateProject_s(req.project, req.body);

        if(!project) {
            return res.status(403).json({
                success: false,
                message: "project not found"
            })
        }

        res.status(200).json({
            success: true,
            message: 'project is updated',
            project
        })
    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Interval server error',
            error: error.message
        })
    }
}

export const deleteProject = async (req, res) => {
    try {
        const project = await deleteProject_s(req.project);

        if(!project.success) {
            return res.status(403).json({
                success: false,
                message: project.message
            })
        }

        res.status(200).json({
            success: true,
            message: project.message
        })
    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Interval server',
            error: error.message
        })
    }
}

export const getOwnerProjects = async (req, res) => {
    try {
        const projects = await getOwnerProjects_s(req.user.id);


        res.status(200).json({
            success: true,
            message: 'get project successfully!',
            projects
        })
        

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Interval server',
            error: error.message
        })
    }
}

export const closeProject = async (req, res) => {
    try {
        const project = await closeProject_s(req.project);

        if(!project.success) {
            return res.status(403).json({
                success: false,
                message: project.message
            })
        }

        res.status(200).json({
            success: true,
            message: 'project is deleted',
            project: project.project
        })
    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Interval server',
            error: error.message
        })
    }
}

export const getProjectInvestors = async (req, res) => {
    try {

        const investors = await getProjectInvestors_s(req.project);

        res.status(200).json({
            success: true,
            investors
        })

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Interval server',
            error: error.message
        })
    }
}

// investor

export const getOpenProjects = async (req, res) => {
    try {

        const projects = await getOpenProjects_s();

        res.status(200).json({
            success: true,
            projects
        })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Interval server',
            error: error.message
        })
    }
}

export const getProjectById = async (req, res) => {
    try {

        const projects = await getProjectById_s(req.params.id);

        res.status(200).json({
            success: true,
            projects
        })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Interval server',
            error: error.message
        })
    }
}

// admin

export const getAllProjects = async (req, res) => {
    try {
        const projects = await getAllProjects_s();
        console.log(projects)
        res.status(200).json({
            success: true,
            projects
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Interval server',
            error: error.message
        })
    }
}