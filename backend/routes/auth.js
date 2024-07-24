const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");
const JWT_SECRET = "Kris@hh"; //keep safe in env file..this will be used to sign the jwt authentication req

// creating POST req in ./api/auth/createuser,,, no login required
router.post(
  "/createuser",
  [
    //validation array
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //checks if there is any error while vaidating is yes send bad res
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      //created an user and checks if email is unique
      let userMail = await User.findOne({ email: req.body.email });
      if (userMail) {
        return res
          .status(400)
          .send({ success, error: "please enter a unique email" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user and add to database
      let user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      //   res.send(user);

      let data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);
      // console.log(token);
      success = true;
      res.send({ success, token: token });
    } catch (error) {
      console.error({ message: error });
      res.status(500).send("internal server occured");
    }
  }
);

// creating POST req in ./api/auth/loginuser to authenticate and login register users / created user
router.post(
  "/loginuser",
  [
    //validation array
    body("email").isEmail(),
    body("password").exists(), // checks if the password is empty or not
  ],
  async (req, res) => {
    let success = false;
    // from express validator
    //checks if there is any error while vaidating is yes send bad response
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        res
          .status(400)
          .send({ success, message: "Login with proper credentials" });
      }
      let checkPass = await bcrypt.compare(password, user.password);
      if (!checkPass) {
        res
          .status(400)
          .send({ success, message: "Login with proper credentials" });
      } else {
        let data = {
          user: {
            id: user.id,
          },
        };
        const token = jwt.sign(data, JWT_SECRET);
        success = true;
        res.send({ success, token: token });
      }
    } catch (error) {
      console.error({ message: error });
      res.status(500).send("internal server occured");
    }
  }
);

//Route 3 : get loggedin user dertails using POST /api/auth/getuser  --> Login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error({ message: error });
    res.status(500).send("internal server occured");
  }
});

module.exports = router;
