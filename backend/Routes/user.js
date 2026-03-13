const express = require("express")
const UserRouter = express.Router();
const User = require("../Model/User")
const bcrypt = require("bcryptjs")
const JWT=require("jsonwebtoken")


UserRouter.post("/register", async (req, res) => {

    const { emailId, firstName, lastName, passWord, gender } = req.body;

    try {

        const ExistingUser = await User.findOne({ emailId });

        if (ExistingUser) {

            return res.status(400).json({ message: "User already registred in database" });
        }


        const hashedPassword = await bcrypt.hash(passWord, 10)

        const user = await User.create({

            firstName, lastName, emailId, passWord: hashedPassword, gender
        })

        res.status(201).json({ message: "User registered successfully", user });

    }

    catch (err) {

        res.status(500).json({ error: err.message });
    }



})


UserRouter.post("/login", async (req, res) => {
  try {
    const { emailId, passWord } = req.body;

    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(401).json({ message: "Please register" });
    }

    const isMatch = await bcrypt.compare(passWord, user.passWord);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = JWT.sign(
      { id: user._id, emailId },
      "shubham",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: "Logged in Successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


UserRouter.post("/logout", async (req, res) => {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: false,   // true in production with HTTPS
      sameSite: "lax"
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });

  } 
  
  catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Logout failed"
    });
  }
});

module.exports=UserRouter;