import {EventMarketSettingsModel, SuccessFailureIdsModel} from "@/services/@core/module/ResponseDataModels";
import {mockTemplateNewMarkets} from "@/data/mockData/template/MockTemplateList";

export const mockUpdateEventMarketSettingsCustomBodyData = {
    "eventIds": ["12345", "23456", "34567"],
    "sportId": "12345",
    "oddsSettings": {
        "minimum": 1,
        "maximum": 1000,
        "difference": 5
    },
    "providerPriority": [
        {
            "order": 1,
            "provider": "LSports"
        },
        {
            "order": 2,
            "provider": "Provider2"
        }
    ],
    "imbalanceBetSlip": "10%",
    "imbalanceDecrease": {
        "updateType": "MANUAL",
        "difference": 5,
        "recalculate": 10000,
        "decrease": 2,
    },
    "oorAction": "SUSPEND_MARKET",
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
        "enableParlay": true,
        "enableSGP": true,
        "minimum": 1,
        "maximum": 1000,
        "maxPayout": 1000000
    },
    "marketSettings": mockTemplateNewMarkets,
    "lineSettings": "NO_LIMIT"
}

export const mockUpdateEventMarketSettingsTemplateBodyData = {
    "eventIds": ["12345", "23456", "34567"],
    "sportId": "123456",
    "templateId": "98765"
}

export const mockEventMarketSettingsNoData: EventMarketSettingsModel = {
    "eventType": "",
    "sportId": "",
    "sportName": "",
    "templateId": "",
    "templateName": "",
    "leagueId": "",
    "leagueName": "",
    "margin": 0,
    "oddsSettings": {
        "minimum": 0,
        "maximum": 0,
        "difference": 0
    },
    "providerPriority": [
        {
            "order": 0,
            "provider": ""
        },
        {
            "order": 0,
            "provider": ""
        }
    ],
    "imbalanceBettings": {
        "updateType": "AUTO",
        "difference": 0,
        "recalculate": 0,
        "decrease": 0,
    },
    "heavyBettings": {
        "updateType": "AUTO",
        "timeLimit": 0,
        "amount": 0,
        "decrease": 0
    },
    "singleBetSettings": {
        "minimum": 0,
        "maximum": 0,
        "maxPayout": 0
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
    "delayedSettings": {
        "situation": [],
        "delayedSecond": 0
    },
    "marketSettings": mockTemplateNewMarkets,
    "lineSettings": "",
    "deviation": {
        "percentage": 0,
        "action": ''
    },
    "feederSuspend": 'AUTO_HOLD',
    "dangerAttackAction": 'AUTO_HOLD',
    "parlayAlert": {
        "type": '',
        "targetNumber": 80,
        "alertRecipients": [],
        "sendEmail": false,
        "potentialWin": 10000
    }
}

export const mockEventMarketSettingsData: EventMarketSettingsModel = {
    "eventType": "inPlay",
    "sportId": "123456",
    "sportName": "SOCCER1",
    "templateId": "98765",
    "templateName": "templateDemo",
    "leagueId": "54321",
    "leagueName": "NBA",
    "margin": 5,
    "oddsSettings": {
        "minimum": 1,
        "maximum": 1000,
        "difference": 5
    },
    "providerPriority": [
        {
            "order": 1,
            "provider": "LSports"
        },
        {
            "order": 2,
            "provider": "ProviderB"
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
    "lineSettings": "NO_LIMIT",
    "marketSettings": mockTemplateNewMarkets,
    "deviation": {
        "percentage": 10,
        "action": 'FOLLOW_PROVIDER'
    },
    "feederSuspend": 'AUTO_HOLD',
    "dangerAttackAction": 'AUTO_HOLD',
    "parlayAlert": {
        "type": '',
        "targetNumber": 80,
        alertRecipients: ["ADMIN", "MANAGER"],
        "sendEmail": false,
        "potentialWin": 10000
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
    },
    "belowMarginSettings": {
        "margin": 1,
        alertRecipients: ["ADMIN", "MANAGER"]
    },
    imbalanceSettings: {
        type: "PERCENTAGE",
        autoAccept: 20,
        action: "AUTO_HOLD"
    }, isCustomized: true
}

export const mockEventMarketSettingsTestData: EventMarketSettingsModel = {
    "eventType": "inPlay",
    "sportId": "1234561",
    "sportName": "basketball",
    "templateId": "98765",
    "templateName": "template1",
    "leagueId": "543212",
    "leagueName": "MLB",
    "margin": 7,
    "oddsSettings": {
        "minimum": 2,
        "maximum": 3000,
        "difference": 3
    },
    "providerPriority": [
        {
            "order": 1,
            "provider": "ProviderB"
        },
        {
            "order": 2,
            "provider": "LSports"
        }
    ],
    "imbalanceBettings": {
        "updateType": "MANUAL",
        "difference": 5,
        "recalculate": 10000,
        "decrease": 2,
    },
    "heavyBettings": {
        "updateType": "MANUAL",
        "timeLimit": 35,
        "amount": 10500,
        "decrease": 3
    },
    "singleBetSettings": {
        "minimum": 2,
        "maximum": 1100,
        "maxPayout": 1020000
    },
    "parlaySettings": {
        "enabled": false,
        "minimumLegs": 2,
        "maximumLegs": 20,
        "minimum": 1,
        "maximum": 1000,
        "maxPayout": 1000000
    },
    "sgpSettings": {
        "enabled": true,
        "minimumLegs": 4,
        "maximumLegs": 20,
        "minimum": 1,
        "maximum": 2000,
        "maxPayout": 1040000
    },
    "delayedSettings": {
        "situation": ["Score Change"],
        "delayedSecond": 11
    },
    "lineSettings": "NO_LIMIT",
    "marketSettings": mockTemplateNewMarkets,
    "deviation": {
        "percentage": 10,
        "action": 'FOLLOW_PROVIDER'
    },
    "feederSuspend": 'AUTO_HOLD',
    "dangerAttackAction": 'AUTO_HOLD',
    "parlayAlert": {
        "type": '',
        "targetNumber": 80,
        alertRecipients: ["ADMIN", "MANAGER"],
        "sendEmail": false,
        "potentialWin": 10000
    },
    "belowMarginSettings": {
        "margin": 1,
        alertRecipients: ["ADMIN", "MANAGER"]
    },
}

export const mockUpdateEventMarketSettingsData: SuccessFailureIdsModel = {
    "successIds": ["12345", "67890"],
    "failureIds": []
}

export const mockUpdateEventMarketSettingsPartialSuccessData: SuccessFailureIdsModel = {
    "successIds": ["12345"],
    "failureIds": ["23456", "67890"]
}