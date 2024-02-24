import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update, } from "../controllers/user.js";
import express from "express";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//Update User
router.put("/:id", verifyToken, update); // verifyToken is a middleware and it will verify the token 1rst for authentication the will update:---

//Delete User
router.delete("/:id", verifyToken, deleteUser);

//Get User
router.get('/find/:id', getUser);

//Subscribe a User
router.put("/sub/:id", verifyToken, subscribe);

//Unsubscribe a User
router.put("/unsub/:id", verifyToken, unsubscribe);

//Like a video
router.put("/like/:videoId", verifyToken, like);

//Unlike a Video
router.put("/dislike/:videoId", verifyToken, dislike);



export default router;