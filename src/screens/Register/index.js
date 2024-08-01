import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet,Text,View,TextInput,TouchableOpacity,Image} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import {RegisterUserAPI} from '../../api/UserAPI';
import { showSnackBar } from '../../utils/snackBar';


const signUpValidation = yup.object().shape({
  name: yup.string().required('Name is required '),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have small letter')
    .matches(/\d/, 'Password must have number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .min(8, ({min}) => `Passowrd must be at least ${min} characters`)
    .required('Password is required'),
});

const Register = () => {
  const navigation = useNavigation();

  const [showSpineer, setShowSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/3177440.png')} // Adjust the path according to your project structure
          style={styles.image}
        />
      </View>

{/*FORM VALIDATION CONTAINER */}

<View style={styles.formContainer}>
<Formik 
  validationSchema={signUpValidation}
  initialValues={{
      name: '',
      email: '',
      password: ''
  }}

  onSubmit={async (values) => {
    setShowSpinner(true);
    console.log(values);
  }}

></Formik>

      <View>
        <Text style={styles.medicineText}>
          Create an account so that you order and{' '}
        </Text>
        <Text style={styles.manageText}>manage medicines</Text>
      </View>
      <View style={styles.input}>
        <TextInput placeholder="Enter your name.." />
      </View>
      <View style={styles.emailInput}>
        <TextInput placeholder="Enter your Email.." />
      </View>

      <View style={styles.password}>
        <TextInput placeholder="Enter your Password.." />
      </View>

      <TouchableOpacity style={styles.signUp}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
</View>



{/* REGISTER TEXT */}
      <View style={styles.RegisterText}>
        <Text style={{marginLeft: 18, color: 'black'}}>
          Already Registered ?{' '}
        </Text>
        <TouchableOpacity>
          <Text style={{marginLeft: 70, color: 'blue'}}>Login here. </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center', // Center the image horizontally
    marginTop: 120, // Adjust as needed
  },
  image: {
    width: 100, // Set the width of the image
    height: 100, // Set the height of the image
    resizeMode: 'contain', // Ensure the image scales properly
  },
  input: {
    height: 50,
    borderWidth: 3,
    borderColor: '#ADD8E6',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    marginTop: 30, // Adjusted marginTop to fit better with the image
    marginHorizontal: 20, // Combined marginLeft and marginRight
  },
  emailInput: {
    height: 50,
    borderWidth: 3,
    borderColor: '#ADD8E6',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    marginTop: 20, // Adjusted marginTop to fit better with the previous input
    marginHorizontal: 20, // Combined marginLeft and marginRight
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingTop: 20, // Optional: add padding to avoid overlapping with the status bar
  },
  signUp: {
    height: 50,
    borderWidth: 3,
    borderColor: 'blue', // Updated to match input border color
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: 'blue', // Corrected background color
    marginTop: 30,
    marginHorizontal: 20, // Combined marginLeft and marginRight
    justifyContent: 'center', // Center contents horizontally
    alignItems: 'center', // Center contents vertically
  },
  signUpText: {
    fontSize: 18, // Correct fontSize
    fontWeight: 'bold', // Correct fontWeight
    color: '#fff', // Make text visible on button
  },
  password: {
    height: 50,
    borderWidth: 3,
    borderColor: '#ADD8E6',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    marginTop: 20, // Adjusted marginTop to fit better with the previous input
    marginHorizontal: 20,
  },
  medicineText: {
    marginHorizontal: 20,
    marginTop: 10,
    color: 'black',
  },
  manageText: {
    marginHorizontal: 100,
    color: 'black',
  },
  RegisterText: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 10,
  },
  shadow: {
    // iOS shadow properties
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow radius

    // Android shadow properties
    elevation: 5, // Elevation for Android
  },
});

export default Register;
