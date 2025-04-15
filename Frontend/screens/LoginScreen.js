import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const handleSubmit = async (values) => {
    try {
      const resp = await axios.post('http://localhost:8080/v1/api/auth', values);
      const { data } = resp;

      if (data) {
        Alert.alert("Login Successful", "Redirecting to home...");
        navigation.navigate('Home');
      } else {
        Alert.alert("Login Failed", "Please check your credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Server error or invalid credentials");
    }
  };

  const validations = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(8).required('Password is required'),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <Text style={styles.subText}>Fill the fields to continue</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validations}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
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
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.linkText}>Don't have an account? Register here</Text>
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
