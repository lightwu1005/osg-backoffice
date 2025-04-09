import {
    EventDetailDataModel,
    EventMarketModel,
    OddsListModel,
    OddsMarketBalanceModel
} from "@/services/@core/module/ResponseDataModels";

export const mockMarketsList: EventMarketModel[] = [
    {
        "marketType": "Money Line",
        "marketName": "Money Line",
        "marketId": "123",
        "providers": ["Bet365", "LSports"]
    },
    {
        "marketType": "Spread",
        "marketName": "Spread",
        "marketId": "234",
        "providers": ["Bet365", "LSports"]
    },
    {
        "marketType": "Under/Over",
        "marketName": "Under/Over",
        "marketId": "345",
        "providers": ["LSports"]
    },
    {
        "marketType": "Handicap",
        "marketName": "Handicap",
        "marketId": "456",
        "providers": ["Bet365"]
    }
]

export const mockEventDetail: EventDetailDataModel = {
    "eventId": "12345678",
    "eventName": "Lakers vs Warriors",
    "leagueId": "12345",
    "leagueName": "National Basketball Association",
    "leagueAbbreviation": "NBA",
    "sportId": "12345678",
    "sportType": "BASKETBALL",
    "sportName": "BASKETBALL",
    "runningTime": "1st 09:25",
    "isClockRunning": true,
    "applyTemplates": [
        {
            "templateId": "123",
            "templateName": "template1",
        }
    ],
    "locationName": "abcd",
    "startTime": 1703471869,
    "updateTime": 1703471869,
    "isLive": true,
    "status": "NOT_STARTED_YET",
    "participants": [
        {
            "id": "1234567890",
            "name": "Lakers",
            "abbreviation": "LAL",
            "score": 23,
            "type": "team",
            "cards": [
                {
                    "cardType": "red",
                    "cardCount": 1,
                    "cardImage": "https://xxx.xxx.xxx/red_card.wabp"
                },
                {
                    "cardType": "yellow",
                    "cardCount": 2,
                    "cardImage": "https://xxx.xxx.xxx/yellow_card.wabp"
                }
            ],
            "isHome": true,
            "imageUrl": "https://xxx.xxx.xxx/lal.wabp",
            "eventSuspendedStatus": "SUSPENDED",
            extraScores:
                [
                    {
                        score: 5,
                        type: "PENALTIES"
                    }
                ]
        },
        {
            "id": "1234567891",
            "name": "Warriors",
            "abbreviation": "GSW",
            "score": 33,
            "type": "team",
            "cards": [
                {
                    "cardType": "red",
                    "cardCount": 1,
                    "cardImage": "https://xxx.xxx.xxx/red_card.wabp"
                },
                {
                    "cardType": "yellow",
                    "cardCount": 2,
                    "cardImage": "https://xxx.xxx.xxx/yellow_card.wabp"
                }
            ],
            "isHome": false,
            "imageUrl": "https://xxx.xxx.xxx/gsw.wapb",
            "eventSuspendedStatus": "SUSPENDED",
            extraScores:
                [
                    {
                        score: 5,
                        type: "PENALTIES"
                    }
                ]
        }
    ]
}

export const mockOddsDataList: OddsListModel[] = [
    {
        "provider": "Bet365",
        "isPreferred": true,
        "odds": [
            {
                "baseLine": "0.5",
                "isMostBalance": true,
                "marketId": "123",
                "oddsSuspendedStatus": "LOCK",
                "bets": [
                    {
                        "betId": "118080524911924431",
                        "betName": "Under",
                        "line": "0.5",
                        "price": 15,
                        "betSlips": {
                            "accept": 10000,
                            "acceptAmount": 1836493,
                            "pending": 1200,
                            "pendingAmount": 34829,
                            "rejected": 300,
                            "rejectedAmount": 32874
                        },
                        "updateTime": 1703471869,
                        "originalPrice": 1.5,
                        "acceptedAmount": 24680,
                        "acceptedNumber": 1357,
                        "adjustedNumber": 0.045,
                        "betStatus": "OPEN"
                    },
                    {
                        "betId": "11243777911924431",
                        "betName": "Over",
                        "line": "0.5",
                        "price": 1.05,
                        "betSlips": {
                            "accept": 10000,
                            "acceptAmount": 1836493,
                            "pending": 1200,
                            "pendingAmount": 34829,
                            "rejected": 300,
                            "rejectedAmount": 32874
                        },
                        "updateTime": 1703471869,
                        "originalPrice": 1.5,
                        "acceptedAmount": 24680,
                        "acceptedNumber": 1357,
                        "adjustedNumber": 0.045,
                        "betStatus": "OPEN"
                    }
                ]
            },
            {
                "baseLine": "1.5",
                "isMostBalance": false,
                "marketId": "234",
                "oddsSuspendedStatus": "ACTIVE",
                "bets": [
                    {
                        "betId": "118080534411924431",
                        "betName": "Under",
                        "line": "1.5",
                        "price": 1.5,
                        "betSlips": {
                            "accept": 10000,
                            "acceptAmount": 1836493,
                            "pending": 1200,
                            "pendingAmount": 34829,
                            "rejected": 300,
                            "rejectedAmount": 32874
                        },
                        "updateTime": 1703471869,
                        "originalPrice": 1.5,
                        "acceptedAmount": 24680,
                        "acceptedNumber": 1357,
                        "adjustedNumber": 0.045,
                        "betStatus": "OPEN"
                    },
                    {
                        "betId": "2872472211924431",
                        "betName": "Over",
                        "line": "1.5",
                        "price": 1.181,
                        "betSlips": {
                            "accept": 10000,
                            "acceptAmount": 1836493,
                            "pending": 1200,
                            "pendingAmount": 34829,
                            "rejected": 300,
                            "rejectedAmount": 32874
                        },
                        "updateTime": 1703471869,
                        "originalPrice": 1.5,
                        "acceptedAmount": 24680,
                        "acceptedNumber": 1357,
                        "adjustedNumber": 0.045,
                        "betStatus": "OPEN"
                    }
                ]
            },
            {
                "baseLine": "2.5",
                "isMostBalance": true,
                "marketId": "345",
                "oddsSuspendedStatus": "SUSPENDED",
                "bets": [
                    {
                        "betId": "118080518311924431",
                        "betName": "Under",
                        "line": "2.5",
                        "price": 2.25,
                        "betSlips": {
                            "accept": 10000,
                            "acceptAmount": 1836493,
                            "pending": 1200,
                            "pendingAmount": 34829,
                            "rejected": 300,
                            "rejectedAmount": 32874
                        },
                        "updateTime": 1703471869,
                        "originalPrice": 1.5,
                        "acceptedAmount": 24680,
                        "acceptedNumber": 1357,
                        "adjustedNumber": 0.045,
                        "betStatus": "OPEN"
                    },
                    {
                        "betId": "16988722311924431",
                        "betName": "Over",
                        "line": "2.5",
                        "price": 1.615,
                        "betSlips": {
                            "accept": 10000,
                            "acceptAmount": 1836493,
                            "pending": 1200,
                            "pendingAmount": 34829,
                            "rejected": 300,
                            "rejectedAmount": 32874
                        },
                        "updateTime": 1703471869,
                        "originalPrice": 1.5,
                        "acceptedAmount": 24680,
                        "acceptedNumber": 1357,
                        "adjustedNumber": 0.045,
                        "betStatus": "OPEN"
                    }
                ]
            }
        ]
    },
    {
        "provider": "LSports",
        "isPreferred": false,
        "odds": [
            {
                "baseLine": "0.5",
                "isMostBalance": true,
                "marketId": "123",
                "oddsSuspendedStatus": "ACTIVE",
                "bets": [
                    {
                        "betId": "99204830311924431",
                        "betName": "Under",
                        "line": "0.5",
                        "price": 13.3,
                        "betSlips": {
                            "accept": 10000,
                            "acceptAmount": 1836493,
                            "pending": 1200,
                            "pendingAmount": 34829,
                            "rejected": 300,
                            "rejectedAmount": 32874
                        },
                        "updateTime": 1703471869,
                        "originalPrice": 1.5,
                        "acceptedAmount": 24680,
                        "acceptedNumber": 1357,
                        "adjustedNumber": 0.045,
                        "betStatus": "OPEN"
                    },
                    {
                        "betId": "58455895511924431",
                        "betName": "Over",
                        "line": "0.5",
                        "price": 1.001,
                        "betSlips": {
                            "accept": 10000,
                            "acceptAmount": 1836493,
                            "pending": 1200,
                            "pendingAmount": 34829,
                            "rejected": 300,
                            "rejectedAmount": 32874
                        },
                        "updateTime": 1703471869,
                        "originalPrice": 1.5,
                        "acceptedAmount": 24680,
                        "acceptedNumber": 1357,
                        "adjustedNumber": 0.045,
                        "betStatus": "OPEN"
                    }
                ]
            },
            {
                "baseLine": "1.0",
                "isMostBalance": false,
                "marketId": "234",
                "oddsSuspendedStatus": "CLOSED",
                "bets": [
                    {
                        "betId": "99204821111924431",
                        "betName": "Under",
                        "line": "1.0",
                        "price": 10.5,
                        "betSlips": {
                            "accept": 10000,
                            "acceptAmount": 1836493,
                            "pending": 1200,
                            "pendingAmount": 34829,
                            "rejected": 300,
                            "rejectedAmount": 32874
                        },
                        "updateTime": 1703471869,
                        "originalPrice": 1.5,
                        "acceptedAmount": 24680,
                        "acceptedNumber": 1357,
                        "adjustedNumber": 0.045,
                        "betStatus": "OPEN"
                    },
                    {
                        "betId": "136460653711924431",
                        "betName": "Over",
                        "line": "1.0",
                        "price": 1.003,
                        "betSlips": {
                            "accept": 10000,
                            "acceptAmount": 1836493,
                            "pending": 1200,
                            "pendingAmount": 34829,
                            "rejected": 300,
                            "rejectedAmount": 32874
                        },
                        "updateTime": 1703471869,
                        "originalPrice": 1.5,
                        "acceptedAmount": 24680,
                        "acceptedNumber": 1357,
                        "adjustedNumber": 0.045,
                        "betStatus": "OPEN"
                    }
                ]
            },
            {
                "baseLine": "1.5",
                "isMostBalance": false,
                "marketId": "345",
                "oddsSuspendedStatus": "ACTIVE",
                "bets": [
                    {
                        "betId": "99204820811924431",
                        "betName": "Under",
                        "line": "1.5",
                        "price": 4.2,
                        "betSlips": {
                            "accept": 10000,
                            "acceptAmount": 1836493,
                            "pending": 1200,
                            "pendingAmount": 34829,
                            "rejected": 300,
                            "rejectedAmount": 32874
                        },
                        "updateTime": 1703471869,
                        "originalPrice": 1.5,
                        "acceptedAmount": 24680,
                        "acceptedNumber": 1357,
                        "adjustedNumber": 0.045,
                        "betStatus": "OPEN"
                    },
                    {
                        "betId": "96132201011924431",
                        "betName": "Over",
                        "line": "1.5",
                        "price": 1.172,
                        "betSlips": {
                            "accept": 10000,
                            "acceptAmount": 1836493,
                            "pending": 1200,
                            "pendingAmount": 34829,
                            "rejected": 300,
                            "rejectedAmount": 32874
                        },
                        "updateTime": 1703471869,
                        "originalPrice": 1.5,
                        "acceptedAmount": 24680,
                        "acceptedNumber": 1357,
                        "adjustedNumber": 0.045,
                        "betStatus": "OPEN"
                    }
                ]
            }
        ]
    }
]

export const mockBalanceData: OddsMarketBalanceModel = {
    "totalAmount": 100000.00,
    "currency": "RMB",
    "balance": [
        {
            "balanceName": "Home",
            "balanceNumber": 45.5
        },
        {
            "balanceName": "Away",
            "balanceNumber": 50.5
        },
        {
            "balanceName": "Draw",
            "balanceNumber": 5.0
        }
    ]
}