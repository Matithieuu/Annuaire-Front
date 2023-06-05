import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native';

import { getData, storeData, mergeData } from '../Plugins/StorageUtils';
import { getApiBaseUrl } from '../Plugins/StorageUtils';

function ModifyUser({ navigation }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = await getData();
        setUser(storedData.user);
        setToken(storedData.token);
        setUserInfo(storedData.user); // Set the fetched user data as the initial value of userInfo
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    address: ''
  });

  const sendData = async () => {
    try {
      const API_BASE_URL = await getApiBaseUrl();
      const response = await fetch(`${API_BASE_URL}/users/${userInfo.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      if (!response.ok) {
        throw new Error('Unexpected response status: ' + response.status);
      }

      // Update the user data in the storage
      await mergeData({ user: userInfo });
      navigation.navigate('MainPage');

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.label}>Prénom</Text>
          <TextInput
            style={styles.input}
            onChangeText={(firstName) => setUserInfo({ ...userInfo, firstName })}
            value={userInfo.firstName}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            onChangeText={(lastName) => setUserInfo({ ...userInfo, lastName })}
            value={userInfo.lastName}
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Numéro de téléphone</Text>
          <TextInput
            style={styles.input}
            onChangeText={(phoneNumber) => setUserInfo({ ...userInfo, phoneNumber })}
            value={userInfo.phoneNumber}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Adresse email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(emailAddress) => setUserInfo({ ...userInfo, emailAddress })}
            value={userInfo.emailAddress}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Adresse</Text>
          <TextInput
            style={styles.input}
            onChangeText={(address) => setUserInfo({ ...userInfo, address })}
            value={userInfo.address}
          />
        </View>
        <Button title='Sauvegarder' onPress={sendData} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    flexDirection: 'column',
  },
  box: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
  },
});

export default ModifyUser;
