import React from 'react';
import { StyleSheet, View, Text, Linking, Button } from 'react-native';

const ContactDetails = ({ navigation, route }) => {
  const { contact } = route.params;
  const { token } = route.params;

  const deleteContact = async () => {
    try {
      const response = await fetch(`http://0.0.0.0:8080/api/v1/contacts/${contact.id}`, {
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
      navigation.navigate('Details', { contact: contact, token: token });
    } catch (error) {
      console.error('Error sending DELETE request:', error);
    }
  };

  return (
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
        <Text style={styles.info}>{contact.phoneNumber}</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
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
    width:10,
},
});

export default ContactDetails;