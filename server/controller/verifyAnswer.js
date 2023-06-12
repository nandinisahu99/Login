const db=require("../model/db.js");
const bcrypt=require("bcryptjs");

const verifyAnswer=async(req,res)=>{
    try{
        const {email, answer}=req.body;
        db.query('select * from candidates where email = ?',[email],async(err,result)=>{
            if(err) throw err;
            if(result.length) {
                const userQuestion=result[0].security.split("+");
                if(answer.trim()===userQuestion[1])
                    return res.json({status: "success", success:"verified"});
            }
            else{
                return res.json({status: "error",error:"Answer does not match"});
            }
        })

    }
    catch(err){
        throw(err);
    }
}
module.exports=verifyAnswer;