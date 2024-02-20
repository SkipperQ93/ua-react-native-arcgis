import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { UaReactNativeArcgisView } from 'ua-react-native-arcgis';

export default function App() {
  return (
    <View style={styles.container}>
      <UaReactNativeArcgisView color="#32a852" style={styles.box} />
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
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
});
