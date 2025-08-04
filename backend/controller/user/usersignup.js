const userModel = require("../../models/usermodel")
const bcrypt = require('bcryptjs');




async function userSignUpController(req, res){

    
    try{
        const { name, email, password} = req.body
        const user = await userModel.findOne({email})

        console.log("user",user)

        if(user){
            throw new Error("Already user exits.")
        }

        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }

        const salt = bcrypt.genSaltSync(10);
const hashpassword = await bcrypt.hashSync(password, salt);

        if(!hashpassword){
            throw new Error("Something is wrong")
        }
        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashpassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data :saveUser,
            success : true,
            error : false,
            message : "User created Successfully!"
        })
           
       
    }catch(err){
        console.log("err",)
        res.json({
            message : err.message || err,
            error : true,
            success :false,

        })
    }
}

module.exports = userSignUpController;