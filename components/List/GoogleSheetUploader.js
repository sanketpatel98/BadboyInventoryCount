import axios from 'axios';

const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbzJdIh9O-tlyCetebIRB8wcPU9sR6cJs5WLhGxSvyRnfIYk9auh5gXlWE6LEMxwyovVhQ/exec';

export async function uploadDataToGoogleSheet(scannedItems) {
  try {
    // Fetch data from the API and convert to a hashmap
    const startTime = performance.now();
    const response = await axios.get(API_BASE_URL);
    const sheetData = response.data;
    const sheetDataMap = new Map(sheetData.map((row) => [row.ProdCode, row]));

    // Update the hashmap with scannedItems
    scannedItems.forEach((item) => {
      const matchingRow = sheetDataMap.get(item.barcode);
      if (matchingRow) {
        matchingRow.quantity = item.counter;
      }
    });

    // Send the modified data back to the Google Sheet
    const postResponse = await axios.post(API_BASE_URL, [...sheetDataMap.values()]);

    if (postResponse.status === 200) {
      console.log('Data uploaded to Google Sheet successfully');
    } else {
      console.log('Error uploading data to Google Sheet:', postResponse.data);
    }
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    console.log(`Total time taken: ${totalTime} milliseconds`);
    return postResponse;
  } catch (error) {
    console.error('Error uploading data to Google Sheet:', error);
    throw error;
  }
}
