import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';

const DisconnectComponent = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.box}>
        <Image
          source={require('../../../assets/icons8-logout-50.png')}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  box: {
    width: "120%",
    height: 64,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
};

export default DisconnectComponent;
