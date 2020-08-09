const SchemaValidator = require("../../../utils/middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);

module.exports = app => {
    const shop = require("./shop.basic.controller");

    app.post("/shop", validateRequest, shop.createShop);

    app.get("/shop", validateRequest, shop.getAllShops);

    app.get("/shop/approved", validateRequest, shop.getAllApprovedShops);

    app.put("/shop/approve", validateRequest, shop.ApproveShop);
}