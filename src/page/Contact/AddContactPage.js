import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TextInput, Alert } from 'react-native';

import { getData, storeData } from '../Plugins/StorageUtils';
import {API_BASE_URL} from '../Plugins/EndPoints';



function AddContactPage({ navigation, route }) {

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

    // Définir les états pour chaque champ de formulaire
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [faxNumber, setFaxNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [url, setUrl] = React.useState('');

    // Envoyer les données du formulaire à la base de données en utilisant une requête HTTP POST
    function sendData(callback) {
        fetch(`${API_BASE_URL}/contacts`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "company": company,
                "firstName": firstName,
                "secondName": lastName,
                "phoneNumber": phoneNumber,
                "fixeNumber": faxNumber,
                "emailAddress": email,
                "address": address,
                "companyURL": url,
            })
        })
            .then(response => {
                navigation.navigate('Details');
                return response.json();
            })
            .then(data => {
                console.log(data);
                callback();
            })
            .catch(error => {
                console.error(error);
            });

    }

    // Rendu de l'interface utilisateur

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
                <Button
                    title='Sauvegarder'
                    onPress={() => {
                        const regexPhoneNumber = new RegExp('^(?:[0-9]\\s?){2,14}[0-9]$'); // Compiler la regex en une expression régulière JavaScript valide
                        if (firstName == "") { // Vérifier si phoneNumber ne correspond pas à la regex
                            alert("Veuillez saisir un prénom et un numéro de téléphone valide");
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
});

export default AddContactPage;