import { comparePassword } from "../hashPassword/hashUtils.js"
import { revToken } from "../jwt/jsonWebToken.js"
import { User } from "../schema/userSchema.js"

const userVerify = async (req, res, next) => {
   console.log(req.cookies.messimessCookie)
   try {
      let result = revToken(req.cookies.messimessCookie)
      if (result.error) {
         throw new Error("Invalid Token")
         // return res.status(401).json({ "error": "Invalid Token" })
      } else {
         let data = result.data
         let userData = await User.findById(data._id)
         console.log(userData)
         if (userData) {
            req.user = userData
            next()
         } else {
            res.status(403).json({ "error": "Access denied: You do not have permission to perform this action" })
         }
      }

   } catch (error) {
      console.log(error.message)
      res.status(500).json({ "error": "internal server error" })
   }


}

export default userVerify;