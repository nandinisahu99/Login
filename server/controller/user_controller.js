const db=require("../model/db.js");
const bcrypt=require("bcryptjs");
const registerUser= async(req, res)=>{
    try{
        const {name, email, roll, password, securityQuestion, securityAnswer}=req.body;
        if(!email || !password || !name || !roll || !securityQuestion || !securityAnswer){ 
            return res.json({status: "error", error: "Please Enter your all details"});}
        else{
            db.query('select email from candidates where email=?',[email],async(err,result)=>{
                if(err) throw err;
                if(result[0]) return res.json({status: "error", error: "Email has already been registered"})
                else{
                    const Hpassword =await bcrypt.hash(password,8);
                    const security= securityQuestion.trim()+"+"+securityAnswer.trim();
                    db.query('insert into candidates set ?',{email:email,name:name,password:Hpassword,roll:roll,security:security},(error,results)=>{
                        if(error) throw error;
                        return res.json({status:"success", success:"User has been registered"})
                    })
                }
            })
        } 
    }
    catch(err){
            throw err;
    }
}

module.exports=registerUser;
 
