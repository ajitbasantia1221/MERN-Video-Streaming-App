import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";


export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (err) {
        next(err);
    }
};

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video Not Found!!"));
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedVideo);
        }
        else {
            return next(createError(403, "You can update only your video!!"));
        }
    } catch (err) {
        next(err);
    }

}

export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video Not Found!!"));
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("This video has been deleted!!");
        }
        else {
            return next(createError(403, "You can delete only your video!!"));
        }
    } catch (err) {
        next(err);
    }

}

export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }

}

export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });
        res.status(200).json("The view has been increased.");
    } catch (err) {
        next(err);
    }
};

export const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);  //aggregate is a mongoDb method swith sample and size of 40 random videos.
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const trend = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 }); //sort the video based on most viewed ones -1 for most viewed and 1 for least one.
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const sub = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers; //subscribedUsers refer scehma in models.

        const list = await Promise.all( //to find all the videos of the subscribedChannel we use promise.all()
            subscribedChannels.map(async (channelId) => {
                return await Video.find({ userId: channelId });
            })
        );
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));//sort method to show the latest videos first
    } catch (err) {
        next(err);
    }
};

export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    //console.log(tags);
    try {
        const videos = await Video.find({ tags: { $in: tags }, }).limit(20); //in method to check inside tags array.
        //console.log(videos);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos = await Video.find({
            title: { $regex: query, $options: "i" }, //regex with mongodb, not case sensitive
        }).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

