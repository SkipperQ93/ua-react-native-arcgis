import * as React from 'react';

import {
  ActionSheetIOS,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import UaReactNativeArcgisView, {
  type UaReactNativeArcgisViewType,
} from 'ua-react-native-arcgis';
import { useRef } from 'react';

export default function App() {
  const mapRef = useRef<UaReactNativeArcgisViewType>(null);

  const options = [
    {
      title: 'Add Points (Animation)',
      function: () => {
        mapRef.current?.addPoints([
          {
            latitude: '24.863053760789168',
            longitude: '51.10819798512265',
            attributes: {
              isActive: true,
              user: {
                id: 532,
                callSign: 'User1',
              },
              member: {
                id: 487,
              },
              pictureUrl: 'https://i.imgur.com/1QY2ldB.png',
            },
          },
          {
            latitude: '25.933428249335368',
            longitude: '51.25955023735113',
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
        ]);
      },
    },
    {
      title: 'Switch Online/Offline',
      function: () => {
        mapRef.current?.changeOnlineStatus({
          userId: 554,
          onlineStatus: false,
        });
      },
    },
    {
      title: 'Change Location',
      function: () => {
        mapRef.current?.changeLocation({
          userInformation: {
            isActive: true,
            user: {
              id: 555,
              callSign: 'User1',
            },
            member: {
              id: 487,
            },
            pictureUrl: 'https://i.imgur.com/1QY2ldB.png',
          },
          latitude: '25.15332696756259',
          longitude: '51.005270300211855',
        });
      },
    },
    {
      title: 'Add Path',
      function: () => {
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
      },
    },
    {
      title: 'Clear Path',
      function: () => {
        mapRef.current?.clearTracking();
      },
    },
    {
      title: 'Add Path (Animation)',
      function: () => {
        mapRef.current?.addPathAnimation({
          points: [
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
          ],
          speed: 0.1,
        });
      },
    },
    {
      title: 'Zoom',
      function: () => {
        mapRef.current?.zoomToGraphicsLayer();
      },
    },
    {
      title: 'Add Points (No Animation)',
      function: () => {
        mapRef.current?.addPointsWithoutAnimation([
          {
            latitude: '24.83460329476799',
            longitude: '50.709709560726125',
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
      },
    },
    {
      title: 'Remove Point',
      function: () => {
        mapRef.current?.removePoint({
          userId: 554,
        });
      },
    },
  ];

  return (
    <View style={styles.container}>
      <UaReactNativeArcgisView
        onLog={(data) => {
          if (data.nativeEvent) {
            console.log('MapLog:', data.nativeEvent.key, data.nativeEvent.log);
          }
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        ref={mapRef}
        layers={[
          // 'https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer',
          'https://services.gisqatar.org.qa/server/rest/services/Imagery/QatarSatelitte_WGS84/MapServer',
        ]}
        pinpointConfig={{
          url: 'https://i.imgur.com/nn3cmIe.png',
          readMode: false,
          // latitude: '25.078627850921436',
          // longitude: '51.06309557222483',
        }}
        pinpointMode={false}
        onPointTap={(data) => {
          console.log('data', JSON.stringify(data.nativeEvent));
        }}
        onMapViewLoad={() => {
          console.log('Map Loaded.');
        }}
        licenseKey={''}
      />
      <Pressable
        style={{
          position: 'absolute',
          top: 50,
          left: 10,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 4,
          elevation: 3,
          backgroundColor: 'white',
        }}
        onPress={(_event) => {
          ActionSheetIOS.showActionSheetWithOptions(
            {
              options: [...options.map((value) => value.title), 'Cancel'],
              cancelButtonIndex: options.length,
            },
            (buttonIndex) => {
              options[buttonIndex]?.function();
            }
          );
        }}
      >
        <Text
          style={{
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'black',
          }}
        >
          {'>'}
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
});
