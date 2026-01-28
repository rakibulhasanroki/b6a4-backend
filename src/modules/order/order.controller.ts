import { Request, Response } from "express";
import { OrderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to place order",
    });
  }
};

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderService.getMyOrders(req.user!.id);

    res.json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to get orders",
    });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await OrderService.getOrderById(
      req.params.id as string,
      req.user!.id,
    );

    res.json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Order not found",
    });
  }
};

export const OrderController = {
  createOrder,
  getMyOrders,
  getOrderById,
};
