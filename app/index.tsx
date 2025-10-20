//Главная страница
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, } from 'react-native';
import SearchInput from '../components/ui/SearchInput';
import RestaurantCard from '../components/blocks/RestaurantCard';
import BottomNavigation from '../components/blocks/BottomNavigation'; 
import Header from '../components/blocks/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView style={styles.container}>           
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
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({                                     
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: '#FFFFFF', 
    paddingTop: 20,
    marginBottom: 10,
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
});