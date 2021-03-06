const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//Create a  user using : POST "/api/auth/createuser", doesn't requires Authentication [Login]

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body(
      "password",
      "Enter a valid password [Password must be atleast 5 characters]"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are errors, return Bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check wether the user with this exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry, a user with this email exists already." });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured!");
    }
  }
);

module.exports = router;
