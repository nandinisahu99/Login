const db=require("../model/db.js");
const bcrypt=require("bcryptjs");

const reset_pwd= async(req,res)=>{
    try{
        const {email,password}=req.body;
        const Hpassword =await bcrypt.hash(password,8);
        db.query("update candidates set password=? where email=?",[Hpassword, email], async(err, result)=>{
            if(err) throw err;
            return res.json({status: "success", success:"password updated"});
        })
    }
    catch(err){
        throw(err);
    }
}
module.exports=reset_pwd;
