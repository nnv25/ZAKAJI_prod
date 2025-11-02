import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
}

export default function SideMenu({ visible, onClose }: SideMenuProps) {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(-320)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -320,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const handleNavigate = (path: string) => {
    onClose();
    router.push(path);
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
        {/* Логотип фоном */}
        <Image
          source={require('../../assets/images/leftlogo.png')}
          style={styles.logoBackground}
          resizeMode="contain"
        />

        {/* Кнопка закрытия */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={26} color="#000" />
        </TouchableOpacity>

        {/* Навигация */}
        <View style={styles.links}>
          <TouchableOpacity onPress={() => handleNavigate('/')} style={styles.link}>
            <Text style={styles.linkText}>Главная</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate('/order')} style={styles.link}>
            <Text style={styles.linkText}>Заказ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate('/settings')} style={styles.link}>
            <Text style={styles.linkText}>Настройки</Text>
          </TouchableOpacity>
        </View>

        {/* Размытая правая часть */}
        <BlurView intensity={20} tint="light" style={styles.blurRight} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
    zIndex: 999,
  },
  menuContainer: {
    width: '75%',
    height: '100%',
    backgroundColor: '#C6E583',
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  logoBackground: {
    position: 'absolute',
    left: -10,
    bottom: 0,
    width: 260,
    height: '100%',
    opacity: 0.25,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  links: {
    marginTop: 100,
    gap: 20,
  },
  link: {
    marginBottom: 10,
  },
  linkText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  lastLink: {
    marginTop: 60,
  },
  blurRight: {
    position: 'absolute',
    right: -20,
    width: 60,
    height: '100%',
  },
});
