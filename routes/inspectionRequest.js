const router = require("express").Router();

// controller
const {
    saveInspectionRequest,
    getAllInspectionRequests,
    getInspectionRequestById,
    deleteinspectionRequestById,
    updateInspectionRequest
  } = require("../controllers/inspectionRequest");

// middlewares
const { validateToken } = require("../middlewares/validate-token");
const { validateRequest } = require("../middlewares/validate-request");

// validation
const {
    inspectionRequestSchema
  } = require("../utils/validation/inspection-schema");

// routes
router.get("/all", getAllInspectionRequests);
router.get("/:id", getInspectionRequestById);

router.post("/", validateToken, validateRequest(inspectionRequestSchema), saveInspectionRequest);

router.delete("/:id", validateToken, deleteinspectionRequestById);

router.patch("/:id", validateToken,validateRequest(inspectionRequestSchema), updateInspectionRequest) 
//to do: update request schema to be made and replaced here.
module.exports = router;