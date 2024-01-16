const router = require("express").Router();

// controller
const {
    saveSellRequest,
    getAllSellRequests,
    getSellRequestById,
    deleteSellRequestById 
  } = require("../controllers/sellitForMe");

// middlewares
const { validateRequest } = require("../middlewares/validate-request");
const { isAdmin } = require("../middlewares/userRole-admin");



// validation
const {
    sellitForMeRequestSchema
  } = require("../utils/validation/sell-Form-schema");

// routes
router.get("/all", getAllSellRequests);
router.get("/:id", getSellRequestById);

router.post("/", validateRequest(sellitForMeRequestSchema), saveSellRequest);

router.delete("/:id", isAdmin ,deleteSellRequestById); // only admin can delete

module.exports = router;