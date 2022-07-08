const express = require("express");
const User = require("../models/User");
const router = express.Router();

//Create a  user using : POST "/api/auth/", doesn't requires Authentication

router.post("/", (req, res) => {
  console.log(req.body); //printing request body inside console after editing json content in thunderclient
  // res.send("Hello Sabyasachi"); //gives response "Hello Sabyasachi"
  const user = User(req.body);
  user.save();
  res.send(req.body);
});

module.exports = router;
