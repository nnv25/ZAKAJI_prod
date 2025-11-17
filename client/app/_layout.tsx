// app/_layout.tsx
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { CartProvider } from '../context/CartContext';
import { initOneSignal } from '../lib/oneSignal';

export default function RootLayout() {
  useEffect(() => {
    initOneSignal();
  }, []);

  return (
    <CartProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Главная страница */}
        <Stack.Screen
          name="index"
          options={{
            animation: 'slide_from_right',
          }}
        />

        {/* Страница меню */}
        <Stack.Screen
          name="menu/index"
          options={{
            animation: 'slide_from_left',
          }}
        />

        {/* Страница заказа */}
        <Stack.Screen
          name="order/index"
          options={{
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen name="order/history" />
        <Stack.Screen name="settings/index" />
      </Stack>
    </CartProvider>
  );
}