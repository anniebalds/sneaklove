const express = require("express");
const router = express.Router();
const protectAdminRoute = require('./../middlewares/protectPrivateRoute');
const SneakerModel = require('./../models/Sneaker')


console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`
);

router.get("/", (req, res) => {
  SneakerModel.find()
  .then((dbResponse) => {
    res.render('products', {
      sneakers: dbResponse
    })
  })
  .catch((e) => console.error(e))
});

router.get("/sneakers/:cat", (req, res) => {
  res.send("bar");
});

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});

router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});


module.exports = router;
