const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");;

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(422).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser)
      return res.status(409).json({ error: "User already exists" });

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      to: email,
      subject: "Registration Confirmation",
      text:
        "Hello " +
        username +
        ",\n\n" +
        "Thank you for registering on our platform.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending confirmation email:", error);
        return res
          .status(500)
          .json({ error: "Failed to send confirmation email" });
      } else {
        console.log("Email sent: " + info.response);
        res
          .status(200)
          .json({
            message: "Registration successful. Confirmation email sent.",
          });
      }
    });

    await newUser.save();
  } catch (err) {
    console.error("Error in registration:", err.message);
    res.status(500).json({ error: "Registration failed" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ err: "User not found" });

    const validPassword = await bcrypt.compareSync(password, user.password);
    if (!validPassword)
      return res.status(401).json({ err: "Invalid password" });

    const { password: _, ...data } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECURITY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res
      .cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "None",
        secure: true,
      })
      .status(200)
      .json(data);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

module.exports = { registerController, loginController };
