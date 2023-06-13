const { Router } = require("express");
const router = Router();
const patientController = require("../controllers/patientController"); // May need to change route

// Get all
router.get("/", patientController.getAll);

// Create
router.post("/", patientController.create);

// Read
router.get("/:patientId", patientController.get);

// Update
router.put("/:patientId", patientController.update);

// Delete
router.delete("/:patientId", patientController.delete);

module.exports = router;
