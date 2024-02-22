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
        style={styles.box}
        ref={mapRef}
        layers={[
          'https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer',
          // 'https://gatewaygis.qatar.ncc:6443/arcgis/rest/services/Common/Satellite_EN/MapServer',
          // 'https://gatewaygis.qatar.ncc:6443/arcgis/rest/services/FIFA_Maps/CUP_MAP/MapServer',
        ]}
        pinpointUrlString={'https://i.imgur.com/nn3cmIe.png'}
        pinpointMode={true}
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
              attributes: {
                isActive: true,
                user: {
                  id: 553,
                  callSign: 'User1',
                },
                member: {
                  id: 487,
                },
                pictureUrl:
                  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzEnIGhlaWdodD0nNDYnIHZpZXdCb3g9JzAgMCAzMSA0NicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZyBmaWx0ZXI9J3VybCgjZmlsdGVyMF9kXzBfMyknPjxjaXJjbGUgY3g9JzE1LjU1ODgnIGN5PScyOC44NTI3JyByPScxMi4wMTE4JyBmaWxsPScjM0M2QUY3JyBmaWxsLW9wYWNpdHk9JzAuMScgc3Ryb2tlPScjM0M2QUY3JyBzdHJva2Utd2lkdGg9JzAuMicvPjwvZz48ZyBjbGlwLXBhdGg9J3VybCgjY2xpcDBfMF8zKSc+PHBhdGggZD0nTTIzLjYyNzEgNy42MjcxMkMyMy42MjcxIDMuNDIxNTMgMjAuMjA1NiAwIDE2IDBDMTEuNzk0NCAwIDguMzcyODggMy40MjE1MyA4LjM3Mjg4IDcuNjI3MTJDOC4zNzI4OCAxMS42NjE0IDExLjUyMjkgMTQuOTY0OSAxNS40OTE1IDE1LjIyODNWMjkuNDkxNUMxNS40OTE1IDI5Ljc3MjcgMTUuNzE5MyAzMCAxNiAzMEMxNi4yODA3IDMwIDE2LjUwODUgMjkuNzcyNyAxNi41MDg1IDI5LjQ5MTVWMTUuMjI4M0MyMC40NzcxIDE0Ljk2NDkgMjMuNjI3MSAxMS42NjE0IDIzLjYyNzEgNy42MjcxMlpNMTMuNDU3NiA3LjYyNzEyQzEyLjMzNTkgNy42MjcxMiAxMS40MjM3IDYuNzE0OTIgMTEuNDIzNyA1LjU5MzIyQzExLjQyMzcgNC40NzE1MyAxMi4zMzU5IDMuNTU5MzIgMTMuNDU3NiAzLjU1OTMyQzE0LjU3OTMgMy41NTkzMiAxNS40OTE1IDQuNDcxNTMgMTUuNDkxNSA1LjU5MzIyQzE1LjQ5MTUgNi43MTQ5MiAxNC41NzkzIDcuNjI3MTIgMTMuNDU3NiA3LjYyNzEyWicgZmlsbD0nIzQ5NTU3MycvPjxtYXNrIGlkPSdtYXNrMF8wXzMnIHN0eWxlPSdtYXNrLXR5cGU6YWxwaGEnIG1hc2tVbml0cz0ndXNlclNwYWNlT25Vc2UnIHg9JzgnIHk9JzAnIHdpZHRoPScxNycgaGVpZ2h0PScxNic+PHJlY3QgeD0nOCcgd2lkdGg9JzE3JyBoZWlnaHQ9JzE1LjIyJyBmaWxsPScjRDlEOUQ5Jy8+PC9tYXNrPjxnIG1hc2s9J3VybCgjbWFzazBfMF8zKSc+PHJlY3QgeD0nMTEnIHk9JzMnIHdpZHRoPSc2JyBoZWlnaHQ9JzYnIGZpbGw9JyNGRjU5NUMnLz48cGF0aCBkPSdNMjMuNjI3MSA3LjYyNzEyQzIzLjYyNzEgMy40MjE1MyAyMC4yMDU2IDAgMTYgMEMxMS43OTQ0IDAgOC4zNzI4OCAzLjQyMTUzIDguMzcyODggNy42MjcxMkM4LjM3Mjg4IDExLjY2MTQgMTEuNTIyOSAxNC45NjQ5IDE1LjQ5MTUgMTUuMjI4M1YyOS40OTE1QzE1LjQ5MTUgMjkuNzcyNyAxNS43MTkzIDMwIDE2IDMwQzE2LjI4MDcgMzAgMTYuNTA4NSAyOS43NzI3IDE2LjUwODUgMjkuNDkxNVYxNS4yMjgzQzIwLjQ3NzEgMTQuOTY0OSAyMy42MjcxIDExLjY2MTQgMjMuNjI3MSA3LjYyNzEyWk0xMy40NTc2IDcuNjI3MTJDMTIuMzM1OSA3LjYyNzEyIDExLjQyMzcgNi43MTQ5MiAxMS40MjM3IDUuNTkzMjJDMTEuNDIzNyA0LjQ3MTUzIDEyLjMzNTkgMy41NTkzMiAxMy40NTc2IDMuNTU5MzJDMTQuNTc5MyAzLjU1OTMyIDE1LjQ5MTUgNC40NzE1MyAxNS40OTE1IDUuNTkzMjJDMTUuNDkxNSA2LjcxNDkyIDE0LjU3OTMgNy42MjcxMiAxMy40NTc2IDcuNjI3MTJaJyBmaWxsPScjRTYzMDJGJy8+PC9nPjwvZz48ZGVmcz48ZmlsdGVyIGlkPSdmaWx0ZXIwX2RfMF8zJyB4PScwLjQ0NzA1MicgeT0nMTUuNzQwOScgd2lkdGg9JzMwLjIyMzUnIGhlaWdodD0nMzAuMjIzNScgZmlsdGVyVW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9J3NSR0InPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9JzAnIHJlc3VsdD0nQmFja2dyb3VuZEltYWdlRml4Jy8+PGZlQ29sb3JNYXRyaXggaW49J1NvdXJjZUFscGhhJyB0eXBlPSdtYXRyaXgnIHZhbHVlcz0nMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAnIHJlc3VsdD0naGFyZEFscGhhJy8+PGZlT2Zmc2V0IGR5PScyJy8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMS41Jy8+PGZlQ29tcG9zaXRlIGluMj0naGFyZEFscGhhJyBvcGVyYXRvcj0nb3V0Jy8+PGZlQ29sb3JNYXRyaXggdHlwZT0nbWF0cml4JyB2YWx1ZXM9JzAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCcvPjxmZUJsZW5kIG1vZGU9J25vcm1hbCcgaW4yPSdCYWNrZ3JvdW5kSW1hZ2VGaXgnIHJlc3VsdD0nZWZmZWN0MV9kcm9wU2hhZG93XzBfMycvPjxmZUJsZW5kIG1vZGU9J25vcm1hbCcgaW49J1NvdXJjZUdyYXBoaWMnIGluMj0nZWZmZWN0MV9kcm9wU2hhZG93XzBfMycgcmVzdWx0PSdzaGFwZScvPjwvZmlsdGVyPjxjbGlwUGF0aCBpZD0nY2xpcDBfMF8zJz48cmVjdCB3aWR0aD0nMzAnIGhlaWdodD0nMzAnIGZpbGw9J3doaXRlJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgxKScvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPgo=',
              },
            },
            {
              latitude: '24.861246157675627',
              longitude: '51.11047339547602',
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
