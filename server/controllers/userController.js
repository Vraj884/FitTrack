import mongoose from "mongoose";
import User from "../models/Signup.js";

export const signupUser = async (req, res) => {
  try {
    req.body.phoneNo = req.body.phone
    await mongoose.connect(process.env.MONGO_URI_CLIENT);
    const user = new User(req.body);
    await user.save();
    res.status(200).json({ msg: "Successfully Registered" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Signup failed", err });
  }
};

export const loginUser = async (req, res) => {
  try {

    await mongoose.connect(process.env.MONGO_URI_CLIENT);
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    
    if (user && user.password === req.body.password) {
      const { name, age, weight, email, countryCode, phoneNo } = user;
      res.status(210).json({ name, age, weight, email, countryCode, phoneNo });
    } else {
      res.sendStatus(502);
    }
  } catch (err) {
    res.sendStatus(503);
  }
};
