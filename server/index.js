const express=require("express");
const db=require("./model/db");
const app= express();
// const userRoutes=require("./routes/user_routes.js");
app.use(express.urlencoded());
app.use(express.json()); 
const registerUser=require("./controller/user_controller.js")
const loginUser=require("./controller/login_controller.js")
const checkEmail=require("./controller/checkEmail.js")
const verifyAnswer=require("./controller/verifyAnswer.js")
const reset_pwd=require("./controller/reset_pwd.js")

const PORT=process.env.PORT || 5000;
app.set("view engine","ejs");

//api for registration
app.post("/user/register", registerUser);
//For login
app.post("/user/login",loginUser);        
//For verifying Email      
app.post("er", checkEmail);
//For verifying security answer
app.post("/user/verify", verifyAnswer);
//For reset password
app.patch("/user/reset_pwd",reset_pwd);

//Home page
app.post("/", (req, res)=>{
    res.json({message:"Hello"});
})

// app.use("/user", userRoutes);


db.connect((err)=> {
    if(err)
        throw err;
    console.log("database connected");
})
app.listen(PORT);

