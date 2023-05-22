import * as React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import axios from 'axios';

function ShowAPI() {
    axios.get('http://localhost:8080/test-1.0-SNAPSHOT/api/contacts')
        .then(response => {
            const data = response.data;
            for (let i = 0; i < data.length; i++) {
                const address = data[i].address;
                const company = data[i].company;
                const emailAddress = data[i].emailAddress;
                const firstName = data[i].firstName;
                const fixeNumber = data[i].fixeNumber;
                const phoneNumber = data[i].phoneNumber;
                const secondName = data[i].secondName;
                const urlCompany = data[i].urlCompany;
                console.log(`Object ${i + 1}`);
                console.log('Address: ', address);
                console.log('Company: ', company);
                console.log('Email Address: ', emailAddress);
                console.log('First Name: ', firstName);
                console.log('Fixe Number: ', fixeNumber);
                console.log('Phone Number: ', phoneNumber);
                console.log('Second Name: ', secondName);
                console.log('URL Company: ', urlCompany);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export default ShowAPI;

/*
                for (let a = 0; a < data.length; a++) {
                    console.log("ouistiti" + [a])
                    return (
                        <View>
                            <Text>
                                {company}
                            </Text>
                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                }}
                            />
                        </View>
                    );
                }*/