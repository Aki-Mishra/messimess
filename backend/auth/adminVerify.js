import { revToken } from "../jwt/jsonWebToken.js"
import { Admin } from "../schema/userSchema.js"





const adminAuthentication = async (req, res, next) => {
   try {
      
      let result = revToken(req.cookies.messimessCookie)
      if (result.error) {
         res.redirect("http://localhost:6969/loginAdmin")
         // return res.status(401).json({ "error": "Invalid Token" })
      } else {
         let data = result.data
         let admin = Admin.findById(data._id)
         if (admin) {
            next()
         } else {
            res.status(403).json({ "error": "Access denied: You do not have permission to perform this action" })
         }
      }
   }
   catch (error) {
      console.log(error)
      res.status(500).json({ "error": "Internal Server error" })
   }
}

export default adminAuthentication