const express=require("express")
const {registerUser,loginUser,getuserProfile}=require("../controllers/authController")
const {protect}=require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router=express.Router()

router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/profile",protect,getuserProfile)

router.post("/upload-image",upload.single("image"),(req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"No file Uploaded"})
    }

    const imageurl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;


    res.status(200).json({imageurl})
})

module.exports=router;

