import * as React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native';

function ModifyContact({ navigation, route }) {
    const { contact } = route.params;
    const { token } = route.params;

    const [firstNameChange, setFirstName] = React.useState(contact.firstName);
    const [lastNameChange, setLastName] = React.useState(contact.secondName);
    const [companyChange, setCompany] = React.useState(contact.company);
    const [phoneNumberChange, setPhoneNumber] = React.useState(contact.phoneNumber);
    const [faxNumberChange, setFaxNumber] = React.useState(contact.fixeNumber);
    const [emailChange, setEmail] = React.useState(contact.emailAddress);
    const [addressChange, setAddress] = React.useState(contact.address);
    const [urlChange, setUrl] = React.useState(contact.companyURL);

    function sendData(firstName, lastName, company, phoneNumber, faxNumber, email, address, url, contact) {
        console.log(contact.id);
        fetch(`http://0.0.0.0:8080/api/v1/contacts/${contact.id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
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
            .then(response => {
                console.log(response);
                if (response.status === 202) {
                    navigation.navigate('Details', { contact: contact, token: token });
                    return response.json();
                } else {
                    throw new Error('Unexpected response status: ' + response.status);
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
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
                        value={firstNameChange}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.label}>Nom</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setLastName}
                        value={lastNameChange}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.label}>Company</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCompany}
                        value={companyChange}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.label}>Numéro de téléphone</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPhoneNumber}
                        value={phoneNumberChange}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.label}>Numéro de fax</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setFaxNumber}
                        value={faxNumberChange}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.label}>Adresse email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={emailChange}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.label}>Adresse</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setAddress}
                        value={addressChange}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.label}>URL Company</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUrl}
                        value={urlChange}
                    />
                </View>
                <Button
                    title='Sauvegarder'
                    onPress={() => {
                        sendData(firstNameChange, lastNameChange, companyChange, phoneNumberChange, faxNumberChange, emailChange, addressChange, urlChange, contact);
                    }
                    }
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

export default ModifyContact;
