//Главная страница меню 
import CategoryTabs from '@/components/blocks/CategoryTabs';
import DishList from '@/components/blocks/DishList';
import NavBar from '@/components/blocks/NavBar';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MenuScreen() {
  const params = useLocalSearchParams();
  const restaurantName = params.restaurantName as string;
  const restaurantId = params.restaurantId as string;
  const [activeCategory, setActiveCategory] = useState('Все');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <NavBar restaurantName={restaurantName} restaurantId={params.restaurantId}/>
      </View>
      <View style={styles.content}>
        <CategoryTabs
          restaurantId={restaurantId} // 👈 добавлено
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <DishList activeCategory={activeCategory} restaurantId={restaurantId} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  content: {
    flex: 1,
  },
});