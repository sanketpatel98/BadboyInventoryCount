import axios from 'axios';
import API_BASE_URL from '../API/APIURL';

// const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbzimmgn7k0Xh_BLGJO4KsgGui0EQ4ayq4yDHpv08euPXPawu_Muf05XgWXJ52tMe9rgkA/exec';

export async function uploadDataToGoogleSheet(scannedItems) {
  try {
    // Fetch data from the API and convert to a hashmap
    const startTime = performance.now();
    // const response = await axios.get(API_BASE_URL);
    // const sheetData = response.data;
    // const sheetDataMap = new Map(sheetData.map((row) => [row.ProdCode, row]));
    // const updatedData = [];

    // // Update the hashmap with scannedItems
    // scannedItems.forEach((item) => {
    //   const matchingRow = sheetDataMap.get(item.barcode);
    //   if (matchingRow) {
    //     matchingRow[item.location] = item.counter;
    //     // console.log(matchingRow);
    //     updatedData.push(matchingRow);
    //   }
    // });

    // Send the modified data back to the Google Sheet
    // const postResponse = await axios.post(API_BASE_URL, {updatedData:updatedData, type: 'updateRows'});
    const postResponse = await axios.post(API_BASE_URL, {updatedData:scannedItems, type: 'updateRows'});

    if (postResponse.status === 200) {
      // console.log('Data uploaded to Google Sheet successfully');
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
