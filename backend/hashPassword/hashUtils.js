import bcrypt from "bcrypt";
const saltRounds = 5;
const genrateHashedPassord = async (password) => {
  try {
    let hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
  } catch (error) {
    throw new Error("some error occured while hashing the password")
  }
}
let akshatpassword = '$2b$05$K3P6osWB6oa3QVNfGpIOnezVxyW9X/WsHwXOgE7NPTYIC.DrXG0/C'

const comparePassword = async (myPlaintextPassword, hashedPassword)=>{
  try{

    let result = await bcrypt.compare(myPlaintextPassword, hashedPassword)
    return result
  }catch(err){
    return new Error("There is some error while comparing the pasword" + err)
  }
}
let has= genrateHashedPassord("ak2b$05$KC9CF/DF703MXxbPiKwGqOyXualCeCLRjR5B9zkVjPIKdm0ULAic.").then(res=>console.log(res)).catch(err=>console.log(err))
export {genrateHashedPassord, comparePassword};

