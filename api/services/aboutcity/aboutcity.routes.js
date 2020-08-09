const SchemaValidator = require("../../utils/middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);


module.exports = app => {
    const aboutCity = require("./aboutcity.controller");

    app.post("/aboutcity",validateRequest,aboutCity.createAboutCity);

    app.put("/aboutcity",validateRequest,aboutCity.editAboutCity);

    app.get("/aboutcity",validateRequest,aboutCity.getAboutCity);
}