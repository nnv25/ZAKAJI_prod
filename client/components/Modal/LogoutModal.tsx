import React, { useState } from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LogoutModalProps {
  visible: boolean;
  fadeAnim: Animated.Value;
  onClose: () => void;
  onLogout: () => void; 
}

export default function LogoutModal({ visible, fadeAnim, onClose, onLogout }: LogoutModalProps) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('phone');
      await AsyncStorage.removeItem('name');
      Alert.alert('Выход', 'Вы успешно вышли из аккаунта');
      onLogout();
    } catch (error) {
      console.error('Ошибка выхода:', error);
      Alert.alert('Ошибка', 'Не удалось выйти из аккаунта');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
        <View style={styles.modalBox}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={22} color="#fff" /> 
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Вы действительно хотите выйти из аккаунта?</Text>

          <TouchableOpacity
            style={[styles.logoutButton, loading && styles.disabledButton]}
            onPress={handleLogout}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.logoutText}>Выйти</Text>
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#848484',
    borderRadius: 24,
    width: '100%',
    maxWidth: 400,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#F5F5F5', 
    marginBottom: 20,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#CDE589',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000', 
  },
  disabledButton: {
    backgroundColor: 'rgba(205, 229, 137, 0.6)',
  },
});


