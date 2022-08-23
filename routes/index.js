const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
//importing story model
const Story = require("../models/Story");
const User = require("../models/User");

//@ desc Login/landing page
//@ route  GET/
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

//@ desc Dashboard Landing page
//@ route GET/

router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.findOne({ user: req.user.id });
    console.log(req.user);
    const userInfo = await User.findById(req.user.id);
    console.log(userInfo);
    res.render("dashboard", {
      name: userInfo.firstName,
      stories,
    }); // always name this in lower case
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});

//@
module.exports = router;
