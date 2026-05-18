import Users from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { comparPasword, hashPassword } from "../utils/password.js";



export const createUser = async (data) => {

    const isexiste = await Users.findOne({email: data.email})
    
    if(isexiste) {
        return { success: false, message: "user alridy exist" }
    }

    const passwordHashed = await hashPassword(data.password)

    const newUser = {
        ...data,
        password: passwordHashed,
    }


    const create = await Users.create(newUser);

    const {password, ...userWithoutPassword} = create

    return {success: true, userWithoutPassword}
}


export const loginUser = async (data) => {

    const user = await Users.findOne({email: data.email}).select("+password")
    
    if(!user) {
        return { success: false, message: "user not found" }
    }

    const validatePassword = await comparPasword(data.password, user.password);

    if(!validatePassword) {
        return { success: false, message: 'password incorrect' }
    }

    const token = await generateToken({
        id: user.id,
        email: data.email,
        role: user.role
    })

    return {
        success: true,
        token
    }
}