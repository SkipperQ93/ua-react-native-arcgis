import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import UaReactNativeArcgisView from 'ua-react-native-arcgis';
import { useEffect, useRef } from 'react';

export default function App() {
  const mapRef = useRef(null);

  useEffect(() => {
    console.log(mapRef.current);
  }, []);

  return (
    <View style={styles.container}>
      <UaReactNativeArcgisView
        ref={mapRef}
        layers={[
          'https://gatewaygis.qatar.ncc:6443/arcgis/rest/services/Common/Satellite_EN/MapServer',
          'https://gatewaygis.qatar.ncc:6443/arcgis/rest/services/FIFA_Maps/CUP_MAP/MapServer',
        ]}
        style={styles.box}
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
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
});
