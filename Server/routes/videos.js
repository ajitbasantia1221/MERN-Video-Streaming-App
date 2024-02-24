import { addVideo, addView, getByTag, getVideo, random, search, sub, trend, updateVideo } from "../controllers/video.js";
import express from "express";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//Create a Video:
router.post('/', verifyToken, addVideo);

//Update a Video:
router.put('/:id', verifyToken, addVideo);

//Delete a Video:
router.delete('/:id', verifyToken, addVideo);

//Get a Video:
router.get('/find/:id', getVideo);

router.get('/view/:id', addView);
router.get('/trend', trend);
router.get('/random', random);
router.get('/sub', verifyToken, sub);
router.get('/tags', getByTag);
router.get("/search", search);

export default router;