import { Router } from "express";
import { MedicineController } from "./medicine.controller";
import { userAuth, roleAuth } from "../../middleware/auth";
import { checkUserStatus } from "../../middleware/checkUserStatus";

const router: Router = Router();

//  Public
router.get("/medicines", MedicineController.getAllMedicines);
router.get("/medicines/:id", MedicineController.getMedicineById);

// Seller
router.post(
  "/seller/medicines",
  userAuth,
  checkUserStatus,
  roleAuth("SELLER"),
  MedicineController.createMedicine,
);

router.patch(
  "/seller/medicines/:id",
  userAuth,
  checkUserStatus,
  roleAuth("SELLER"),
  MedicineController.updateMedicine,
);

router.delete(
  "/seller/medicines/:id",
  userAuth,
  checkUserStatus,
  roleAuth("SELLER"),
  MedicineController.deleteMedicine,
);

export const MedicineRoutes = router;
