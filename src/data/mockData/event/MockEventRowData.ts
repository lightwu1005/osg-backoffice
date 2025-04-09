import {EventDataModel, EventListModel, ParticipantDataModel} from "@/services/@core/module/ResponseDataModels";
import {EventStatus} from "@/services/@core/module/EventStatus";

export const mockEventList: EventListModel = {
    "totalElements": 14,
    "content": [
        {
            "id": "2",
            "eventId": "22132455326335464",
            "eventName": "Lakers vs Warriors",
            "leagueId": "1002",
            "leagueName": "National Basketball Association",
            "leagueAbbreviation": "NBA",
            "sportId": "2002",
            "sportType": "BASKETBALL",
            "sportName": "籃球",
            "applyTemplates": [
                {
                    "templateId": "123",
                    "templateName": "template1",
                },
                {
                    "templateId": "456",
                    "templateName": "template2",
                }
            ],
            "participants": [
                {
                    "id": "1234567890",
                    "name": "Lakers",
                    "abbreviation": "LAL",
                    "score": 25,
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
                    "corner": 5,
                    extraScores:
                        [
                            {
                                score: 3,
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
                    "corner": 3,
                    extraScores:
                        [
                            {
                                score: 5,
                                type: "PENALTIES"
                            }
                        ]
                }
            ],
            "locationName": "USA",
            "dangerBallState": "GOAL",
            "startTime": 1703471869,
            "updateTime": 1703471869,
            "runningTime": "1st 09:25",
            "isClockRunning": true,
            "isLive": true,
            "status": "IN_PROGRESS",
            "betSlips": {
                "accept": 10000,
                "acceptAmount": 1836493,
                "pending": 1200,
                "pendingAmount": 34829,
                "rejected": 300,
                "rejectedAmount": 32874
            },
            "marketStatus": {
                "runningNumber": 100,
                "suspendedNumber": 20,
                "closedNumber": 12
            },
            "eventSuspendedStatus": "CLOSE",
            "oddsData": [
                {
                    "marketType": "Match Result",
                    "marketName": "Match Result",
                    "marketId": "3004",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": null,
                    "applyTemplate": {
                        "templateId": "123456",
                        "templateName": "My Template 1"
                    },
                    "odds": [
                        {
                            "baseLine": "",
                            "marketId": "4004",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5008",
                                    "betName": "1",
                                    "line": "",
                                    "price": 2.57,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5009",
                                    "betName": "x",
                                    "line": "",
                                    "price": 4.20,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5010",
                                    "betName": "2",
                                    "line": "",
                                    "price": 5.25,
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
                    "marketType": "Total Goals Over / Under",
                    "marketName": "Total Goals Over / Under",
                    "marketId": "3005",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "0.5",
                            "marketId": "4005",
                            "oddsSuspendedStatus": 'LOCK',
                            "bets": [
                                {
                                    "betId": "5011",
                                    "betName": "Under",
                                    "line": "0.5",
                                    "price": 15,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5012",
                                    "betName": "Over",
                                    "line": "0.5",
                                    "price": 1.05,
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
                            "marketId": "4050",
                            "oddsSuspendedStatus": 'ACTIVE',
                            "bets": [
                                {
                                    "betId": "5150",
                                    "betName": "Under",
                                    "line": "1.5",
                                    "price": 10.11,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5151",
                                    "betName": "Over",
                                    "line": "1.5",
                                    "price": 1.12,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        }
                    ],
                },
                {
                    "marketType": "Asian Handicap",
                    "marketName": "Asian Handicap",
                    "marketId": "3006",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": null,
                    "applyTemplate": {
                        "templateId": "123456",
                        "templateName": "My Template 1"
                    },
                    "odds": [
                        {
                            "baseLine": "-0.25 (0-0)",
                            "oddsSuspendedStatus": 'LOCK',
                            "bets": [
                                {
                                    "betId": "406dd0be-437f-49bc-b394-dfe15434081e",
                                    "betName": "1",
                                    "line": "-0.25 (0-0)",
                                    "price": 1.3340,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "8c010965-6e74-4420-807d-782ddbfae73d",
                                    "betName": "2",
                                    "line": "0.25 (0-0)",
                                    "price": 3.0317,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "-0.75 (0-0)",
                            "oddsSuspendedStatus": 'LOCK',
                            "bets": [
                                {
                                    "betId": "f8c60f72-9320-4563-b261-1609065653f0",
                                    "betName": "1",
                                    "line": "-0.75 (0-0)",
                                    "price": 1.5997,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "831314d7-82b7-46d5-ba80-e93d7e75c1e5",
                                    "betName": "2",
                                    "line": "0.75 (0-0)",
                                    "price": 2.2140,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "-1.0 (0-0)",
                            "oddsSuspendedStatus": '',
                            "bets": [
                                {
                                    "betId": "73290990-d3db-43b4-aa53-0fe2887800e6",
                                    "betName": "1",
                                    "line": "-1.0 (0-0)",
                                    "price": 1.8467,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "9dbc0bf8-cff5-48a1-8788-7b018de5f821",
                                    "betName": "2",
                                    "line": "1.0 (0-0)",
                                    "price": 2.0000,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "-1.25 (0-0)",
                            "oddsSuspendedStatus": '',
                            "bets": [
                                {
                                    "betId": "85992d00-502e-4890-9bf9-b0e047e4b3ed",
                                    "betName": "1",
                                    "line": "-1.25 (0-0)",
                                    "price": 2.1067,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "e31775ca-e5c2-4b4c-b29d-fe597d7eb9f0",
                                    "betName": "2",
                                    "line": "1.25 (0-0)",
                                    "price": 1.7410,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "-1.5 (0-0)",
                            "oddsSuspendedStatus": '',
                            "bets": [
                                {
                                    "betId": "a7ce8d6d-8504-46a1-ac21-bc0038513b79",
                                    "betName": "1",
                                    "line": "-1.5 (0-0)",
                                    "price": 2.3680,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "133f2c7d-0c33-44a3-a4e5-69fe74773f69",
                                    "betName": "2",
                                    "line": "1.5 (0-0)",
                                    "price": 1.6047,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "-1.75 (0-0)",
                            "oddsSuspendedStatus": '',
                            "bets": [
                                {
                                    "betId": "16656c89-e8b6-4932-9cee-2cada0a00192",
                                    "betName": "1",
                                    "line": "-1.75 (0-0)",
                                    "price": 2.6733,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "a2fcdc14-b1ac-4cf8-a782-5c019918d9a8",
                                    "betName": "2",
                                    "line": "1.75 (0-0)",
                                    "price": 1.4163,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "-2.0 (0-0)",
                            "oddsSuspendedStatus": '',
                            "bets": [
                                {
                                    "betId": "b5fcea5c-9616-4cba-87d0-b2d0ab802daa",
                                    "betName": "1",
                                    "line": "-2.0 (0-0)",
                                    "price": 3.4200,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "e93d136b-fb28-4dfd-97db-39e46bc0b6d2",
                                    "betName": "2",
                                    "line": "2.0 (0-0)",
                                    "price": 1.2800,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "-2.25 (0-0)",
                            "oddsSuspendedStatus": '',
                            "bets": [
                                {
                                    "betId": "1b0d1eb7-f06a-4096-a4d9-e53e244b6897",
                                    "betName": "1",
                                    "line": "-2.25 (0-0)",
                                    "price": 3.7600,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "f6e36674-8f58-4afe-bcc1-4f6341cdab11",
                                    "betName": "2",
                                    "line": "2.25 (0-0)",
                                    "price": 1.2260,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "-2.5 (0-0)",
                            "oddsSuspendedStatus": '',
                            "bets": [
                                {
                                    "betId": "2af1c0d8-c91d-4bf8-be60-5778dcb566dd",
                                    "betName": "1",
                                    "line": "-2.5 (0-0)",
                                    "price": 4.1000,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "6ac535df-ddbb-4936-be95-ab06680edd11",
                                    "betName": "2",
                                    "line": "2.5 (0-0)",
                                    "price": 1.1967,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "-2.75 (0-0)",
                            "oddsSuspendedStatus": '',
                            "bets": [
                                {
                                    "betId": "9de64aed-a1d3-4438-b2a7-062c00434683",
                                    "betName": "1",
                                    "line": "-2.75 (0-0)",
                                    "price": 5.0450,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "cc47598b-2944-436b-a6eb-e83ebfaaff5e",
                                    "betName": "2",
                                    "line": "2.75 (0-0)",
                                    "price": 1.1175,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "-3.0 (0-0)",
                            "oddsSuspendedStatus": '',
                            "bets": [
                                {
                                    "betId": "082964fb-b30b-4270-b2e5-9f7c5f2e4cb9",
                                    "betName": "1",
                                    "line": "-3.0 (0-0)",
                                    "price": 7.3000,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "e874ac4a-ad2f-44dc-9d36-caa2420a827c",
                                    "betName": "2",
                                    "line": "3.0 (0-0)",
                                    "price": 1.0613,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "-3.5 (0-0)",
                            "oddsSuspendedStatus": '',
                            "bets": [
                                {
                                    "betId": "c611cc4a-a729-4977-8a38-ee6d3cf36fae",
                                    "betName": "1",
                                    "line": "-3.5 (0-0)",
                                    "price": 8.1000,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "893973c2-f65e-42ff-a817-648626d1fedf",
                                    "betName": "2",
                                    "line": "3.5 (0-0)",
                                    "price": 1.0453,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "-4.0 (0-0)",
                            "oddsSuspendedStatus": '',
                            "bets": [
                                {
                                    "betId": "041e77e6-962a-4fd6-9f91-fd34824427d1",
                                    "betName": "1",
                                    "line": "-4.0 (0-0)",
                                    "price": 17.0000,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "ccc7d4de-7134-4a08-9446-7b97834a106d",
                                    "betName": "2",
                                    "line": "4.0 (0-0)",
                                    "price": 1.0100,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "-4.5 (0-0)",
                            "oddsSuspendedStatus": '',
                            "bets": [
                                {
                                    "betId": "02374bd4-7e92-4c7f-bed1-43a14040fdcd",
                                    "betName": "1",
                                    "line": "-4.5 (0-0)",
                                    "price": 18.0000,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "0.0 (0-0)",
                            "oddsSuspendedStatus": '',
                            "bets": [
                                {
                                    "betId": "59089e94-c7b4-4560-8ab1-9c1e1ebefa88",
                                    "betName": "1",
                                    "line": "0.0 (0-0)",
                                    "price": 1.1880,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "396d37a0-d188-43b2-87a2-ba28fdc868db",
                                    "betName": "2",
                                    "line": "0.0 (0-0)",
                                    "price": 4.4210,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "0.25 (0-0)",
                            "oddsSuspendedStatus": '',
                            "bets": [
                                {
                                    "betId": "4d2ce910-9540-4229-9dfd-3680e22dbda8",
                                    "betName": "1",
                                    "line": "0.25 (0-0)",
                                    "price": 1.1403,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "1edc34d4-e591-4d7b-8033-eb74766530d5",
                                    "betName": "2",
                                    "line": "-0.25 (0-0)",
                                    "price": 4.8833,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "0.75 (0-0)",
                            "oddsSuspendedStatus": '',
                            "bets": [
                                {
                                    "betId": "85b7abf3-a969-4c0b-989a-5aed11c06257",
                                    "betName": "1",
                                    "line": "0.75 (0-0)",
                                    "price": 1.0595,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "523b3da4-368f-4b25-af5b-d0fbf07217a3",
                                    "betName": "2",
                                    "line": "-0.75 (0-0)",
                                    "price": 6.7800,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "1.0 (0-0)",
                            "oddsSuspendedStatus": '',
                            "bets": [
                                {
                                    "betId": "81469468-e13d-4e7e-9c9e-41e73caf428d",
                                    "betName": "1",
                                    "line": "1.0 (0-0)",
                                    "price": 1.0113,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "2f325a53-d3e2-4b7c-a028-69345bb36c63",
                                    "betName": "2",
                                    "line": "-1.0 (0-0)",
                                    "price": 10.8333,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                }
                            ]
                        },
                        {
                            "baseLine": "1.5 (0-0)",
                            "oddsSuspendedStatus": '',
                            "bets": [
                                {
                                    "betId": "b5947bf4-6dca-44f3-a805-702e312e1cf1",
                                    "betName": "1",
                                    "line": "1.5 (0-0)",
                                    "price": 1.0300,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "11e7827c-a03d-4f69-96ec-a30e87fef4aa",
                                    "betName": "2",
                                    "line": "-1.5 (0-0)",
                                    "price": 13.0000,
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
        },
        {
            "id": "3",
            "eventId": "3",
            "eventName": "Lakers vs Warriors",
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
                    "corner": 5
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
                    "corner": 3
                }
            ],
            "leagueId": "1003",
            "leagueName": "National Basketball Association",
            "leagueAbbreviation": "CBA",
            "sportId": "2003",
            "sportType": "BASKETBALL",
            "sportName": "籃球",
            "applyTemplates": [
                {
                    "templateId": "123",
                    "templateName": "template1",
                },
                {
                    "templateId": "456",
                    "templateName": "template2",
                }
            ],
            "locationName": "Asia",
            "updateTime": 1703471869,
            "startTime": 1703471869,
            "runningTime": "1st 09:25",
            "isClockRunning": true,
            "isLive": true,
            "status": "POSTPONED",
            "dangerBallState": "GOAL",
            "betSlips": {
                "accept": 10000,
                "acceptAmount": 1836493,
                "pending": 1200,
                "pendingAmount": 34829,
                "rejected": 300,
                "rejectedAmount": 32874
            },
            "marketStatus": {
                "runningNumber": 100,
                "suspendedNumber": 20,
                "closedNumber": 12
            },
            "eventSuspendedStatus": "SUSPENDED",
            "oddsData": [
                {
                    "marketType": "Match Result",
                    "marketName": "Match Result",
                    "marketId": "3007",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "CLOSE",
                    "odds": [
                        {
                            "baseLine": "",
                            "marketId": "4007",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5015",
                                    "betName": "1",
                                    "line": "",
                                    "price": 1.57,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5016",
                                    "betName": "x",
                                    "line": "",
                                    "price": 4.20,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5017",
                                    "betName": "2",
                                    "line": "",
                                    "price": 4.25,
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
                    "marketType": "Total Goals Over / Under",
                    "marketName": "Total Goals Over / Under",
                    "marketId": "3008",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "CLOSE",
                    "odds": [
                        {
                            "baseLine": "0.5",
                            "marketId": "4008",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5018",
                                    "betName": "Under",
                                    "line": "0.5",
                                    "price": 15,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5019",
                                    "betName": "Over",
                                    "line": "0.5",
                                    "price": 1.05,
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
                            "marketId": "4050",
                            "oddsSuspendedStatus": 'ACTIVE',
                            "bets": [
                                {
                                    "betId": "5150",
                                    "betName": "Under",
                                    "line": "1.5",
                                    "price": 10.11,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5151",
                                    "betName": "Over",
                                    "line": "1.5",
                                    "price": 1.12,
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
                    "marketType": "Asian Handicap",
                    "marketName": "Asian Handicap",
                    "marketId": "3009",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "CLOSE",
                    "odds": [
                        {
                            "baseLine": "0.75 (0-0)",
                            "marketId": "4009",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5020",
                                    "betName": "1",
                                    "line": "0.75 (0-0)",
                                    "price": 1.105,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5021",
                                    "betName": "2",
                                    "line": "-0.75 (0-0)",
                                    "price": 6.80,
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
        },
        {
            "id": "4",
            "eventId": "4",
            "eventName": "Lakers vs Warriors",
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
                    "corner": 5
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
                    "corner": 3
                }
            ],
            "leagueId": "1004",
            "leagueName": "National Basketball Association",
            "leagueAbbreviation": "NBA",
            "sportId": "2004",
            "sportType": "BASKETBALL",
            "sportName": "籃球",
            "applyTemplates": [
                {
                    "templateId": "123",
                    "templateName": "template1",
                }
            ],
            "locationName": "USA",
            "startTime": 1703471869,
            "updateTime": 1703471869,
            "runningTime": "1st 09:25",
            "isClockRunning": true,
            "isLive": true,
            "dangerBallState": "GOAL",
            "betSlips": {
                "accept": 10000,
                "acceptAmount": 1836493,
                "pending": 1200,
                "pendingAmount": 34829,
                "rejected": 300,
                "rejectedAmount": 32874
            },
            "marketStatus": {
                "runningNumber": 100,
                "suspendedNumber": 20,
                "closedNumber": 12
            },
            "eventSuspendedStatus": "CLOSED",
            "status": "LOST_COVERAGE",
            "oddsData": [
                {
                    "marketType": "Match Result",
                    "marketName": "Match Result",
                    "marketId": "3010",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "CLOSED",
                    "odds": [
                        {
                            "baseLine": "",
                            "marketId": "4010",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5022",
                                    "betName": "1",
                                    "line": "",
                                    "price": 1.57,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5023",
                                    "betName": "x",
                                    "line": "",
                                    "price": 4.20,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5024",
                                    "betName": "2",
                                    "line": "",
                                    "price": 5.25,
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
                    "marketType": "Total Goals Over / Under",
                    "marketName": "Total Goals Over / Under",
                    "marketId": "3011",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "0.5",
                            "marketId": "4011",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5025",
                                    "betName": "Under",
                                    "line": "0.5",
                                    "price": 22,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5026",
                                    "betName": "Over",
                                    "line": "0.5",
                                    "price": 1.05,
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
                    "marketType": "Asian Handicap",
                    "marketName": "Asian Handicap",
                    "marketId": "3012",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "0.75 (0-0)",
                            "marketId": "4012",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5027",
                                    "betName": "1",
                                    "line": "0.75 (0-0)",
                                    "price": 1.105,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5028",
                                    "betName": "2",
                                    "line": "-0.75 (0-0)",
                                    "price": 6.80,
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
        },
        {
            "id": "5",
            "eventId": "5",
            "eventName": "Lakers vs Warriors",
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
                    "corner": 5
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
                    "corner": 3
                }
            ],
            "leagueId": "1005",
            "leagueName": "National Basketball Association",
            "leagueAbbreviation": "NBA",
            "sportId": "2005",
            "sportType": "BASKETBALL",
            "sportName": "籃球",
            "applyTemplates": [
                {
                    "templateId": "123",
                    "templateName": "template1",
                }
            ],
            "locationName": "USA",
            "startTime": 1703471869,
            "updateTime": 1703471869,
            "runningTime": "1st 09:26",
            "isClockRunning": true,
            "isLive": true,
            "dangerBallState": "CORNER",
            "betSlips": {
                "accept": 10000,
                "acceptAmount": 1836493,
                "pending": 1200,
                "pendingAmount": 34829,
                "rejected": 300,
                "rejectedAmount": 32874
            },
            "marketStatus": {
                "runningNumber": 100,
                "suspendedNumber": 20,
                "closedNumber": 12
            },
            "eventSuspendedStatus": "PROVIDER_SUSPENDED",
            "status": "SUSPENDED",
            "oddsData": [
                {
                    "marketType": "Match Result",
                    "marketName": "Match Result",
                    "marketId": "3013",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "",
                            "marketId": "4013",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5029",
                                    "betName": "1",
                                    "line": "",
                                    "price": 1.57,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5030",
                                    "betName": "x",
                                    "line": "",
                                    "price": 4.20,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5031",
                                    "betName": "2",
                                    "line": "",
                                    "price": 5.25,
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
                    "marketType": "Total Goals Over / Under",
                    "marketName": "Total Goals Over / Under",
                    "marketId": "3014",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "0.5",
                            "marketId": "4014",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5032",
                                    "betName": "Under",
                                    "line": "0.5",
                                    "price": 15,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5033",
                                    "betName": "Over",
                                    "line": "0.5",
                                    "price": 1.05,
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
                    "marketType": "Asian Handicap",
                    "marketName": "Asian Handicap",
                    "marketId": "3015",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "0.75 (0-0)",
                            "marketId": "4015",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5034",
                                    "betName": "1",
                                    "line": "0.75 (0-0)",
                                    "price": 1.105,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5035",
                                    "betName": "2",
                                    "line": "-0.75 (0-0)",
                                    "price": 6.80,
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
        },
        {
            "id": "6",
            "eventId": "6",
            "eventName": "Lakers vs Warriors",
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
                    "corner": 5
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
                    "corner": 3
                }
            ],
            "leagueId": "1006",
            "leagueName": "National Basketball Association",
            "leagueAbbreviation": "NBA",
            "sportId": "2006",
            "sportType": "BASKETBALL",
            "sportName": "籃球",
            "applyTemplates": [
                {
                    "templateId": "123",
                    "templateName": "template1",
                }
            ],
            "locationName": "USA",
            "startTime": 1703471869,
            "updateTime": 1703471869,
            "runningTime": "1st 09:26",
            "isClockRunning": true,
            "isLive": true,
            "dangerBallState": "CORNER",
            "betSlips": {
                "accept": 10000,
                "acceptAmount": 1836493,
                "pending": 1200,
                "pendingAmount": 34829,
                "rejected": 300,
                "rejectedAmount": 32874
            },
            "marketStatus": {
                "runningNumber": 100,
                "suspendedNumber": 20,
                "closedNumber": 12
            },
            "eventSuspendedStatus": "PROVIDER_CLOSE",
            "status": "FINISHED",
            "oddsData": [
                {
                    "marketType": "Match Result",
                    "marketName": "Match Result",
                    "marketId": "3016",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "",
                            "marketId": "4016",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5036",
                                    "betName": "1",
                                    "line": "",
                                    "price": 1.57,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5037",
                                    "betName": "x",
                                    "line": "",
                                    "price": 4.20,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5038",
                                    "betName": "2",
                                    "line": "",
                                    "price": 5.25,
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
                    "marketType": "Total Goals Over / Under",
                    "marketName": "Total Goals Over / Under",
                    "marketId": "3017",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "0.5",
                            "marketId": "4017",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5039",
                                    "betName": "Under",
                                    "line": "0.5",
                                    "price": 15,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5040",
                                    "betName": "Over",
                                    "line": "0.5",
                                    "price": 1.05,
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
                    "marketType": "Asian Handicap",
                    "marketName": "Asian Handicap",
                    "marketId": "3018",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "0.75 (0-0)",
                            "marketId": "4018",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5041",
                                    "betName": "1",
                                    "line": "0.75 (0-0)",
                                    "price": 1.105,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5042",
                                    "betName": "2",
                                    "line": "-0.75 (0-0)",
                                    "price": 6.80,
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
        },
        {
            "id": "7",
            "eventId": "7",
            "eventName": "Lakers vs Warriors",
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
                    "corner": 5
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
                    "corner": 3
                }
            ],
            "leagueId": "1007",
            "leagueName": "National Basketball Association",
            "leagueAbbreviation": "NBA",
            "sportId": "2007",
            "sportType": "BASKETBALL",
            "sportName": "籃球",
            "applyTemplates": [],
            "locationName": "USA",
            "startTime": 1703471869,
            "updateTime": 1703471869,
            "runningTime": "1st 09:27",
            "isClockRunning": true,
            "isLive": true,
            "dangerBallState": "CORNER",
            "betSlips": {
                "accept": 10000,
                "acceptAmount": 1836493,
                "pending": 1200,
                "pendingAmount": 34829,
                "rejected": 300,
                "rejectedAmount": 32874
            },
            "marketStatus": {
                "runningNumber": 100,
                "suspendedNumber": 20,
                "closedNumber": 12
            },
            "eventSuspendedStatus": "SUSPENDED",
            "status": "LOST_COVERAGE",
            "oddsData": [
                {
                    "marketType": "Match Result",
                    "marketName": "Match Result",
                    "marketId": "3019",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "",
                            "marketId": "4019",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5043",
                                    "betName": "1",
                                    "line": "",
                                    "price": 1.57,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5044",
                                    "betName": "x",
                                    "line": "",
                                    "price": 4.20,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5045",
                                    "betName": "2",
                                    "line": "",
                                    "price": 5.25,
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
                    "marketType": "Total Goals Over / Under",
                    "marketName": "Total Goals Over / Under",
                    "marketId": "3020",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "0.5",
                            "marketId": "4020",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5046",
                                    "betName": "Under",
                                    "line": "0.5",
                                    "price": 15,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5047",
                                    "betName": "Over",
                                    "line": "0.5",
                                    "price": 1.05,
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
                    "marketType": "Asian Handicap",
                    "marketName": "Asian Handicap",
                    "marketId": "3021",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "0.75 (0-0)",
                            "marketId": "4021",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5048",
                                    "betName": "1",
                                    "line": "0.75 (0-0)",
                                    "price": 1.105,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5049",
                                    "betName": "2",
                                    "line": "-0.75 (0-0)",
                                    "price": 6.80,
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
        },
        {
            "id": "8",
            "eventId": "8",
            "eventName": "Lakers vs Warriors",
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
                    "corner": 5
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
                    "corner": 3
                }
            ],
            "leagueId": "1008",
            "leagueName": "National Basketball Association",
            "leagueAbbreviation": "NBA",
            "sportId": "2008",
            "sportType": "BASKETBALL",
            "sportName": "籃球",
            "applyTemplates": [
                {
                    "templateId": "123",
                    "templateName": "template1",
                }
            ],
            "locationName": "USA",
            "startTime": 1703471869,
            "updateTime": 1703471869,
            "runningTime": "1st 09:28",
            "isClockRunning": true,
            "isLive": true,
            "dangerBallState": "CORNER",
            "betSlips": {
                "accept": 10000,
                "acceptAmount": 1836493,
                "pending": 1200,
                "pendingAmount": 34829,
                "rejected": 300,
                "rejectedAmount": 32874
            },
            "marketStatus": {
                "runningNumber": 100,
                "suspendedNumber": 20,
                "closedNumber": 12
            },
            "eventSuspendedStatus": "SUSPENDED",
            "status": "LOST_COVERAGE",
            "oddsData": [
                {
                    "marketType": "Match Result",
                    "marketName": "Match Result",
                    "marketId": "3022",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "",
                            "marketId": "4022",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5050",
                                    "betName": "1",
                                    "line": "",
                                    "price": 1.57,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5051",
                                    "betName": "x",
                                    "line": "",
                                    "price": 4.20,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5052",
                                    "betName": "2",
                                    "line": "",
                                    "price": 5.25,
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
                    "marketType": "Total Goals Over / Under",
                    "marketName": "Total Goals Over / Under",
                    "marketId": "3023",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "0.5",
                            "marketId": "4023",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5053",
                                    "betName": "Under",
                                    "line": "0.5",
                                    "price": 15,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5054",
                                    "betName": "Over",
                                    "line": "0.5",
                                    "price": 1.05,
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
                    "marketType": "Asian Handicap",
                    "marketName": "Asian Handicap",
                    "marketId": "3024",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "0.75 (0-0)",
                            "marketId": "4024",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5055",
                                    "betName": "1",
                                    "line": "0.75 (0-0)",
                                    "price": 1.105,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5056",
                                    "betName": "2",
                                    "line": "-0.75 (0-0)",
                                    "price": 6.80,
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
        },
        {
            "id": "9",
            "eventId": "9",
            "eventName": "Lakers vs Warriors",
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
                    "corner": 5
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
                    "corner": 3
                }
            ],
            "leagueId": "1009",
            "leagueName": "National Basketball Association",
            "leagueAbbreviation": "NBA",
            "sportId": "2009",
            "sportType": "BASKETBALL",
            "sportName": "籃球",
            "applyTemplates": [
                {
                    "templateId": "123",
                    "templateName": "template1",
                }
            ],
            "locationName": "USA",
            "startTime": 1703471869,
            "updateTime": 1703471869,
            "runningTime": "1st 09:29",
            "isClockRunning": true,
            "isLive": true,
            "dangerBallState": "CORNER",
            "betSlips": {
                "accept": 10000,
                "acceptAmount": 1836493,
                "pending": 1200,
                "pendingAmount": 34829,
                "rejected": 300,
                "rejectedAmount": 32874
            },
            "marketStatus": {
                "runningNumber": 100,
                "suspendedNumber": 20,
                "closedNumber": 12
            },
            "eventSuspendedStatus": "",
            "status": "LOST_COVERAGE",
            "oddsData": [
                {
                    "marketType": "Match Result",
                    "marketName": "Match Result",
                    "marketId": "3025",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "CLOSE",
                    "odds": [
                        {
                            "baseLine": "",
                            "marketId": "4025",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5057",
                                    "betName": "1",
                                    "line": "",
                                    "price": 4.57,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5058",
                                    "betName": "x",
                                    "line": "",
                                    "price": 4.20,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5059",
                                    "betName": "2",
                                    "line": "",
                                    "price": 5.25,
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
                    "marketType": "Total Goals Over / Under",
                    "marketName": "Total Goals Over / Under",
                    "marketId": "3026",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "CLOSE",
                    "odds": [
                        {
                            "baseLine": "0.5",
                            "marketId": "4026",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5060",
                                    "betName": "Under",
                                    "line": "0.5",
                                    "price": 1.105,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5061",
                                    "betName": "Over",
                                    "line": "0.5",
                                    "price": 1.105,
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
                    "marketType": "Asian Handicap",
                    "marketName": "Asian Handicap",
                    "marketId": "3027",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "CLOSE",
                    "odds": [
                        {
                            "baseLine": "0.75 (0-0)",
                            "marketId": "4027",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5062",
                                    "betName": "1",
                                    "line": "0.75 (0-0)",
                                    "price": 1.105,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5063",
                                    "betName": "2",
                                    "line": "-0.75 (0-0)",
                                    "price": 6.80,
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
        },
        {
            "id": "10",
            "eventId": "10",
            "eventName": "Lakers vs Warriors",
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
                    "corner": 5
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
                    "corner": 3
                }
            ],
            "leagueId": "1010",
            "leagueName": "National Basketball Association",
            "leagueAbbreviation": "NBA",
            "sportId": "2010",
            "sportType": "BASKETBALL",
            "sportName": "籃球",
            "applyTemplates": [
                {
                    "templateId": "123",
                    "templateName": "template1",
                }
            ],
            "locationName": "USA",
            "startTime": 1703471869,
            "updateTime": 1703471869,
            "runningTime": "1st 09:30",
            "isClockRunning": true,
            "isLive": true,
            "dangerBallState": "CORNER",
            "betSlips": {
                "accept": 10000,
                "acceptAmount": 1836493,
                "pending": 1200,
                "pendingAmount": 34829,
                "rejected": 300,
                "rejectedAmount": 32874
            },
            "marketStatus": {
                "runningNumber": 100,
                "suspendedNumber": 20,
                "closedNumber": 12
            },
            "eventSuspendedStatus": "SUSPENDED",
            "status": "LOST_COVERAGE",
            "oddsData": [
                {
                    "marketType": "Match Result",
                    "marketName": "Match Result",
                    "marketId": "3028",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "",
                            "marketId": "4028",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5064",
                                    "betName": "1",
                                    "line": "",
                                    "price": 1.57,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5065",
                                    "betName": "x",
                                    "line": "",
                                    "price": 4.20,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5066",
                                    "betName": "2",
                                    "line": "",
                                    "price": 5.25,
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
                    "marketType": "Total Goals Over / Under",
                    "marketName": "Total Goals Over / Under",
                    "marketId": "3029",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "0.5",
                            "marketId": "4029",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5067",
                                    "betName": "Under",
                                    "line": "0.5",
                                    "price": 15,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5068",
                                    "betName": "Over",
                                    "line": "0.5",
                                    "price": 1.05,
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
                    "marketType": "Asian Handicap",
                    "marketName": "Asian Handicap",
                    "marketId": "3030",
                    "provider": "LSporrts",
                    "marketSuspendedStatus": "SUSPENDED",
                    "odds": [
                        {
                            "baseLine": "0.75 (0-0)",
                            "marketId": "4030",
                            "oddsSuspendedStatus": "ACTIVE",
                            "bets": [
                                {
                                    "betId": "5069",
                                    "betName": "1",
                                    "line": "0.75 (0-0)",
                                    "price": 1.105,
                                    "updateTime": 1703471869,
                                    "originalPrice": 1.5,
                                    "acceptedAmount": 24680,
                                    "acceptedNumber": 1357,
                                    "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                                },
                                {
                                    "betId": "5070",
                                    "betName": "2",
                                    "line": "-0.75 (0-0)",
                                    "price": 6.80,
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
        }
    ]
}

export const mockEventPins: EventDataModel[] = [
    {
        "id": "1",
        "eventId": "1",
        "eventName": "Lakers vs Warriors",
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
                "corner": 5
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
                "corner": 3
            }
        ],
        "leagueId": "12345",
        "leagueName": "National Basketball Association",
        "leagueAbbreviation": "NBA",
        "sportId": "12345678",
        "sportType": "BASKETBALL",
        "sportName": "籃球",
        "applyTemplates": [
            {
                "templateId": "123",
                "templateName": "template1",
            }
        ],
        "locationName": "abcd",
        "startTime": 1703471869,
        "updateTime": 1703471869,
        "runningTime": "1st 09:25",
        "isClockRunning": true,
        "isLive": true,
        "status": EventStatus.NOT_STARTED_YET,
        "oddsData": [
            {
                "marketType": "Match Result",
                "marketName": "Match Result",
                "marketId": "2345",
                "provider": "LSporrts",
                "marketSuspendedStatus": null,
                "odds": [
                    {
                        "baseLine": "",
                        "marketId": "123",
                        "bets": [
                            {
                                "betId": "42252684911924431",
                                "betName": "1",
                                "line": "",
                                "price": 1.57,
                                "updateTime": 1703471869,
                                "originalPrice": 1.5,
                                "acceptedAmount": 24680,
                                "acceptedNumber": 1357,
                                "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                            },
                            {
                                "betId": "121746245011924431",
                                "betName": "x",
                                "line": "",
                                "price": 4.20,
                                "updateTime": 1703471869,
                                "originalPrice": 1.5,
                                "acceptedAmount": 24680,
                                "acceptedNumber": 1357,
                                "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                            },
                            {
                                "betId": "114355709211924431",
                                "betName": "2",
                                "line": "",
                                "price": 5.25,
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
                "marketType": "Total Goals Over / Under",
                "marketName": "Total Goals Over / Under",
                "marketId": "1234",
                "provider": "LSporrts",
                "marketSuspendedStatus": "SUSPENDED",
                "odds": [
                    {
                        "baseLine": "0.5",
                        "marketId": "123",
                        "bets": [
                            {
                                "betId": "118080524911924431",
                                "betName": "Under",
                                "line": "0.5",
                                "price": 15,
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
                "marketType": "Asian Handicap",
                "marketName": "Asian Handicap",
                "marketId": "4567",
                "provider": "LSporrts",
                "marketSuspendedStatus": "CLOSE",
                "odds": [
                    {
                        "baseLine": "0.75 (0-0)",
                        "marketId": "123",
                        "bets": [
                            {
                                "betId": "189817800411924431",
                                "betName": "1",
                                "line": "0.75 (0-0)",
                                "price": 1.105,
                                "updateTime": 1703471869,
                                "originalPrice": 1.5,
                                "acceptedAmount": 24680,
                                "acceptedNumber": 1357,
                                "adjustedNumber": 0.045,
                                    "betStatus": "OPEN"
                            },
                            {
                                "betId": "53996664611924431",
                                "betName": "2",
                                "line": "-0.75 (0-0)",
                                "price": 6.80,
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
        ],
        "dangerBallState": "CORNER",
        "betSlips": {
            "accept": 10000,
            "acceptAmount": 1836493,
            "pending": 1200,
            "pendingAmount": 34829,
            "rejected": 300,
            "rejectedAmount": 32874
        },
        "marketStatus": {
            "runningNumber": 100,
            "suspendedNumber": 20,
            "closedNumber": 12
        },
        "eventSuspendedStatus": "SUSPENDED"
    }
]

export const getCards = [
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
]

export const getParticipants: ParticipantDataModel[] = [
    {
        "id": "1234567890",
        "name": "Lakers",
        "abbreviation": "LAL",
        "score": 23,
        "type": 'team',
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
        "eventSuspendedStatus": "SUSPENDED"
    },
    {
        "id": "1234567891",
        "name": "Warriors",
        "abbreviation": "GSW",
        "score": 33,
        "type": 'home',
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
        "eventSuspendedStatus": "SUSPENDED"
    }
]

export const mockEventStatusData = {
    "data": ["NOT_STARTED_YET", "IN_PROGRESS", "FINISHED", "CANCELED"]
}

export const marketLineOneXTwo = {
    "eventId": "1234",
    "marketId": "4004",
    "marketType": "Match Result",
    "marketName": "Match Result",
    "marketStatus": "ACTIVE",
    "provider": "LSPORTS",
    "odds": [
        {
            "baseLine": "1.5",
            "marketId": "4004",
            "status": "ACTIVE",
            "isMostBalance": true,
            "oddsSuspendedStatus": "ACTIVE",
            "bets": [
                {
                    "betId": "5008",
                    "betName": "1",
                    "line": "",
                    "price": 2.57,
                    "updateTime": 1703471869,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                },
                {
                    "betId": "5009",
                    "betName": "x",
                    "line": "",
                    "price": 4.20,
                    "updateTime": 1703471869,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                },
                {
                    "betId": "5010",
                    "betName": "2",
                    "line": "",
                    "price": 5.25,
                    "updateTime": 1703471869,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                }
            ]
        }
    ],
};

export const marketLineOverUnder = {
    "eventId": "3113",
    "marketId": "400124",
    "marketType": "Total Goals Over / Under",
    "marketName": "Total Goals Over / Under",
    "marketStatus": "SUSPENDED",
    "provider": "LSPORTS",
    "odds": [
        {
            "baseLine": "0.5",
            "marketId": "4005",
            "status": "ACTIVE",
            "oddsSuspendedStatus": 'LOCK',
            "isMostBalance": true,
            "bets": [
                {
                    "betId": "5011",
                    "betName": "Under",
                    "line": "0.5",
                    "price": 15,
                    "updateTime": 1703471869,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                },
                {
                    "betId": "5012",
                    "betName": "Over",
                    "line": "0.5",
                    "price": 1.05,
                    "updateTime": 1703471869,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                }
            ]
        },
        {
            "baseLine": "1.5",
            "marketId": "4050",
            "status": "ACTIVE",
            "oddsSuspendedStatus": 'ACTIVE',
            "bets": [
                {
                    "betId": "5150",
                    "betName": "Under",
                    "line": "1.5",
                    "price": 10.11,
                    "updateTime": 1703471869,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                },
                {
                    "betId": "5151",
                    "betName": "Over",
                    "line": "1.5",
                    "price": 1.12,
                    "updateTime": 1703471869,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                }
            ]
        }
    ],
};

export const marketLineHandicap = {
    "eventId": "1222234",
    "marketId": "401104",
    "marketType": "Asian Handicap",
    "marketName": "Asian Handicap",
    "marketStatus": "CLOSE",
    "provider": "LSPORTS",
    "odds": [
        {
            "baseLine": "-0.25 (0-0)",
            "status": "CLOSED",
            "oddsSuspendedStatus": 'LOCK',
            "isMostBalance": true,
            "bets": [
                {
                    "betId": "406dd0be-437f-49bc-b394-dfe15434081e",
                    "betName": "1",
                    "line": "-0.25 (0-0)",
                    "price": 1.3340,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 2333,
                        "acceptAmount": 1232,
                        "pending": 456,
                        "pendingAmount": 1223,
                        "rejected": 658,
                        "rejectedAmount": 2434
                    }
                },
                {
                    "betId": "8c010965-6e74-4420-807d-782ddbfae73d",
                    "betName": "2",
                    "line": "0.25 (0-0)",
                    "price": 3.0317,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 2333,
                        "acceptAmount": 1232,
                        "pending": 456,
                        "pendingAmount": 1223,
                        "rejected": 658,
                        "rejectedAmount": 2434
                    }
                }
            ]
        },
        {
            "baseLine": "-0.75 (0-0)",
            "oddsSuspendedStatus": 'LOCK',
            "bets": [
                {
                    "betId": "f8c60f72-9320-4563-b261-1609065653f0",
                    "betName": "1",
                    "line": "-0.75 (0-0)",
                    "price": 1.5997,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 2333,
                        "acceptAmount": 1232,
                        "pending": 456,
                        "pendingAmount": 1223,
                        "rejected": 658,
                        "rejectedAmount": 2434
                    }
                },
                {
                    "betId": "831314d7-82b7-46d5-ba80-e93d7e75c1e5",
                    "betName": "2",
                    "line": "0.75 (0-0)",
                    "price": 2.2140,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 2333,
                        "acceptAmount": 1232,
                        "pending": 456,
                        "pendingAmount": 1223,
                        "rejected": 658,
                        "rejectedAmount": 2434
                    }
                }
            ]
        },
        {
            "baseLine": "-1.0 (0-0)",
            "status": "ACTIVE",
            "oddsSuspendedStatus": '',
            "bets": [
                {
                    "betId": "73290990-d3db-43b4-aa53-0fe2887800e6",
                    "betName": "1",
                    "line": "-1.0 (0-0)",
                    "price": 1.8467,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 2333,
                        "acceptAmount": 1232,
                        "pending": 456,
                        "pendingAmount": 1223,
                        "rejected": 658,
                        "rejectedAmount": 2434
                    }
                },
                {
                    "betId": "9dbc0bf8-cff5-48a1-8788-7b018de5f821",
                    "betName": "2",
                    "line": "1.0 (0-0)",
                    "price": 2.0000,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 2333,
                        "acceptAmount": 1232,
                        "pending": 456,
                        "pendingAmount": 1223,
                        "rejected": 658,
                        "rejectedAmount": 2434
                    }
                }
            ]
        },
        {
            "baseLine": "-1.25 (0-0)",
            "status": "ACTIVE",
            "oddsSuspendedStatus": '',
            "bets": [
                {
                    "betId": "85992d00-502e-4890-9bf9-b0e047e4b3ed",
                    "betName": "1",
                    "line": "-1.25 (0-0)",
                    "price": 2.1067,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 2333,
                        "acceptAmount": 1232,
                        "pending": 456,
                        "pendingAmount": 1223,
                        "rejected": 658,
                        "rejectedAmount": 2434
                    }
                },
                {
                    "betId": "e31775ca-e5c2-4b4c-b29d-fe597d7eb9f0",
                    "betName": "2",
                    "line": "1.25 (0-0)",
                    "price": 1.7410,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 2333,
                        "acceptAmount": 1232,
                        "pending": 456,
                        "pendingAmount": 1223,
                        "rejected": 658,
                        "rejectedAmount": 2434
                    }
                }
            ]
        },
        {
            "baseLine": "-1.5 (0-0)",
            "status": "ACTIVE",
            "oddsSuspendedStatus": '',
            "bets": [
                {
                    "betId": "a7ce8d6d-8504-46a1-ac21-bc0038513b79",
                    "betName": "1",
                    "line": "-1.5 (0-0)",
                    "price": 2.3680,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 2333,
                        "acceptAmount": 1232,
                        "pending": 456,
                        "pendingAmount": 1223,
                        "rejected": 658,
                        "rejectedAmount": 2434
                    }
                },
                {
                    "betId": "133f2c7d-0c33-44a3-a4e5-69fe74773f69",
                    "betName": "2",
                    "line": "1.5 (0-0)",
                    "price": 1.6047,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 2333,
                        "acceptAmount": 1232,
                        "pending": 456,
                        "pendingAmount": 1223,
                        "rejected": 658,
                        "rejectedAmount": 2434
                    }
                }
            ]
        },
        {
            "baseLine": "-1.75 (0-0)",
            "status": "ACTIVE",
            "oddsSuspendedStatus": '',
            "bets": [
                {
                    "betId": "16656c89-e8b6-4932-9cee-2cada0a00192",
                    "betName": "1",
                    "line": "-1.75 (0-0)",
                    "price": 2.6733,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                },
                {
                    "betId": "a2fcdc14-b1ac-4cf8-a782-5c019918d9a8",
                    "betName": "2",
                    "line": "1.75 (0-0)",
                    "price": 1.4163,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                }
            ]
        },
        {
            "baseLine": "-2.0 (0-0)",
            "status": "ACTIVE",
            "oddsSuspendedStatus": '',
            "bets": [
                {
                    "betId": "b5fcea5c-9616-4cba-87d0-b2d0ab802daa",
                    "betName": "1",
                    "line": "-2.0 (0-0)",
                    "price": 3.4200,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                },
                {
                    "betId": "e93d136b-fb28-4dfd-97db-39e46bc0b6d2",
                    "betName": "2",
                    "line": "2.0 (0-0)",
                    "price": 1.2800,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                }
            ]
        },
        {
            "baseLine": "-2.25 (0-0)",
            "status": "ACTIVE",
            "oddsSuspendedStatus": '',
            "bets": [
                {
                    "betId": "1b0d1eb7-f06a-4096-a4d9-e53e244b6897",
                    "betName": "1",
                    "line": "-2.25 (0-0)",
                    "price": 3.7600,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                },
                {
                    "betId": "f6e36674-8f58-4afe-bcc1-4f6341cdab11",
                    "betName": "2",
                    "line": "2.25 (0-0)",
                    "price": 1.2260,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                }
            ]
        },
        {
            "baseLine": "-2.5 (0-0)",
            "status": "ACTIVE",
            "oddsSuspendedStatus": '',
            "bets": [
                {
                    "betId": "2af1c0d8-c91d-4bf8-be60-5778dcb566dd",
                    "betName": "1",
                    "line": "-2.5 (0-0)",
                    "price": 4.1000,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                },
                {
                    "betId": "6ac535df-ddbb-4936-be95-ab06680edd11",
                    "betName": "2",
                    "line": "2.5 (0-0)",
                    "price": 1.1967,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                }
            ]
        },
        {
            "baseLine": "-2.75 (0-0)",
            "status": "ACTIVE",
            "oddsSuspendedStatus": '',
            "bets": [
                {
                    "betId": "9de64aed-a1d3-4438-b2a7-062c00434683",
                    "betName": "1",
                    "line": "-2.75 (0-0)",
                    "price": 5.0450,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                },
                {
                    "betId": "cc47598b-2944-436b-a6eb-e83ebfaaff5e",
                    "betName": "2",
                    "line": "2.75 (0-0)",
                    "price": 1.1175,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                }
            ]
        },
        {
            "baseLine": "-3.0 (0-0)",
            "status": "ACTIVE",
            "oddsSuspendedStatus": '',
            "bets": [
                {
                    "betId": "082964fb-b30b-4270-b2e5-9f7c5f2e4cb9",
                    "betName": "1",
                    "line": "-3.0 (0-0)",
                    "price": 7.3000,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                },
                {
                    "betId": "e874ac4a-ad2f-44dc-9d36-caa2420a827c",
                    "betName": "2",
                    "line": "3.0 (0-0)",
                    "price": 1.0613,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                }
            ]
        },
        {
            "baseLine": "-3.5 (0-0)",
            "status": "ACTIVE",
            "oddsSuspendedStatus": '',
            "bets": [
                {
                    "betId": "c611cc4a-a729-4977-8a38-ee6d3cf36fae",
                    "betName": "1",
                    "line": "-3.5 (0-0)",
                    "price": 8.1000,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                },
                {
                    "betId": "893973c2-f65e-42ff-a817-648626d1fedf",
                    "betName": "2",
                    "line": "3.5 (0-0)",
                    "price": 1.0453,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                }
            ]
        },
        {
            "baseLine": "-4.0 (0-0)",
            "status": "ACTIVE",
            "oddsSuspendedStatus": '',
            "bets": [
                {
                    "betId": "041e77e6-962a-4fd6-9f91-fd34824427d1",
                    "betName": "1",
                    "line": "-4.0 (0-0)",
                    "price": 17.0000,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                },
                {
                    "betId": "ccc7d4de-7134-4a08-9446-7b97834a106d",
                    "betName": "2",
                    "line": "4.0 (0-0)",
                    "price": 1.0100,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                }
            ]
        },
        {
            "baseLine": "-4.5 (0-0)",
            "status": "ACTIVE",
            "oddsSuspendedStatus": '',
            "bets": [
                {
                    "betId": "02374bd4-7e92-4c7f-bed1-43a14040fdcd",
                    "betName": "1",
                    "line": "-4.5 (0-0)",
                    "price": 18.0000,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                }
            ]
        },
        {
            "baseLine": "0.0 (0-0)",
            "status": "ACTIVE",
            "oddsSuspendedStatus": '',
            "bets": [
                {
                    "betId": "59089e94-c7b4-4560-8ab1-9c1e1ebefa88",
                    "betName": "1",
                    "line": "0.0 (0-0)",
                    "price": 1.1880,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                },
                {
                    "betId": "396d37a0-d188-43b2-87a2-ba28fdc868db",
                    "betName": "2",
                    "line": "0.0 (0-0)",
                    "price": 4.4210,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                }
            ]
        },
        {
            "baseLine": "0.25 (0-0)",
            "status": "ACTIVE",
            "oddsSuspendedStatus": '',
            "bets": [
                {
                    "betId": "4d2ce910-9540-4229-9dfd-3680e22dbda8",
                    "betName": "1",
                    "line": "0.25 (0-0)",
                    "price": 1.1403,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                },
                {
                    "betId": "1edc34d4-e591-4d7b-8033-eb74766530d5",
                    "betName": "2",
                    "line": "-0.25 (0-0)",
                    "price": 4.8833,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                }
            ]
        },
        {
            "baseLine": "0.75 (0-0)",
            "status": "ACTIVE",
            "oddsSuspendedStatus": '',
            "bets": [
                {
                    "betId": "85b7abf3-a969-4c0b-989a-5aed11c06257",
                    "betName": "1",
                    "line": "0.75 (0-0)",
                    "price": 1.0595,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                },
                {
                    "betId": "523b3da4-368f-4b25-af5b-d0fbf07217a3",
                    "betName": "2",
                    "line": "-0.75 (0-0)",
                    "price": 6.7800,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                }
            ]
        },
        {
            "baseLine": "1.0 (0-0)",
            "status": "ACTIVE",
            "oddsSuspendedStatus": '',
            "bets": [
                {
                    "betId": "81469468-e13d-4e7e-9c9e-41e73caf428d",
                    "betName": "1",
                    "line": "1.0 (0-0)",
                    "price": 1.0113,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                },
                {
                    "betId": "2f325a53-d3e2-4b7c-a028-69345bb36c63",
                    "betName": "2",
                    "line": "-1.0 (0-0)",
                    "price": 10.8333,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                }
            ]
        },
        {
            "baseLine": "1.5 (0-0)",
            "status": "ACTIVE",
            "oddsSuspendedStatus": '',
            "bets": [
                {
                    "betId": "b5947bf4-6dca-44f3-a805-702e312e1cf1",
                    "betName": "1",
                    "line": "1.5 (0-0)",
                    "price": 1.0300,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                },
                {
                    "betId": "11e7827c-a03d-4f69-96ec-a30e87fef4aa",
                    "betName": "2",
                    "line": "-1.5 (0-0)",
                    "price": 13.0000,
                    "originalPrice": 1.5,
                    "acceptedAmount": 24680,
                    "acceptedNumber": 1357,
                    "adjustedNumber": 0.045,
                    "betStatus": "OPEN",
                    "betSlips": {
                        "accept": 12314,
                        "acceptAmount": 112300,
                        "pending": 22222,
                        "pendingAmount": 12332,
                        "rejected": 12311,
                        "rejectedAmount": 57933
                    }
                }
            ]
        }
    ],
};