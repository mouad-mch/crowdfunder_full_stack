import mongoose, { mongo } from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
        trim: true,
        minlength: 3,
        maxlength: 200
    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: 10
    },

    capital: {
        type: Number,
        min:[1, "capital cannot be negative"],
        required: [true, "capital is required"],
    },

    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },

    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true]
    },
    
    maxInvestmentPercentage: {
        type: Number,
        required: [true, "Max investment percentage is required"],
        min: [1, 'Must be at least 1%'],
        max: [100, 'cannot exceed 100%'],
        default: 50,
    },

    initialInvestment: {
        type: Number,
        default: 0,
        min: 0,
    },
},
{ timestamps: true }
)

const Projects = mongoose.model('Projects', projectSchema);

export default Projects