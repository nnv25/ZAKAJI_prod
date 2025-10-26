// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { CartProvider } from '../context/CartContext';

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="menu/index" options={{ headerShown: false }} />
        <Stack.Screen name="order/index" options={{ headerShown: false }} />
      </Stack>
    </CartProvider>
  );
}