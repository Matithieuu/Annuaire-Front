import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Linking, Button, ScrollView, TouchableOpacity, Clipboard, Modal } from 'react-native';

import { getData } from '../Plugins/StorageUtils';
import { getApiBaseUrl } from '../Plugins/StorageUtils';

const ContactDetails = ({ navigation, route }) => {
  const { contact } = route.params;

  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [copiedText, setCopiedText] = useState('');
  const [showPopup, setShowPopup] = useState(false);

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
      const API_BASE_URL = await getApiBaseUrl();
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
      navigation.navigate('MainPage', { contact: contact });
    } catch (error) {
      console.error('Error sending DELETE request:', error);
    }
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    setCopiedText(text);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.name}>{contact.lastName} {contact.firstName} </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Société</Text>
            <TouchableOpacity onPress={() => copyToClipboard(contact.company)}>
              <Text style={styles.info}>{contact.company}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Numéro de Téléphone</Text>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${contact.phoneNumber}`)}>
              <Text style={styles.info}>{contact.phoneNumber}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Adresse Email</Text>
            <TouchableOpacity onPress={() => copyToClipboard(contact.emailAddress)}>
              <Text style={styles.info}>{contact.emailAddress}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Adresse</Text>
            <TouchableOpacity onPress={() => copyToClipboard(contact.address)}>
              <Text style={styles.info}>{contact.address}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Lien WEB</Text>
            <TouchableOpacity onPress={() => Linking.openURL(contact.companyURL)}>
              <Text style={[styles.info, styles.url]}>{contact.companyURL}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Notes</Text>
            <TouchableOpacity onPress={() => copyToClipboard(contact.notes)}>
              <Text style={styles.infoNotes}>{contact.notes}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <Button
                title='Modifier'
                onPress={() => navigation.navigate('ModifyContact', { contact })}
            />

            <View style={styles.spacing} />

            <Button
                title='Supprimer'
                onPress={deleteContact}
            />
          </View>

          <Modal visible={showPopup} transparent animationType="fade">
            <View style={styles.popupContainer}>
              <Text style={styles.popupText}>Text Copied: {copiedText}</Text>
            </View>
          </Modal>
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
    padding: 10,
    paddingBottom: 10,
    bottom: 0,
  },
  spacing: {
    width: 10,
  },
  infoNotes: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'justify',
    height: 100,
  },
  popupContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 5,
  },
  popupText: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
  },
});

export default ContactDetails;
