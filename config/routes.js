//routes
const controller = require("../controller/index")

router.get('/example', tokenValidate, controller.example.test);