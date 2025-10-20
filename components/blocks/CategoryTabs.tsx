import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const categories = ['Все', 'Горячее', 'Салаты', 'Супы', 'Пицца', 'Напитки'];

export default function CategoryTabs() {
  const [active, setActive] = useState('Все');

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[styles.tab, active === cat && styles.activeTab]}
          onPress={() => setActive(cat)}
        >
          <Text style={[styles.tabText, active === cat && styles.activeText]}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#CDE589',
  },
  tabText: {
    fontSize: 16,
    color: '#777',
  },
  activeText: {
    color: '#000',
    fontWeight: '600',
  },
});