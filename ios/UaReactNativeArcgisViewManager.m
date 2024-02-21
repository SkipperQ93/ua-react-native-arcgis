#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(UaReactNativeArcgisViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(layers, NSArray)
RCT_EXTERN_METHOD(addPoints:(nonnull NSNumber*)node pointsDict:(NSArray*) pointsDict)
RCT_EXTERN_METHOD(changeOnlineStatus:(nonnull NSNumber*)node userId:(int) userId onlineStatus:(BOOL)onlineStatus)

@end
