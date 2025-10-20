import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RestaurantCard({ name, rating, reviews, hours, image }) {
  
  const router = useRouter();
  
  const handlePress = () => {
    router.push('/menu');
  };
  
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.top}>
        <Image 
        source={image}
        style={styles.image}
        resizeMode='contain'
        />
      </View>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.row}>
        <Ionicons name="star" color="#F5B800" size={14} />
        <Text style={styles.rating}>
          {rating} ({reviews})
        </Text>
      </View>
      <View style={styles.row}>
        <Ionicons name="time-outline" color="#555" size={14} />
        <Text style={styles.hours}>{hours}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 6,

  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  
  top:{
    width: '100%',
    height: 115,
    justifyContent: "center",
    alignItems: "center"
  },

  image: {
    width: 85,
    height: 85,
    borderRadius: 12,
    marginBottom: 8,
    alignSelf: 'center'
  },

  
  name: {
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 3,
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  },

  rating: {
    fontSize: 10,
    color: '#777',
    marginLeft: 4,
    marginBottom: 6,
  },

  hours: {
    fontSize: 12,
    color: '#777',
    marginLeft: 4,
    marginTop: 2,
  },
});