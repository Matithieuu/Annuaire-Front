import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SecondPage from './src/page/secondPage';
import ForgotPassword from './src/page/BasePage/ForgotPassword';
import ContactDetails from './src/page/Contact/contactDetails';
import AddContactPage from './src/page/Contact/AddContactPage';
import ModifyContact from './src/page/Contact/ModifyContact';
import RegisterPage from './src/page/BasePage/RegisterPage';
import ShowMySelf from './src/page/MySelf/mySelf';
import MySelfDetails from './src/page/MySelf/mySelfDetails';
import ModifyMySelf from './src/page/MySelf/modifyMyself';
import ErrorMessage from './src/page/Plugins/ErrorMessage';
import { storeData, getData } from './src/page/Plugins/StorageUtils';
import { API_BASE_URL } from './src/page/Plugins/EndPoints';


const HomeScreen = ({ navigation }) => {
  const [loginText, setLoginText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [responseText, setResponseText] = useState('');

  const login = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          username: loginText,
          password: passwordText,
        }),
      };

      const response = await fetch(`${API_BASE_URL}/login`, requestOptions);

      if (!response.ok) {
        const errorMessage = await response.text();
        console.log(errorMessage);
        setResponseText(errorMessage);
      } 
      else {
        const dataResponse = await response.json();
        await storeData(dataResponse);
        //VOIR CHATGPT        
        console.log(dataResponse);

        navigation.navigate('Details');
      }
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
          onChangeText={setLoginText}
          value={loginText}
        />
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={setPasswordText}
          value={passwordText}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
        <Text style={styles.forgotButton}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
        <Text style={styles.forgotButton}>Sign Up</Text>
      </TouchableOpacity>

      <ErrorMessage responseText={responseText} />

      <TouchableOpacity style={styles.loginButton} onPress={login}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <ErrorMessage responseText={responseText} />
    </View>
  );
};

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
        <Stack.Screen name='RegisterPage' component={RegisterPage} />
        <Stack.Screen name='ShowMySelf' component={ShowMySelf} />
        <Stack.Screen name='MySelfDetails' component={MySelfDetails} />
        <Stack.Screen name='ModifyMySelf' component={ModifyMySelf} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    width: 220,
    padding: 10,
    backgroundColor: '#89CFF0',
    borderRadius: 80,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  forgotButton: {
    marginTop: 10,
    color: '#888',
    textDecorationLine: 'underline',
  },
  loginButton: {
    width: 200,
    height: 50,
    borderRadius: 25,
    marginTop: 40,
    backgroundColor: '#89CFF0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;