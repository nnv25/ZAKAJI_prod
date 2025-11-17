//Модальное окно полного блюда
// Модальное окно полного блюда
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Button from '../ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

interface ModalCardProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  price: number;
  weight: string;
  rating: number;
  image: any;
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onAddToCart: () => void;
}

export default function ModalCard({
  isVisible,
  onClose,
  title,
  description,
  price,
  weight,
  rating,
  image,
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onAddToCart,
}: ModalCardProps) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down', 'up', 'left', 'right']}
      backdropOpacity={0.2}
      backdropColor="#000"
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={400}
      animationOutTiming={400}
      style={styles.modal}
    >
      <View style={[styles.blurContainer, { backgroundColor: '#848484' }]}>
        <View style={styles.modalContent}>
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.modalImage} />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={22} color="#FFFFFF" /> 
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>{title}</Text>

            <View style={styles.ratingRow}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#F5B800" />
                <Text style={styles.modalRating}>{rating.toFixed(1)}</Text>
              </View>
              <Text style={styles.modalWeight}>{weight}</Text>
            </View>

            <Text style={styles.modalDescription}>{description}</Text>

            <View style={styles.quantitySection}>
              <Text style={styles.quantityLabel}>Количество:</Text>
              <View style={styles.quantitySelector}>
                <TouchableOpacity
                  style={[styles.quantityButton, quantity === 0 && styles.disabledButton]}
                  onPress={onDecreaseQuantity}
                  disabled={quantity === 0}
                >
                  <Ionicons name="remove" size={20} color="#000" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={onIncreaseQuantity}>
                  <Ionicons name="add" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalFooter}>
              <View style={styles.priceContainer}>
                <Text style={styles.totalPrice}>Сумма:</Text>
                <Text style={styles.modalPrice}>₽ {price * quantity}</Text>
              </View>
              <View style={styles.modalButton}>
                <TouchableOpacity
                  style={[styles.addButton, quantity === 0 && styles.disabledButton]}
                  onPress={onAddToCart}
                  disabled={quantity === 0}
                >
                  <Text style={styles.addButtonText}>
                    {quantity === 0 ? 'Заказать' : `Заказать`}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#000000',
    borderRadius: 20,
    padding: 6,
  },
  modalBody: {
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#FFFFFF',
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
    color: '#FFFFFF',
    marginLeft: 6,
    fontWeight: '500',
  },
  modalWeight: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFF',
    marginBottom: 24,
    textAlign: 'left',
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
    color: '#FFFFFF',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CDE589',
    borderRadius: 12,
    padding: 4,
  },
  quantityButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDE589',
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: 'rgba(205, 229, 137, 0.4)',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
    color: '#000000',
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
    color: '#FFFFFF',
    marginBottom: 4,
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalButton: {
    flex: 1,
    marginLeft: 16,
  },
  addButton: {
    backgroundColor: '#CDE589',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

