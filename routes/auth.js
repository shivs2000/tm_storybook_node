const express = require("express");
const router = express.Router();
const passport = require("passport");

//@ desc google auth
//@ route  GET /auth/google/
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//@ desc Dashboard Landing page
//@ route GET /auth/google/callback

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),

  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/dashboard");
  }
);
// logout
//@ route /auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  req.redirect("/");
});

module.exports = router;
