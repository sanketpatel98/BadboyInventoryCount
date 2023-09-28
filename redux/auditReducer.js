const initialState = {
  auditItems: [],
};

const auditReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_AUDIT_ITEM":
      return {
        ...state,
        auditItems: [...state.auditItems, action.payload],
      };
      case 'UPDATE_AUDIT_ITEM':
        const { barcode, location, quantity } = action.payload;
        return {
          ...state,
          auditItems: state.auditItems.map((item) => {
            if (item.barcode === barcode && item.location === location) {
              return {
                ...item,
                quantity: quantity,
              };
            } else {
              return item;
            }
          }),
        };
    case "BATCH_ADD_AUDIT_ITEMS":
      return {
        ...state,
        auditItems: action.payload,
      };
    case "REMOVE_AUDIT_ITEM":
      // const { barcode: barcodeToRemove, location: locationToRemove } = action.payload;
      return {
        ...state,
        auditItems: state.auditItems
          .map((item) => {
            // console.log("Comes to remove");
            if (item.barcode === action.payload.barcode) {
              const newCount = parseInt(item.quantity) - parseInt(action.payload.quantity);
              console.log(newCount);
              if (newCount == 0) {
                return null;
              } else {
                return {
                  ...item,
                  quantity: newCount,
                };
              }
            } else {
              return item;
            }
          })
          .filter(Boolean), // Remove null entries
      };

    case "REMOVE_ALL_AUDIT_ITEMS":
      return {
        ...state,
        auditItems: [],
      };

    default:
      return state;
  }
};

export default auditReducer;
