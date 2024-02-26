import { signin, signup, googleAuth} from "../controllers/auth.js";
import express from "express";

const router = express.Router();

// CREATE AN USER
router.post("/signup", signup );

//SIGN IN
router.post("/signin", signin);

//GOOGLE AUTH
router.post("/google", googleAuth);

export default router;