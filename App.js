import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, TouchableHighlight, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Menu, MenuItem } from 'react-native-material-menu';
import { useNavigation } from '@react-navigation/native';

import MainPage from './src/page/MainPage';
import ForgotPassword from './src/page/BasePage/ForgotPassword';
import ContactDetails from './src/page/Contact/ContactDetails';
import AddContactPage from './src/page/Contact/AddContactPage';
import ModifyContact from './src/page/Contact/ModifyContact';
import RegisterPage from './src/page/BasePage/RegisterPage';
import ShowMySelf from './src/page/MySelf/MySelf';
import MySelfDetails from './src/page/MySelf/MySelfDetails';
import ModifyMySelf from './src/page/MySelf/ModifyMyself';
import ErrorMessage from './src/page/Plugins/ErrorMessage';
import SettingsApp from './src/page/BasePage/Settings';
import About from './src/page/BasePage/AboutPage';
import { sanitizeInput } from './src/page/Plugins/SanitizeInput';

import { storeData, getData, getApiBaseUrl } from './src/page/Plugins/StorageUtils';

const MenuDeroulant = () => {
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const navigation = useNavigation();

  const goToSettings = () => {
    navigation.navigate('SettingsPage');
    hideMenu();
  };

  const goToAbout = () => {
    navigation.navigate('About');
    hideMenu();
  };

  return (
    <View style={styles.scrollingMenu}>
      <Menu
        visible={visible}
        anchor={
          <TouchableHighlight onPress={showMenu}>
            <Image
              source={require('./assets/cogwheel.png')}
              style={styles.imageTitleScrollingMenu}
            ></Image>
          </TouchableHighlight>
        }
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={goToSettings}>Settings</MenuItem>
        <MenuItem onPress={goToAbout}>About</MenuItem>
      </Menu>
    </View>
  );
};

const LoginScreen = ({ navigation }) => {
  const [loginText, setLoginText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE_URL = await getApiBaseUrl();

        console.log('Token and Users:', getData(), 'ApiURL:', API_BASE_URL);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const login = async () => {
    try {
      const API_BASE_URL = await getApiBaseUrl();
      const sanitizedLogin = sanitizeInput(loginText);
      const sanitizedPassword = sanitizeInput(passwordText);

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          username: sanitizedLogin,
          password: sanitizedPassword,
        }),
      };

      const response = await fetch(`${API_BASE_URL}/login`, requestOptions);

      if (!response.ok) {
        const errorMessage = await response.text();
        if (errorMessage == null) {
          setResponseText('Server is not responding');
        } else {
          console.log(errorMessage);
          setResponseText(errorMessage);
        }
      } else {
        const dataResponse = await response.json();
        await storeData(dataResponse);
        console.log(dataResponse);

        navigation.navigate('MainPage');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      <MenuDeroulant />
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Login"
          onChangeText={setLoginText}
          value={loginText}
        />
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPasswordText}
          value={passwordText}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={login}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <View>
        <Text>{responseText}</Text>
      </View>
    </ScrollView>
  );
};


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginPage" component={LoginScreen} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="ContactDetails" component={ContactDetails} />
        <Stack.Screen name="AddContactPage" component={AddContactPage} />
        <Stack.Screen name="ModifyContact" component={ModifyContact} />
        <Stack.Screen name="ShowMySelf" component={ShowMySelf} />
        <Stack.Screen name="MySelfDetails" component={MySelfDetails} />
        <Stack.Screen name="ModifyMySelf" component={ModifyMySelf} />
        <Stack.Screen name="SettingsPage" component={SettingsApp} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
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
  scrollingMenu: {
    position: 'absolute',
    top: '5%',
    left: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#f5f5f5',
    borderColor: '#f5f5f5',
  },
  imageTitleScrollingMenu: {
    width: 35,
    height: 35,
  },
});

export default App;

/*
 <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
        <Text style={styles.forgotButton}>Sign Up</Text>
      </TouchableOpacity>

              <Stack.Screen name="RegisterPage" component={RegisterPage} />

 */

/*
        <Stack.Screen name="Forgot Password" component={ForgotPassword} />

      <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
        <Text style={styles.forgotButton}>Forgot Password?</Text>
      </TouchableOpacity>
 */