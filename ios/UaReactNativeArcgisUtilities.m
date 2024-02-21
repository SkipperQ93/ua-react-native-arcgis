//
//  UaReactNativeArcgisUtilities.m
//  ua-react-native-arcgis
//
//  Created by Usama Abdul Aziz on 21/02/2024.
//

#import "UaReactNativeArcgisUtilities.h"
#import <React/RCTLog.h>

@implementation UaReactNativeArcgisUtilities

+ (void) logInfo:(NSString*) string {
    RCTLogWarn(@"%@", string);
}

@end
