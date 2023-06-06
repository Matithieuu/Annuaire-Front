import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import { getData } from '../Plugins/StorageUtils';

const UserDetails = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = await getData();
        setUser(storedData.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.name}>{user && `${user.firstName} ${user.lastName}`}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Numéro de Téléphone</Text>
          <Text style={styles.info}>{user && user.phoneNumber}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Adresse Email</Text>
          <Text style={styles.info}>{user && user.emailAddress}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Adresse</Text>
          <Text style={styles.info}>{user && user.address}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title='Modifier'
            onPress={() => navigation.navigate('ModifyMySelf')}
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
    padding: 10,
    paddingBottom: 10,
    bottom: 0,
  },
  spacing: {
    width: 10,
  },
});

export default UserDetails;
