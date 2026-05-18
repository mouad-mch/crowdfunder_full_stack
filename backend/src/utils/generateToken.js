import JWT from 'jsonwebtoken'
import { ENV } from '../../env.js'


export const generateToken = (payload = {}) => {
    return JWT.sign(
        payload,
        ENV.KEY_SECRET,
        {
            expiresIn: ENV.JWT_EXPIRES_IN
        }
    )
}


export const verifyToken = (token) => {
    return JWT.verify(token, ENV.KEY_SECRET)
}