import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Linking, Button, ScrollView } from 'react-native';

import { getData, storeData } from '../Plugins/StorageUtils';
import {getApiBaseUrl} from '../Plugins/StorageUtils';



const ContactDetails = ({ navigation, route }) => {
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

  const deleteContact = async () => {
    try {
      const API_BASE_URL = await getApiBaseUrl(); // Await the resolution of the promise
      const response = await fetch(`${API_BASE_URL}/contacts/${contact.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('DELETE request successful');
      navigation.navigate('Details', { contact: contact });
    } catch (error) {
      console.error('Error sending DELETE request:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.name}>{contact.firstName} {contact.secondName}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Company</Text>
          <Text style={styles.info}>{contact.company}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Phone Number</Text>
          <Text style={styles.info} onPress={() => Linking.openURL(`tel:${contact.phoneNumber}`)}>{contact.phoneNumber}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email Address</Text>
          <Text style={styles.info}>{contact.emailAddress}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Address</Text>
          <Text style={styles.info}>{contact.address}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>URL</Text>
          <Text style={[styles.info, styles.url]} onPress={() => Linking.openURL(contact.companyURL)}>{contact.companyURL}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title='Modifier'
            onPress={() => navigation.navigate('ModifyContact', { contact, token })}
          />

          <View style={styles.spacing} />

          <Button
            title='Supprimer'
            onPress={deleteContact}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  box: {
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#89CFF0',
    padding: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  url: {
    color: '#0000FF',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    //Donne l'effet de centrage des boutons
    padding: 10,
    paddingBottom: 10,
    bottom: 0,
  },
  spacing: {
    width: 10,
  },
});

export default ContactDetails;
