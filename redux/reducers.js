// redux/reducer.js
const initialState = {
  scannedItems: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SCANNED_ITEMS":
      return {
        ...state,
        scannedItems: action.payload,
      };
    case "ADD_SCANNED_ITEM":
      return {
        ...state,
        scannedItems: [...state.scannedItems, action.payload],
      };
    case "REMOVE_ALL_SCANNED_ITEMS":
      return {
        ...state,
        scannedItems: [],
      };
    case "REMOVE_SCANNED_ITEM":
      return {
        ...state,
        scannedItems: state.scannedItems.filter(
          (item) =>
            item.barcode !== action.payload.barcode ||
            item.location !== action.payload.location
        ),
      };
    case "UPDATE_SCANNED_ITEM":
      return {
        ...state,
        scannedItems: state.scannedItems.map((item) =>
          item.barcode === action.payload.barcode &&
          item.location === action.payload.location
            ? { ...item, counter: action.payload.counter }
            : item
        ),
      };
    default:
      return state;
  }
};

export default reducer;
