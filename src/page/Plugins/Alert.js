import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Alert from "react-native-awesome-alerts";


const PracticeApp = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleHideAlert = () => {
    setShowAlert(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleShowAlert}>
        <View style={styles.button}>
          <Text style={styles.text}>Greet Me</Text>
        </View>
      </TouchableOpacity>

      <Alert
        show={showAlert}
        message="Hello, Nice To Meet You  :"
        closeOnTouchOutside={true}
        onDismiss={handleHideAlert}
      />
    </View>
  );
};

export default PracticeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
    color: "#fff",
    fontSize: 15,
  },
});
