import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native'; // Import the useIsFocused hook
import { getData } from '../Plugins/StorageUtils';

export default function ShowMySelf({ navigation }) {
  const isFocused = useIsFocused(); // Use the useIsFocused hook

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
  }, [isFocused]); // Add isFocused as a dependency to re-fetch data when the screen is focused

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate('MySelfDetails')}
      >
        <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
        <Text style={styles.details}>Touchez pour voir les détails</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: '70%',
    height: 50,
  },
  touchable: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: '#777',
  },
});
