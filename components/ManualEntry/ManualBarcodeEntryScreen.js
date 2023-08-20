import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addScannedItem } from '../../redux/actions';

const ManualBarcodeEntryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [barcodeType, setBarcodeType] = useState('Normal');
  const [location, setLocation] = useState('Floor');

  const handleRadioPress = (type) => {
    setBarcodeType(type);
    var temp = barcode.replace(/-(F|C)$/, '');
    if (type === 'Floor') {
      setBarcode(`${temp}-F`);
    } else if (type === 'Clearance') {
      setBarcode(`${temp}-C`);
    } else {
      setBarcode(temp);
    }
  };

  const handleAddBarcode = () => {
    // const formattedBarcode = barcodeType === 'Normal' ? barcode : `${barcode}-${barcodeType.charAt(0)}`;
    
    dispatch(addScannedItem(barcode, location, parseInt(quantity)));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manual Barcode Entry</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Barcode"
        value={barcode}
        onChangeText={setBarcode}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Location (default: Floor)"
        value={location}
        onChangeText={setLocation}
      />
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioOption, barcodeType === 'Normal' && styles.radioSelected]}
          onPress={() => handleRadioPress('Normal')}
        >
          <Text style={styles.radioText}>Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioOption, barcodeType === 'Floor' && styles.radioSelected]}
          onPress={() => handleRadioPress('Floor')}
        >
          <Text style={styles.radioText}>Floor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioOption, barcodeType === 'Clearance' && styles.radioSelected]}
          onPress={() => handleRadioPress('Clearance')}
        >
          <Text style={styles.radioText}>Clearance</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddBarcode}>
        <Text style={styles.addButtonLabel}>Add Barcode</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  radioOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  radioSelected: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  radioText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  addButtonLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ManualBarcodeEntryScreen;
