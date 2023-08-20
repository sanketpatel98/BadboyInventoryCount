import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Dialog from "react-native-dialog";
import { useDispatch, useSelector } from "react-redux";
import BarcodeDialog from "./BarcodeDialog"; // Import your BarcodeDialog component
import LocationDialog from "./LocationDialog"; // Import your LocationDialog component
import { addScannedItem } from "../../redux/actions";

const BarcodeScanner = () => {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [barcodeData, setBarcodeData] = useState("");
  const [location, setLocation] = useState("Floor");
  const [selectedOption, setSelectedOption] = useState("Normal");
  const [showBarcodeDialog, setShowBarcodeDialog] = useState(false);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const scannedItems = useSelector((state) => state.scannedItems);

  const handleBarCodeScanned = ({ data }) => {
    setIsScanning(false);
    setBarcodeData(data);
    setShowBarcodeDialog(true);
    setIsDialogOpen(true); // Set the state to true
  };

  const handleEditLocation = () => {
    setShowLocationDialog(true);
  };

  const handleConfirm = (quantity) => {
    setShowBarcodeDialog(false);
    setIsScanning(true);
    setIsDialogOpen(false); // Set the state to false

    const existingItemIndex = scannedItems.findIndex(
      (item) =>
        item.barcode.toString() === barcodeData && item.location === location
    );

    if (existingItemIndex !== -1) {
      const updatedScannedItems = [...scannedItems];
      const existingCounter = parseInt(
        updatedScannedItems[existingItemIndex].counter
      );
      const newQuantity = parseInt(quantity);
      updatedScannedItems[existingItemIndex].counter = (
        existingCounter + newQuantity
      ).toString();
      // updatedScannedItems[existingItemIndex].counter += quantity;
      dispatch({ type: "SET_SCANNED_ITEMS", payload: updatedScannedItems });
    } else {
      dispatch(addScannedItem(barcodeData, location, quantity));
    }
    handleOptionChange("Normal");
  };

  const requestCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleOptionChange = (option) => {
    if (option === "Normal") {
      // Check if barcode has "-C" or "-F" and remove it
      let updatedBarcodeData = barcodeData.replace(/-C|-F/g, "");
      setBarcodeData(updatedBarcodeData);
    } else if (option === "Floor") {
      // Remove existing extensions and add "-F"
      let updatedBarcodeData = barcodeData.replace(/-C|-F/g, "") + "-F";
      setBarcodeData(updatedBarcodeData);
    } else if (option === "Clearance") {
      // Remove existing extensions and add "-C"
      let updatedBarcodeData = barcodeData.replace(/-C|-F/g, "") + "-C";
      setBarcodeData(updatedBarcodeData);
    }
    setSelectedOption(option);
  };

  const handleCancel = () => {
    setShowBarcodeDialog(false);
    setIsScanning(true);
    setIsDialogOpen(false); // Set the state to false
  };

  const handleLocationUpdate = () => {
    setShowLocationDialog(false);
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {/* BarcodeScanner component */}
      {!isDialogOpen && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={styles.scannerContainer}
        />
      )}

      {/* Edit Location Button */}
      <TouchableOpacity
        style={styles.editLocationButton}
        onPress={handleEditLocation}
      >
        <Text style={styles.editLocationButtonText}>
          Edit Location: {location}
        </Text>
      </TouchableOpacity>

      {/* BarcodeDialog component */}
      <BarcodeDialog
        visible={showBarcodeDialog}
        barcodeData={barcodeData}
        selectedOption={selectedOption}
        onSelectOption={handleOptionChange}
        onConfirm={(quantity) => {
          handleConfirm(quantity);
        }}
        onCancel={() => handleCancel()}
      />

      {/* LocationDialog component */}
      <LocationDialog
        visible={showLocationDialog}
        location={location}
        onLocationChange={(newLocation) => setLocation(newLocation)}
        onCancel={() => setShowLocationDialog(false)}
        onUpdate={() => {
          handleLocationUpdate();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scannerContainer: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "black",
  },
  editLocationButton: {
    position: "absolute",
    top: StatusBar.currentHeight + 16,
    right: 16,
    backgroundColor: "#4287f5",
    padding: 8,
    borderRadius: 8,
  },
  editLocationButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default BarcodeScanner;
