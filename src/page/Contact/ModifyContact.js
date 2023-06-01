import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';

import { getData, storeData } from '../Plugins/StorageUtils';
import { getApiBaseUrl } from '../Plugins/StorageUtils';

function ModifyContact({ navigation, route }) {
  const { contact } = route.params;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = await getData();
        setUser(storedData.user);
        setToken(storedData.token);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const [firstNameChange, setFirstName] = useState(contact.firstName);
  const [lastNameChange, setLastName] = useState(contact.secondName);
  const [companyChange, setCompany] = useState(contact.company);
  const [phoneNumberChange, setPhoneNumber] = useState(contact.phoneNumber);
  const [faxNumberChange, setFaxNumber] = useState(contact.fixeNumber);
  const [emailChange, setEmail] = useState(contact.emailAddress);
  const [addressChange, setAddress] = useState(contact.address);
  const [urlChange, setUrl] = useState(contact.companyURL);

  async function sendData(firstName, lastName, company, phoneNumber, faxNumber, email, address, url, contact) {
    console.log(contact.id);
    const API_BASE_URL = await getApiBaseUrl(); // Await the resolution of the promise
    fetch(`${API_BASE_URL}/contacts/${contact.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company,
        firstName,
        secondName: lastName,
        phoneNumber,
        fixeNumber: faxNumber,
        emailAddress: email,
        address,
        companyURL: url,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 202) {
          navigation.navigate('Details', { contact: contact });
          return response.json();
        } else {
          throw new Error('Unexpected response status: ' + response.status);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.box}>
          <Text style={styles.label}>Prénom</Text>
          <TextInput style={styles.input} onChangeText={setFirstName} value={firstNameChange} />
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Nom</Text>
          <TextInput style={styles.input} onChangeText={setLastName} value={lastNameChange} />
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Company</Text>
          <TextInput style={styles.input} onChangeText={setCompany} value={companyChange} />
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Numéro de téléphone</Text>
          <TextInput style={styles.input} onChangeText={setPhoneNumber} value={phoneNumberChange} />
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Numéro de fax</Text>
          <TextInput style={styles.input} onChangeText={setFaxNumber} value={faxNumberChange} />
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Adresse email</Text>
          <TextInput style={styles.input} onChangeText={setEmail} value={emailChange} />
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Adresse</Text>
          <TextInput style={styles.input} onChangeText={setAddress} value={addressChange} />
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>URL Company</Text>
          <TextInput style={styles.input} onChangeText={setUrl} value={urlChange} />
        </View>
        <Button
          title="Sauvegarder"
          onPress={() => {
            console.log(firstNameChange, lastNameChange, companyChange, phoneNumberChange, faxNumberChange, emailChange, addressChange, urlChange, contact);
            sendData(firstNameChange, lastNameChange, companyChange, phoneNumberChange, faxNumberChange, emailChange, addressChange, urlChange, contact);
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  box: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    margin: 2,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
  },
});

export default ModifyContact;
