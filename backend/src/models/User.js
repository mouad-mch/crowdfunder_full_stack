import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },

    email: {
        type: String,
        required: [true, "Email is rquired"],
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: [true, "password is rquired"],
        minLength: 8,
        // select: false // for never returned 
    },

    role: {
        type: String,
        enum: ['owner', 'investor', 'admin'],
        required: true,
    },

    balance: {
        type: Number,
        default: 0,
        min: [0, 'balance cannot be negative']
    }
},
{ timestamps: true, }
)

const Users = mongoose.model('Users', userSchema);


export { Users }
export default Users