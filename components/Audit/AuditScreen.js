import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import {
  removeAuditItem,
  updateAuditItem,
} from "../../redux/auditActions";
import { batchAddAuditItems } from "../../redux/auditActions";
import { googleSheetFetchData } from "./GoogleSheetFetchData";

const AuditScreen = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newQuantity, setNewQuantity] = useState("");
  const [selectedBarcodeToUpdate, setSelectedBarcodeToUpdate] = useState("");
  const [originalQuantity, setOriginalQuantity] = useState(0);
  
  const options = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
  
  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
    setIsLoading(true);
    try {
      const auditDataByLocation = await googleSheetFetchData(option);
      const formattedData = auditDataByLocation.map((ele) => {
        return {
          barcode: ele.ProdCode,
          location: option,
          quantity: ele[option.toString().toLowerCase()],
        };
      });
      dispatch(batchAddAuditItems(formattedData));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const auditItems = useSelector((state) => state.auditReducer.auditItems);
  const dispatch = useDispatch();
  
  const handleUpdateItem = (quantity) => {
    if (newQuantity !== "") {

      if (parseInt(newQuantity) === 0) {
        dispatch(removeAuditItem(selectedBarcodeToUpdate, selectedOption, quantity))
      } else {
        dispatch(
          updateAuditItem(selectedBarcodeToUpdate, selectedOption, parseInt(newQuantity))
        );
      }

      setSelectedBarcodeToUpdate("");
      setNewQuantity("");
    }
  };
  
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue) => handleOptionSelect(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select an option" value={null} />
        {options.map((option) => (
          <Picker.Item label={option} value={option} key={option} />
        ))}
      </Picker>
      <Button
        title="Start Scanning"
        onPress={() => navigation.navigate("AuditScanner", { selectedOption })}
        disabled={!selectedOption }
      />
  
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#4287f5"
          style={styles.loadingIndicator}
        />
      ) : (
        <FlatList
          data={auditItems}
          keyExtractor={(item) => item.barcode.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.itemContainer,
                item.quantity < 0 && styles.negativeQuantityContainer,
              ]}
            >
              <Text style={styles.barcodeText}>{item.barcode}</Text>
              {selectedBarcodeToUpdate === item.barcode ? (
                <View style={styles.editContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Qty"
                    keyboardType="numeric"
                    value={newQuantity}
                    onChangeText={(text) => setNewQuantity(text)}
                  />
                  <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => handleUpdateItem(item.quantity)}
                  >
                    <Text style={styles.updateButtonText}>Update</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityText}>Qty: {item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      setSelectedBarcodeToUpdate(item.barcode);
                      setNewQuantity(item.quantity.toString());
                    }}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  picker: {
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },
  itemContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  barcodeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  loadingIndicator: {
    marginTop: 20,
  },
  negativeQuantityText: {
    color: "#ff0000",
  },
  negativeQuantityContainer: {
    backgroundColor: "#ffcccc",
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    height: 30,
    width: 40,
    backgroundColor: "#fff",
    marginHorizontal: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 14,
    color: "#666",
  },
  editButton: {
    backgroundColor: "#4287f5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButtonText: {
    color: "#fff",
  },
  updateButton: {
    backgroundColor: "#4caf50",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  updateButtonText: {
    color: "#fff",
  },
});
  
export default AuditScreen;
