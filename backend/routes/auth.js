const router=require("express").Router()  ;
const User=require("../model/User")
const bcrypt=require("bcrypt") ;

router.post("/register",async(req,res)=>{

  
    try{ 
        const salt=await bcrypt.genSalt(10) ;
        const hashedPassword=await bcrypt.hash(req.body.password,salt) ;

        const newuser=await new User({
            username:req.body.username ,
            email:req.body.email ,
            password:hashedPassword ,
        }) 



   const user=await newuser.save() ;
   res.status(200).json(user)
    }
    catch(error){
        console.log(error)
    }
})


router.post("/login",async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})  ;
        !user && res.status(404).json("user not found")  ;

        const validpassword=await bcrypt.compare(req.body.password,user.password)  ;
         !validpassword && res.status(400).json("wrong password")

        res.status(200).json("login successfully!!")

    }

    catch(error){
        console.log(error) ;
    }





})




module.exports=router ;