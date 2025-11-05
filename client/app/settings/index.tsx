// app/settings/index.tsx
import React, { useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import SettingsNavBar from '../../components/blocks/SettingsNavbar';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleSwitch = () => setNotificationsEnabled((prev) => !prev);

  const handleDeleteAccount = () => {
    Alert.alert(
      'Удалить аккаунт',
      'Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить.',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', style: 'destructive', onPress: () => console.log('Аккаунт удалён') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SettingsNavBar />

      {/* 🔔 Блок уведомлений */}
      <View style={styles.notificationsBlock}>
        <Image
          source={require('@/assets/images/push_icon.png')}
          style={styles.icon}
        />
        <Text style={styles.label}>Уведомления</Text>
        <Switch
          trackColor={{ false: '#000', true: '#C6E583' }}
          thumbColor="#fff"
          ios_backgroundColor="#000"
          onValueChange={toggleSwitch}
          value={notificationsEnabled}
          style={styles.switch}
        />
      </View>

      {/* 🔴 Кнопка удалить аккаунт */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.deleteText}>УДАЛИТЬ АККАУНТ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  notificationsBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    flex: 1,
  },
  switch: {
    transform: [{ scale: 1.1 }],
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  deleteButton: {
    backgroundColor: '#FF5C5C',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 50,
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});