const bcrypt = require("bcryptjs")


 async function genpassword(password){
    const pass =await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password,pass)
    return hashed
}
module.exports = genpassword