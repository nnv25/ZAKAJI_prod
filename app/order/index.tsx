// app/order/index.tsx
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderTabs from '@/components/blocks/OrderTabs';
import OrderItemsList from '@/components/blocks/OrderItemsList';
import OrderForm from '@/components/blocks/OrderForm';
import OrderTotal from '@/components/blocks/OrderTotal';
import OrderNavbar from '@/components/blocks/OrderNavbar';

export default function OrderScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <OrderNavbar restaurantName="Ресторан"/>
      {/* Заголовок и табы */}
      <OrderTabs />
      {/* Список товаров в заказе */}
      <OrderItemsList />
      {/* Форма заказа и итог */}
      <View style={styles.bottomSection}>
        <OrderForm />
        <OrderTotal />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
});