import { NextFunction, Request, Response } from "express";
import { OrderService } from "./order.service";
import { OrderStatus } from "../../../generated/prisma/enums";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { shippingAddress, orderItems } = req.body;

    const order = await OrderService.createOrder(
      req.user!.id,
      shippingAddress,
      orderItems,
    );

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, role } = req.user!;

    const orders = await OrderService.getOrders(id, role);

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const order = await OrderService.getOrderById(
      req.params.id as string,
      req.user!.id,
    );

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getSellerOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sellerId = req.user!.id;

    const orders = await OrderService.getSellerOrders(sellerId);

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const role = req.user!.role;
    const { id } = req.params;
    const { status } = req.body;

    const result = await OrderService.updateOrderStatus(
      id as string,
      userId,
      role,
      status,
    );

    res.status(200).json({
      success: true,
      message: "Order status updated",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const OrderController = {
  createOrder,
  getOrders,
  getOrderById,
  getSellerOrders,
  updateOrderStatus,
};
