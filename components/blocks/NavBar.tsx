// components/blocks/Header.tsx
import { useCart } from '@/context/CartContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NavBarProps {
  restaurantName?: string; // Добавляем проп для названия ресторана
  showBackButton?: boolean; // Добавляем проп для показа/скрытия кнопки назад
}

export default function NavBar({restaurantName}: NavBarProps) {
  const router = useRouter();
  const { getTotalItems } = useCart(); // 👈 Получаем количество товаров
  const totalItems = getTotalItems();

  const handleBack = () => {
    router.push('/'); // Переход на главную страницу
  };

  const handleOrder = () => {
    router.push({
      pathname: '/order',
      params: { restaurantName },
    });
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Image 
          source={require('../../assets/images/back_arrow.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>
        {restaurantName || 'Ресторан'}
      </Text>
      <View style={styles.orderContainer}>
        <TouchableOpacity onPress={handleOrder} style={styles.orderButton}>
          <Image 
            source={require('../../assets/images/order_icon.png')}
            style={styles.orderIcon}
          />
          {/* Бейдж с количеством */}
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {totalItems > 99 ? '99+' : totalItems}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Простой отступ для Android
    height: Platform.OS === 'android' ? 85 : 60, // Увеличиваем высоту для Android
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    //marginBottom: 10,
    //paddingHorizontal: 16,
    //paddingTop: 16,
  },
  orderContainer: {
    position: 'relative',
  },
  orderButton: {
    padding: 8,
  },
  orderIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 