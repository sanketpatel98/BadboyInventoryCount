import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeScannedItem, removeAllScannedItems, updateScannedItem } from '../../redux/actions';
import EmptyState from './EmptyState';
import LocationGroup from './LocationGroup';
import RemoveAllButton from './RemoveAllButton';
import EmailButton from './EmailButton';
import { uploadDataToGoogleSheet } from './GoogleSheetUploader'; // Import the updated GoogleSheetUploader module

const ListScreen = () => {
  const scannedItems = useSelector((state) => state.scannedItems);
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false); // State to track uploading status

  const groupItemsByLocation = (items) => {
    const groupedItems = {};
    items.forEach((item) => {
      const location = item.location || 'Unknown';
      if (!groupedItems[location]) {
        groupedItems[location] = [];
      }
      groupedItems[location].push({ ...item });
    });
    return groupedItems;
  };

  const groupedItems = groupItemsByLocation(scannedItems);
  const locationKeys = Object.keys(groupedItems);

  const handleRemoveItem = (itemToRemove) => {
    dispatch({
      type: 'REMOVE_SCANNED_ITEM',
      payload: { barcode: itemToRemove.barcode, location: itemToRemove.location },
    });
  };

  const handleUpdateQuantity = (itemToUpdate, newQuantity) => {
    dispatch(updateScannedItem(itemToUpdate.barcode, itemToUpdate.location, newQuantity));
  };
  
  const handleRemoveAllScannedItems = () => {
    dispatch(removeAllScannedItems());
  };

  const handleUploadToGoogleSheet = async () => {
    if (uploading) {
      return;
    }

    try {
      setUploading(true);

      const response = await uploadDataToGoogleSheet(scannedItems);

      if (response.status === 200) {
        console.log('Data uploaded to Google Sheet successfully!');
      } else {
        console.log('Error uploading data to Google Sheet:', response.statusText);
      }

      setUploading(false);
    } catch (error) {
      console.error('Error uploading data:', error);
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      {scannedItems.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <FlatList
            data={locationKeys.map((location) => ({
              location,
              data: groupedItems[location],
            }))}
            renderItem={({ item }) => (
              <LocationGroup
                location={item.location}
                data={item.data}
                onRemoveItem={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
              />
            )}
            keyExtractor={(item) => item.location}
            contentContainerStyle={styles.listContainer}
          />
        </>
      )}
      {/* <EmailButton scannedItems={scannedItems} /> */}
      <RemoveAllButton
        handleRemoveAllScannedItems={handleRemoveAllScannedItems}
      />
      <Button title={uploading ? 'Uploading...' : 'Upload'} onPress={handleUploadToGoogleSheet} disabled={uploading} color="#5DBB63"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default ListScreen;