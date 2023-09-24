import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ScannedItem = ({ item, onRemove, onUpdateQuantity }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedQuantity, setUpdatedQuantity] = useState(item.counter.toString());

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateQuantity = () => {
    const newQuantity = parseInt(updatedQuantity, 10);
    if (!isNaN(newQuantity)) {
      onUpdateQuantity(item, newQuantity);
      setIsEditing(false);
      setUpdatedQuantity(newQuantity.toString());
    }
  };

  return (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.barcodeText}>{item.barcode}</Text>
        <Text style={styles.counterText}>{`Count: ${item.counter}`}</Text>
      </View>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={updatedQuantity}
            onChangeText={setUpdatedQuantity}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdateQuantity}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={handleToggleEdit}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.crossButton} onPress={onRemove}>
        <Text style={styles.crossButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  barcodeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  counterText: {
    fontSize: 16,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 4,
    width: 40,
    textAlign: 'center',
    marginRight: 8,
  },
  updateButton: {
    width: 60,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  editButton: {
    width: 60,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#4287f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  crossButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'salmon',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScannedItem;
