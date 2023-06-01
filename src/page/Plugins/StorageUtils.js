import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@dataResponse');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
    return null;
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

export const updateApiBaseUrl = async () => {
  const storedData = await getData();
  API_BASE_URL = storedData.apiUrl;
};

export const mergeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.mergeItem('@dataResponse', jsonValue);
    await updateApiBaseUrl(); // Update the API_BASE_URL variable
  } catch (error) {
    console.log(error);
  }
};

export const getApiBaseUrl = async () => {
  const url = await AsyncStorage.getItem("@apiUrl");
  return url;
};

export let API_BASE_URL = getApiBaseUrl();