import { useCart } from '@/context/CartContext';
import React, { useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RegistrationModal from '../Modal/RegistrationModal';
import OrderModal from '../Modal/OrderModal';

export default function OrderTotal() {
  const { getTotalPrice, cartItems, clearCart } = useCart();
  const totalPrice = getTotalPrice();

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert('Добавьте товары в корзину');
      return;
    }

    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const handleCloseConfirm = () => {
    setConfirmVisible(false);
    clearCart();
  };

  const isFormValid = name.trim() !== '' && phone.length >= 18 && agree1 && agree2;

  const handleRegister = () => {
    if (!isFormValid) return;

    handleCloseModal();
    setTimeout(() => setConfirmVisible(true), 300);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalPrice}>{totalPrice.toFixed(2)} ₽</Text>

      <TouchableOpacity
        style={[
          styles.orderButton,
          cartItems.length === 0 && styles.disabledButton,
        ]}
        onPress={handlePlaceOrder}
        disabled={cartItems.length === 0}
      >
        <Text style={styles.orderButtonText}>Оформить заказ</Text>
      </TouchableOpacity>

      {/* Модальные окна */}
      <RegistrationModal
        visible={modalVisible}
        fadeAnim={fadeAnim}
        onClose={handleCloseModal}
        onRegister={handleRegister}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        agree1={agree1}
        setAgree1={setAgree1}
        agree2={agree2}
        setAgree2={setAgree2}
        isFormValid={isFormValid}
      />

      <OrderModal
        visible={confirmVisible}
        onClose={handleCloseConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    alignItems: 'center',
  },
  totalPrice: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  orderButton: {
    backgroundColor: '#CDE589',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    width: 200,
  },
  disabledButton: {
    backgroundColor: '#E5E5E5',
  },
  orderButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
});