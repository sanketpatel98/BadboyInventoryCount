import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addScannedItem, removeAllScannedItems, updateScannedItem } from '../../redux/actions';
import EmptyState from './EmptyState';
import { uploadDataToGoogleSheet } from './GoogleSheetUploader'; // Import the updated GoogleSheetUploader module
import LocationGroup from './LocationGroup';
import RemoveAllButton from './RemoveAllButton';
import { Snackbar } from "react-native-paper";

const ListScreen = () => {
  const scannedItems = useSelector((state) => state.reducer.scannedItems);
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false); // State to track uploading status
  const [snackbarVisible, setSnackbarVisible] = useState(false);

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

  const addRemainingItems = (remainingItems) => {
    remainingItems.forEach((item)=>{
      dispatch(addScannedItem(item.barcode, item.location, item.quantity));
    })
  }

  const handleUploadToGoogleSheet = async () => {
    if (uploading) {
      return;
    }

    try {
      setUploading(true);

      const response = await uploadDataToGoogleSheet(scannedItems);

      if (response.status === 200) {
        setSnackbarVisible(true);

        setTimeout(() => {
          setSnackbarVisible(false);
        }, 3000);
      } else {
        console.log('Error uploading data to Google Sheet:', response.statusText);
      }

      handleRemoveAllScannedItems();
      addRemainingItems(response.data);

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
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000} 
        style={styles.snackbar}
      >
        Data added successfully to the Sheet!
      </Snackbar>
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