const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchUser = require('../middleware/fetch-user')

const JWT_SECRET = "iamakshayAnd$myToken";

//ROUTE 1: craete user using: POST "/api/auth/createuser" no login required

router.post("/createuser",
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
        return res
          .status(400)
          .json({ error: "Sorry, a user with the same email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: hashedPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({authToken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
});

//ROUTE 2: Authenticate a user: POST "/api/auth/login" no login required
router.post("/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "password cannot be blank").exists()
  ],
  async (req, res) => {
    //if there are errors the return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password}= req.body
    try {
        let user = await User.findOne({ email }); //checking if user has entered correct email
        if(!user) {
          return res.status(400).json({ error: "Try to login with correct credentials" });
        } 

        const passwordCompare = await bcrypt.compare(password, user.password) // checking if the password is matching
        if(!passwordCompare){
            return res.status(400).json({error: "Try to login with correct credentials"})
        }

        const data = {
            user: {
              id: user.id,
            },
          };
    
          const authToken = jwt.sign(data, JWT_SECRET);
    
          res.json({authToken});
          
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 3: Get loggedin user details: POST "/api/auth/getuser" login required
router.post("/getuser", fetchUser,async (req, res) => {
    //if there are errors the return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
