import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Restaurant from "../models/restaurantModel.js";

// Создание нового заказа
export const createOrder = async (req, res) => {
  try {
    const { userId, restaurantId, items, tableNumber, comment, totalPrice } =
      req.body;

    if (!userId || !restaurantId || !items?.length) {
      return res
        .status(400)
        .json({ message: "Не хватает данных для оформления заказа" });
    }

    // Проверим пользователя и ресторан
    const user = await User.findById(userId);
    const restaurant = await Restaurant.findById(restaurantId);

    if (!user || !restaurant) {
      return res
        .status(404)
        .json({ message: "Пользователь или ресторан не найден" });
    }

    const order = await Order.create({
      user: userId,
      restaurant: restaurantId,
      items,
      tableNumber,
      comment,
      totalPrice,
    });

    res.status(201).json({ message: "Заказ успешно оформлен", order });
  } catch (error) {
    console.error("Ошибка создания заказа:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// Получение истории заказов конкретного пользователя
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId })
      .populate("restaurant", "name logo")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Ошибка получения истории:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// Получение всех заказов ресторана
export const getRestaurantOrders = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const orders = await Order.find({ restaurant: restaurantId })
      .populate("user", "name phone")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Ошибка получения заказов ресторана:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// Удаление заказа
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const deleted = await Order.findByIdAndDelete(orderId);
    if (!deleted) return res.status(404).json({ message: "Заказ не найден" });

    res.status(200).json({ message: "Заказ удалён" });
  } catch (error) {
    console.error("Ошибка удаления заказа:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
