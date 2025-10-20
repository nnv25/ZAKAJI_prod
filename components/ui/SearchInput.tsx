import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchInput() {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color="#888" />
      <TextInput
        placeholder="Поиск..."
        placeholderTextColor="#999"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 27,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    color: '#000',
  },
});