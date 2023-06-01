import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

const AboutPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>A propos</Text>
      <Text style={styles.description}>
        Projet développé par Mathieu YAHIA-AMAR pour le stage de fin de 2ème année de BUT Informatique pour la société ALIS Informatique.
      </Text>
      <Text style={[styles.info, styles.url]} onPress={() => Linking.openURL("https://github.com/Matithieuu/Annuaire-Front")}>Github</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  info: {
    marginTop: 30,
    fontSize: 16,
    marginBottom: 10,
  },
  url: {
    color: '#89CFF0',
  },
});

export default AboutPage;
