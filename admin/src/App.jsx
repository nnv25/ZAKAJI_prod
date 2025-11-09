import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import AddRestaurant from "./pages/AddRestaurant/AddRestaurant";
import { Routes, Route } from "react-router-dom";
import AddFood from "./pages/AddFood/AddFood";
import EditRestaurant from "./pages/EditRestaurant/EditRestaurant";
import RestaurantList from "./pages/RestaurantList/RestaurantList";
import FoodList from "./pages/FoodList/FoodList";
import EditFood from "./pages/EditFood/EditFood";
import CategoryManager from "./pages/CategoryManager/CategoryManager";

const App = () => {
  return (
    <>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          {/* Главная страница */}
          <Route
            path="/"
            element={<h2>Добро пожаловать в панель администратора</h2>}
          />
          {/* Страница добавления ресторана */}
          <Route path="/addshop" element={<AddRestaurant />} />
          {/* Страница добавления ресторана */}
          <Route path="/addproduct" element={<AddFood />} />
          {/* Страница редактирования */}
          <Route path="/updateshop" element={<EditRestaurant />} />
          {/* Страница всех ресторанов */}
          <Route path="/shoplist" element={<RestaurantList />} />
          <Route path="/productlist" element={<FoodList />} />
          <Route path="/edit-food/:id" element={<EditFood />} />
          <Route path="/category" element={<CategoryManager />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
