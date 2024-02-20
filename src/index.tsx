import React, { forwardRef } from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
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

type UaReactNativeArcgisRefProps = {
  ref?: React.Ref<typeof InternalUaReactNativeArcgisView>;
};

const ComponentName = 'UaReactNativeArcgisView';

const InternalUaReactNativeArcgisView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<
        UaReactNativeArcgisProps & UaReactNativeArcgisRefProps
      >(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export const UaReactNativeArcgisView = forwardRef<
  typeof InternalUaReactNativeArcgisView,
  UaReactNativeArcgisProps
>((props: UaReactNativeArcgisProps, ref) => {
  return <InternalUaReactNativeArcgisView {...props} ref={ref} />;
});

export default UaReactNativeArcgisView;
