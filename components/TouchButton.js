import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { white, green, gray } from '../utils/colors';

export default function TouchButton({
  children,
  onPress,
  btnStyle = {},
  txtStyle = {},
  disabled = false
}) {
  const disabledButton = disabled ? styles.btnDisabled : {};
  const disabledButtonText = disabled ? styles.btnTextDisabled : {};
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        style={[styles.btn, btnStyle, disabledButton]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.btnText, txtStyle, disabledButtonText]}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10
  },
  btn: {
    width: 180,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 5,
    justifyContent: `center`,
    alignItems: `center`,
    borderWidth: 3,
    borderColor: '#999999'
  },
  btnDisabled: {
    backgroundColor: gray,
    borderColor: green
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: white
  },
  btnTextDisabled: {
    color: green
  }
});
