import { NextFunction, Request, Response } from "express";
import { MedicineService } from "./medicine.service";

const createMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await MedicineService.createMedicine(req.body, req.user!.id);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getAllMedicines = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await MedicineService.getAllMedicines(req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
const getMedicineSuggestions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { q } = req.query;

    const result = await MedicineService.getMedicineSuggestions(q as string);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSellerMedicines = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sellerId = req.user!.id;

    const result = await MedicineService.getSellerMedicines(
      sellerId,
      req.query,
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getMedicineById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await MedicineService.getMedicineById(
      req.params.id as string,
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const updateMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await MedicineService.updateMedicine(
      req.params.id as string,
      req.body,
      req.user!.id,
    );

    res.status(200).json({ success: true, message: "Medicine updated" });
  } catch (error) {
    next(error);
  }
};

const deleteMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await MedicineService.deleteMedicine(req.params.id as string, req.user!.id);
    res.status(200).json({ success: true, message: "Medicine deleted" });
  } catch (error) {
    next(error);
  }
};

export const MedicineController = {
  createMedicine,
  getAllMedicines,
  getMedicineSuggestions,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  getSellerMedicines,
};
