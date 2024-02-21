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

interface UaReactNativeArcgisViewPointType {
  x: string;
  y: string;
  size: { width: number; height: number };
  attributes: object;
}

export interface UaReactNativeArcgisViewType {
  addPoints(points: [UaReactNativeArcgisViewPointType]): void;
}

const UaReactNativeArcgisView = forwardRef<
  UaReactNativeArcgisViewType,
  UaReactNativeArcgisProps
>((props: UaReactNativeArcgisProps, ref) => {
  const mapRef = useRef(null);
  const addPoints = (points: [UaReactNativeArcgisViewPointType]) => {
    const nodeHandle = findNodeHandle(mapRef.current);
    UIManager.dispatchViewManagerCommand(nodeHandle, 'addPoints', [points]);
  };

  useImperativeHandle(ref, () => ({
    addPoints,
  }));

  return <InternalUaReactNativeArcgisView {...props} ref={mapRef} />;
});

export default UaReactNativeArcgisView;
