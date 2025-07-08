import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const secretKey = process.env.SECRET_KEY

const genToken = (data) => {

    var token = jwt.sign(data, secretKey, { expiresIn: 60 * 60 * 24 });
    return token
}

const revToken =  (token) => {
    var result = jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
           return ({error: err})
            
        } else {
            return ({data: decoded})
        }
    })
    return result
}

export { genToken, revToken}





