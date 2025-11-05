import { useCart } from '@/context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OrderItemsList() {
  const { cartItems, removeFromCart } = useCart();

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      {/* Фото блюда */}
      {item.image && (
        <Image
          source={item.image}
          style={styles.itemImage}
        />
      )}

      {/* Информация о блюде */}
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.itemDescription} numberOfLines={1}>
          {item.description}
        </Text>

        <View style={styles.itemBottomRow}>
          <Text style={styles.itemPrice}>₽ {item.price.toFixed(2)}</Text>
          <Text style={styles.itemWeight}>{item.weight}</Text>
        </View>
      </View>

      {/* Кнопка удаления */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
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
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 16,
    paddingTop: 12,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 16,
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
    justifyContent: 'center',
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
