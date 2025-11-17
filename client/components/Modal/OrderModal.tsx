import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface OrderModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function OrderModal({ visible, onClose }: OrderModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <View style={styles.closeButtonBackground}>
              <Ionicons name="close" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <Image
            source={require('../../assets/images/ready2.png')}
            style={styles.readyImage}
            resizeMode="contain"
          />

          <Text style={styles.confirmSubtitle}>Ожидайте.</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#848484', // серый фон как у остальных модалок
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  closeButtonBackground: {
    backgroundColor: '#000000', // фон крестика черный
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  readyImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  confirmSubtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
});
