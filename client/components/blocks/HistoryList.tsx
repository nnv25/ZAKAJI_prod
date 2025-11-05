// src/components/history/HistoryList.tsx
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ORDER_HISTORY } from '../data/orderHistory';
import HistoryItem from './HistoryItem';

export default function HistoryList() {
  return (
    <View style={styles.container}>
      <FlatList
        data={ORDER_HISTORY}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryItem order={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>История пуста</Text>}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
  empty: { textAlign: 'center', color: '#999', marginTop: 32 },
});
