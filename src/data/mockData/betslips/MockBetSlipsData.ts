import {BetSlipsListModel} from "@/services/@core/module/ResponseDataModels";

export const mockBetSlipsData: BetSlipsListModel = {
    "totalElements": 999,
    "content": [
        {
            "id": "0",
            "betSlipId": "11223344556677",
            "betTime": 1703471869,
            "operator": "Ollehsports001",
            "operatorTime": 1703471869,
            "accountInfo": {
                "punterAccount": "abcdefg001",
                "punterId": "1234567890",
                "ipAddress": "111.222.333.444",
                "device": "iOS"
            },
            "risk": {
                "riskId": "12345",
                "riskName": "VVIP",
                "riskColor": "#9FA6AD"
            },
            "betPart": {
                "betType": "SINGLE",
                "betAmount": 1234,
                "maxPayout": 123456,
                "payout": 0,
                "legs": [
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueA",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "98765412312312312312321",
                        "providerName": "LSport",
                        "eventStatus": "IN_PROGRESS",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "103856792",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "preMatch",
                        "participants": [
                            {
                                "id": "123457890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 23,
                                "type": "team",
                                "isHome": true,
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
                                extraScores:
                                    [
                                        {
                                            score: 5,
                                            type: "PENALTIES"
                                        }
                                    ]
                            },
                            {
                                "id": "134567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 33,
                                "type": "team",
                                "isHome": false,
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
                                extraScores:
                                    [
                                        {
                                            score: 3,
                                            type: "PENALTIES"
                                        }
                                    ]
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "98765421",
                        "providerName": "LSport",
                        "eventStatus": "NOT_STARTED_YET",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "preMatch",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 23,
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
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 33,
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
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueC",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "providerName": "LSport",
                        "eventStatus": "IN_PROGRESS",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 46,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 55,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueD",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "providerName": "LSport",
                        "eventStatus": "IN_PROGRESS",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 34,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 45,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueE",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "providerName": "Genius",
                        "eventStatus": "IN_PROGRESS",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 24,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 35,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    }
                ],
            },
            "statusPart": {
                "status": "PENDING",
                "result": "WIN",
                "settlement": "UNSETTLED",
                "description": ""
            }
        },
        {
            "id": "1",
            "betSlipId": "11223344556678",
            "betTime": 1703471869,
            "operator": "Ollehsports002",
            "operatorTime": 1703471869,
            "accountInfo": {
                "punterAccount": "abcdefg001",
                "punterId": "1234567890",
                "ipAddress": "111.222.333.444",
                "device": "iOS"
            },
            "risk": {
                "riskId": "12345",
                "riskName": "VVIP",
                "riskColor": "#9FA6AD"
            },
            "betPart": {
                "betType": "PARLAY",
                "betAmount": 1234,
                "maxPayout": 123456,
                "payout": 123456,
                "legs": [
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueA",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "providerName": "LSport",
                        "eventStatus": "IN_PROGRESS",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "12345567",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 33,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 43,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "providerName": "LSport",
                        "eventStatus": "NOT_STARTED_YET",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "5678903",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 34,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 44,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueC",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "providerName": "LSport",
                        "eventStatus": "FINISHED",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "2356113",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 35,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 46,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueD",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "providerName": "LSport",
                        "eventStatus": "IN_PROGRESS",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "5675444",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 36,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 47,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueE",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "providerName": "LSport",
                        "eventStatus": "IN_PROGRESS",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "13789088",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 37,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 48,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    }
                ],
            },
            "statusPart": {
                "status": "ACCEPTED",
                "result": "WIN",
                "settlement": "SETTLED",
                "description": "This is Robot betting"
            }
        },
        {
            "id": "2",
            "betSlipId": "11223344556679",
            "betTime": 1703471869,
            "operator": "Ollehsports003",
            "operatorTime": 1703471869,
            "accountInfo": {
                "punterAccount": "abcdefg001",
                "punterId": "1234567890",
                "ipAddress": "111.222.333.444",
                "device": "iOS"
            },
            "risk": {
                "riskId": "12345",
                "riskName": "VVIP",
                "riskColor": "#9FA6AD"
            },
            "betPart": {
                "betType": "PARLAY",
                "betAmount": 1234,
                "maxPayout": 15555,
                "payout": 3457,
                "legs": [
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueA",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "providerName": "LSport",
                        "eventStatus": "IN_PROGRESS",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 38,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 49,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "providerName": "LSport",
                        "eventStatus": "IN_PROGRESS",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 39,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 50,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueC",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "providerName": "LSport",
                        "eventStatus": "IN_PROGRESS",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 40,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 51,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueD",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "providerName": "LSport",
                        "eventStatus": "IN_PROGRESS",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 41,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 52,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueE",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "providerName": "LSport",
                        "eventStatus": "IN_PROGRESS",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 42,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 53,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    }
                ],
            },
            "statusPart": {
                "status": "REJECTED",
                "result": "DRAW",
                "settlement": "EARLY_SETTLED",
                "description": "This is Robot betting"
            }
        },
        {
            "id": "3",
            "betSlipId": "11223344556680",
            "betTime": 1703471869,
            "operator": "Ollehsports004",
            "operatorTime": 1703471869,
            "accountInfo": {
                "punterAccount": "abcg001",
                "punterId": "1234567890",
                "ipAddress": "111.222.333.444",
                "device": "iOS"
            },
            "risk": {
                "riskId": "12345",
                "riskName": "VVIP",
                "riskColor": "#9FA6AD"
            },
            "betPart": {
                "betType": "PARLAY",
                "betAmount": 1234,
                "maxPayout": 77777,
                "payout": 58777,
                "legs": [
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueA",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "providerName": "LSport",
                        "eventStatus": "IN_PROGRESS",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 43,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 54,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueB",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "providerName": "LSport",
                        "eventStatus": "IN_PROGRESS",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 44,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 55,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueC",
                        "leagueId": "987654",
                        "providerName": "LSport",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "eventStatus": "IN_PROGRESS",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 45,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 56,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueD",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "providerName": "LSport",
                        "eventStatus": "IN_PROGRESS",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 46,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 57,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    },
                    {
                        "sportName": "Soccer",
                        "sportId": "123456",
                        "leagueName": "LeagueE",
                        "leagueId": "987654",
                        "eventName": "teamA vs teamB",
                        "eventId": "987654321",
                        "providerName": "LSport",
                        "eventStatus": "IN_PROGRESS",
                        "eventTime": 1703471869,
                        "marketName": "Under/Over",
                        "marketId": "24680",
                        "betId": "1038567492",
                        "betName": "Over",
                        "line": "3.5",
                        "odds": 1.56,
                        "status": "Win",
                        "isMostBalance": true,
                        "eventType": "inPlay",
                        "participants": [
                            {
                                "id": "1234567890",
                                "name": "Lakers",
                                "score": 23,
                                "finalScore": 47,
                                "type": "team",
                                "isHome": true,
                            },
                            {
                                "id": "1234567891",
                                "name": "Warriors",
                                "score": 33,
                                "finalScore": 58,
                                "type": "team",
                                "isHome": false,
                            }
                        ]
                    }
                ],
            },
            "statusPart": {
                "status": "RESULTING",
                "result": "VOID",
                "settlement": "UNSETTLED",
                "description": "This is Robot betting"
            }
        }
    ]
}

export const mockBetslipAcceptanceData = {
    "successIds": ["12345", "943458"],
    "failureIds": [],
}