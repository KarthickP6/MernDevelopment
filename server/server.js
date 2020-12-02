const express = require("express")
const mongoose = require("mongoose")
const url = "mongodb://localhost/currency"
const app = express()
const cors = require("cors")

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on("open", function (req, res) {
  console.log("Connected")
})

app.use(express.json())
app.use(cors())

const routerModule = require("./Router")
app.use("/cart", routerModule)

app.listen(5001, function () {
  console.log("server started on port 3000")
})
