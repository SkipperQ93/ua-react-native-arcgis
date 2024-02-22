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
              latitude: '25.933428249335368',
              longitude: '51.25955023735113',
              size: 50,
              attributes: {
                isActive: true,
                user: {
                  id: 553,
                  callSign: 'User1',
                },
                member: {
                  id: 487,
                },
                pictureUrl: 'https://i.imgur.com/1QY2ldB.png',
              },
            },
            {
              latitude: '24.861246157675627',
              longitude: '51.11047339547602',
              size: 50,
              attributes: {
                isActive: true,
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
          mapRef.current?.changeOnlineStatus({
            userId: 554,
            onlineStatus: true,
          });
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
          top: 150,
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
          mapRef.current?.changeLocation({
            userId: 554,
            latitude: '25.15332696756259',
            longitude: '51.005270300211855',
          });
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
          top: 150,
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
          mapRef.current?.addPath([
            {
              latitude: '24.890433006515337',
              longitude: '51.250198311494565',
            },
            {
              latitude: '24.834643128734612',
              longitude: '50.98062824506942',
            },
            {
              latitude: '24.660644003290635',
              longitude: '51.031868822610356',
            },
            {
              latitude: '24.74605540528406',
              longitude: '51.267575555445944',
            },
            {
              latitude: '24.890433006515337',
              longitude: '51.250198311494565',
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
          top: 250,
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
          mapRef.current?.clearTracking();
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
