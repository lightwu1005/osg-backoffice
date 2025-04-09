import {SubscriptionInfoModel} from "@/services/@odds/socket/events/useInfoSubscription";
import {SubscriptionStatsModel} from "@/services/@odds/socket/events/useStatsSubscription";
import {SubscriptionEventOddsStatusModel} from "@/services/@odds/socket/events/useEventOddsStatusSubscription";
import {SubscriptionEventTypeAlertModel} from "@/services/@odds/socket/events/useEventTypeAlertSubscription";
import {SubscriptionOddsModel} from "@/services/@odds/socket/events/OddsSubscriptionProvider";

export interface EventSubscriptionModel {
    odds?: SubscriptionOddsModel | SubscriptionOddsModel[] | null
    info?: SubscriptionInfoModel | null
    stats?: SubscriptionStatsModel | null
    eventOddsStatus?: SubscriptionEventOddsStatusModel | null
    eventTypeAlert?: SubscriptionEventTypeAlertModel | null
}