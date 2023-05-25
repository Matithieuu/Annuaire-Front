import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@dataResponse');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
    return null; // Retourne null ou gérez l'erreur de manière appropriée
  }
};

export const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@dataResponse', jsonValue);
  } catch (error) {
    console.log(error);
  }
};

export const mergeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.mergeItem('@dataResponse', jsonValue);
  } catch (error) {
    console.log(error);
  }
}