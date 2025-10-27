import OrderForm from '@/components/blocks/OrderForm';
import OrderNavBar from '@/components/blocks/OrderNavbar';
import OrderTabs from '@/components/blocks/OrderTabs';
import OrderTotal from '@/components/blocks/OrderTotal';
import { useCart } from '@/context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function OrderScreen() {
  const params = useLocalSearchParams();
  const restaurantName = params.restaurantName as string || 'Ресторан';
  const { cartItems, removeFromCart } = useCart();

  // Рендерим каждое блюдо
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      {item.image && <Image source={item.image} style={styles.itemImage} />}
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription} numberOfLines={1}>{item.description}</Text>
        <View style={styles.itemBottomRow}>
          <Text style={styles.itemPrice}>₽ {item.price.toFixed(2)}</Text>
          <Text style={styles.itemWeight}>{item.weight}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {/* Верхняя панель */}
      <OrderNavBar restaurantName={restaurantName} />
      {/* Табы */}
      <OrderTabs />
      {/* Основной список и контент */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Корзина пуста</Text>
            </View>
          }
          // 👇 Добавляем форму и итог как подвал списка
          ListFooterComponent={
            <View style={styles.footer}>
              <OrderForm />
              <View style={styles.totalSection}>
                <OrderTotal />
              </View>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  footer: {
    marginTop: 16,
  },
  totalSection: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImage: {
    width: 99,
    height: 88,
    borderRadius: 10,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  itemDescription: {
    fontSize: 13,
    color: '#777',
    marginBottom: 6,
  },
  itemBottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  itemWeight: {
    fontSize: 13,
    color: '#666',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF5C5C',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  emptyContainer: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
});
