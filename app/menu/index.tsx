import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import CategoryTabs from '@/components/blocks/CategoryTabs';
import DishList from '@/components/blocks/DishList';
import NavBar from '@/components/blocks/NavBar';
import { SafeAreaView } from 'react-native-safe-area-context'; // 👈 ДОБАВЬ ЭТОТ ИМПОРТ

export default function MenuScreen() {
  const params = useLocalSearchParams();
  const restaurantName = params.restaurantName as string;
  // Состояние для активной категории
  const [activeCategory, setActiveCategory] = useState('Все');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor='#FFFFFF' />
      <View style={styles.header}>
        <NavBar restaurantName={restaurantName}/>
      </View>
      <View style={styles.content}>
        {/* Передаем состояние в CategoryTabs */}
        <CategoryTabs 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        {/* Передаем активную категорию в DishList для фильтрации */}
        <DishList activeCategory={activeCategory} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  content:{
    flex: 1,
  }
});