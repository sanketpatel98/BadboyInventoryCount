
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Dialog from 'react-native-dialog';
import { Picker } from "@react-native-picker/picker";

const LocationDialog = ({ visible, location, onLocationChange, onCancel, onUpdate }) => {
  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>Edit Location</Dialog.Title>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => onLocationChange(itemValue)}
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
      {/* <Dialog.Button label="Cancel" onPress={onCancel} /> */}
      <Dialog.Button label="Update" onPress={onUpdate} />
    </Dialog.Container>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default LocationDialog;
