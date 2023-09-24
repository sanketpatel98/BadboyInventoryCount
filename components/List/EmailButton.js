import * as FileSystem from 'expo-file-system';
import * as MailComposer from 'expo-mail-composer';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';

const EmailButton = ({ scannedItems }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');

  const handleEmail = () => {
    setModalVisible(true);
  };

  const handleModalSubmit = () => {
    setModalVisible(false);
    sendEmail(recipientEmail);
  };

  const createCSVData = () => {
    let csvData = 'Barcode,Count,Location\n';
    scannedItems.forEach((item) => {
      csvData += `${item.barcode},${item.counter},${item.location}\n`;
    });
    return csvData;
  };

  const sendEmail = async (recipient) => {
    try {
      const csvData = createCSVData();
      const csvFilePath = `${FileSystem.documentDirectory}scanned_items.csv`;
      await FileSystem.writeAsStringAsync(csvFilePath, csvData, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // This is the key change. Use `MailComposer.composeAsync` with the attachment URI as a string.
      await MailComposer.composeAsync({
        recipients: [recipient],
        subject: 'Scanned Items List',
        body: 'Here is the list of scanned items.',
        attachments: [csvFilePath], // Pass the URI as a string in an array
      });

      console.log('Email sent successfully');
    } catch (error) {
      console.log('Error sending email:', error);
      Alert.alert('Error', 'Failed to send email.');
    }
  };

  return (
    <View>
      <Button title="Send List via Email" onPress={handleEmail} />
      {isModalVisible && (
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Recipient Email"
            value={recipientEmail}
            onChangeText={(text) => setRecipientEmail(text)}
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            <Button title="Submit" onPress={handleModalSubmit} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: '#ccc',
    fontSize: 16,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default EmailButton;
