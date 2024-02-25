#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(UaReactNativeArcgisViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(pinpointUrlString, NSString)
RCT_EXPORT_VIEW_PROPERTY(licenseKey, NSString)
RCT_EXPORT_VIEW_PROPERTY(pinpointMode, BOOL)
RCT_EXPORT_VIEW_PROPERTY(layers, NSArray)
RCT_EXPORT_VIEW_PROPERTY(onPointTap, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onMapViewLoad, RCTBubblingEventBlock)
RCT_EXTERN_METHOD(addPoints:(nonnull NSNumber*)node pointsDict:(NSArray*)pointsDict)
RCT_EXTERN_METHOD(changeOnlineStatus:(nonnull NSNumber*)node userId:(int)userId onlineStatus:(BOOL)onlineStatus)
RCT_EXTERN_METHOD(changeLocation:(nonnull NSNumber*)node userInformation:(NSDictionary*)userInformation latitude:(NSString*)latitude longitude:(NSString)longitude)
RCT_EXTERN_METHOD(addPath:(nonnull NSNumber*)node path:(NSArray*)path)
RCT_EXTERN_METHOD(clearTracking:(nonnull NSNumber*)node)

@end
