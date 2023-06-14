const { Router } = require("express");
const router = Router();
const patientController = require("../controllers/patientController");

// Get all
router.get("/:doctorId", patientController.getAll);

// Create
router.post("/:doctorId", patientController.create);

// Read
router.get("/:doctorId/patient/:patientId", patientController.get);

// Update
router.put("/:doctorId/patient/:patientId", patientController.update);

// Delete
router.delete("/:doctorId/patient/:patientId", patientController.delete);

module.exports = router;
