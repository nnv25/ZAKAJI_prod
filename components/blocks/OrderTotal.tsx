// components/blocks/order/OrderTotal.tsx
import { useCart } from '@/context/CartContext';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    marginTop: 12,
  },
  totalPrice: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  orderButton: {
    backgroundColor: '#CDE589',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  orderButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
});