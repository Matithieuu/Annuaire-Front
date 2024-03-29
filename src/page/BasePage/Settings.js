import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../Plugins/StorageUtils';

import { mergeData } from '../Plugins/StorageUtils';

function SettingsPage() {
    const navigation = useNavigation();
    const [apiUrl, setApiUrl] = useState(API_BASE_URL);

    async function loadApiUrl() {
        const apiUrl = await AsyncStorage.getItem('@apiUrl');
        if (apiUrl) {
            setApiUrl(apiUrl);
        }
    }

    async function saveApiUrl(apiUrl) {
        await AsyncStorage.setItem('@apiUrl', apiUrl);
        mergeData({ apiUrl });
        setApiUrl(apiUrl);
      }
      

    function handleSaveSettings() {
        saveApiUrl(apiUrl);
        console.log(apiUrl);
        alert('Paramètres enregistrés');
        navigation.goBack();
    }

    useEffect(() => {
        loadApiUrl();
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Paramètres</Text>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="API URL"
                    onChangeText={setApiUrl}
                    value={apiUrl}
                    keyboardType="url"
                    autoCapitalize="none"
                />
            </View>
            <Text style={styles.text}>
                Cela devrait ressembler à: https://api.example.com/api/v1
            </Text>


            <TouchableOpacity style={styles.save} onPress={handleSaveSettings}>
                <Text>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    input: {
        width: 300,
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    save: {
        width: 300,
        height: 40,
        backgroundColor: '#89CFF0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    text: {
        fontSize: 12,
        color: '#A9A9A9',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default SettingsPage;
