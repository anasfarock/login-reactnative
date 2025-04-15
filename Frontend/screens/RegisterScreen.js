import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const handleSubmit = async (values) => {
    try {
      const resp = await axios.post('http://localhost:8080/v1/api/user', values);
      const { data } = resp;

      if (data) {
        Alert.alert("Registration Successful", "Redirecting to login...");
        navigation.navigate('Login');
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const validations = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(8).required('Password is required'),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>
      <Text style={styles.subText}>Fill the fields to create a new user</Text>

      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        validationSchema={validations}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              placeholder="First Name"
              style={styles.input}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              placeholderTextColor="#ccc"
            />
            {touched.firstName && errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

            <TextInput
              placeholder="Last Name"
              style={styles.input}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              placeholderTextColor="#ccc"
            />
            {touched.lastName && errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholderTextColor="#ccc"
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholderTextColor="#ccc"
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Already have an account? Login here</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    color: '#fdfdfd',
    padding: 15,
    borderRadius: 7,
    fontSize: 18,
    marginTop: 15,
  },
  error: {
    color: '#ff8080',
    marginTop: 5,
    marginBottom: -5,
  },
  button: {
    backgroundColor: '#00cc99',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fdfdfd',
    fontSize: 16,
  },
  linkText: {
    color: '#00cc99',
    marginTop: 20,
    textAlign: 'center',
  },
});