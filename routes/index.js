const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
//@ desc Login/landing page
//@ route  GET/
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

//@ desc Dashboard Landing page
//@ route GET/

router.get("/dashboard", ensureAuth, (req, res) => {
  res.render("dashboard", {
    name: req.user,
  }); // always name this in lower case
});
module.exports = router;
