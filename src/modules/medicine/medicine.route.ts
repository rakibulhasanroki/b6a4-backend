import { Router } from "express";
import { MedicineController } from "./medicine.controller";
import { userAuth, roleAuth } from "../../middleware/auth";

const router: Router = Router();

//  Public
router.get("/medicines", MedicineController.getAllMedicines);
router.get("/medicines/:id", MedicineController.getMedicineById);

// Seller
router.post(
  "/seller/medicines",
  userAuth,
  roleAuth("SELLER"),
  MedicineController.createMedicine,
);

router.patch(
  "/seller/medicines/:id",
  userAuth,
  roleAuth("SELLER"),
  MedicineController.updateMedicine,
);

router.delete(
  "/seller/medicines/:id",
  userAuth,
  roleAuth("SELLER"),
  MedicineController.deleteMedicine,
);

export const MedicineRoutes = router;
