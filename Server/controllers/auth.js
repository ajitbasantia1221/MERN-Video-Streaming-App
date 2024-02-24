import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";

// SignUp Logic ----CREATE/POST method----
export const signUp = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);  //storing the password used in req.body i.e json request
        const newUser = new User({ ...req.body, password: hash });  //encrypting the password for security purpose using bycrypt module
        await newUser.save();
        res.status(200).send("User has been created successfully!!");
    } catch (err) {
        next(err);
    }
}

//SignIn Logic -----READ/GET method----
export const signIn = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user) return next(createError(404, "User Not Found!!"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong Credentials."));
        const token = jwt.sign({ id: user._id }, process.env.JWT);  //Taking a key parameter from env file;
        const { password, ...others } = user._doc; // to get everything other than password;

        res.cookie("access-token", token, {
            httpOnly: true
        })
            .status(200)
            .json(others); // can call here user to show password but we are using other to hide password.
    } catch (err) {
        next(err);
    }
};


//Google Authentication:
export const googleAuth = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        res
          .cookie("access-token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(user._doc);
      } else {
        const newUser = new User({
          ...req.body,
          fromGoogle: true,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
        res
          .cookie("access-token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(savedUser._doc);
      }
    } catch (err) {
      next(err);
    }
  };