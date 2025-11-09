// Главная страница (очищенная версия)
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/blocks/Header';
import SideMenu from '../components/blocks/SideMenu';
import SearchInput from '../components/ui/SearchInput';
import BannerCarousel from '@/components/blocks/BannerCarousel';
import RestaurantCard from '../components/blocks/RestaurantCard';

export default function RestaurantsScreen() {
  const [activeTab, setActiveTab] = useState('all');
  const [menuVisible, setMenuVisible] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch('http://192.168.0.15:4000/api/restaurant/all');
        const data = await res.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Ошибка при загрузке ресторанов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#CDE589" style={{ marginTop: 40 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <Header onMenuPress={() => setMenuVisible(true)} />
        <SearchInput />
        <BannerCarousel />

        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('all')}>
            <Text style={[styles.tab, activeTab === 'all' && styles.activeTab]}>Все</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('open')}>
            <Text style={[styles.tab, activeTab === 'open' && styles.activeTab]}>
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
            _id={item._id}
            name={item.name}
            rating={4.8}
            reviews={163}
            hours={`${item.worktime.weekdays}`}
            image={{ uri: item.image }}
          />
        )}
        keyExtractor={(item) => item._id.toString()}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
      />

      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
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
    paddingBottom: 10,
  },
  flatList: {
    marginTop: 10,
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