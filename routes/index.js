const express = require("express");
const router = express.Router();
const protectAdminRoute = require('./../middlewares/protectPrivateRoute');
const SneakerModel = require('./../models/Sneaker')
const TagModel = require('./../models/Tag')

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
  res.render("products");
});


router.get("/one-product/:id", async (req, res) => {
  const sneakers = await SneakerModel.find();
  res.render("one_product", {
    sneakers
  });
});

router.get("/prod-manage", async (req, res) => {
  const sneakers = await SneakerModel.find();
  res.render("products_manage", {
    sneakers
  });
});


router.get("/prod-add", protectAdminRoute, async (req, res, next) => {
  const tags = await TagModel.find()
  res.render("products_add", { tags })
})

router.post("/prod-add", protectAdminRoute, async (req, res, next) => {
  const newProduct = { ...req.body };
  try {
    await SneakerModel.create(newProduct)
    res.redirect("/")
  } catch (err) {
    next(err)
  }
})

module.exports = router;
