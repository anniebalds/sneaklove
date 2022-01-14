const express = require("express"); // import express in this module
const SneakerModel = require("./../models/Sneaker");
const router = new express.Router(); // create an app sub-module (router)


//delete sneakers
router.post('/delete/:id', async (req, res, next) => {
    try {
        const deletedSneaker = await SneakerModel.findByIdAndRemove(req.params.id)
        console.log(deletedSneaker)
        res.redirect('/')
    } catch (err) {
        console.error(err) 
        next (err)
    }
})


//edit sneakers
router.get('/product-edit/:id', async (req, res, next) =>{
    try {
        const sneakerToEdit = await SneakerModel.findById(req.params.id)
        res.render('products_manage', {
            sneakerToEdit
        })
    } catch (err) {
        next (err)
    }
})

router.post('/product-edit/:id', async (req, res, next) => {
    try {
        await SneakerModel.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/prod-manage')
    } catch (err) {
        next (err)
    }
})


module.exports = router;
