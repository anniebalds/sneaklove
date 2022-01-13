const express = require("express");
const router = new express.Router();
module.exports = router;
//const bcryptjs = require("bcryptjs");
const bcrypt = require("bcrypt");
const salt = 10;
const UserModel = require("../models/User");

const protectRoute = require("./../middlewares/protectPrivateRoute");
// const protectUnlogged = require("./../middlewares/protectUnlogged");

router.get("/signin", (req, res) => {
    res.render("signin")
})

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.post("/signup", async (req, res, next) => {
    const newUser = { ...req.body };
    if (!newUser.name || !newUser.lastname || !newUser.email || !newUser.password) {
        req.flash("error", "Please fill in all the fields");
        res.redirect("/signup");
    }
    try {
        const foundUser = UserModel.findOne({ email: newUser.email })
        if (foundUser) {
            req.flash("warning", "This e-mail already exists");
            res.redirect("/signup")
        } else {
            req.flash("success", "Account successfully create")
            const hashedPassword = await bcrypt.hashSync(newUser.password, salt);
            newUser.password = hashedPassword;
            UserModel.create(newUser)
            console.log(newUser);
            res.redirect("/signin")
        }
    } catch (err) {
        next(err);
    }
})