import React from 'react';
import { Provider } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BarcodeScanner from './components/BarcodeScanner/BarcodeScanner';
import ListScreen from './components/List/ListScreen';
import ManualBarcodeEntryScreen from './components/ManualEntry/ManualBarcodeEntryScreen';
import store from './redux/store'; // Import the Redux store

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barcode Scanner App</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Scanner')}
      >
        <Text style={styles.buttonText}>Scan Barcode</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('List')}
      >
        <Text style={styles.buttonText}>View List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ManualBarcodeEntry')}
      >
        <Text style={styles.buttonText}>Manual Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Scanner" component={BarcodeScanner} options={{ headerShown: false }} />
          <Stack.Screen name="List" component={ListScreen} options={{ title: 'Scanned Items List' }} />
          {/* Add a new screen entry for the ManualBarcodeEntryScreen */}
          <Stack.Screen
            name="ManualBarcodeEntry"
            component={ManualBarcodeEntryScreen}
            options={{ title: 'Manual Barcode Entry' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#333',
  },
  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
