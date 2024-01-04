import jwt from 'jsonwebtoken'
import { UnauthorizedError, BadTokenError, TokenExpiredError } from '../../utils/ApiError'

export const verifyAdmin = (req, res, next) => {
    const bearerHeader = req.header('Authorization')
    if (!bearerHeader) {
        throw new BadTokenError();
    }

    const bearer = bearerHeader.split(' ')
    const token = bearer[1]

    if (!token) {
        throw new BadTokenError();
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if (decodedToken) {
      req.user = decodedToken
      next()
    }
}