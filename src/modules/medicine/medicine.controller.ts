import { Request, Response } from "express";
import { MedicineService } from "./medicine.service";

const createMedicine = async (req: Request, res: Response) => {
  try {
    const result = await MedicineService.createMedicine(req.body, req.user!.id);
    res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create medicine",
    });
  }
};

const getAllMedicines = async (req: Request, res: Response) => {
  try {
    const result = await MedicineService.getAllMedicines(req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch medicines",
    });
  }
};

const getMedicineById = async (req: Request, res: Response) => {
  try {
    const result = await MedicineService.getMedicineById(
      req.params.id as string,
    );
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Medicine not found",
    });
  }
};

const updateMedicine = async (req: Request, res: Response) => {
  try {
    await MedicineService.updateMedicine(
      req.params.id as string,
      req.body,
      req.user!.id,
    );

    res.status(200).json({ success: true, message: "Medicine updated" });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update medicine",
    });
  }
};

const deleteMedicine = async (req: Request, res: Response) => {
  try {
    await MedicineService.deleteMedicine(req.params.id as string, req.user!.id);
    res.status(200).json({ success: true, message: "Medicine deleted" });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete medicine",
    });
  }
};

export const MedicineController = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
