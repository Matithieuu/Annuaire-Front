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

function ShowAPI({ navigation, route }) {
    const { token } = route.params;

    const [arrayData, setArrayData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchContacts = async () => {
        try {
            const response = await fetch('http://0.0.0.0:8080/api/v1/contacts', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*', // Set the desired Access-Control-Allow-Origin header
                },
            });
            const data = await response.json();
            setArrayData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchContacts();
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        fetchContacts();
    }, []);

    const filteredData = arrayData.filter((contact) =>
        contact.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getFirstLetter = (string) => {
        if (string && string.length > 0) {
            return string.charAt(0).toUpperCase();
        }
        return '';
    };

    // Function to render separators
    const renderSeparator = (letter) => {
        return (
            <View key={letter} style={styles.separatorContainer}>
                <Text style={styles.separatorText}>{letter}</Text>
            </View>
        );
    };

    // Function to group contacts by the first letter of their names
    const groupContactsByLetter = (contacts) => {
        const groupedContacts = {};
        contacts.forEach((contact) => {
          const firstLetter = getFirstLetter(contact.firstName);
          if (!groupedContacts[firstLetter]) {
            groupedContacts[firstLetter] = [];
          }
          groupedContacts[firstLetter].push(contact);
        });
      
        // Tri des clés (premières lettres) dans l'ordre alphabétique
        const sortedKeys = Object.keys(groupedContacts).sort();
      
        // Création d'un nouvel objet avec les clés triées
        const sortedGroupedContacts = {};
        sortedKeys.forEach((key) => {
          sortedGroupedContacts[key] = groupedContacts[key];
        });
      
        return sortedGroupedContacts;
      };

    // Group the filtered data by the first letter of names
    const groupedData = groupContactsByLetter(filteredData);


    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainerStyle}>
            <TextInput
                style={styles.searchBar}
                placeholder="🔎 Search..."
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
            />
            {Object.keys(groupedData).map((letter) => (
                <View key={letter}>
                    {renderSeparator(letter)}
                    {groupedData[letter].map((contact, index) => (
                        <View key={index} style={styles.contactContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('ContactDetails', {
                                        contact: contact,
                                        token: token,
                                    });
                                }}
                            >
                                <Text style={styles.contactName}>{contact.firstName}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}

export default function SecondPage({ navigation, route }) {
    return (
        <View style={styles.container}>
            <ShowAPI navigation={navigation} route={route} />
            <View style={styles.buttonContainer}>
                <Button
                    title="Add Contact"
                    onPress={() => navigation.navigate('AddContactPage', { token: route.params.token })}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    contentContainerStyle: {
        paddingBottom: 100,
    },
    contactContainer: {
        flex: 1,
        top: 20,
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
        bottom: 0,
        padding: 10,
        paddingBottom: 10,
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    separatorContainer: {
        backgroundColor: '#ccc',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    separatorText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
