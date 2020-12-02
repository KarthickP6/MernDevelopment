const e = require("express")
const express = require("express")
const router = express.Router()
const Cart = require("./model/Cart")
const CartProduct = require("./model/CartProduct")
router.get("/", (req, res) => {
  Cart.find((err, item) => {
    if (!err) res.send(item)
    else res.send(err)
  })
})

router.post("/", (req, res) => {
  const newObj = new Cart({
    id: req.body.id,
    image: req.body.image,
    title: req.body.title,
    description: req.body.description,
    availableSizes: req.body.availableSizes,
    price: req.body.price,
  })

  newObj.save((err, item) => {
    if (!err) res.send(item)
    else res.send(err)
  })
})

router.delete("/removeToCart", (req, res) => {
  console.log("request is " + req.body)
  CartProduct.findOneAndDelete({ id: req.body.id }, (err, item) => {
    if (!err) {
      Cart.find((err1, item1) => {
        if (!err1) {
          res.send(item1)
        } else {
          res.send(err1)
        }
      })
    } else res.send(err)
  })
})

router.delete("/removeToCartId/:id", (req, res) => {
  CartProduct.findByIdAndRemove({ _id: req.params.id }, (err, item) => {
    if (!err) res.send("Deleted Successfully")
    else res.send(err)
  })
})
router.get("/showToCart", (req, res) => {
  CartProduct.find((err, item) => {
    if (!err) res.send(item)
    else res.send(err)
  })
})

router.post("/addToCart", (req, res) => {
  console.log("Called")
  const newObj = new CartProduct({
    id: req.body.id,
    image: req.body.image,
    title: req.body.title,
    description: req.body.description,
    availableSizes: req.body.availableSizes,
    price: req.body.price,
    qty: 1,
  })

  const toFindId = req.body.id

  CartProduct.findOne({ id: toFindId }, (err, item) => {
    if (!err) {
      if (item !== null) {
        const updateObj = {
          id: req.body.id,
          image: req.body.image,
          title: req.body.title,
          description: req.body.description,
          availableSizes: req.body.availableSizes,
          price: req.body.price,
          qty: parseInt(1) + parseInt(item.qty),
        }
        console.log("item is" + updateObj)
        CartProduct.findOneAndUpdate(
          { id: req.body.id },
          { $set: updateObj },
          { new: true },
          (err2, item2) => {
            if (!err2) {
              CartProduct.find((err4, item4) => {
                if (!err4) res.send(item4)
                else res.send(err4)
              })
            } else res.send(err2)
          }
        )
      } else {
        newObj.save((err1, item1) => {
          if (!err1) {
            CartProduct.find((err3, item3) => {
              if (!err3) res.send(item3)
              else res.send(err3)
            })
          } else res.send(item1)
        })
      }
    } else {
    }
  })
})

router.delete("/delete/:id", (req, res) => {
  Cart.findByIdAndDelete({ _id: req.params.id }, (err, item) => {
    if (!err) res.send("Successfully deleted")
    else res.send(err)
  })
})
module.exports = router
