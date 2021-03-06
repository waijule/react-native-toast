#import <UIKit/UIKit.h>
#import <React/RCTLog.h>
#import <React/RCTBridgeModule.h>
#import <Toaster/Toaster.h>


@interface Toaster : NSObject <RCTBridgeModule>
@end

@implementation Toaster

RCT_EXPORT_MODULE(Toaster)


RCT_EXPORT_METHOD(show:(NSDictionary *)options) {
    NSString *message  = [options objectForKey:@"message"];
    NSString *duration = [options objectForKey:@"duration"];
    NSString *position = [options objectForKey:@"position"];
    NSNumber *addPixelsY = [options objectForKey:@"addPixelsY"];
    
    if (![position isEqual: @"top"] && ![position isEqual: @"center"] && ![position isEqual: @"bottom"]) {
        RCTLogError(@"invalid position. valid options are 'top', 'center' and 'bottom'");
        return;
    }
    
    NSInteger durationInt;
    if ([duration isEqual: @"short"]) {
        durationInt = 2;
    } else if ([duration isEqual: @"long"]) {
        durationInt = 5;
    } else {
        RCTLogError(@"invalid duration. valid options are 'short' and 'long'");
        return;
    }
    
    dispatch_async(dispatch_get_main_queue(), ^{
        [[Toast makeText:message delay:0 duration:durationInt position:position addedOffsetY: [addPixelsY doubleValue]] show];
    });
}

RCT_EXPORT_METHOD(hide) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Toast hide];
    });
}

@end
