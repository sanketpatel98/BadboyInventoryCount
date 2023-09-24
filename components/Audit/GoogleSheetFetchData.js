import axios from "axios";
import API_BASE_URL from "../API/APIURL";

export async function googleSheetFetchData(location) {
  
  try {
    // Fetch data from the API and convert to a hashmap
    const response = await axios.get(API_BASE_URL+'?location='+location.toString().toLowerCase());
    const sheetData = response.data;    
    return sheetData;
  } catch (error) {
    console.error("Error getting data from Google Sheet:", error);
    throw error;
  }
}
