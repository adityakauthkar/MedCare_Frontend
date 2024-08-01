// const BASE_URL = 'http://192.168.1.204:4000'
import axios from "axios";

// Register User API
export const RegisterUserAPI = async (userData) => {
    try {
        const url = 'http://192.168.1.204:4000/api/user/registerUser';
        const response = await axios.post(url, userData);  // Assuming you want to send user data in the post request
        return response.data; 
    } catch (error) { 
        console.log("Error fetching register user:", error);
        throw error; // It's good practice to throw the error so the calling function can handle it.
    }
}



// Login User API
export const LoginUserAPI = async (loginData) => {
    try {
        const url = 'http://192.168.1.204:4000/api/user/login';
        const response = await axios.post(url, loginData); // Assuming login will use POST method and requires data
        return response.data;
    } catch (error) { 
        console.log("Error fetching login user:", error);
        throw error; // Similarly, throw the error to the calling function.
    }
}

