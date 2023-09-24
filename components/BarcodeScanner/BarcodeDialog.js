import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Dialog from 'react-native-dialog';
import RadioButton from './RadioButton';

const BarcodeDialog = ({ visible, barcodeData, selectedOption, onSelectOption, onConfirm, onCancel }) => {
  const [quantity, setQuantity] = useState('1');

  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title style={styles.title}>Confirm Barcode</Dialog.Title>
      <Dialog.Description style={styles.description}>
        <Text style={styles.barcodeText}>Scanned Barcode: <Text style={styles.boldText}>{barcodeData}</Text></Text>
      </Dialog.Description>

      {/* Quantity Input */}
      <View>
        <Text style={styles.quantityTitle}>Enter Quantity:</Text>
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
      </View>

      {/* Radio buttons */}
      <View style={styles.radioButtonsContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            selected={selectedOption === 'Normal'}
            onPress={() => onSelectOption('Normal')}
          />
          <Text style={styles.radioButtonLabel}>Normal</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            selected={selectedOption === 'Floor'}
            onPress={() => onSelectOption('Floor')}
          />
          <Text style={styles.radioButtonLabel}>Floor</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            selected={selectedOption === 'Clearance'}
            onPress={() => onSelectOption('Clearance')}
          />
          <Text style={styles.radioButtonLabel}>Clearance</Text>
        </View>
      </View>

      {/* Confirm and Cancel buttons */}
      <View style={styles.buttonContainer}>
        <Dialog.Button label="Cancel" onPress={onCancel} color="#666" />
        <Dialog.Button label="OK" onPress={() => onConfirm(quantity)} color="#4287f5" />
      </View>
    </Dialog.Container>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  barcodeText: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
  quantityTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  radioButtonsContainer: {
    flexDirection: 'column',
    marginTop: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioButtonLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default BarcodeDialog;
