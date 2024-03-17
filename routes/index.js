const Express = require("express");
const Router = Express.Router();

Router.use("/iot-sensor",require("./iot-sensor-api"));
module.exports = Router;