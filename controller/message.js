let controller = {}
const client = require("../app")

controller.sendMessageText = function(req, res) {

    phone = req.query.phone
    text = req.query.text

    client.sendMessage(phone+"@c.us", text)

  res.json({
    status : "success",
    Messsage : "Send Text Success"
  })

};


module.exports = controller;