import * as React from 'react';
import { StyleSheet, View, Button, TextInput, ScrollView } from 'react-native';


function ForgotPassword({ navigation, route }) {
    const [email, setEmail] = React.useState("");
    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    style={styles.emailInput}
                    placeholder='Enter your password'
                    onChangeText={(email) => setEmail(email)} />
            </View>
            <View>
                <Button title='Sumbit Email Adress' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emailInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        backgroundColor: "#89CFF0",
        borderRadius: 80,
    },
});

export default ForgotPassword;
