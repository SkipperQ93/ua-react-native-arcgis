import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
  findNodeHandle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'ua-react-native-arcgis' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type UaReactNativeArcgisProps = {
  layers?: string[];
  style?: ViewStyle;
};

type UaReactNativeArcgisInternalRefProps = {
  ref?: React.Ref<typeof InternalUaReactNativeArcgisView>;
};

const ComponentName = 'UaReactNativeArcgisView';

const InternalUaReactNativeArcgisView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<
        UaReactNativeArcgisProps & UaReactNativeArcgisInternalRefProps
      >(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

interface IAddPointsType {
  latitude: string;
  longitude: string;
  attributes: object;
}

interface IChangeOnlineStatusType {
  userId: number;
  onlineStatus: boolean;
}

interface IChangeLocationType {
  userInformation: object;
  latitude: string;
  longitude: string;
}

interface IAddPathType {
  latitude: string;
  longitude: string;
}

export interface UaReactNativeArcgisViewType {
  addPoints: (props: IAddPointsType[]) => void;
  changeOnlineStatus: (props: IChangeOnlineStatusType) => void;
  changeLocation: (props: IChangeLocationType) => void;
  addPath: (props: IAddPathType[]) => void;
  clearTracking: () => void;
}

const UaReactNativeArcgisView = forwardRef<
  UaReactNativeArcgisViewType,
  UaReactNativeArcgisProps
>((props: UaReactNativeArcgisProps, ref) => {
  const mapRef = useRef(null);

  const addPoints = (props: IAddPointsType[]) => {
    const nodeHandle = findNodeHandle(mapRef.current);
    UIManager.dispatchViewManagerCommand(nodeHandle, 'addPoints', [props]);
  };

  const changeOnlineStatus = (props: IChangeOnlineStatusType) => {
    const nodeHandle = findNodeHandle(mapRef.current);
    UIManager.dispatchViewManagerCommand(nodeHandle, 'changeOnlineStatus', [
      props.userId,
      props.onlineStatus,
    ]);
  };

  const changeLocation = (props: IChangeLocationType) => {
    const nodeHandle = findNodeHandle(mapRef.current);
    UIManager.dispatchViewManagerCommand(nodeHandle, 'changeLocation', [
      props.userInformation,
      props.latitude,
      props.longitude,
    ]);
  };

  const addPath = (props: IAddPathType[]) => {
    const nodeHandle = findNodeHandle(mapRef.current);
    UIManager.dispatchViewManagerCommand(nodeHandle, 'addPath', [props]);
  };

  const clearTracking = () => {
    const nodeHandle = findNodeHandle(mapRef.current);
    UIManager.dispatchViewManagerCommand(nodeHandle, 'clearTracking', []);
  };

  useImperativeHandle(ref, () => ({
    addPoints,
    changeOnlineStatus,
    changeLocation,
    addPath,
    clearTracking,
  }));

  return <InternalUaReactNativeArcgisView {...props} ref={mapRef} />;
});

export default UaReactNativeArcgisView;
