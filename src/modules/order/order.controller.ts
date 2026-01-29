import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { OrderStatus } from "../../../generated/prisma/enums";

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

const getSellerOrders = async (req: Request, res: Response) => {
  try {
    const sellerId = req.user!.id;

    const orders = await OrderService.getSellerOrders(sellerId);

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const OrderController = {
  createOrder,
  getMyOrders,
  getOrderById,
  getSellerOrders,
  updateOrderStatus,
};
