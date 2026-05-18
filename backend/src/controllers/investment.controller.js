import { getInvestorInvestments_s, getInvestorPortfolio_s, invest_s } from "../services/investment.service.js"


export const invest = async (req, res) => {
    try {

        const investment = await invest_s(req.params.id,req.user.id, req.body.amount)
        
        if(!investment.success) {
            return res.status(investment.status).json({
                success: false,
                message: investment.message
            })
        }

        res.status(201).json({ investment })

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Interval server',
            error: error.message
        })
    }
}

export const getInvestorInvestments = async (req, res) => {
    try{

        const investments = await getInvestorInvestments_s(req.user._id);

        res.status(200).json({
            success: true,
            investments
        })

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Interval server',
            error: error.message
        })
    }
}

export const getInvestorPortfolio = async (req, res) => {
    try {

        const profile = await getInvestorPortfolio_s(req.user._id)

        res.status(200).json({
            success: true,
            message: 'Investor portfolio retrieved successfully.',
            profile
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Interval server',
            error: error.message
        })
    }
}

export const getOwnerPortfolio = async (req, res) => {
    try {

        const profile = await getOwnerPortfolio_s(req.user._id)

        res.status(200).json({
            success: true,
            message: 'Owner portfolio retrieved successfully.',
            profile
        })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Interval server',
            error: error.message
        })
    }
}