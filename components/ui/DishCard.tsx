// components/ui/DishCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Button from './Button';

const { width } = Dimensions.get('window');
const SIDE_PADDING = 12; // совпадает с DishList
const GAP = 12;          // расстояние между карточками
const cardWidth = (width - SIDE_PADDING * 2 - GAP) / 2; // ✅ вычисляем реальную ширину

export default function DishCard({
  title,
  description,
  price,
  weight,
  rating,
  image,
  onOrder,
  index, // 👈 получаем индекс
}) {
  const isLeft = index % 2 === 0; // если левая карточка

  return (
    <View
      style={[
        styles.card,
        { width: cardWidth },
        isLeft ? { marginRight: GAP / 2 } : { marginLeft: GAP / 2 },
      ]}
    >
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.weight}>{weight}</Text>
      <Text style={styles.price}>₽ {price}</Text>
      <Button title="Заказать" onPress={onOrder} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  rating: {
    color: '#999',
    fontSize: 14,
  },
  description: {
    color: '#666',
    fontSize: 14,
    marginVertical: 4,
  },
  weight: {
    color: '#777',
    fontSize: 13,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 6,
  },
});