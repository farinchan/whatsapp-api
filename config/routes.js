//routes
const router = require("express").Router()
const controller = require("../controller/index")

router.get('/sendtext', controller.message.sendMessageText);

module.exports = router