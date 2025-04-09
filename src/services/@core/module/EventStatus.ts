import {serverKeyTypeConvert} from "@/modules/common/DataProcessUnit";

const stringArray = [
    "NOT_STARTED_YET",
    "IN_PROGRESS",
    "FINISHED",
    "CANCELED",
    "POSTPONED",
    "INTERRUPTED",
    "ABANDONED",
    "COVERAGE_LOST",
    "ABOUT_TO_START",
    // "SUSPENDED",
    // "CLOSE",
    // "UPCOMING"
]
export const EventStatus: Record<string, string> = {}

serverKeyTypeConvert(stringArray, EventStatus);

