const router = require("express").Router();

// controller
const { userDetails, signup, login } = require("../controllers/users");

// middlewares
const { validateToken } = require("../middlewares/validate-token");
const { validateRequest } = require("../middlewares/validate-request");
const { isAdmin } = require("../middlewares/userRole-admin");


// validation
const { userSchema } = require("../utils/validation/users-schema");

// routes
router.get("/me", validateToken, userDetails);
router.post("/login", validateRequest(userSchema), login);
router.post("/signup", validateRequest(userSchema), signup);
// how and where to apply isAdmin middleware
module.exports = router;
