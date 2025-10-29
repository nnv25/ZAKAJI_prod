// форма заказа для компонета заказа
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function OrderForm() {
  const [tableNumber, setTableNumber] = useState('');
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      {/* Поле для номера стола */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Номер стола</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите номер стола"
          placeholderTextColor="#999"
          value={tableNumber}
          onChangeText={setTableNumber}
          keyboardType="number-pad"
        />
      </View>

      {/* Поле для сообщения */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Ваше сообщение</Text>
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Напишите ваши пожелания..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          multiline
          textAlignVertical="top"
        />
      </View>

      {/* Ссылка на соглашение */}
      <TouchableOpacity style={styles.agreementLink}>
        <Text style={styles.agreementText}>Пользовательское соглашение</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  messageInput: {
    height: 80,
  },
  agreementLink: {
    marginBottom: 16,
  },
  agreementText: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'underline',
  },
});