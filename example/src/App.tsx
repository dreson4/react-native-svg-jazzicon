import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import Jazzicon from 'react-native-svg-jazzicon';

export default function App() {
  return (
    <View style={styles.container}>
      <Jazzicon
        size={300}
        address={
          'nano_1zpdhgrqh9wfhgyqab5iiwtd6rizq376yueysz7us8gn51aq94qd6qwajww'
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
