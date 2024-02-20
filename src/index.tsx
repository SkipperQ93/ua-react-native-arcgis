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
  color?: string;
  style: ViewStyle;
};

const ComponentName = 'UaReactNativeArcgisView';

export const UaReactNativeArcgisView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<UaReactNativeArcgisProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
