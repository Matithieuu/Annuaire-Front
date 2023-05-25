import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { storeData, getData } from './Plugins/StorageUtils';

import ShowMySelf from './MySelf/mySelf';

function ShowAPI({ navigation, route }) {
  //const { dataResponse } = route.params;

  const [token, setToken] = useState('');
  const [arrayData, setArrayData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    const storedData = await getData();
    return storedData.token;
  };

  const fetchContactsData = async () => {
    try {
      const token = await fetchData();
      const response = await fetch('http://localhost:8080/api/v1/contacts', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setArrayData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContactsData();
  }, [token]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchContactsData);
    return unsubscribe;
  }, [navigation]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredContacts = arrayData.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(query.toLowerCase()) ||
        contact.phoneNumber.includes(query)
    );
    setFilteredData(filteredContacts);
  };

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredData(arrayData);
    }
  }, [searchQuery, arrayData]);

  const getFirstLetter = (string) => string?.charAt(0)?.toUpperCase() ?? '';

  const renderSeparator = (letter) => (
    <View key={letter} style={styles.separatorContainer}>
      <Text style={styles.separatorText}>{letter}</Text>
    </View>
  );

  const groupContactsByLetter = (contacts) => {
    const groupedContacts = {};
    contacts.forEach((contact) => {
      const firstLetter = getFirstLetter(contact.firstName);
      if (!groupedContacts[firstLetter]) {
        groupedContacts[firstLetter] = [];
      }
      groupedContacts[firstLetter].push(contact);
    });

    const sortedKeys = Object.keys(groupedContacts).sort();
    const sortedGroupedContacts = {};
    sortedKeys.forEach((key) => {
      sortedGroupedContacts[key] = groupedContacts[key];
    });

    return sortedGroupedContacts;
  };

  const groupedData = groupContactsByLetter(filteredData);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="🔎 Search..."
        onChangeText={handleSearch}
        value={searchQuery}
      />

      {Object.keys(groupedData).map((letter) => (
        <View key={letter}>
          {renderSeparator(letter)}
          {groupedData[letter].map((contact, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactContainer}
              onPress={() =>
                navigation.navigate('ContactDetails', {
                  contact,
                })
              }
            >
              <Text style={styles.contactName}>{contact.firstName}</Text>
              <Text>{contact.phoneNumber}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

export default function SecondPage({ navigation, route }) {
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
    <View style={styles.container}>
      <ShowMySelf navigation={navigation} route={route} user={user} />
      {user && <ShowAPI navigation={navigation} />}
      <View style={styles.buttonContainer}>
        <Button
          title="Add Contact"
          onPress={() =>
            navigation.navigate('AddContactPage')
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  separatorContainer: {
    backgroundColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  separatorText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contactContainer: {
    borderRadius: 5,
    marginBottom: 20,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    padding: 10,
    paddingBottom: 10,
  },
});
