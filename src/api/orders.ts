/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Cake, Customer, Design, Order } from "@/types/OrderTypes";
import apiClient from "./client";

const fetchOrders = async (): Promise<Order[]> => {
  try {
    // add 2 second delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders in service:", error);
    throw error;
  }
};

const fetchOrderById = async (id: number): Promise<Order> => {
  try {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    throw error;
  }
};

const createOrder = async (order: Omit<Order, "id">): Promise<Order> => {
  try {
    const response = await apiClient.post("/", order);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

const updateOrder = async (
  id: number,
  order: Partial<Order>
): Promise<Order> => {
  try {
    const response = await apiClient.patch(`/${id}`, order);
    return response.data;
  } catch (error) {
    console.error(`Error updating order ${id}:`, error);
    throw error;
  }
};

const deleteOrder = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/orders/${id}`);
  } catch (error) {
    console.error(`Error deleting order ${id}:`, error);
    throw error;
  }
};

const fetchCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await apiClient.get("/customers");
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

const addCustomer = async (customer: Customer): Promise<Customer> => {
  try {
    const response = await apiClient.post("/customers", customer);
    return response.data;
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
};

const fetchCakes = async (): Promise<Cake[]> => {
  try {
    const response = await apiClient.get("/cakes");
    return response.data;
  } catch (error) {
    console.error("Error fetching cakes:", error);
    throw error;
  }
};

const fetchDesigns = async (): Promise<Design[]> => {
  try {
    const response = await apiClient.get("/designs");
    return response.data;
  } catch (error) {
    console.error("Error fetching designs:", error);
    throw error;
  }
};

export default {
  fetchOrders,
  fetchOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
