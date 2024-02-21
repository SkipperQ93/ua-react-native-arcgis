import * as React from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';
import UaReactNativeArcgisView, {
  type UaReactNativeArcgisViewType,
} from 'ua-react-native-arcgis';
import { useRef } from 'react';

export default function App() {
  const mapRef = useRef<UaReactNativeArcgisViewType>(null);

  return (
    <View style={styles.container}>
      <UaReactNativeArcgisView
        ref={mapRef}
        layers={[
          'https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer',
          // 'https://gatewaygis.qatar.ncc:6443/arcgis/rest/services/Common/Satellite_EN/MapServer',
          // 'https://gatewaygis.qatar.ncc:6443/arcgis/rest/services/FIFA_Maps/CUP_MAP/MapServer',
        ]}
        style={styles.box}
      />
      <Pressable
        style={{
          position: 'absolute',
          top: 50,
          left: 50,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 4,
          elevation: 3,
          backgroundColor: 'black',
        }}
        onPress={(_event) => {
          mapRef.current?.addPoints([
            {
              x: '8264924.101084',
              y: '5139684.227901',
              size: 50,
              attributes: {
                user: {
                  id: 554,
                  callSign: 'User1',
                },
                member: {
                  id: 487,
                },
                pictureUrl: 'https://i.imgur.com/1QY2ldB.png',
              },
            },
          ]);
        }}
      >
        <Text
          style={{
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
          }}
        >
          {'TEST'}
        </Text>
      </Pressable>
      <Pressable
        style={{
          position: 'absolute',
          top: 50,
          right: 50,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 4,
          elevation: 3,
          backgroundColor: 'black',
        }}
        onPress={(_event) => {
          mapRef.current?.addPoints([
            {
              x: '8264924.101084',
              y: '5139684.227901',
              size: 50,
              attributes: {
                user: {
                  id: 554,
                  callSign: 'User1',
                },
                member: {
                  id: 487,
                },
                pictureUrl: 'https://i.imgur.com/1QY2ldB.png',
              },
            },
          ]);
        }}
      >
        <Text
          style={{
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
          }}
        >
          {'TEST'}
        </Text>
      </Pressable>
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
