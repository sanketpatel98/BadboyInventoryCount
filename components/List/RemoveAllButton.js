import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeAllScannedItems } from '../../redux/actions';

const RemoveAllButton = () => {
  const dispatch = useDispatch();

  const handleRemoveAllScannedItems = () => {
    dispatch(removeAllScannedItems());
  };

  return (
    <TouchableOpacity
      style={styles.removeAllButton}
      onPress={handleRemoveAllScannedItems}
    >
      <Text style={styles.removeAllButtonText}>Remove All Scanned Items</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  removeAllButton: {
    backgroundColor: 'salmon',
    padding: 10,
    borderRadius: 8,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeAllButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RemoveAllButton;
