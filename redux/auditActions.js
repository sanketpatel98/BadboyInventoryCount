export const addAuditItem = (barcode, location, quantity = 1) => ({
    type: 'ADD_AUDIT_ITEM',
    payload: { barcode, location, quantity },
  });
  
  export const removeAuditItem = (barcode, location, quantity) => ({
    type: 'REMOVE_AUDIT_ITEM',
    payload: { barcode, location, quantity },
  });
  
  export const removeAllAuditItems = () => ({
    type: 'REMOVE_ALL_AUDIT_ITEMS',
  });

  export const batchAddAuditItems = (items) => ({
    type: 'BATCH_ADD_AUDIT_ITEMS',
    payload: items
  });

  export const updateAuditItem = (barcode, location, quantity) => ({
    type: 'UPDATE_AUDIT_ITEM',
    payload: { barcode, location, quantity },
  });
  