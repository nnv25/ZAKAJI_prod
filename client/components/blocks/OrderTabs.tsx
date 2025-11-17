// табы в заказах
// табы в заказах
import { usePathname, useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OrderTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useLocalSearchParams();

  const restaurantId = params.restaurantId as string;
  const restaurantName = params.restaurantName as string;

  const activeTab = pathname.includes('/order/history') ? 'history' : 'order';

  const navigate = (screen: 'order' | 'history') => {
    router.push({
      pathname: `/order/${screen === 'order' ? '' : 'history'}`,
      params: { restaurantId, restaurantName },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'order' && styles.activeTab]}
          onPress={() => navigate('order')}
        >
          <Text style={[styles.tabText, activeTab === 'order' && styles.activeTabText]}>
            Заказ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => navigate('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            История
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#CDE589',
  },
  tabText: {
    fontSize: 16,
    color: '#777',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
});
