import Projects from "../models/Project.js"


export const projectOwnership = async (req, res, next) => {
    try {
        const project = await Projects.findById(req.params.id);

        if(!project) {
            return res.status(404).json({
                success: false,
                message: 'project not found'
            })
        }

        req.project = project;
        next()
    }catch(error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}