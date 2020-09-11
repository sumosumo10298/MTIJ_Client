const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const congig = require("./Contants/config");
const { routers, Dispatcher } = require('./Routes/index')


const app = express();
app.options('*', cors())
app.use(bodyParse.json())

// app.use("/:Controller/:action", (req, res, next) => {
//     console.log("Authentication")
//     next()
// })

app.use("/:Controller/:action", (req, res, next) => {
    let { action } = Dispatcher.GetAction(req)
    console.log("authorization")
    next()
})

app.use(routers)
app.listen(congig.portServer, obj => {
    console.log("Server starting...")
});