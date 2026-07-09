const router = require("express").Router();
const controller = require("../controllers/receipt.controller");

router.post("/", controller.create);
router.get("/:id", controller.getById);

module.exports = router;
