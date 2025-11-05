// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { CartProvider } from '../context/CartContext';

export default function RootLayout() {
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
            animation: 'slide_from_left', // 👈 возвращаемся из ордера — экран едет слева направо
          }}
        />

        {/* Страница заказа */}
        <Stack.Screen
          name="order/index"
          options={{
            animation: 'slide_from_right', // переход в заказ (вперёд)
          }}
        />

        <Stack.Screen name="order/history" />
        <Stack.Screen name="settings/index" />
      </Stack>
    </CartProvider>
  );
}