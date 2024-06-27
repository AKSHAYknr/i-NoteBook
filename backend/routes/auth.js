const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//craete user using: POST "/api/auth/createuser"

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter valid password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    //if there are errors the return bad request

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    //check user with same email exist or not
    try {
      // Check if a user with the same email exists or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry, a user with the same email already exists" });
      }
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });

      res.json({ success: "success" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
