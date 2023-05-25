import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ErrorMessage({ responseText }) {
    return (
        <View style={styles.errorContainer}>
            {responseText ? (
                <Text style={styles.responseText}>{responseText}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    errorContainer: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    responseText: {
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold',
    },
});

export default ErrorMessage;
