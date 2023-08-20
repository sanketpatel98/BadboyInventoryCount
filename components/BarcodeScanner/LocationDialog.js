import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import Dialog from 'react-native-dialog';

const LocationDialog = ({ visible, location, onLocationChange, onCancel, onUpdate }) => {
  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>Edit Location</Dialog.Title>
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={onLocationChange}
      />
      <Dialog.Button label="Cancel" onPress={onCancel} />
      <Dialog.Button label="Update" onPress={onUpdate} />
    </Dialog.Container>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
});

export default LocationDialog;
