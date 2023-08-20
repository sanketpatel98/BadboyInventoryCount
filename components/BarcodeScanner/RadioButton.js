import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

const RadioButton = ({ selected, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.radioButton, selected && styles.radioButtonSelected]} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#000',
  },
});

export default RadioButton;
