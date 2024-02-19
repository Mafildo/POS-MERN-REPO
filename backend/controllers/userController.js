const bcrypt = require("bcrypt");
const { hashPassword, comparePassword } = require("../helpers/auth");

// const Items = require('../models/itemModel');
const userModel = require("../models/userModel");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        error: "No user found!"
      });
    }

    if (!email) {
      return res.json({
        error: "Email is required!"
      });
    }

    if (!password) {
      return res.json({
        error: "Wrong Password!"
      });
    }

    const match = await comparePassword(password, user.password);
    if (match) {
      res.json("Password matched!");
    }else{
      return res.json({
        error: "Wrong Password!"
      })
    }
  } catch (error) {
    console.log(error);
  }
};

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if name was entered
    if (!name) {
      return res.json({
        error: "Name is required!", 
      });
    }

    // check if password is good
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be atleast 6 characters long!",
      });
    }

    //check email
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is already taken! Please use another one.",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { loginController, registerController };
