// Updated Redux action to include the 'location' field
export const addScannedItem = (barcode, location, counter = 1) => ({
  type: 'ADD_SCANNED_ITEM',
  payload: { barcode, location, counter },
});

// New Redux action to remove all scanned items
export const removeAllScannedItems = () => ({
  type: 'REMOVE_ALL_SCANNED_ITEMS',
});

// New Redux action to remove a single scanned item
export const removeScannedItem = (barcode, location) => ({
  type: 'REMOVE_SCANNED_ITEM',
  payload: { barcode, location },
});

export const updateScannedItem = (barcode, location, counter) => ({
  type: 'UPDATE_SCANNED_ITEM',
  payload: { barcode, location, counter },
});

export const setScannedItems = (items) => ({
  type: 'SET_SCANNED_ITEMS',
  payload: items,
});
