const { signup, login } = require("../control/AuthController");
const { signupValidation, loginValidation } = require("../middlewares/AuthValidation");

const router = require("express").Router();



 router.post("/login", loginValidation,login);
 router.post("/signUp",signupValidation,signup);

 module.exports=router;