const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = Router();

router.post(
  "/register",
  [
    check("email", "Wrong email").isEmail(),
    check("password", "Password length should be 6 symbols or more").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data during registration",
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({
          message: "User with this email has already been registered",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({ email, password: hashedPassword });

      await newUser.save();

      res.status(201).json({ message: "User has been registered" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong. Try again later" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Enter your email").normalizeEmail().isEmail(),
    check("password", "Enter your password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid email or password",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({ message: "Wrong password. Try again" });

      const token = jwt.sign({ id: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.status(200).json({ token, id: user.id });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong. Try again later" });
    }
  }
);

module.exports = router;
