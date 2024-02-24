import { signIn, signUp } from "../controllers/auth.js";
import express from "express";

const router = express.Router();

// CREATE AN USER
router.post("/signUp", signUp );


//SIGN IN
router.post("/signIn", signIn);



//GOOGLE AUTH
router.post("/google", );





export default router;