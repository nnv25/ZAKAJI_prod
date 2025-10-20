import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CategoryTabs from '@/components/blocks/CategoryTabs';
import DishList from '@/components/blocks/DishList';

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OSTERIO MARIO</Text>
      <CategoryTabs />
      <DishList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
});