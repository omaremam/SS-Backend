const SchemaValidator = require("../../utils/middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);

module.exports = app => {
    const service = require("./services.controller");

    app.post("/service",validateRequest,service.createService);

    app.get("/service",validateRequest,service.getAllServices)
}