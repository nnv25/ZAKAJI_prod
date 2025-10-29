//Header главной страницы
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function Header() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log('Открыть боковое меню')}>
        <Ionicons name="menu-outline" size={28} color="#000" />
      </TouchableOpacity>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      <TouchableOpacity onPress={() => console.log('Открыть профиль')}>
        <Ionicons name="person-outline" size={28} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',               
    height: 30,
    flexDirection: 'row',        
    justifyContent: 'space-between', 
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  logo:{
    width:150,
    height:32,
  }
});