export const getMedicineAPI = async () => {
  try {
    const url = "http://192.168.234.33:4000/api/medicine/getAllMedicines"; // Replace with your laptop's IP address
    let result = await fetch(url);
    result = await result.json();
    // return result;  // Log the fetched medicines to the console
  } catch (error) {
    console.error('Error fetching medicines:', error);
  }
}


//192.168.234.33