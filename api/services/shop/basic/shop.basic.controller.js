const handleApiError = require("../../../utils/ErrorHandler");
const Shop = require("../shop.model");

exports.createShop = async (req, res) => {
    try {
        const shop = new Shop(req.body);
        shop.isApproved = false;
        await shop.save();
        return res.status(200).send({ message: "Shop successfully added" })
    }
    catch (error) {
        handleApiError(res, error, "createShop")
    }
}

exports.ApproveShop = async (req, res) => {
    try {
        const shop = await Shop.findById(req.headers.shopid);
        if (!shop) return res.status(400).send({ error: "Cannot find shop" });
        shop.isApproved = true;
        await shop.save();
        return res.status(200).send({ message: "Shop successfully approved" })
    }
    catch (error) {
        handleApiError(res, error, "ApproveShop")
    }
}

exports.getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find();
        if (!shops) return res.status(200).send([]);
        return res.status(200).send(shops);
    }
    catch (error) {
        handleApiError(res, error, "getAllShops")
    }
}

exports.getAllApprovedShops = async (req, res) => {
    try {
        const shops = await Shop.find({ isApproved: true });
        if (!shops) return res.status(200).send([]);
        return res.status(200).send(shops)
    }
    catch (error) {
        handleApiError(res, error, "getAllApprovedShops")
    }
}

exports.getMyShops = async (req, res) => {
    try {
        const shops = await Shop.find({ shopOwnerUserId: req.headers.userid })
        if (!shops) return res.status(400).send({ error: "This user has no shops" });
        return res.status(200).send(shops);
    }
    catch (error) {
        handleApiError(res, error, "getMyShop")
    }
}