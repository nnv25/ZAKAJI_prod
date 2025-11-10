import restaurantModel from "../models/restaurantModel.js";

// ✅ Добавление ресторана
const addRestaurant = async (req, res) => {
  try {
    const { name, address, phone, delivery, weekdays, saturday, sunday } =
      req.body;

    // Проверка на наличие изображения
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Изображение обязательно" });
    }

    // Очистка телефона от символов
    const cleanedPhone = phone.replace(/\D/g, "");
    if (cleanedPhone.length !== 11) {
      return res.status(400).json({
        success: false,
        message: "Номер телефона должен содержать 11 цифр",
      });
    }

    // Создание нового ресторана
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

// ✅ Получить все рестораны (с поиском)
const getAllRestaurants = async (req, res) => {
  try {
    // 1️⃣ Берём параметр search из запроса
    const { search = "" } = req.query;

    // 2️⃣ Формируем условие поиска
    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } }, // ищем по названию
            { address: { $regex: search, $options: "i" } }, // и по адресу
          ],
        }
      : {};

    // 3️⃣ Получаем рестораны по фильтру
    const restaurants = await restaurantModel.find(query).sort({ createdAt: -1 });

    // 4️⃣ Форматируем ответ
    const formatted = restaurants.map((r) => ({
      _id: r._id.toString(),
      name: r.name,
      address: r.address,
      phone: r.phone,
      delivery: r.delivery,
      worktime: r.worktime,
      image: `http://${req.headers.host}/uploads/${r.image}`,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Ошибка при получении ресторанов:", error);
    res.status(500).json({ message: "Ошибка при загрузке ресторанов" });
  }
};


// ✅ Получить ресторан по ID (для AddFood)
const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantModel.findById(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Ресторан не найден" });
    }

    res.json({
      _id: restaurant._id,
      name: restaurant.name,
      address: restaurant.address,
      phone: restaurant.phone,
      delivery: restaurant.delivery,
      worktime: restaurant.worktime,
      image: `http://${req.headers.host}/uploads/${restaurant.image}`,
    });
  } catch (error) {
    console.error("Ошибка при получении ресторана по ID:", error);
    res.status(500).json({ message: "Ошибка при загрузке ресторана" });
  }
};

// ✅ Обновление ресторана
const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, phone, delivery, weekdays, saturday, sunday } =
      req.body;

    const restaurant = await restaurantModel.findById(id);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Ресторан не найден" });
    }

    // Обновляем поля
    restaurant.name = name || restaurant.name;
    restaurant.address = address || restaurant.address;
    restaurant.phone = phone || restaurant.phone;
    restaurant.delivery = delivery === "true" || delivery === true;
    restaurant.worktime = {
      weekdays: weekdays || restaurant.worktime.weekdays,
      saturday: saturday || restaurant.worktime.saturday,
      sunday: sunday || restaurant.worktime.sunday,
    };

    if (req.file) restaurant.image = req.file.filename;

    await restaurant.save();
    res.json({ success: true, message: "Данные ресторана успешно обновлены" });
  } catch (error) {
    console.error("Ошибка при обновлении ресторана:", error);
    res.status(500).json({ success: false, message: "Ошибка на сервере" });
  }
};

// ✅ Удалить ресторан
const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantModel.findById(id);
    if (!restaurant)
      return res
        .status(404)
        .json({ success: false, message: "Ресторан не найден" });

    await restaurant.deleteOne();
    res.json({ success: true, message: "Ресторан успешно удалён" });
  } catch (error) {
    console.error("Ошибка при удалении ресторана:", error);
    res.status(500).json({ success: false, message: "Ошибка на сервере" });
  }
};

// ✅ Забанить / Разбанить ресторан
const toggleBanRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantModel.findById(id);
    if (!restaurant)
      return res
        .status(404)
        .json({ success: false, message: "Ресторан не найден" });

    restaurant.isBanned = !restaurant.isBanned;
    await restaurant.save();

    res.json({
      success: true,
      message: restaurant.isBanned
        ? "Ресторан заблокирован"
        : "Ресторан разблокирован",
      isBanned: restaurant.isBanned,
    });
  } catch (error) {
    console.error("Ошибка при блокировке ресторана:", error);
    res.status(500).json({ success: false, message: "Ошибка на сервере" });
  }
};

export {
  addRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  toggleBanRestaurant,
};
