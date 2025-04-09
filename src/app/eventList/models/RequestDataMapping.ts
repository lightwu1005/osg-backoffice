import {
    AddEventPinsProps,
    EventListProps,
    GetEventPinsProps,
    UpdateAutoPayoutProps
} from "@/services/@core/module/RequestDataModels";
import {EventQueryParameters} from "@/app/eventList/models/EventQueryParameters";

export function toEventListProps(query: EventQueryParameters): EventListProps {
    return {
        query: query
    };
}

export function toGetEventPinsProps(sportId: string, eventType: string): GetEventPinsProps {
    return {
        query: {
            sportId: sportId,
            eventType: eventType
        }
    };
}

export function toUpdateEventPinsProps(eventIds: string[], pin: boolean): AddEventPinsProps {
    return {
        body: {
            eventIds: eventIds,
            action: pin ? 'PIN' : 'UNPIN'
        }
    };
}

export function toUpdateAutoPayoutProps(eventIds: string[], action: string): UpdateAutoPayoutProps {
    return {
        body: {
            eventIds: eventIds,
            action: action
        }
    };
}
