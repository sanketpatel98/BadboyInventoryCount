import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addScannedItem } from '../../redux/actions';
import { Picker } from "@react-native-picker/picker";

const ManualBarcodeEntryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [barcodeType, setBarcodeType] = useState('Normal');
  const [location, setLocation] = useState('a'); // Default location set to 'A'

  const scannedItems = useSelector((state) => state.reducer.scannedItems);

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
    const existingItemIndex = scannedItems.findIndex(
      (item) =>
        item.barcode.toString() === barcode && item.location === location
    );

    if (existingItemIndex !== -1) {
      const updatedScannedItems = [...scannedItems];
      const existingCounter = parseInt(
        updatedScannedItems[existingItemIndex].counter
      );
      const newQuantity = parseInt(quantity);
      updatedScannedItems[existingItemIndex].counter = (
        existingCounter + newQuantity
      ).toString();
      dispatch({ type: "SET_SCANNED_ITEMS", payload: updatedScannedItems });
    } else {
      dispatch(addScannedItem(barcode, location, quantity));
    }
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
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => setLocation(itemValue)}
        >
          <Picker.Item label="A" value="a" />
          <Picker.Item label="B" value="b" />
          <Picker.Item label="C" value="c" />
          <Picker.Item label="D" value="d" />
          <Picker.Item label="E" value="e" />
          <Picker.Item label="F" value="f" />
          <Picker.Item label="G" value="g" />
          <Picker.Item label="H" value="h" />
          <Picker.Item label="I" value="i" />
          <Picker.Item label="J" value="j" />
          <Picker.Item label="K" value="k" />
          <Picker.Item label="L" value="l" />
          <Picker.Item label="M" value="m" />
          <Picker.Item label="N" value="n" />
          <Picker.Item label="O" value="o" />
          <Picker.Item label="P" value="p" />
          <Picker.Item label="Q" value="q" />
          <Picker.Item label="R" value="r" />
          <Picker.Item label="S" value="s" />
          <Picker.Item label="T" value="t" />
          <Picker.Item label="U" value="u" />
          <Picker.Item label="V" value="v" />
          <Picker.Item label="W" value="w" />
          <Picker.Item label="X" value="x" />
        </Picker>
      </View>
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
  dropdownContainer: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    justifyContent: 'center',
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
