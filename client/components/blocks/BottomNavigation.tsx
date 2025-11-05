import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNavigation() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="apps-outline" size={24} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={24} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="time-outline" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#D8EFB0',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});