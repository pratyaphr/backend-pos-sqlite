const router = require("express").Router();

const controller = require("../controllers/product.controller");

router.get("/", controller.getAll);
router.post("/", controller.create);
router.get("/barcode/:barcode", controller.getByBarcode);
router.get("/list", controller.getList);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
