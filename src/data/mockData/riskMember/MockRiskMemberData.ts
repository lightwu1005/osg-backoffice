import {
    RiskMembersBetSlipsListModel,
    RiskMembersListModel,
    RiskMembersPerformanceModel
} from "@/services/@core/module/ResponseDataModels";

export const mockRiskMembersData: RiskMembersListModel = {
    "totalElements": 999,
    "content": [
        {
            "punterId": "12345",
            "punterAccount": "123@ollehsports.com",
            "risk": {
                "riskId": "12345",
                "riskName": "Level 1",
                "riskColor": "#FFFFFF",
                "riskTags": [
                    {
                        "tagId": "76543",
                        "tagName": "Block"
                    }
                ]
            },
            "tags": [
                {
                    "tagId": "98765",
                    "tagName": "Unusual IP"
                },
                {
                    "tagId": "87654",
                    "tagName": "Duplicate Accounts"
                },
                {
                    "tagId": "76543",
                    "tagName": "Block"
                }
            ],
            "registerTime": 1703471869
        },
        {
            "punterId": "23456",
            "punterAccount": "234@ollehsports.com",
            "risk": {
                "riskId": "23456",
                "riskName": "Level 2",
                "riskColor": "#FFFFF0",
                "riskTags": [
                    {
                        "tagId": "87654",
                        "tagName": "Duplicate Accounts"
                    }
                ]
            },
            "tags": [
                {
                    "tagId": "98765",
                    "tagName": "Unusual IP"
                },
                {
                    "tagId": "76543",
                    "tagName": "Block"
                }
            ],
            "registerTime": 1703471869
        }
    ]
}

export const mockRiskMembersBetSlipsData : RiskMembersBetSlipsListModel = {
    "totalElements": 999,
    "content": [
        {
            "betSlipId": "11223344556677",
            "betTime": 1703471869,
            "accountInfo": {
                "ipAddress": "111.222.333.444",
                "device": "iOS"
            },
            "risk": {
                "riskId": "123456",
                "riskName": "VVIP",
                "riskColor": "#FFFFFF"
            },
            "betPart": {
                "betType": "SINGLE",
                "betAmount": 1234,
                "maxPayout": 1234567,
                "payout": 123456,
                "legs": [
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueA",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "eventStatus": "IN_PROGRESS",
                        "marketName": "Over/Under",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "isMostBalance": true,
                        "eventType": "preMatch",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "type": "team",
                                "isHome": true,
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
                                "score": 33,
                                "type": "team",
                                "isHome": false,
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
                ]
            },
            "statusPart": {
                "status": "NOT_ACCETPED",
                "result": "win",
                "settlement": "UNSETTLED",
                "description": "This is Robot betting"
            }
        },
        {
            "betSlipId": "11223344556678",
            "betTime": 1703472169,
            "accountInfo": {
                "ipAddress": "111.222.333.999",
                "device": "Android"
            },
            "risk": {
                "riskId": "123457",
                "riskName": "VVVIP",
                "riskColor": "#FFFFFF"
            },
            "betPart": {
                "betType": "PARLAY",
                "betAmount": 1244,
                "maxPayout": 1234568,
                "payout": 123457,
                "legs": [
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "eventStatus": "IN_PROGRESS",
                        "marketName": "Over/Under",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "isMostBalance": true,
                        "eventType": "preMatch",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB2",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "eventStatus": "IN_PROGRESS",
                        "marketName": "Over/Under",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "isMostBalance": true,
                        "eventType": "preMatch",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    }
                ]
            },
            "statusPart": {
                "status": "NOT_ACCETPED",
                "result": "win",
                "settlement": "UNSETTLED",
                "description": "This is Robot betting"
            }
        },
        {
            "betSlipId": "11223344556678",
            "betTime": 1703472169,
            "accountInfo": {
                "ipAddress": "111.222.333.999",
                "device": "Android"
            },
            "risk": {
                "riskId": "123457",
                "riskName": "VVVIP",
                "riskColor": "#FFFFFF"
            },
            "betPart": {
                "betType": "PARLAY",
                "betAmount": 1244,
                "maxPayout": 1234568,
                "payout": 123457,
                "legs": [
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "eventStatus": "IN_PROGRESS",
                        "marketName": "Over/Under",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "isMostBalance": true,
                        "eventType": "preMatch",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB2",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "eventStatus": "IN_PROGRESS",
                        "marketName": "Over/Under",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "isMostBalance": true,
                        "eventType": "preMatch",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    }
                ]
            },
            "statusPart": {
                "status": "NOT_ACCETPED",
                "result": "win",
                "settlement": "UNSETTLED",
                "description": "This is Robot betting"
            }
        },
        {
            "betSlipId": "11223344556678",
            "betTime": 1703472169,
            "accountInfo": {
                "ipAddress": "111.222.333.999",
                "device": "Android"
            },
            "risk": {
                "riskId": "123457",
                "riskName": "VVVIP",
                "riskColor": "#FFFFFF"
            },
            "betPart": {
                "betType": "PARLAY",
                "betAmount": 1244,
                "maxPayout": 1234568,
                "payout": 123457,
                "legs": [
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "eventStatus": "IN_PROGRESS",
                        "marketName": "Over/Under",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "isMostBalance": true,
                        "eventType": "preMatch",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB2",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "eventStatus": "IN_PROGRESS",
                        "marketName": "Over/Under",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "isMostBalance": true,
                        "eventType": "preMatch",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    }
                ]
            },
            "statusPart": {
                "status": "NOT_ACCETPED",
                "result": "win",
                "settlement": "UNSETTLED",
                "description": "This is Robot betting"
            }
        },
        {
            "betSlipId": "11223344556678",
            "betTime": 1703472169,
            "accountInfo": {
                "ipAddress": "111.222.333.999",
                "device": "Android"
            },
            "risk": {
                "riskId": "123457",
                "riskName": "VVVIP",
                "riskColor": "#FFFFFF"
            },
            "betPart": {
                "betType": "PARLAY",
                "betAmount": 1244,
                "maxPayout": 1234568,
                "payout": 123457,
                "legs": [
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "eventStatus": "IN_PROGRESS",
                        "eventType": "preMatch",
                        "participants": [],
                        "marketName": "Over/Under",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "isMostBalance": true
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB2",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "eventStatus": "IN_PROGRESS",
                        "eventType": "preMatch",
                        "participants": [],
                        "marketName": "Over/Under",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "isMostBalance": true
                    }
                ]
            },
            "statusPart": {
                "status": "NOT_ACCETPED",
                "result": "win",
                "settlement": "UNSETTLED",
                "description": "This is Robot betting"
            }
        },
        {
            "betSlipId": "11223344556678",
            "betTime": 1703472169,
            "accountInfo": {
                "ipAddress": "111.222.333.999",
                "device": "Android"
            },
            "risk": {
                "riskId": "123457",
                "riskName": "VVVIP",
                "riskColor": "#FFFFFF"
            },
            "betPart": {
                "betType": "PARLAY",
                "betAmount": 1244,
                "maxPayout": 1234568,
                "payout": 123457,
                "legs": [
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "eventStatus": "IN_PROGRESS",
                        "eventType": "preMatch",
                        "participants": [],
                        "marketName": "Over/Under",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "isMostBalance": true
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB2",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "eventStatus": "IN_PROGRESS",
                        "eventType": "preMatch",
                        "participants": [],
                        "marketName": "Over/Under",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "isMostBalance": true
                    }
                ]
            },
            "statusPart": {
                "status": "NOT_ACCETPED",
                "result": "win",
                "settlement": "UNSETTLED",
                "description": "This is Robot betting"
            }
        },
        {
            "betSlipId": "11223344556678",
            "betTime": 1703472169,
            "accountInfo": {
                "ipAddress": "111.222.333.999",
                "device": "Android"
            },
            "risk": {
                "riskId": "123457",
                "riskName": "VVVIP",
                "riskColor": "#FFFFFF"
            },
            "betPart": {
                "betType": "PARLAY",
                "betAmount": 1244,
                "maxPayout": 1234568,
                "payout": 123457,
                "legs": [
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "eventType": "preMatch",
                        "eventStatus": "IN_PROGRESS",
                        "marketName": "Over/Under",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "isMostBalance": true,
                        "participants": []
                    },

                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB2",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "eventType": "preMatch",
                        "eventStatus": "IN_PROGRESS",
                        "marketName": "Over/Under",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "isMostBalance": true,
                        "participants": []
                    }
                ]
            },
            "statusPart": {
                "status": "NOT_ACCETPED",
                "result": "win",
                "settlement": "UNSETTLED",
                "description": "This is Robot betting"
            }
        },
        {
            "betSlipId": "11223344556678",
            "betTime": 1703472169,
            "accountInfo": {
                "ipAddress": "111.222.333.999",
                "device": "Android"
            },
            "risk": {
                "riskId": "123457",
                "riskName": "VVVIP",
                "riskColor": "#FFFFFF"
            },
            "betPart": {
                "betType": "PARLAY",
                "betAmount": 1244,
                "maxPayout": 1234568,
                "payout": 123457,
                "legs": [
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "eventStatus": "IN_PROGRESS",
                        "eventType": "preMatch",
                        "marketName": "Over/Under",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "isMostBalance": true,
                        "participants": []
                    },

                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB2",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "eventStatus": "IN_PROGRESS",
                        "eventType": "preMatch",
                        "marketName": "Over/Under",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "isMostBalance": true,
                        "participants": []
                    }
                ]
            },
            "statusPart": {
                "status": "NOT_ACCETPED",
                "result": "win",
                "settlement": "UNSETTLED",
                "description": "This is Robot betting"
            }
        }
    ]
}

export const mockRiskMembersPerformanceTotalAmountData: RiskMembersPerformanceModel = {
    "infoTitle": "Total Bet Amount",
    "infoSubtitle": "",
    "infoId": "",
    "totalNumber": 0,
    "infoData": [
        {
            "dataName": "00:00",
            "dataNumber": 12748
        },
        {
            "dataName": "04:00",
            "dataNumber": 15937
        },
        {
            "dataName": "08:00",
            "dataNumber": 13888
        },
        {
            "dataName": "12:00",
            "dataNumber": 12539
        }
    ]
}

export const mockRiskMembersPerformanceWinLossRateData: RiskMembersPerformanceModel = {
    "infoTitle": "Win Rate",
    "infoSubtitle": "",
    "infoId": "",
    "totalNumber": 75317,
    "infoData": [
        {
            "dataName": "Win",
            "dataNumber": 55492
        },
        {
            "dataName": "Loss",
            "dataNumber": 15937
        },
        {
            "dataName": "Draw",
            "dataNumber": 3888
        }
    ]
}