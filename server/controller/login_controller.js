const db=require("../model/db.js");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const loginUser= async(req,res)=>{
    try{
        const {roll,password}= req.body;
    if(!roll || !password) return res.json({status: "error", error: "Please Enter correct details"});
    else{
        db.query('select * from candidates where roll = ?',[roll],async(err,result)=>{
            if(err) throw err;
            if(!result.length || !await bcrypt.hash(password,8)===result[0].password) return res.json({status: "error", error: "Incorrect Roll or password"})
            else{
                const token= jwt.sign({id: result[0].id}, process.env.JWT_SECRET,{
                   expiresIn:process.env.JWT_EXPIRES
                })
                return res.json({status:"success",success:"user has been logged In"});
            }
        })
    }
    } 
    catch(err){
        res.json(err);
    }
}
module.exports=loginUser;
 