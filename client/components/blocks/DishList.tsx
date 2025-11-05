//само меню с карточками блюда
import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import DishCard from '../ui/DishCard';

const data = [
  {
    id: 1,
    title: 'Долма с бараниной',
    description: 'Кавказская закуска из виноградных листьев...Кавказская закуска из виноградных листьев...Кавказская закуска из виноградных листьев...',
    price: 650,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/dolma.png'),
    category: "Горячее" 
  },
  {
    id: 2,
    title: 'Микс салатов с семгой',
    description: 'С помидорами черри, огурцами, заправленный... ',
    price: 750,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/semga.png'),
    category: "Салаты" 
  },
  {
    id: 3,
    title: 'Семга Шеф посола',
    description: 'Слабосоленая семга по фирменному рецепту',
    price: 1150,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/semga1.png'),
    category: "Салаты" 
  },
  {
    id: 4,
    title: 'Жаренные помидоры с сыром',
    description: 'Кавказская закуска из виноградных листьев...',
    price: 470,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/tomatos.png'),
    category: "Горячее"
  },
  {
    id: 5,
    title: 'Харчо',
    description: 'Суп из говядины с рисом. Густой пряный, с обили... ',
    price: 460,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/harcho.png'),
    category: "Супы"
  },
  {
    id: 6,
    title: 'Хачапури по-Аджарски',
    description: 'Лодочка из сдобного тестас начинкой из имеретин...',
    price: 550,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/harcho.png'), 
    category: "Горячее"
  },
  {
    id: 7,
    title: 'Хинкали с бараниной',
    description: 'Гордость грузинской кухни. Конверты из тон..',
    price: 100,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/hinkali.png'),
    category: "Горячее"
  },
  {
    id: 8,
    title: 'Наршараб',
    description: 'Кавказская закуска из виноградных листьев...',
    price: 120,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/sadj.png'),
    category: "Горячее"
  },
  {
    id: 9,
    title: 'Картофель фри',
    description: 'Кавказская закуска из виноградных листьев...',
    price: 120,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/Free.png'),
    category: "Горячее"
  },
  {
    id: 10,
    title: 'Стейк из красной рыбы',
    description: 'Стейк из семки на гриле. Подается с соусом тар-..',
    price: 1200,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/Steik.png'),
    category: "Горячее"
  },
  {
    id: 11,
    title: 'Садж с Бараниной',
    description: 'Горячее блюдо для дружной компании или с...',
    price: 2800,
    weight: '150/40 гр.',
    rating: 4.5,
    image: require('../../assets/images/sadj.png'),
    category: "Горячее"
  },
  {
    id: 12,
    title: 'Кебаб из баранины',
    description: 'Традиционный кебаб на углях.',
    price: 990,
    weight: '320 гр.',
    rating: 4.5,
    image: require('../../assets/images/kebab.png'),
    category: "Горячее"
  },
  {
    id: 13,
    title: 'Риони',
    description: 'Бисквитный торт со сливочным кремом с доб.',
    price: 395,
    weight: '320 гр.',
    rating: 4.5,
    image: require('../../assets/images/tort.png'),
    category: "Десерт"
  },
  {
    id: 14,
    title: 'Суп "АБВГД"',
    description: 'Детский суп на основе натурального куриного...',
    price: 170,
    weight: '170 гр.',
    rating: 4.5,
    image: require('../../assets/images/semga.png'), 
    category: "Супы"
  },
  {
    id: 15,
    title: 'Вода в ассортименте',
    description: 'Детский суп на основе натурального куриного...',
    price: 170,
    weight: '170 гр.',
    rating: 4.5,
    image: require('../../assets/images/water.png'),
    category: "Напитки"
  },
];

// Добавляем пропсы для DishList
interface DishListProps {
  activeCategory: string;
}

export default function DishList({ activeCategory }: DishListProps) {
  
  // Фильтруем данные по активной категории
  const filteredData = activeCategory === 'Все' 
    ? data 
    : data.filter(item => item.category === activeCategory);

  return (
    <FlatList
      data={filteredData}
      numColumns={2}
      renderItem={({ item, index }) => (
        <DishCard
          id={item.id}
          title={item.title}
          description={item.description}
          price={item.price}
          weight={item.weight}
          rating={item.rating}
          image={item.image}
          onOrder={() => console.log('Ordered:', item.title)}
          index={index}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={[
        styles.listContent,
        filteredData.length === 0 && styles.emptyList 
      ]}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>В этой категории пока нет блюд</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 100,
  },
  emptyList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});