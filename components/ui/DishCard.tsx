// components/ui/DishCard.tsx (альтернативная версия)
{/*import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from './Button';
import { useCart } from '../../context/CartContext';

export default function DishCard({
  id,
  title,
  description,
  price,
  weight,
  rating,
  image,
  onOrder,
  index,
}) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      price,
    });
    
    if (onOrder) {
      onOrder();
    }
  };

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
      
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
      
      <Text style={styles.weight}>{weight}</Text>
      <Text style={styles.price}>₽ {price}</Text>
      <Button title="Заказать" onPress={handleAddToCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  rating: {
    color: '#999',
    fontSize: 14,
    marginTop: 2,
  },
  description: {
    color: '#666',
    fontSize: 13, // 👈 ЧУТЬ МЕНЬШЕ ШРИФТ
    marginVertical: 4,
    lineHeight: 16,
    height: 32, // 👈 ФИКСИРОВАННАЯ ВЫСОТА ДЛЯ 2 СТРОК
  },
  weight: {
    color: '#777',
    fontSize: 12,
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 6,
  },
});*/}
// components/ui/DishCard.tsx
// components/ui/DishCard.tsx
// components/ui/DishCard.tsx
// components/ui/DishCard.tsx
// components/ui/DishCard.tsx
// components/ui/DishCard.tsx
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Button from './Button';
import { useCart } from '../../context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function DishCard({
  id,
  title,
  description,
  price,
  weight,
  rating,
  image,
  onOrder,
  index,
}) {
  const { addToCart } = useCart();
  const [isModalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(0); // Начинаем с 0

  const handleAddToCart = () => {
    // Проверяем, что количество больше 0
    if (quantity > 0) {
      addToCart({
        id,
        title,
        price,
        image,
        weight,
        quantity,
      });
      
      if (onOrder) {
        onOrder();
      }
      setQuantity(0); // Сбрасываем на 0 после добавления
      setModalVisible(false);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 0 ? prev - 1 : 0)); // Не опускаем ниже 0
  };

  const handleCardPress = () => {
    setModalVisible(true);
    setQuantity(0); // Сбрасываем на 0 при открытии
  };

  return (
    <>
      {/* Карточка блюда */}
      <TouchableOpacity style={styles.card} onPress={handleCardPress}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
        
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        
        <Text style={styles.weight}>{weight}</Text>
        <Text style={styles.price}>₽ {price}</Text>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Заказать" 
            onPress={(e) => {
              e.stopPropagation();
              // При нажатии на кнопку "Заказать" в карточке добавляем 1 штуку
              addToCart({
                id,
                title,
                price,
                image,
                weight,
                quantity: 1,
              });
              if (onOrder) {
                onOrder();
              }
            }} 
          />
        </View>
      </TouchableOpacity>

      {/* Модальное окно с УЛЬТРА прозрачным эффектом стекла */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={['down', 'up', 'left', 'right']}
        backdropOpacity={0.2}
        backdropColor="#000"
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={400}
        animationOutTiming={400}
        style={styles.modal}
      >
        <BlurView intensity={30} tint="light" style={styles.blurContainer}>
          <View style={styles.modalContent}>
            {/* Верхняя часть с изображением */}
            <View style={styles.imageContainer}>
              <Image source={image} style={styles.modalImage} />
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setModalVisible(false)}
              >
                <BlurView intensity={40} tint="light" style={styles.closeButtonBackground}>
                  <Ionicons name="close" size={20} color="#000" />
                </BlurView>
              </TouchableOpacity>
            </View>

            {/* Контент модального окна с МАКСИМАЛЬНОЙ прозрачностью */}
            <BlurView intensity={15} tint="light" style={styles.modalBody}>
              <Text style={styles.modalTitle}>{title}</Text>
              
              <View style={styles.ratingRow}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#F5B800" />
                  <Text style={styles.modalRating}>{rating.toFixed(1)}</Text>
                </View>
                <Text style={styles.modalWeight}>{weight}</Text>
              </View>
              
              {/* Полное описание */}
              <Text style={styles.modalDescription}>
                {description}
              </Text>
              
              {/* Счетчик количества */}
              <View style={styles.quantitySection}>
                <Text style={styles.quantityLabel}>Количество:</Text>
                <View style={styles.quantitySelector}>
                  <TouchableOpacity 
                    style={[styles.quantityButton, quantity === 0 && styles.disabledButton]}
                    onPress={decreaseQuantity}
                    disabled={quantity === 0}
                  >
                    <Ionicons name="remove" size={20} color={quantity === 0 ? '#999' : '#000'} />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{quantity}</Text>
                  <TouchableOpacity 
                    style={styles.quantityButton} 
                    onPress={increaseQuantity}
                  >
                    <Ionicons name="add" size={20} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Нижняя часть с ценой и кнопкой */}
              <View style={styles.modalFooter}>
                <View style={styles.priceContainer}>
                  <Text style={styles.totalPrice}>Сумма:</Text>
                  <Text style={styles.modalPrice}>₽ {price * quantity}</Text>
                </View>
                <View style={styles.modalButton}>
                  <Button 
                    title={quantity === 0 ? "Выберите количество" : `Добавить ${quantity} шт`}
                    onPress={handleAddToCart}
                    disabled={quantity === 0}
                  />
                </View>
              </View>
            </BlurView>
          </View>
        </BlurView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  rating: {
    color: '#999',
    fontSize: 14,
    marginTop: 2,
  },
  description: {
    color: '#666',
    fontSize: 13,
    marginVertical: 4,
    lineHeight: 16,
    height: 32,
  },
  weight: {
    color: '#777',
    fontSize: 12,
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 6,
  },
  buttonContainer: {
    marginTop: 'auto',
  },

  // Стили для модального окна с УЛЬТРА прозрачным эффектом стекла
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  blurContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalContent: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  modalImage: {
    width: '100%',
    height: 220,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  closeButtonBackground: {
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  modalBody: {
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#000',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalRating: {
    fontSize: 14,
    color: '#000',
    marginLeft: 6,
    fontWeight: '500',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  modalWeight: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: '#000',
    marginBottom: 24,
    textAlign: 'left',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  quantityButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
    color: '#000',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  totalPrice: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  modalButton: {
    flex: 1,
    marginLeft: 16,
  },
});