import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';

import { getData } from '../Plugins/StorageUtils';
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
  const [lastNameChange, setLastName] = useState(contact.lastName);
  const [companyChange, setCompany] = useState(contact.company);
  const [phoneNumberChange, setPhoneNumber] = useState(contact.phoneNumber);
  const [faxNumberChange, setFaxNumber] = useState(contact.fixeNumber);
  const [emailChange, setEmail] = useState(contact.emailAddress);
  const [addressChange, setAddress] = useState(contact.address);
  const [urlChange, setUrl] = useState(contact.companyURL);
  const [notesChange, setNotes] = useState(contact.notes);

  async function sendData(firstName, lastName, company, phoneNumber, faxNumber, email, address, url, notes, contact) {
    console.log(contact.id);
    const API_BASE_URL = await getApiBaseUrl();
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
        lastName: lastName,
        phoneNumber,
        fixeNumber: faxNumber,
        emailAddress: email,
        address,
        companyURL: url,
        notes: notes,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 202) {
          navigation.navigate('MainPage', { contact: contact });
          return response.json();
        } else {
          throw new Error('Unexpected response status: ' + response.status);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
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
        <View style={styles.box}>
          <Text style={styles.label}>Notes</Text>
          <TextInput style={styles.inputNotes} onChangeText={setNotes} value={notesChange} multiline={true} />
        </View>

        <Button
          title="Sauvegarder"
          onPress={() => {
            console.log(firstNameChange, lastNameChange, companyChange, phoneNumberChange, faxNumberChange, emailChange, addressChange, urlChange, notesChange, contact);
            sendData(firstNameChange, lastNameChange, companyChange, phoneNumberChange, faxNumberChange, emailChange, addressChange, urlChange, notesChange, contact);
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
  inputNotes: {
    margin: 2,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top',
  },
});

export default ModifyContact;
