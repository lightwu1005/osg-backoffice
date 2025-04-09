import {
    GetActivatingItemsDataModel,
    GetApplyEventsDataModel,
    GetTemplateDetailModel,
    GetTemplateListDataModel,
    GetTemplateMarketsDataModel,
    MarketConfigModel,
    TemplateDefaultConflictsModel,
} from "@/services/@core/module/ResponseDataModels";
import {EventStatus} from "@/services/@core/module/EventStatus";
import {
    marketConfigModelToMarketSetting,
    TemplateSummaryUsedModel
} from "@/app/eventDetail/models/dataModel/EventDetailOddsDataModel";

export const mockTemplateList: GetTemplateListDataModel = {
    "totalElements": 7,
    "content": [
        {
            "templateId": "1122334455",
            "templateName": "template1",
            "settingLevel": {
                "level": "sport",
                "totalNumber": 0
            },
            "sportId": "12345678",
            "sportName": "soccer",
            "isDefault": true,
            "eventNumber": 1000,
            "mainOdds": {
                "minumum": 1,
                "maximum": 1000
            },
            "margin": 5,
            "updateTime": 1703471869,
            "eventType": "inPlay"
        },
        {
            "templateId": "1122335566",
            "templateName": "template2",
            "settingLevel": {
                "level": "sport",
                "totalNumber": 0
            },
            "sportId": "12345678",
            "sportName": "soccer",
            "isDefault": false,
            "eventNumber": 2468,
            "mainOdds": {
                "minumum": 1,
                "maximum": 999
            },
            "margin": 4,
            "updateTime": 1703471869,
            "eventType": "inPlay"
        },
        {
            "templateId": "1122335567",
            "templateName": "template3",
            "settingLevel": {
                "level": "sport",
                "totalNumber": 0
            },
            "sportId": "12345678",
            "sportName": "soccer",
            "isDefault": false,
            "eventNumber": 2468,
            "mainOdds": {
                "minumum": 1,
                "maximum": 999
            },
            "margin": 3,
            "updateTime": 1703471869,
            "eventType": "inPlay"
        },
        {
            "templateId": "1122335568",
            "templateName": "template4",
            "settingLevel": {
                "level": "sport",
                "totalNumber": 0
            },
            "sportId": "12345678",
            "sportName": "soccer",
            "isDefault": false,
            "eventNumber": 2468,
            "mainOdds": {
                "minumum": 1,
                "maximum": 999
            },
            "margin": 2,
            "updateTime": 1703471869,
            "eventType": "inPlay"
        },
        {
            "templateId": "1122335569",
            "templateName": "template5",
            "settingLevel": {
                "level": "sport",
                "totalNumber": 0
            },
            "sportId": "12345678",
            "sportName": "soccer",
            "isDefault": false,
            "eventNumber": 2468,
            "mainOdds": {
                "minumum": 1,
                "maximum": 999
            },
            "margin": 1,
            "updateTime": 1703471869,
            "eventType": "inPlay"
        },
        {
            "templateId": "1122335570",
            "templateName": "template6",
            "settingLevel": {
                "level": "sport",
                "totalNumber": 0
            },
            "sportId": "12345678",
            "sportName": "soccer",
            "isDefault": false,
            "eventNumber": 2468,
            "mainOdds": {
                "minumum": 1,
                "maximum": 999
            },
            "margin": 6,
            "updateTime": 1703471869,
            "eventType": "inPlay"
        },
        {
            "templateId": "1122335571",
            "templateName": "template7",
            "settingLevel": {
                "level": "sport",
                "totalNumber": 0
            },
            "sportId": "12345678",
            "sportName": "soccer",
            "isDefault": false,
            "eventNumber": 2468,
            "mainOdds": {
                "minumum": 1,
                "maximum": 999
            },
            "margin": 7,
            "updateTime": 1703471869,
            "eventType": "inPlay"
        }
    ]
}

export const mockTemplateNewMarkets: MarketConfigModel[] = [
    {
        "marketId": "123456",
        "marketName": "Under/Over",
        "margin": 5,
        "minimumDifference": 1,
        "lineSettings": "5",
        "singleBetSettings": {
            "minimum": 100,
            "maximum": 10000,
            "maxPayout": 1000000
        },
        "parlayable": true,
        "sgpable": true
    },
    {
        "marketId": "234567",
        "marketName": "1X2",
        "margin": 3,
        "minimumDifference": 2,
        "lineSettings": "3",
        "singleBetSettings": {
            "minimum": 200,
            "maximum": 15000,
            "maxPayout": 2000000
        },
        "parlayable": false,
        "sgpable": true
    },
    {
        "marketId": "345678",
        "marketName": "Handicap",
        "margin": 4,
        "minimumDifference": 1,
        "lineSettings": "4",
        "singleBetSettings": {
            "minimum": 150,
            "maximum": 12000,
            "maxPayout": 1500000
        },
        "parlayable": true,
        "sgpable": false
    },
    {
        "marketId": "456789",
        "marketName": "Total Goals",
        "margin": 2,
        "minimumDifference": 3,
        "lineSettings": "2",
        "singleBetSettings": {
            "minimum": 300,
            "maximum": 18000,
            "maxPayout": 2500000
        },
        "parlayable": true,
        "sgpable": true
    },
    {
        "marketId": "567890",
        "marketName": "Both Teams to Score",
        "margin": 6,
        "minimumDifference": 2,
        "lineSettings": "6",
        "singleBetSettings": {
            "minimum": 250,
            "maximum": 14000,
            "maxPayout": 1700000
        },
        "parlayable": false,
        "sgpable": false
    },
    {
        "marketId": "678901",
        "marketName": "Double Chance",
        "margin": 1,
        "minimumDifference": 1,
        "lineSettings": "1",
        "singleBetSettings": {
            "minimum": 100,
            "maximum": 10000,
            "maxPayout": 1000000
        },
        "parlayable": true,
        "sgpable": true
    },
    {
        "marketId": "789012",
        "marketName": "Correct Score",
        "margin": 7,
        "minimumDifference": 3,
        "lineSettings": "7",
        "singleBetSettings": {
            "minimum": 400,
            "maximum": 20000,
            "maxPayout": 3000000
        },
        "parlayable": false,
        "sgpable": true
    },
    {
        "marketId": "890123",
        "marketName": "Half Time/Full Time",
        "margin": 5,
        "minimumDifference": 2,
        "lineSettings": "5",
        "singleBetSettings": {
            "minimum": 350,
            "maximum": 16000,
            "maxPayout": 2200000
        },
        "parlayable": true,
        "sgpable": false
    },
    {
        "marketId": "901234",
        "marketName": "First Goal",
        "margin": 3,
        "minimumDifference": 1,
        "lineSettings": "3",
        "singleBetSettings": {
            "minimum": 200,
            "maximum": 13000,
            "maxPayout": 1800000
        },
        "parlayable": true,
        "sgpable": true
    },
    {
        "marketId": "012345",
        "marketName": "Last Goal",
        "margin": 4,
        "minimumDifference": 2,
        "lineSettings": "4",
        "singleBetSettings": {
            "minimum": 150,
            "maximum": 11000,
            "maxPayout": 1600000
        },
        "parlayable": false,
        "sgpable": false
    }
]

export const mockTemplateNewMarketsModified: MarketConfigModel[] = [
    {
        "marketId": "123456",
        "marketName": "Under/Over",
        "margin": 6,
        "minimumDifference": 2,
        "lineSettings": "6",
        "singleBetSettings": {
            "minimum": 150,
            "maximum": 10500,
            "maxPayout": 1050000
        },
        "parlayable": false,
        "sgpable": false
    },
    {
        "marketId": "234567",
        "marketName": "1X2",
        "margin": 4,
        "minimumDifference": 3,
        "lineSettings": "4",
        "singleBetSettings": {
            "minimum": 250,
            "maximum": 16000,
            "maxPayout": 2100000
        },
        "parlayable": true,
        "sgpable": false
    },
    {
        "marketId": "345678",
        "marketName": "Handicap",
        "margin": 5,
        "minimumDifference": 2,
        "lineSettings": "5",
        "singleBetSettings": {
            "minimum": 200,
            "maximum": 12500,
            "maxPayout": 1550000
        },
        "parlayable": false,
        "sgpable": true
    },
    {
        "marketId": "456789",
        "marketName": "Total Goals",
        "margin": 3,
        "minimumDifference": 4,
        "lineSettings": "3",
        "singleBetSettings": {
            "minimum": 350,
            "maximum": 18500,
            "maxPayout": 2550000
        },
        "parlayable": false,
        "sgpable": false
    },
    {
        "marketId": "567890",
        "marketName": "Both Teams to Score",
        "margin": 7,
        "minimumDifference": 3,
        "lineSettings": "7",
        "singleBetSettings": {
            "minimum": 300,
            "maximum": 14500,
            "maxPayout": 1750000
        },
        "parlayable": true,
        "sgpable": true
    },
    {
        "marketId": "678901",
        "marketName": "Double Chance",
        "margin": 2,
        "minimumDifference": 2,
        "lineSettings": "2",
        "singleBetSettings": {
            "minimum": 150,
            "maximum": 10500,
            "maxPayout": 1050000
        },
        "parlayable": false,
        "sgpable": false
    },
    {
        "marketId": "789012",
        "marketName": "Correct Score",
        "margin": 8,
        "minimumDifference": 4,
        "lineSettings": "8",
        "singleBetSettings": {
            "minimum": 450,
            "maximum": 20500,
            "maxPayout": 3050000
        },
        "parlayable": true,
        "sgpable": false
    },
    {
        "marketId": "890123",
        "marketName": "Half Time/Full Time",
        "margin": 6,
        "minimumDifference": 3,
        "lineSettings": "6",
        "singleBetSettings": {
            "minimum": 400,
            "maximum": 16500,
            "maxPayout": 2250000
        },
        "parlayable": false,
        "sgpable": true
    },
    {
        "marketId": "901234",
        "marketName": "First Goal",
        "margin": 4,
        "minimumDifference": 2,
        "lineSettings": "4",
        "singleBetSettings": {
            "minimum": 250,
            "maximum": 13500,
            "maxPayout": 1850000
        },
        "parlayable": false,
        "sgpable": false
    },
    {
        "marketId": "012345",
        "marketName": "Last Goal",
        "margin": 5,
        "minimumDifference": 3,
        "lineSettings": "5",
        "singleBetSettings": {
            "minimum": 200,
            "maximum": 11500,
            "maxPayout": 1650000
        },
        "parlayable": true,
        "sgpable": true
    }
];

export const mockTemplateDetail: GetTemplateDetailModel = {
    "templateId": "1122334455",
    "templateName": "template1",
    "sportId": "123456",
    "sportName": "SOCCER1",
    "isDefault": true,
    "eventType": "inPlay",
    "margin": 5,
    "leagues": [
        {leagueId: '12345', leagueName: 'NBA'},
        {leagueId: '13355', leagueName: 'MLB'},
        {leagueId: '12244', leagueName: 'NHL'},
    ],
    "oddsSettings": {
        "minimum": 1,
        "maximum": 1000,
        "difference": 5
    },
    "providerPriority": [
        {
            "order": 2,
            "provider": "LSports"
        },
        {
            "order": 1,
            "provider": "Genius"
        },
        {
            "order": 3,
            "provider": "ProviderA"
        }
    ],
    "imbalanceBettings": {
        "updateType": "MANUAL",
        "difference": 5,
        "recalculate": 100000,
        "decrease": 2,
    },
    "heavyBettings": {
        "updateType": "MANUAL",
        "timeLimit": 30,
        "amount": 10000,
        "decrease": 2
    },
    "singleBetSettings": {
        "minimum": 1,
        "maximum": 1000,
        "maxPayout": 1000000
    },
    "parlaySettings": {
        "enabled": true,
        "minimumLegs": 2,
        "maximumLegs": 20,
        "minimum": 1,
        "maximum": 1000,
        "maxPayout": 1000000
    },
    "sgpSettings": {
        "enabled": true,
        "minimumLegs": 2,
        "maximumLegs": 20,
        "minimum": 1,
        "maximum": 1000,
        "maxPayout": 1000000
    },
    "delayedSettings": {
        "situation": ["Score Change"],
        "delayedSecond": 10
    },
    "marketSettings": mockTemplateNewMarkets,
    "lineSettings": "NO_LIMIT",
    "deviation": {
        "percentage": 10,
        "action": 'FOLLOW_PROVIDER'
    },
    "feederSuspend": "AUTO_HOLD",
    "dangerAttackAction": "AUTO_HOLD",
    parlayAlert: {
        "type": "PERCENTAGE",
        "targetNumber": 80,
        "potentialWin": 1000000,
        "alertRecipients": [
            "ADMIN",
            "MANAGER"
        ],
        sendEmail: true
    },
    imbalanceSettings: {
        type: "PERCENTAGE",
        autoAccept: 20,
        action: "AUTO_HOLD"
    },
    "belowMarginSettings": {
        "margin": 1,
        "alertRecipients": [
            "ADMIN",
            "MANAGER"]
    },
    rapidBetEntrySettings: {
        enabled: true,
        triggerTime: 10,
        numberOfBets: 5,
        suspendLine: 10
    },
    autoSettlementSettings: {
        enabled: true,
        delaySettlement: 3000
    }
}

export const mockTemplateDetailA: GetTemplateDetailModel = {
    "templateId": "11dd7835-259c-4dd5-a47e-71321d881f9f",
    "templateName": "Jiaku Template",
    "sportId": "d3e2d925-3a88-4345-ad6d-ba3985f92c2f",
    "sportName": "Soccer",
    "isDefault": false,
    "marketSettings": mockTemplateNewMarkets,
    "leagues": [
        {
            "leagueId": "6d2dbf05-86d5-4e06-a4de-42857b0f2ea3",
            "leagueName": "France Ligue 1 "
        },
        {
            "leagueId": "d4c5f0dc-1ad6-4500-98fc-c58781e7143d",
            "leagueName": "England Premier League"
        },
        {
            "leagueId": "90828e77-051f-4e1d-827e-a57f510eea85",
            "leagueName": "Australia Cup"
        },
        {
            "leagueId": "7ff83e96-2330-4dca-a4f9-316c74b72b82",
            "leagueName": "Brazil Serie A"
        },
        {
            "leagueId": "3321347c-fd73-45a7-afff-de67b53201fc",
            "leagueName": "Scotland Premiership"
        }
    ],
    "margin": 6,
    "oddsSettings": {
        "minimum": 1,
        "maximum": 59,
        "difference": 3
    },
    "providerPriority": [
        {
            "order": 0,
            "provider": "LSPORTS"
        }
    ],
    "imbalanceBettings": {
        "updateType": "MANUAL",
        "difference": 3,
        "decrease": 4,
        "recalculate": 5
    },
    "heavyBettings": {
        "updateType": "MANUAL",
        "timeLimit": 3,
        "amount": 5,
        "decrease": 6
    },
    "singleBetSettings": {
        "minimum": 2,
        "maximum": 5,
        "maxPayout": 10
    },
    "parlaySettings": {
        "enabled": false,
        "minimumLegs": 0,
        "maximumLegs": 0,
        "minimum": 0,
        "maximum": 0,
        "maxPayout": 0
    },
    "sgpSettings": {
        "enabled": true,
        "minimumLegs": 2,
        "maximumLegs": 4,
        "minimum": 3,
        "maximum": 5,
        "maxPayout": 2
    },
    "lineSettings": "MAINLINE_ONLY",
    "eventType": "inPlay",
    "delayedSettings": {
        "situation": [
            "PENALTY_AWARDED",
            "DANGEROUS_FREE_KICK",
            "CORNER"
        ],
        "delayedSecond": 10
    },
    "deviation": {
        "percentage": 4,
        "action": "USE_CALCULATED"
    },
    feederSuspend: "AUTO_HOLD",
    dangerAttackAction: "AUTO_HOLD",
    imbalanceSettings: {
        type: "PERCENTAGE",
        autoAccept: 20,
        action: "AUTO_HOLD"
    },
    parlayAlert: {
        type: "PERCENTAGE",
        targetNumber: 80,
        potentialWin: 1000000,
        alertRecipients: [
            "ADMIN",
            "MANAGER"
        ],
        sendEmail: true
    },
    rapidBetEntrySettings: {
        enabled: true,
        triggerTime: 10,
        numberOfBets: 100,
        suspendLine: 10
    },
    autoSettlementSettings: {
        enabled: true,
        delaySettlement: 10
    },
    belowMarginSettings: {
        margin: -1,
        alertRecipients: [
            "ADMIN",
            "MANAGER"]
    }
}

export const mockTemplateDetailB: GetTemplateDetailModel = {
    "templateId": "d56e5fc5-fd04-47a7-a514-92c9e7729c52",
    "templateName": "Jiaku In Play",
    "sportId": "54a758f7-f8c4-4eb9-8790-c347011e2350",
    "sportName": "Basketball",
    "isDefault": false,
    "marketSettings": mockTemplateNewMarkets,
    "leagues": [
        {
            "leagueId": "6d2dbf05-86d5-4e06-a4de-42857b0f2ea3",
            "leagueName": "France Ligue 1 "
        },
        {
            "leagueId": "d4c5f0dc-1ad6-4500-98fc-c58781e7143d",
            "leagueName": "England Premier League"
        },
        {
            "leagueId": "90828e77-051f-4e1d-827e-a57f510eea85",
            "leagueName": "Australia Cup"
        },
        {
            "leagueId": "7ff83e96-2330-4dca-a4f9-316c74b72b82",
            "leagueName": "Brazil Serie A"
        },
        {
            "leagueId": "3321347c-fd73-45a7-afff-de67b53201fc",
            "leagueName": "Scotland Premiership"
        }
    ],
    "margin": 5,
    "oddsSettings": {
        "minimum": 4,
        "maximum": 99,
        "difference": 2
    },
    "providerPriority": [
        {
            "order": 0,
            "provider": "LSPORTS"
        }
    ],
    "imbalanceBettings": {
        "updateType": "MANUAL",
        "difference": 3,
        "decrease": 7,
        "recalculate": 9
    },
    "heavyBettings": {
        "updateType": "AUTO",
        "timeLimit": 4,
        "amount": 8,
    },
    "singleBetSettings": {
        "minimum": 4,
        "maximum": 8,
        "maxPayout": 15556
    },
    "parlaySettings": {
        "enabled": false,
        "minimumLegs": 0,
        "maximumLegs": 0,
        "minimum": 0,
        "maximum": 0,
        "maxPayout": 0
    },
    "sgpSettings": {
        "enabled": false,
        "minimumLegs": 0,
        "maximumLegs": 0,
        "minimum": 0,
        "maximum": 0,
        "maxPayout": 0
    },
    "lineSettings": "MAINLINE_ONLY",
    "eventType": "inPlay",
    "delayedSettings": {
        "situation": [
            "GOAL",
            "PENALTY_AWARDED",
            "PENALTY_RISK",
            "DANGEROUS_FREE_KICK",
            "DANGEROUS_ATTACK",
            "CORNER_DANGER",
            "CORNER",
            "FREE_KICK_ATTACK"
        ],
        "delayedSecond": 7
    },
    "deviation": {
        "percentage": 3,
        "action": "USE_CALCULATED"
    },
    feederSuspend: "AUTO_HOLD",
    dangerAttackAction: "AUTO_HOLD",
    imbalanceSettings: {
        type: "PERCENTAGE",
        autoAccept: 20,
        action: "AUTO_HOLD"
    },
    parlayAlert: {
        type: "PERCENTAGE",
        targetNumber: 70,
        potentialWin: 10000,
        alertRecipients: [
            "ADMIN",
        ],
        sendEmail: true
    },
    rapidBetEntrySettings: {
        enabled: true,
        triggerTime: 10,
        numberOfBets: 100,
        suspendLine: 10
    },
    autoSettlementSettings: {
        enabled: true,
        delaySettlement: 10
    },
    belowMarginSettings: {
        margin: -1,
        alertRecipients: ["ADMIN"]
    }
}

export const mockApplyEvents: GetApplyEventsDataModel = {
    "totalElements": 999,
    "content": [
        {
            "eventId": "12345",
            "eventName": "Laker vs Nets",
            "leagueId": "54321",
            "leagueName": "NBA",
            "location": "abcd",
            "status": EventStatus.NOT_STARTED_YET,
            "startTime": 1703471869
        },
        {
            "eventId": "23456",
            "eventName": "Laker vs Suns",
            "leagueId": "54321",
            "leagueName": "NBA",
            "location": "abdg",
            "status": EventStatus.IN_PROGRESS,
            "startTime": 1703471869
        }
    ]
}

export const mockAddTemplatesData = {
    "templateId": "1234567",
}

export const mockRemoveTemplatesData = {
    "successIds": ["12345", "943458"],
    "failureIds": [],
}

export const mockTemplateMarkets: GetTemplateMarketsDataModel = {
    "totalElements": 999,
    "content": [
        {
            "marketId": "123456",
            "marketName": "Under/Over"
        },
        {
            "marketId": "234567",
            "marketName": "1X2"
        },
        {
            "marketId": "345678",
            "marketName": "Handicap"
        },
        {
            "marketId": "456789",
            "marketName": "Total Goals",
        },
        {
            "marketId": "567890",
            "marketName": "Both Teams to Score",
        },
        {
            "marketId": "678901",
            "marketName": "Double Chance",
        },
        {
            "marketId": "789012",
            "marketName": "Correct Score",
        },
        {
            "marketId": "890123",
            "marketName": "Half Time/Full Time",
        },
        {
            "marketId": "901234",
            "marketName": "First Goal",
        },
        {
            "marketId": "012345",
            "marketName": "Last Goal",
        },
        {
            "marketId": "543210",
            "marketName": "Half Time Last Goal",
        },
        {
            "marketId": "432109",
            "marketName": "Half Time First Goal",
        },
        {
            "marketId": "321098",
            "marketName": "Half Time Total Goal",
        }
    ]
}

export const mockTemplateDefaultConflicts: TemplateDefaultConflictsModel = {
    content: [
        {
            "templateId": "1122334455",
            "templateName": "template1",
            "sportId": "123456",
            "sportName": "SOCCER1",
            "isDefault": false,
            "eventType": "inPlay",
            "margin": 5,
            "leagues": [
                {leagueId: '123', leagueName: 'NBA'},
                {leagueId: '234', leagueName: 'NBA2'},
                {leagueId: '345', leagueName: 'NBA3'},
            ],
            "oddsSettings": {
                "minimum": 1,
                "maximum": 1000,
                "difference": 5
            },
            "providerPriority": [
                {
                    "order": 2,
                    "provider": "LSports"
                },
                {
                    "order": 1,
                    "provider": "Genius"
                },
                {
                    "order": 3,
                    "provider": "ProviderA"
                }
            ],
            "imbalanceBettings": {
                "updateType": "MANUAL",
                "difference": 5,
                "recalculate": 100000,
                "decrease": 2,
            },
            "heavyBettings": {
                "updateType": "MANUAL",
                "timeLimit": 30,
                "amount": 10000,
                "decrease": 2
            },
            "singleBetSettings": {
                "minimum": 1,
                "maximum": 1000,
                "maxPayout": 1000000
            },
            "parlaySettings": {
                "enabled": true,
                "minimumLegs": 2,
                "maximumLegs": 20,
                "minimum": 1,
                "maximum": 1000,
                "maxPayout": 1000000
            },
            "sgpSettings": {
                "enabled": true,
                "minimumLegs": 2,
                "maximumLegs": 20,
                "minimum": 1,
                "maximum": 1000,
                "maxPayout": 1000000
            },
            "delayedSettings": {
                "situation": ["Score Change"],
                "delayedSecond": 10
            },
            "marketSettings": mockTemplateNewMarkets,
            "lineSettings": "NO_LIMIT",
            "deviation": {
                "percentage": 10,
                "action": 'FOLLOW_PROVIDER'
            },
            "feederSuspend": "AUTO_HOLD",
            "dangerAttackAction": "AUTO_HOLD",
            parlayAlert: {
                "type": "PERCENTAGE",
                "targetNumber": 80,
                "potentialWin": 1000000,
                "alertRecipients": [
                    "ADMIN",
                    "MANAGER"
                ],
                "sendEmail": true
            }
        }
    ],
}

export const mockActivatingItems: GetActivatingItemsDataModel = {
    "totalElements": 100,
    "content": [
        {
            "itemId": "1234567",
            "itemName": "Market A",
            "margin": 3,
            "minimumDifference": 5,
            "lineSettings": "NO_LIMIT"
        },
        {
            "itemId": "2345678",
            "itemName": "Market B",
            "margin": 2,
            "minimumDifference": 4,
            "lineSettings": "NO_LIMIT"
        },
        {
            "itemId": "3456789",
            "itemName": "Market C",
            "margin": 5,
            "minimumDifference": 10,
            "lineSettings": "NO_LIMIT"
        },
        {
            "itemId": "4567890",
            "itemName": "Market D",
            "margin": 1,
            "minimumDifference": 3,
            "lineSettings": "NO_LIMIT"
        },
        {
            "itemId": "5678901",
            "itemName": "Market E",
            "margin": 4,
            "minimumDifference": 7,
            "lineSettings": "NO_LIMIT"
        }
    ]
}

export const mockTemplateSummaryUsedModelData: TemplateSummaryUsedModel = {
    sportName: "Soccer",
    leagueName: "Premier League",
    leagueId: "54321",
    eventType: "inPlay",
    templateName: "template1",
    templateId: "template001",
    sportId: "12345",
    leagueIds: ["54321", "43210", "32109"],
    providerPriority: [
        {order: 1, provider: "LSports"},
        {order: 2, provider: "NAMI"}
    ],
    oddsSettings: {
        minimum: 1,
        maximum: 1000,
        difference: 5
    },
    margin: 5,
    lineSettings: "NO_LIMIT",
    deviation: {
        percentage: 10,
        action: "FOLLOW_PROVIDER"
    },
    imbalanceBettings: {
        updateType: "AUTO",
        difference: 5,
        decrease: 2,
        recalculate: 100000
    },
    heavyBettings: {
        updateType: "MANUAL",
        timeLimit: 30,
        amount: 10000,
        decrease: 2
    },
    isDefault: true,
    feederSuspend: "AUTO_HOLD",
    dangerAttackAction: "AUTO_HOLD",
    imbalanceSettings: {
        type: "PERCENTAGE",
        autoAccept: 20,
        action: "AUTO_HOLD"
    },
    belowMarginSettings: {
        margin: -1,
        alertRecipients: ["ADMIN", "MANAGER"]
    },
    delayedSettings: {
        situation: ["Score Change"],
        delayedSecond: 10
    },
    singleBetSettings: {
        minimum: 100,
        maximum: 10000,
        maxPayout: 1000000
    },
    parlaySettings: {
        enabled: true,
        minimumLegs: 2,
        maximumLegs: 20,
        minimum: 1,
        maximum: 1000,
        maxPayout: 1000000
    },
    sgpSettings: {
        enabled: true,
        minimumLegs: 2,
        maximumLegs: 20,
        minimum: 1,
        maximum: 1000,
        maxPayout: 1000000
    },
    parlayAlert: {
        type: "LEGS",
        targetNumber: 2,
        potentialWin: 10000,
        alertRecipients: ["ADMIN", "MANAGER"],
        sendEmail: "true"
    },
    rapidBetEntrySettings: {
        enabled: "true",
        triggerTime: 10,
        numberOfBets: 5,
        suspendLine: 10
    },
    autoSettlementSettings: {
        enabled: "true",
        delaySettlement: 3000
    },
    marketSettings: mockTemplateNewMarkets.map((market) => (marketConfigModelToMarketSetting(market)))
};

export const mockTestTemplateSummaryUsedModelData: TemplateSummaryUsedModel = {
    sportName: "basketball",
    leagueName: "NBA",
    leagueId: "987654",
    eventType: "preMatch",
    templateName: "template2",
    templateId: "12345",
    sportId: "654321",
    leagueIds: ["987654", "876543", "765432"],
    providerPriority: [
        {
            order: 1,
            provider: "ProviderA"
        },
        {
            order: 2,
            provider: "ProviderC"
        }
    ],
    oddsSettings: {
        minimum: 1.5,
        maximum: 2000,
        difference: 4
    },
    margin: 6,
    lineSettings: "MAINLINE_ONLY",
    deviation: {
        percentage: 8,
        action: "USE_CALCULATED"
    },
    imbalanceBettings: {
        updateType: "AUTO",
        difference: 4,
        recalculate: 15000,
        decrease: 1
    },
    heavyBettings: {
        updateType: "AUTO",
        timeLimit: 40,
        amount: 12000,
        decrease: 2.5
    },
    isDefault: false,
    feederSuspend: "AUTO_REJECT",
    dangerAttackAction: "AUTO_ACCEPT",
    imbalanceSettings: {
        type: "AMOUNT",
        autoAccept: 25000,
        action: "AUTO_REJECT"
    },
    belowMarginSettings: {
        margin: -2,
        alertRecipients: ["ADMIN", "MANAGER"]
    },
    delayedSettings: {
        situation: ["Dangerous Attack"],
        delayedSecond: 15
    },
    singleBetSettings: {
        minimum: 5,
        maximum: 5000,
        maxPayout: 1500000
    },
    parlaySettings: {
        enabled: true,
        minimumLegs: 3,
        maximumLegs: 10,
        minimum: 5,
        maximum: 2000,
        maxPayout: 2000000
    },
    sgpSettings: {
        enabled: false,
        minimumLegs: 3,
        maximumLegs: 12,
        minimum: 10,
        maximum: 1000,
        maxPayout: 1200000
    },
    parlayAlert: {
        type: "PERCENTAGE",
        targetNumber: 75,
        potentialWin: 500000,
        alertRecipients: ["ADMIN", "MANAGER"],
        sendEmail: "false"
    },
    rapidBetEntrySettings: {
        enabled: "false",
        triggerTime: 15,
        numberOfBets: 7,
        suspendLine: 12
    },
    autoSettlementSettings: {
        enabled: "false",
        delaySettlement: 2500
    },
    marketSettings: mockTemplateNewMarketsModified.map((market) => (marketConfigModelToMarketSetting(market))),
};