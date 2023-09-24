// AuditScannerScreen.js
import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Text, TextInput } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Dialog from "react-native-dialog";
import { useDispatch, useSelector } from "react-redux";
import { addAuditItem, removeAuditItem } from "../../redux/auditActions";
import { Snackbar } from "react-native-paper";
import RadioButton from "../BarcodeScanner/RadioButton";

const AuditScannerScreen = ({ route, navigation }) => {
  const { selectedOption } = route.params;
  const [scannedData, setScannedData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [barcodeData, setBarcodeData] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [scannerActive, setScannerActive] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [selectedRadioOption, setSelectedRadioOption] = useState("Normal")

  const dispatch = useDispatch();

  const auditItems = useSelector((state) => state.auditReducer.auditItems);

  const calculateTotals = () => {
    let totalQuantity = 0;
    const totalElements = auditItems.length;

    for (const item of auditItems) {
      totalQuantity += parseInt(item.quantity);
    }

    return { totalQuantity, totalElements };
  };

  useEffect(() => {
    const { totalQuantity, totalElements } = calculateTotals();
    // You can use these totals as needed, e.g., display them in the UI or log them
    setTotalQuantity(totalQuantity);
    setTotalElements(totalElements);
    console.log("Total Quantity:", totalQuantity);
    console.log("Total Elements:", totalElements);
  }, [auditItems]);

  const handleConfirmItem = (barcode) => {
    var flag = false;
    auditItems.forEach((item) => {
      console.log("--------------------------------------");
      console.log(item.barcode.toString().trim() === barcodeData.toString());
      console.log(barcodeData);
      console.log("--------------------------------------");
      if (item.barcode.toString() === barcodeData) {
        flag = true;
        console.log("flag changed");
      }
    });

    if (flag) {
      dispatch(removeAuditItem(barcode, selectedOption, quantity));
    } else {
      dispatch(addAuditItem(barcode, selectedOption, -parseInt(quantity)));
    }

    // dispatch(removeAuditItem(barcode.toString().trim(), selectedOption, quantity));

    setIsDialogOpen(false);
    setSnackbarVisible(true);

    // Optional: You can hide the Snackbar after a certain duration if needed
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000); // Snackbar will disappear after 3 seconds
  };

  const handleCancel = () => {
    setVisible(false);
    setIsDialogOpen(false);
    setScannerActive(true);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarcodeScan = ({ data }) => {
    if (scannerActive && !visible) {
      setBarcodeData(data);
      setVisible(true);
      setScannerActive(false);
    }
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    setVisible(false);
    handleConfirmItem(barcodeData);
    setScannerActive(true);
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
    setSelectedRadioOption(option);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Audit Scanner",
    });
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!isDialogOpen && (
        <BarCodeScanner
          onBarCodeScanned={handleBarcodeScan}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {/* Custom Dialog with Input */}
      <Dialog.Container visible={visible}>
        <Dialog.Title style={styles.title}>Confirm Barcode</Dialog.Title>
        <Dialog.Description style={styles.description}>
          <Text style={styles.barcodeText}>
            Scanned Barcode: <Text style={styles.boldText}>{barcodeData}</Text>
          </Text>
        </Dialog.Description>

        {/* Quantity Input */}
        <View>
          <Text style={styles.quantityTitle}>Enter Quantity:</Text>
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
        </View>

        {/* Radio buttons */}
        <View style={styles.radioButtonsContainer}>
          <View style={styles.radioButton}>
            <RadioButton
              selected={selectedRadioOption === "Normal"}
              onPress={() => handleOptionChange("Normal")}
            />
            <Text style={styles.radioButtonLabel}>Normal</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton
              selected={selectedRadioOption === "Floor"}
              onPress={() => handleOptionChange("Floor")}
            />
            <Text style={styles.radioButtonLabel}>Floor</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton
              selected={selectedRadioOption === "Clearance"}
              onPress={() => handleOptionChange("Clearance")}
            />
            <Text style={styles.radioButtonLabel}>Clearance</Text>
          </View>
        </View>

        {/* Confirm and Cancel buttons */}
        <View style={styles.buttonContainer}>
          <Dialog.Button label="Cancel" onPress={handleCancel} color="#666" />
          <Dialog.Button label="OK" onPress={handleConfirm} color="#4287f5" />
        </View>
      </Dialog.Container>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000} // Optional: Set the duration for how long the Snackbar should be visible (in milliseconds)
        style={styles.snackbar}
      >
        Product audited successfully
      </Snackbar>

      <View style={styles.finishButtonContainer}>
        <Button
          title="Finish Scanning"
          onPress={() => navigation.goBack()} // Go back to the main screen
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    marginVertical: 10,
  },
  barcodeText: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: "bold",
  },
  quantityTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  snackbar: {
    marginBottom: 60, // Adjust this value as needed to prevent overlap with the button
  },
  finishButtonContainer: {
    marginBottom: 20, // Add margin to separate it from the Snackbar
    paddingHorizontal: 16, // Optional: Add horizontal padding to center the button
  },
  radioButtonsContainer: {
    flexDirection: 'column',
    marginTop: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioButtonLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default AuditScannerScreen;
