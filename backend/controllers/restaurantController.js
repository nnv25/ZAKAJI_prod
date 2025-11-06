import restaurantModel from "../models/restaurantModel.js";

// Добавление ресторана
const addRestaurant = async (req, res) => {
  try {
    const { name, address, phone, delivery, weekdays, saturday, sunday } =
      req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Изображение обязательно" });
    }

    const cleanedPhone = phone.replace(/\D/g, "");
    if (cleanedPhone.length !== 11) {
      return res.status(400).json({
        success: false,
        message: "Номер телефона должен содержать 11 цифр",
      });
    }

    const restaurant = new restaurantModel({
      name,
      address,
      phone,
      delivery: delivery === "true",
      worktime: { weekdays, saturday, sunday },
      image: req.file.filename,
    });

    await restaurant.save();
    res.json({ success: true, message: "Ресторан успешно добавлен" });
  } catch (error) {
    console.error("Ошибка при добавлении ресторана:", error);
    res.status(500).json({ success: false, message: "Ошибка на сервере" });
  }
};

// ✅ Получить все рестораны
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find().sort({ createdAt: -1 });

    const formatted = restaurants.map((r) => ({
      id: r._id,
      name: r.name,
      address: r.address,
      phone: r.phone,
      delivery: r.delivery,
      worktime: r.worktime,
      image: `http://${req.headers.host}/uploads/${r.image}`, // 👈 Автоматический URL
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Ошибка при получении ресторанов:", error);
    res.status(500).json({ message: "Ошибка при загрузке ресторанов" });
  }
};

export { addRestaurant, getAllRestaurants };
