import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
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
      <BlurView intensity={30} tint="light" style={styles.blurContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <BlurView intensity={40} tint="light" style={styles.closeButtonBackground}>
              <Ionicons name="close" size={20} color="#000" />
            </BlurView>
          </TouchableOpacity>

          <Image
            source={require('../../assets/images/ready2.png')}
            style={styles.readyImage}
            resizeMode="contain"
          />

          {/*<Text style={styles.confirmTitle}>Ваш заказ принят!</Text>*/}
          <Text style={styles.confirmSubtitle}>
            Ожидайте.
          </Text>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  readyImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000',
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  confirmSubtitle: {
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: 700,
    color: '#000',
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});