import bcrypt from 'bcrypt'
import { ENV } from '../../env.js'


export const hashPassword = async (password) => {
    const pasHadh = await bcrypt.hash(password, ENV.BCRYPT_SALT_ROUNDS)
    return pasHadh
}

export const comparPasword = async (candidatePassword, password) => {
    const comparPassword = await bcrypt.compare(candidatePassword, password)
    return comparPassword
}