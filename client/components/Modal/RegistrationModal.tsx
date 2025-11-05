//модалное окно регистрации
import React from 'react';
import {
  Animated,
  Easing,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

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

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
        <BlurView intensity={30} tint="light" style={styles.blurContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <BlurView intensity={40} tint="light" style={styles.closeButtonBackground}>
                <Ionicons name="close" size={20} color="#000" />
              </BlurView>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>
              Чтобы заказать блюдо,{'\n'}Вам необходимо зарегистрироваться.
            </Text>

            <TextInput
              placeholder="Ваше имя"
              placeholderTextColor="#666"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            
            <TextInput
              placeholder="+7 (999) 999-99-99"
              placeholderTextColor="#666"
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
              onPress={onRegister}
              disabled={!isFormValid}
            >
              <Text style={styles.registerText}>зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
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
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
    color: '#000',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#000',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#CDE589',
  },
  checkboxText: {
    fontSize: 14,
    color: '#000',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
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
    color: '#000',
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});