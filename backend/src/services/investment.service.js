import Investments from "../models/Investment.js"
import Projects from "../models/Project.js"
import Users from "../models/User.js"



export const invest_s = async (projectId, investorId, amount) => {
    try {
        const [investor, project] = await Promise.all([
            Users.findById(investorId),
            Projects.findById(projectId),
        ])

        if(!investor) return { status: 404, success: false, message: 'Investor not found' }
        if(!project) return { status: 404, success: false, message: 'Project Not Found' }

        if(project.status === 'closed') {
            return { status: 400, success: false, message: 'This project is closed and no longer accepting investments.' }
        }

        const remaining = project.capital - project.initialInvestment;

        if(amount > remaining) {
            return { status: 400, success: false, message: `Investment amount exceeds remaining capital. Maximum allowed: ${remaining}.` }
        }

        const maxAllowedAmount = (project.maxInvestmentPercentage / 100) * project.capital;


        const [existing] = await Investments.aggregate([
            { $match: { investorId: investor._id, projectId: project._id } },
            { $group: { _id: null, totle: { $sum: '$amount'} } }
        ]);


        const alreadyInvested = existing?.total || 0;

        if((alreadyInvested + amount) > maxAllowedAmount) {
            const remainingAllowed = maxAllowedAmount - alreadyInvested;
            return { status: 400, success: false, message: `Investment exceeds the maximum allowed percentage (${project.maxInvestmentPercentage}%) ` +
          `for this project. You can invest at most ${remainingAllowed > 0 ? remainingAllowed : 0} more.`  }
        }

        if(investor.balance < amount) {
            return { status: 400, success: false, message: 'Insufficient balance.' }
        }


        const [investment] = await Investments.create([{amount, investorId: investor._id, projectId: project._id}]);

        investor.balance -= amount;
        await investor.save();

        project.initialInvestment += amount;

        if(project.initialInvestment >= project.capital) {
           await Projects.updateOne({_id: project._id}, { $set: { status: 'closed' } })
        }

        await project.save();

        return {
            success: true,
            investment,
            project: {
                id: project._id,
                title: project.title,
                status: project.status,
                fundedPercentage: ((project.initialInvestment / project.capital) * 100).toFixed(2),
                remainingCapital: project.capital - project.initialInvestment,
            },
            investorBalance: investor.balance,
            percentage: ((amount / project.capital) * 100).toFixed(2)
        };

    }catch(err) {
        throw err;
    }
}

export const getInvestorInvestments_s = async (investorId) => {
    const investments = await Investments.find({investorId})
    .populate('projectId', 'title capital status')
    .sort({ createAt: -1 });

    return investments.map((inv) => ({
        id: inv._id,
        project: inv.projectId,
        amount: inv.amount,
        percentage: inv.projectId
          ? ((inv.amount / inv.projectId.capital) * 100).toFixed(2) + '%'
          : 'N/A',
        investedAt: inv.createAt,
    }))
}

export const getInvestorPortfolio_s = async (investorId) => {
    const [investments, investor] = await Promise.all([
        Investments.find({ investorId })
            .populate('projectId', 'title capital status'),
        Users.findById(investorId)
    ])

    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

    const portfolio = investments.map((inv) => ({
        id: inv._id,
        project: inv.projectId,
        amount: inv.amount,
        percentage: inv.projectId
            ? ((inv.amount / inv.projectId.capital) * 100).toFixed(2) + '%': 'N/A',
        investedAt: inv.createdAt,
    }))

    return {
        investorId,
        investorName: investor.name,
        investorEmail: investor.email,
        totalInvested,
        investmentsCount: investments.length,
        investorBalance: investor.balance,
        investments: portfolio
    };
}

export const getOwnerPortfolio_s = async (ownerId) => {
    const projects = await Projects.find({ ownerId }).sort({
        createAt: -1
    })

    const portfolio = await Promise.all(
        projects.map(async (project) => {
            const investments = await Investments.find({ projectId: project._id })

            const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

            return {
                projectId: project._id,
                title: project.title,
                totalInvested
            }
        })
    )

    const totalProjects = projects.length;
    const owner = await Users.findById(ownerId);

    return {
        ownerId,
        ownerName: owner.name,
        ownerEmail: owner.email,
        totalProjects,
        portfolio
    }
}