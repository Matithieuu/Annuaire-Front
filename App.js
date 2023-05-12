import * as React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import SecondPage from './src/page/secondPage';
import ForgotPassword from './src/page/forgotPassword';
import ContactDetails from './src/page/contactDetails';
import AddContactPage from './src/page/AddContactPage';
import ModifyContact from './src/page/ModifyContact';



const HomeScreen = ({ navigation }) => {

  const [loginText, onChangeLoginText] = React.useState('');
  const [passwordText, onChangePasswordText] = React.useState('');

  const storeData = async (value) => { // Secure Way to store data
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('token', jsonValue)
    } catch (e) {
      // saving error
    }
  }

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('token')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

  const login = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Set the desired Access-Control-Allow-Origin header
        },
        body: JSON.stringify({
          username: loginText,
          password: passwordText,
        }),
      };

      const response = await fetch('http://0.0.0.0:8080/api/v1/login', requestOptions); //store data la dessus
      const data = storeData(await response.json());

      const token = await getData(); // Assuming the server returns the token in the response
      console.log(token);

      // Store the token securely (e.g., in cookies or local storage) for subsequent requests
      navigation.navigate('Details', {
        token: token.token,
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <TextInput
          style={styles.textInput}
          placeholder='Login'
          onChangeText={(loginText) => onChangeLoginText(loginText)} />
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(passwordText) => onChangePasswordText(passwordText)} />
      </View>

      <TouchableOpacity onPress={() => {
        navigation.navigate('Forgot Password');
      }}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={login}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Details' component={SecondPage} />
        <Stack.Screen name='Forgot Password' component={ForgotPassword} />
        <Stack.Screen name='ContactDetails' component={ContactDetails} />
        <Stack.Screen name='AddContactPage' component={AddContactPage} />
        <Stack.Screen name='ModifyContact' component={ModifyContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  style: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    backgroundColor: "#89CFF0",
    borderRadius: 80,
    margin: 10,
  },
  loginBtn: {
    width: 200,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#89CFF0",
  },
});

export default App;
