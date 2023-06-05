import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native';

import { getData } from '../Plugins/StorageUtils';
import { getApiBaseUrl } from '../Plugins/StorageUtils';

function AddContactPage({ navigation }) {
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

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [faxNumber, setFaxNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [notes, setNotes] = React.useState('');

    async function sendData(callback) {
        const API_BASE_URL = await getApiBaseUrl();
        fetch(`${API_BASE_URL}/contacts`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                company,
                firstName,
                lastName,
                phoneNumber,
                fixeNumber: faxNumber,
                emailAddress: email,
                address,
                companyURL: url,
                notes,
            })
        })
            .then(response => {
                navigation.navigate('MainPage');
                return response.json();
            })
            .then(data => {
                console.log(data);
                callback();
            })
            .catch(error => {
                console.log(error);
            });

    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={styles.label}>Prénom</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setFirstName}
                        value={firstName}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.label}>Nom</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setLastName}
                        value={lastName}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.label}>Company</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCompany}
                        value={company}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.label}>Numéro de téléphone</Text>
                    <TextInput
                        keyboardType="numeric"
                        style={styles.input}
                        onChangeText={setPhoneNumber}
                        value={phoneNumber}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.label}>Numéro de fax</Text>
                    <TextInput
                        keyboardType="numeric"
                        style={styles.input}
                        onChangeText={setFaxNumber}
                        value={faxNumber}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.label}>Adresse email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.label}>Adresse</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setAddress}
                        value={address}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.label}>URL Company</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUrl}
                        value={url}
                    />
                </View>

                <View style={styles.box}>
                    <Text style={styles.label}>Notes</Text>
                    <TextInput

                        style={styles.inputNotes}
                        onChangeText={setNotes}
                        value={notes}
                    />
                </View>

                <Button
                    title='Sauvegarder'
                    onPress={() => {
                        if (firstName == "") { // Vérifier si phoneNumber ne correspond pas à la regex
                            alert("Veuillez saisir un prénom");
                        } else {
                            sendData();
                        }
                    }}

                />
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
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
    inputNotes: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        height: 100,
    },
});

export default AddContactPage;