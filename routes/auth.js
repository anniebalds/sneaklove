const express = require("express");
const router = new express.Router();
module.exports = router;
//const bcryptjs = require("bcryptjs");
const bcrypt = require("bcrypt");
const salt = 10;
const UserModel = require("./../models/User");

const protectRoute = require("./../middlewares/protectPrivateRoute");
// const protectUnlogged = require("./../middlewares/protectUnlogged");

router.get("/signin", (req, res) => {
    res.render("signin")
})

router.post("/signin", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const foundUser = await UserModel.findOne({ email })
        if (!foundUser) {
            req.flash("error", "User not found");
            res.redirect("/signup");
        } else {
            const isSamePassword = bcrypt.compareSync(password, foundUser.password);
            if (!isSamePassword) {
                req.flash("error", "Wrong password");
                res.redirect("/signin");
            } else {
                const userObject = foundUser.toObject();
                delete userObject.password;
                req.session.currentUser = userObject;
                console.log(`User object is : ${userObject.name}`);
                console.log(`req.Session is : ${req.session}`);
                req.flash("success", "Successfully logged in !");
                res.redirect("/")
            }
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
})

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.post("/signup", async (req, res, next) => {
    const newUser = { ...req.body };

    if (!newUser.name || !newUser.lastname || !newUser.email || !newUser.password) {
        req.flash("error", "Please fill in all the fields");
        res.redirect("/signup");

    } else {
        try {
            const foundUser = await UserModel.findOne({ email: newUser.email })
            if (foundUser) {
                req.flash("warning", "This e-mail already exists");
                res.redirect("/signup")

            } else {
                req.flash("success", "Account successfully created")
                const hashedPassword = bcrypt.hashSync(newUser.password, salt);
                newUser.password = hashedPassword;
                await UserModel.create(newUser)
                res.redirect("/signin")
            }
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
})

router.get("/logout", protectRoute, (req, res) => {
    req.session.destroy(function (err) {
        res.redirect("/signin")
    })
});

module.exports = router;