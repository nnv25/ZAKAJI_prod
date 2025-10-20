import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import DishCard from '../ui/DishCard';

const data = [
  {
    id: 1,
    title: 'Долма с бараниной',
    description: 'Кавказская закуска из виноградных листьев...',
    price: 650,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/dolma.png'),
  },
  {
    id: 2,
    title: 'Долма с бараниной',
    description: 'Кавказская закуска из виноградных листьев...',
    price: 650,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/dolma.png'),
  },
  {
    id: 3,
    title: 'Долма с бараниной',
    description: 'Кавказская закуска из виноградных листьев...',
    price: 650,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/dolma.png'),
  },
  {
    id: 4,
    title: 'Долма с бараниной',
    description: 'Кавказская закуска из виноградных листьев...',
    price: 650,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/dolma.png'),
  },
  {
    id: 5,
    title: 'Долма с бараниной',
    description: 'Кавказская закуска из виноградных листьев...',
    price: 650,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/dolma.png'),
  },
  {
    id: 6,
    title: 'Долма с бараниной',
    description: 'Кавказская закуска из виноградных листьев...',
    price: 650,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/dolma.png'),
  },
  {
    id: 7,
    title: 'Долма с бараниной',
    description: 'Кавказская закуска из виноградных листьев...',
    price: 650,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/dolma.png'),
  },
  {
    id: 8,
    title: 'Долма с бараниной',
    description: 'Кавказская закуска из виноградных листьев...',
    price: 650,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/dolma.png'),
  },
];

export default function DishList() {
  return (
    <FlatList
      data={data}
      numColumns={2}
      renderItem={({ item }) => (
        <DishCard
          title={item.title}
          description={item.description}
          price={item.price}
          weight={item.weight}
          rating={item.rating}
          image={item.image}
          onOrder={() => console.log('Ordered:', item.title)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 0,
    paddingTop:12,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
});