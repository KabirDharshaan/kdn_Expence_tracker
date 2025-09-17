const epxress=require("express");
const {protect} =require("../middleware/authMiddleware")

const{
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authContoller");


const router=epxress.Router();


router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/getUser", protect,getUserInfo);

module.exports=router;