import {AvailableOwnerModel, ConfigurationModel} from "@/services/@core/module/ResponseDataModels";

export const mockChannelData = {
    "totalElements": 999,
    "pageSize": 10,
    "content": [
        {
            "id": "12345",
            "channelName": "bbim channel1",
            "channelId": "12345",
            "ownerName": "John Gu",
            "ownerId": "12345678",
            "email": "abc@channel1.com",
            "locationName": "AMERICA",
            "oddsFormat": ["American", "Decimal"],
            "regTime": 1703471869,
            "status": "ACTIVE"
        },
        {
            "id": "23456",
            "channelName": "bbim channel2",
            "channelId": "23456",
            "ownerName": "John Gu",
            "ownerId": "12345678",
            "email": "abc@channel1.com",
            "locationName": "CHINA",
            "oddsFormat": ["Decimal"],
            "regTime": 1703471869,
            "status": "SUSPENDED"
        },
        {
            "id": "34567",
            "channelName": "bbim channel3",
            "channelId": "34567",
            "ownerName": "John Gu",
            "ownerId": "12345678",
            "email": "abc@channel1.com",
            "locationName": "TAIWAN",
            "oddsFormat": ["American", "Fractional"],
            "regTime": 1703471869,
            "status": "PENDING"
        },
        {
            "id": "45678",
            "channelName": "bbim channel4",
            "channelId": "45678",
            "ownerName": "John Gu",
            "ownerId": "12345678",
            "email": "abc@channel1.com",
            "locationName": "INDIA",
            "oddsFormat": ["American", "Malay", "Hong Kong"],
            "regTime": 1703471869,
            "status": "PROCEEDING"
        },
        {
            "id": "56789",
            "channelName": "bbim channel5",
            "channelId": "56789",
            "ownerName": "John Gu",
            "ownerId": "12345678",
            "email": "abc@channel1.com",
            "locationName": "INDIA",
            "oddsFormat": ["American", "Malay", "Hong Kong", "Fractional"],
            "regTime": 1703471869,
            "status": "PROCEEDING"
        },
        {
            "id": "567891",
            "channelName": "jiaku channel5",
            "channelId": "567891",
            "ownerName": "Jiaku D",
            "ownerId": "123456781",
            "email": "abcd@channel1.com",
            "locationName": "TOKYO",
            "oddsFormat": ["American", "Malay", "Hong Kong", "Fractional"],
            "regTime": 1703471869,
            "status": "MAINTAIN"
        }
    ]
}

export const mockChannelDetailData = {
    "channelName": "ChannelNo1",
    "channelId": "67890",
    "ownerName": "John Gu",
    "ownerId": "OSGABCD00001",
    "email": "ABC@ollehsports.com",
    "locationName": "AMERICA",
    "oddsFormat": [
        "American",
        "Decimal"
    ],
    "configuration": {
        "oddsProviders": [
            "LSPORTS",
            "NAMI"
        ],
        "oddsSettings": {
            "minimum": 1,
            "maximum": 1000,
            "difference": 1
        },
        "lineSettings": "NO_LIMIT",
        "rounding": [
            {
                "ruleName": "0_2",
                "ruleNumber": 4
            },
            {
                "ruleName": "2_5",
                "ruleNumber": 4
            },
            {
                "ruleName": "5_10",
                "ruleNumber": 4
            },
            {
                "ruleName": "10_25",
                "ruleNumber": 4
            },
            {
                "ruleName": "25_50",
                "ruleNumber": 4
            },
            {
                "ruleName": "50_100",
                "ruleNumber": 4
            },
            {
                "ruleName": "100_250",
                "ruleNumber": 4
            },
            {
                "ruleName": "250_1000",
                "ruleNumber": 4
            },
            {
                "ruleName": "1000+",
                "ruleNumber": 4
            }
        ]
    }
}

const mockRemoveChannelsData = {
    "successIds": ["12345", "67890"],
    "failureIds": []
}

const mockRemoveChannelsPartialSuccessData = {
    "successIds": ["12345"],
    "failureIds": ["67890"]
}
export const mockRemoveChannelDataOptions = [
    mockRemoveChannelsData,
    mockRemoveChannelsPartialSuccessData
];

export const mockUpdateEventsStatusData = {
    "successIds": ["12345", "943458"],
    "failureIds": ["23456"],
}

const mockUpdateChannelStatusData = {
    "successIds": ["12345", "67890"],
    "failureIds": []
}

const mockUpdateChannelStatusPartialSuccessData = {
    "successIds": ["12345"],
    "failureIds": ["23456", "67890"]
}

const mockUpdateChannelStatusPartialSuccessDataMoreThan3 = {
    "successIds": ["12345"],
    "failureIds": ["23456", "67890", "45678", "34567"]
}

export const mockUpdateChannelDataOptions = [
    mockUpdateChannelStatusData,
    mockUpdateChannelStatusPartialSuccessData,
    mockUpdateChannelStatusPartialSuccessDataMoreThan3
];

export const mockAvailableOwners: AvailableOwnerModel = {
    "totalElements": 3,
    "content": [
        {
            "uuid": "ABCD000001",
            "userAccount": "ABC@ollehsports.com",
            "userName": "Test user 001"
        },
        {
            "uuid": "ABCD000002",
            "userAccount": "123@ollehsports.com",
            "userName": "Test user 002"
        },
        {
            "uuid": "ABCD000003",
            "userAccount": "A1B2@ollehsports.com",
            "userName": "Test user 003"
        }
    ]
}

export const mockAddEventPinsData = {
    "successIds": ["12345", "943458"],
    "failureIds": ["23456"],
}

export const mockAdjustmentData = {
    "baseLine": "0.5",
    "isMostBalance": true,
    "status": "ACTIVE",
    "bets": [
        {
            "betId": "118080524911924431",
            "betName": "Under",
            "line": "0.5",
            "price": 1.50,
            "updateTime": 1703471869
        },
        {
            "betId": "11243777911924431",
            "betName": "Over",
            "line": "0.5",
            "price": 1.05,
            "updateTime": 1703471869
        }
    ]
}

export const mockConfigurationData: ConfigurationModel = {
    "eventType": "inPlay",
    "oddsFormat": {
        "options": ["American", "Decimal", "Fractional", "Hong Kong", "Malay"],
        "display": ["Decimal", "Fractional"]
    },
    "oddsSettings": {
        "minimum": 1,
        "maximum": 1000,
        "difference": 2
    },
    "supportProviders": ["LSPORTS", "NAMI"],
    "defaultMargin": 5,
    "lineSetting": {
        "conditions": ["MAINLINE_ONLY"],
        "receive": "MAINLINE_ONLY"
    },
    "rounding": [
        {
            "ruleName": "0_2",
            "ruleNumber": 4
        },
        {
            "ruleName": "2_5",
            "ruleNumber": 4
        },
        {
            "ruleName": "5_10",
            "ruleNumber": 1
        },
        {
            "ruleName": "10_25",
            "ruleNumber": 2
        },
        {
            "ruleName": "25_50",
            "ruleNumber": 3
        },
        {
            "ruleName": "50_100",
            "ruleNumber": 4
        },
        {
            "ruleName": "100_250",
            "ruleNumber": 4
        },
        {
            "ruleName": "250_1000",
            "ruleNumber": 4
        },
        {
            "ruleName": "1000+",
            "ruleNumber": 4
        }
    ],
    "roundingIncrement": [
        {
            "ruleNumber": 1,
            "increment": 0.3
        },
        {
            "ruleNumber": 2,
            "increment": 0.05
        },
        {
            "ruleNumber": 3,
            "increment": 0.008
        },
        {
            "ruleNumber": 4,
            "increment": 0.0002
        },
    ],
    "dangerBallSettings": {
        "autoAcceptBetSlips": [],
        "autoHoldBetSlips": [],
        "autoRejectBetSlips": []
    }
}