import mongoose from "mongoose";
import Calories from "../models/Everyday.js";
import { formatDate } from "../utils/formatDate.js";

export const updateCalories = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI_CLIENT);
    const body = req.body;
    console.log(body);
    
    body.date = formatDate(body.date);

    await Calories.findOneAndUpdate(
      { user: body.user, date: body.date },
      {
        user: body.user,
        date: body.date,
        breakfast: body.breakfast,
        lunch: body.lunch,
        snacks: body.snacks,
        dinner: body.dinner,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ done: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const readCalories = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI_CLIENT);
    const body = req.body;
    body.date = formatDate(body.date);
    console.log(body);
    

    const data = await Calories.findOneAndUpdate(
      { user: body.user, date: body.date },
      { user: body.user, date: body.date },
      { new: true, upsert: true }
    );

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
