/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, Button } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { RegisterUserAPI } from '../../api/UserAPI';
import { showSnackBar } from '../../utils/snackBar';
import { ShowToast } from '../../utils/snackBar';
import { object, string, number, date, InferType } from 'yup';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icons from 'react-native-vector-icons/dist/Ionicons';
import { LoginUserAPI } from '../../api/UserAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

//YUP Schema: 
const signInValidationSchema = yup.object().shape({

  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have capital letter')
    .matches(/\d/, 'Password must have number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .min(4, ({ min }) => `Passowrd must be at least ${min} characters`)
    .required('Password is required'),
})


// LOGIN Function: 
const Login = () => {
  const navigation = useNavigation();

  useEffect(() => {

    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('Home');
      }
    };
    checkLoginStatus();


  }, [navigation]);





  const [showSpineer, setShowSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };




  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/3177440.png')} // Adjust the path according to your project structure
            style={styles.image}
          />
        </View>

        {/*FORM VALIDATION CONTAINER */}
        <Formik
          validationSchema={signInValidationSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            setShowSpinner(true)
            console.log(values);
            LoginUserAPI(values).then(res => {
              console.log("Response", res);
              setShowSpinner(false);
              //  ShowToast();

              navigation.navigate('Home');
              // console.log("User coming from state" , user);
            }).catch(err => {
              console.log("Errors", err);
              setShowSpinner(false);

            })
          }}


        >
          {({ handleChange, handleBlur, handleSubmit, values, touched, isValid, errors }) => (
            <View style={styles.formContainer}>

              <View>
                <Text style={styles.medicineText}>
                  Create an account so that you order and{' '}
                </Text>
                <Text style={styles.manageText}>manage medicines</Text>
              </View>

              {/* ALL INPUTS OF USERS  */}


              <View style={styles.emailInput}>
                <TextInput placeholder="Enter your Email.."
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {(errors.email && touched.email) &&
                  <Text style={{ fontSize: scale(10), color: 'red', marginTop: scale(5) }}>{errors.email}</Text>

                }

              </View>

              <View>

                <View style={styles.password}>
                  <TextInput placeholder="Enter your Password.."
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  {(errors.password && touched.password) &&
                    <Text style={{ fontSize: scale(10), color: 'red', marginTop: scale(5) }}>{errors.password}</Text>

                  }
                </View>

                {/* <TouchableOpacity
                  onPress={toggleShowPassword}
                  style={{ alignItems: 'center' }}>
                  <Icons username="key-outline" size={20} />
                </TouchableOpacity> */}

              </View>


              <TouchableOpacity style={styles.signUp}
                onPress={handleSubmit}
              >
                <Text style={styles.signUpText}>Log In</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        {/* REGISTER TEXT */}
        <View style={styles.RegisterText}>
          <Text style={{ marginLeft: 18, color: 'black' }}>
            Not Registered ?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ marginLeft: 70, color: 'blue' }}>Register here. </Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'white',
    // paddingTop: 20, // Optional: add padding to avoid overlapping with the status bar

  },
  innerContainer: {
    backgroundColor: 'white',
    // marginTop:10,

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
    flexDirection: 'row',
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
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow radius

    // Android shadow properties
    elevation: 5, // Elevation for Android
  },
});

export default Login;