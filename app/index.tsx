// Главная страница (очищенная версия)
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../components/ui/SearchInput';
import RestaurantCard from '../components/blocks/RestaurantCard'; 
import Header from '../components/blocks/Header';
import BannerCarousel from '@/components/blocks/BannerCarousel';

const restaurants = [                                                   
  { id: 1, name: 'Osterio Mario', rating: 4.8, reviews: 163, hours: '10:00 - 23:00', image: require('../assets/images/Osterio.png') },
  { id: 2, name: 'Хачапури', rating: 4.8, reviews: 163, hours: '10:00 - 23:00', image: require('../assets/images/Hacapuri.png') },
  { id: 3, name: 'Барашек', rating: 4.8, reviews: 163, hours: '10:00 - 23:00', image: require('../assets/images/Barashek.png') },
  { id: 4, name: 'Китай Город', rating: 4.8, reviews: 163, hours: '10:00 - 23:00', image: require('../assets/images/Kitai.png') },
  { id: 5, name: 'Hookah Place', rating: 4.8, reviews: 163, hours: '10:00 - 23:00', image: require('../assets/images/Hookah.png') },
  { id: 6, name: 'Мама Гата', rating: 4.8, reviews: 163, hours: '10:00 - 23:00', image: require('../assets/images/MamaGata.png') },
]; 

export default function RestaurantsScreen() {      
  const [activeTab, setActiveTab] = useState<'all' | 'open'>('all');
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor='#FFFFFF'/>
      
      {/* Header с безопасными отступами */}
      <View style={styles.header}>
        <Header />
        <SearchInput />
        <BannerCarousel/>
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('all')}>
            <Text style={[
                styles.tab,
                activeTab === 'all' && styles.activeTab,
              ]}>
                Все
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('open')}>
            <Text style={[
                styles.tab,
                activeTab === 'open' && styles.activeTab,
              ]}>
                Работают сейчас
            </Text>        
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Контент с ресторанами */}
      <FlatList
        data={restaurants}      
        numColumns={3}
        renderItem={({ item }) => (        
          <RestaurantCard
            name={item.name} 
            rating={item.rating}   
            reviews={item.reviews}          
            hours={item.hours}           
            image={item.image}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({                                     
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    backgroundColor: '#FFFFFF', 
    paddingHorizontal: 16,
    paddingBottom: 10, // 👈 ИЗМЕНИЛ НА paddingBottom
  },
  flatList: {
    marginTop: 10, // 👈 Добавляем отступ сверху
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tab: {
    fontSize: 12,
    color: '#777',
    marginRight: 16,
    paddingBottom: 4,
    paddingLeft: 10,
  },
  activeTab: {
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#CDE589',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 100,
  },
});