import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ScannedItem from './ScannedItem';

const LocationGroup = ({ location, data, onRemoveItem, onUpdateQuantity }) => {
  const totalEntries = data.length;

  return (
    <View style={styles.groupContainer}>
      <View style={styles.groupHeaderContainer}>
        <Text style={styles.locationHeader}>{`Location: ${location}`}</Text>
        <Text style={styles.totalEntriesText}>{`Total Entries: ${totalEntries}`}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ScannedItem
            item={item}
            onRemove={() => onRemoveItem(item)}
            onUpdateQuantity={(item, newQuantity) =>
              onUpdateQuantity(item, newQuantity)
            }
          />
        )}
        keyExtractor={(item) => item.barcode}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    marginBottom: 24,
  },
  groupHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4287f5',
  },
  totalEntriesText: {
    fontSize: 16,
    color: '#555',
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default LocationGroup;									
