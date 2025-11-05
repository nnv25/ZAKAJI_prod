// app/order/history.tsx
import HistoryList from '@/components/blocks/HistoryList';
import OrderNavBar from '@/components/blocks/OrderNavbar';
import OrderTabs from '@/components/blocks/OrderTabs';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderHistoryScreen() {
  const params = useLocalSearchParams();
  const restaurantName = (params.restaurantName as string) || 'История заказов';
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <OrderNavBar restaurantName={restaurantName} />
      <OrderTabs />
      <HistoryList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
});