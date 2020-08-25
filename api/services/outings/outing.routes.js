const SchemaValidator = require("../../utils/middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);

module.exports = app => {
    const outing = require("./outing.controller");

    app.post("/outing",validateRequest,outing.createOuting)

    app.get("/activity",validateRequest,outing.getAllActivities)

    app.get("/event",validateRequest,outing.getAllEvents)

    app.delete("/outing",validateRequest,outing.deleteOuting)
}