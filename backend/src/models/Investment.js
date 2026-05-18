import mongoose from "mongoose";


const investmentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, 'amount is required'],
        min: [1, 'amount most be at least 1'],
    },

    investorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
        required: true
    }
},
{ timestamps: true, }
)

const Investments = mongoose.model('Investments', investmentSchema);

export default Investments