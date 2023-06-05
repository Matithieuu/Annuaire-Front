import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { storeData, getApiBaseUrl } from '../Plugins/StorageUtils';
import ErrorMessage from '../Plugins/ErrorMessage';

const RegisterPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [responseText, setResponseText] = useState('');

  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@#$%^&*]{6,20}$/;
  const phoneNumberRegex = /^\d{10}$/;

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const validateForm = () => {
    const errors = {};

    if (!usernameRegex.test(username)) {
      errors.username = 'Invalid username';
    }

    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email';
    }

    if (!passwordRegex.test(password)) {
      errors.password = 'Invalid password';
    }

    if (!phoneNumberRegex.test(phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const register = async () => {
    if (validateForm()) {
      try {
        const API_BASE_URL = await getApiBaseUrl();
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            username,
            password,
            emailAddress: email,
            phoneNumber,
            firstName,
            lastName,
            address,
          }),
        };

        const response = await fetch(`${API_BASE_URL}/register`, requestOptions);

        if (!response.ok) {
          const errorMessage = await response.text();
          console.log(errorMessage);
          setResponseText(errorMessage);
        } else {
          const dataResponse = await response.json();
          await storeData(dataResponse);
          console.log(dataResponse);

          navigation.navigate('MainPage');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderError = (field) => {
    if (formErrors[field]) {
      return <Text style={styles.errorText}>{formErrors[field]}</Text>;
    }
    return null;
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={setFirstName}
          value={firstName}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={setLastName}
          value={lastName}
        />

        <TextInput
          style={styles.input}
          placeholder="Address"
          onChangeText={setAddress}
          value={address}
        />

        {renderError('username')}
        {renderError('email')}
        {renderError('password')}
        {renderError('phoneNumber')}

        <TouchableOpacity style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#89CFF0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegisterPage;
