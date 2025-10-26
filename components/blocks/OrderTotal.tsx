// components/blocks/order/OrderTotal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '@/context/CartContext';

export default function OrderTotal() {
  const { getTotalPrice, cartItems } = useCart();
  const totalPrice = getTotalPrice();

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert('Добавьте товары в корзину');
      return;
    }
    // Логика оформления заказа
    console.log('Оформление заказа...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalPrice}>{totalPrice.toFixed(2)} ₽</Text>
      
      <TouchableOpacity 
        style={[
          styles.orderButton,
          cartItems.length === 0 && styles.disabledButton
        ]}
        onPress={handlePlaceOrder}
        disabled={cartItems.length === 0}
      >
        <Text style={styles.orderButtonText}>
          Оформить заказ
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  orderButton: {
    backgroundColor: '#CDE589',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  disabledButton: {
    backgroundColor: '#E5E5E5',
  },
  orderButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});