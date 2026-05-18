import { createUser, loginUser } from "../services/auth.service.js";


export const register = async (req, res) => {
    try {

        const user = await createUser(req.body);

        if(!user.success) {
        return res.status(403).json({
                success: false,
                message: user.message
               })
        }

        res.status(200).json({
            success: true,
            message: "user is created successfully",
            user
        })

    }catch(error) {
        console.error("filed create user");
        res.status(500).json({
            success: false,
            message: 'Interval server',
            error: error.message
        })
    }
}

export const login = async (req, res) => {
    try {

        const log = await loginUser(req.body);

        if(!log.success) {
        return res.status(403).json({
                success: false,
                message: log.message
            })
        }

        res.status(200).json({
            success: true,
            message: "user is logged",
            token: log.token
        })

    }catch(error) {
        console.error("filed create user");
        res.status(500).json({
            success: false,
            message: 'Interval server',
            error: error.message
        })
    }
}