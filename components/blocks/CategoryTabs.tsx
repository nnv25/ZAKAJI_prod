import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const categories = ['Все', 'Горячее', 'Салаты', 'Супы', 'Пицца', 'Напитки', 'Десерт'];

// Добавляем пропсы для управления состоянием
interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container} contentContainerStyle={styles.contentContainer} >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[styles.tab, activeCategory === cat && styles.activeTab]}
          onPress={() => onCategoryChange(cat)} // Используем переданную функцию
        >
          <Text style={[styles.tabText, activeCategory === cat && styles.activeText]}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 16,
    height: 40, // 👈 ФИКСИРОВАННАЯ ВЫСОТА
    minHeight: 40, // 👈 МИНИМАЛЬНАЯ ВЫСОТА
    maxHeight: 40, // 👈 МАКСИМАЛЬНАЯ ВЫСОТА
  },
  contentContainer: {
    flexGrow: 0, // 👈 ПРЕДОТВРАЩАЕТ РАСШИРЕНИЕ
    alignItems: 'flex-start', // 👈 ВЫРАВНИВАНИЕ ПО ЛЕВОМУ КРАЮ
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#CDE589',
  },
  tabText: {
    fontSize: 16,
    color: '#777',
  },
  activeText: {
    color: '#000',
    fontWeight: '600',
  },
});