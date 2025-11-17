//модалное окно регистрации
import React, { useState } from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

interface RegistrationModalProps {
  visible: boolean;
  fadeAnim: Animated.Value;
  onClose: () => void;
  onRegister: () => void;
  name: string;
  setName: (text: string) => void;
  phone: string;
  setPhone: (text: string) => void;
  agree1: boolean;
  setAgree1: (value: boolean) => void;
  agree2: boolean;
  setAgree2: (value: boolean) => void;
  isFormValid: boolean;
}

export default function RegistrationModal({
  visible,
  fadeAnim,
  onClose,
  onRegister,
  name,
  setName,
  phone,
  setPhone,
  agree1,
  setAgree1,
  agree2,
  setAgree2,
  isFormValid,
}: RegistrationModalProps) {
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      setLoading(true);

      const cleanedPhone = phone.replace(/\s|\(|\)|-/g, '');

      const response = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone: cleanedPhone }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("userId", data.user._id);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        Alert.alert('Успех', data.isLogin ? 'Вы вошли в аккаунт!' : 'Регистрация успешна!');
        onRegister();
      } else {
        Alert.alert('Ошибка', data.message || 'Не удалось зарегистрироваться');
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      Alert.alert('Ошибка', 'Не удалось подключиться к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
        <View style={styles.modalBox}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>
            Чтобы заказать блюдо,{'\n'}Вам необходимо зарегистрироваться.
          </Text>

          <TextInput
            placeholder="Ваше имя"
            placeholderTextColor="#999"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            placeholder="+7 (999) 999-99-99"
            placeholderTextColor="#999"
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
            <Text style={styles.checkboxText}>Политика конфиденциальности</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.registerButton, !isFormValid && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!isFormValid || loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.registerText}>Зарегистрироваться</Text>
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalBox: {
    backgroundColor: '#848484',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: '#000000',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
    color: '#000000',
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#000000',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CDE589',
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#CDE589',
  },
  checkboxText: {
    fontSize: 14,
    color: '#000000',
  },
  registerButton: {
    backgroundColor: '#CDE589',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  disabledButton: {
    backgroundColor: 'rgba(205, 229, 137, 0.4)',
  },
});
