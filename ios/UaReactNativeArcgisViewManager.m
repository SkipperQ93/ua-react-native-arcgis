#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(UaReactNativeArcgisViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(layers, NSArray)
RCT_EXTERN_METHOD(addPoints:(nonnull NSNumber*)node pointsDict:(NSArray*) pointsDict)

@end
