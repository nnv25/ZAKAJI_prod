// Импортируем React, чтобы писать JSX
import React from 'react';
// Импортируем базовые компоненты React Native
// View — контейнер, TouchableOpacity — кликабельная зона (для иконок)
import { View, TouchableOpacity, StyleSheet } from 'react-native';
// Импортируем набор иконок Ionicons из Expo
// Мы будем использовать "menu-outline" и "person-outline"
import { Ionicons } from '@expo/vector-icons';

// Создаём функциональный компонент Header
// Он не принимает пока пропсы — просто отрисовывает верхнюю панель
export default function Header() {
  return (
    // Контейнер шапки
    <View style={styles.container}>
      {/* Левая кнопка — иконка меню */}
      <TouchableOpacity onPress={() => console.log('Открыть боковое меню')}>
        <Ionicons name="menu-outline" size={28} color="#000" />
      </TouchableOpacity>
      {/* Правая кнопка — иконка профиля */}
      <TouchableOpacity onPress={() => console.log('Открыть профиль')}>
        <Ionicons name="person-outline" size={28} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

// Стили для хедера
const styles = StyleSheet.create({
  // Контейнер хедера
  container: {
    width: '100%',               // Растянуть на всю ширину экрана
    height: 30,
    flexDirection: 'row',        // Расположить элементы в одну линию
    justifyContent: 'space-between', // Разнести иконки по краям
    alignItems: 'center',        // Центрировать по вертикали
    paddingHorizontal: 20,       // Отступы по бокам
    paddingTop: 3,              // Отступ сверху (для статус-бара)
    paddingBottom: 3,           // Немного воздуха снизу
    backgroundColor: '#FFFFFF',  // Белый фон, как на макете
    marginBottom: 20,
  },
});