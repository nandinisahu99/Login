const db=require("../model/db.js");
const bcrypt=require("bcryptjs");

const checkEmail=async(req, res)=>{
    try{
        const {email}=req.body;
        db.query('select * from candidates where email = ?',[email],async(err,result)=>{
            if(err) throw err;
            if(result.length) {
                const userQuestion=result[0].security.split("+");
                return res.json({securityQuestion: userQuestion[0]})
            }
            else{
                return res.json({status: "error",error:"Email does not match"});
            }
        })
    }
    catch(err)
    {
        throw(err);
    }
}
module.exports=checkEmail;