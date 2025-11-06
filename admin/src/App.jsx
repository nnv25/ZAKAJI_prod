import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import AddRestaurant from './pages/AddRestaurant/AddRestaurant';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<h2>Добро пожаловать в панель администратора</h2>} />

          {/* Страница добавления ресторана */}
          <Route path="/addshop" element={<AddRestaurant />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
