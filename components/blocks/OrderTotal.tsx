// components/blocks/order/OrderTotal.tsx
/*import { useCart } from '@/context/CartContext';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OrderTotal() {
  const { getTotalPrice, cartItems } = useCart();
  const totalPrice = getTotalPrice();

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert('Добавьте товары в корзину');
      return;
    }
    // Логика оформления заказа
    console.log('Оформление заказа...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalPrice}>{totalPrice.toFixed(2)} ₽</Text>
      
      <TouchableOpacity 
        style={[
          styles.orderButton,
          cartItems.length === 0 && styles.disabledButton
        ]}
        onPress={handlePlaceOrder}
        disabled={cartItems.length === 0}
      >
        <Text style={styles.orderButtonText}>
          Оформить заказ
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
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
  orderButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
});*/
import { useCart } from '@/context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function OrderTotal() {
  const { getTotalPrice, cartItems, clearCart } = useCart();
  const totalPrice = getTotalPrice();

  const [modalVisible, setModalVisible] = useState(false); // модалка регистрации
  const [confirmVisible, setConfirmVisible] = useState(false); // модалка подтверждения
  const [fadeAnim] = useState(new Animated.Value(0));

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  // 🧠 Маска телефона с автоподстановкой +7
  const handlePhoneChange = (text: string) => {
    let cleaned = text.replace(/\D/g, '');
    if (!cleaned.startsWith('7')) cleaned = '7' + cleaned;

    const formatted = `+7 (${cleaned.slice(1, 4)}${cleaned.length > 4 ? ')' : ''}${
      cleaned.length > 4 ? ' ' + cleaned.slice(4, 7) : ''
    }${cleaned.length > 7 ? '-' + cleaned.slice(7, 9) : ''}${
      cleaned.length > 9 ? '-' + cleaned.slice(9, 11) : ''
    }`;

    setPhone(formatted.trim());
  };

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
    clearCart(); // очистка корзины после оформления
  };

  const isFormValid = name.trim() !== '' && phone.length >= 18 && agree1 && agree2;

  const handleRegister = () => {
    if (!isFormValid) return;

    // Закрываем окно регистрации
    handleCloseModal();

    // Через 300мс показываем окно подтверждения
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

      {/* --- МОДАЛКА РЕГИСТРАЦИИ --- */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
          <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />

          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Ionicons name="close" size={22} color="#333" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>
              Чтобы заказать блюдо,{'\n'}Вам необходимо зарегистрироваться.
            </Text>

            <TextInput
              placeholder="Ваше имя"
              placeholderTextColor="#bbb"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="+7 (999) 999-99-99"
              placeholderTextColor="#bbb"
              style={styles.input}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={handlePhoneChange}
              maxLength={18}
            />

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAgree1(!agree1)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, agree1 && styles.checkedBox]}>
                {agree1 && <Ionicons name="checkmark" size={14} color="#fff" />}
              </View>
              <Text style={styles.checkboxText}>Пользовательское соглашение</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAgree2(!agree2)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, agree2 && styles.checkedBox]}>
                {agree2 && <Ionicons name="checkmark" size={14} color="#fff" />}
              </View>
              <Text style={styles.checkboxText}>Пользовательское соглашение</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.registerButton,
                !isFormValid && styles.disabledButton,
              ]}
              onPress={handleRegister}
              disabled={!isFormValid}
            >
              <Text style={styles.registerText}>зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>

      {/* --- МОДАЛКА "ЗАКАЗ ПРИНЯТ" --- */}
      <Modal transparent visible={confirmVisible} animationType="fade">
        <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />

        <View style={styles.confirmContainer}>
          <View style={styles.confirmBox}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseConfirm}>
              <Ionicons name="close" size={22} color="#333" />
            </TouchableOpacity>

            <Image
              source={require('../../assets/images/ready.png')}
              style={styles.readyImage}
              resizeMode="contain"
            />

            <Text style={styles.confirmTitle}>Ваш заказ принят!</Text>
            <Text style={styles.confirmSubtitle}>
              Ожидайте, скоро вынесут Ваш заказ.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ------------------ СТИЛИ ------------------
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 6,
    zIndex: 2,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 10,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 15,
    color: '#333',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CDE589',
    backgroundColor: '#fff',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#CDE589',
  },
  checkboxText: {
    fontSize: 13,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#CDE589',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 12,
    width: '100%',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  // --- Окно подтверждения ---
  confirmContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  confirmBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '85%',
    maxWidth: 320,
  },
  readyImage: {
    width: 140,
    height: 140,
    marginBottom: 10,
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  confirmSubtitle: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
  },
});