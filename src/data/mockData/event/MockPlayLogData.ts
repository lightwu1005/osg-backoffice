import {PlayLogSummaryModel, PlayLogTimelineModel} from "@/services/@core/module/ResponseDataModels";

export const mockPlayLogSummary: PlayLogSummaryModel = {
    "leagueName": "WNBA",
    "eventName": "Dallas Wings W VS Phoenix Mercury W",
    "eventDuration": 6,
    "currentPeriodName": "QUARTER_1ST",
    "animationLink": "https://www.youtube.com/embed/dSDbwfXX5_I?rel=0",
    "competitors": {
        "type": "TEAM",
        "homeName": "Dallas Wings W",
        "awayName": "Phoenix Mercury W",
        "homeClubName": null,
        "awayClubName": null
    },
    "periodScores": [
        {
            "name": "QUARTER_1ST",
            "home": "18",
            "away": "27",
            "sequence": null
        },
        {
            "name": "QUARTER_2ND",
            "home": "26",
            "away": "29",
            "sequence": null
        },
        {
            "name": "QUARTER_3RD",
            "home": "33",
            "away": "27",
            "sequence": null
        },
        {
            "name": "QUARTER_4TH",
            "home": "20",
            "away": "21",
            "sequence": null
        },
        {
            "name": "HALF_1ST",
            "home": "43",
            "away": "56",
            "sequence": null
        },
        {
            "name": "HALF_2ND",
            "home": "53",
            "away": "48",
            "sequence": null
        },
        {
            "name": "PENALTIES",
            "home": "8",
            "away": "7",
            "sequence": null
        },
        {
            "name": "FULL_TIME",
            "home": "96",
            "away": "104",
            "sequence": null
        }
    ],
    "statisticCounts": [
        {
            "name": "TimeOuts",
            "home": "1",
            "away": "4",
            "sequence": null
        },
        {
            "name": "ThreePoints",
            "home": "5",
            "away": "11",
            "sequence": null
        },
        {
            "name": "FreeThrows",
            "home": "34",
            "away": "23",
            "sequence": null
        },
        {
            "name": "TwoPoints",
            "home": "28",
            "away": "25",
            "sequence": null
        },
        {
            "name": "Fouls",
            "home": "0",
            "away": "0",
            "sequence": null
        }
    ]
}


export const mockTimelineStatuses = [
    "SUBSTITUTION",
    "ASSIST",
    "FOULS",
    "POINTS",
    "POSSESSION_CHANGES",
    "FREE_THROW_OUTCOMES",
    "MATCH_TIP_OFF_WINNER_CHANGES",
    "POSSESSION_ARROW_CHANGES",
    "PHASE_CHANGES",
    "TIMEOUTS"
]

export const mockLineupsData = {
    home: {
        "players": [
            {
                "jerseyNumber": "1",
                "name": "Sánchez, Robert",
                "cards": {
                    "red": 1,
                    "yellow": 0
                },
                "isStarting": true
            },
            {
                "jerseyNumber": "26",
                "name": "Colwill, L",
                "isStarting": true
            },
            {
                "jerseyNumber": "4",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "15",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "22",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "23",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "20",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "27",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "19",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "10",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "14",
                "name": "Chalobah, T",
                "isStarting": true
            }
        ],
        "substitutes": [
            {
                "jerseyNumber": "33",
                "name": "Fofana, Wesley",
                "isStarting": false
            },
            {
                "jerseyNumber": "35",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "6",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "8",
                "name": "Fernández, Enzo Jeremías",
                "isStarting": false
            },
            {
                "jerseyNumber": "9",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "11",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "17",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "18",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "21",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "25",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "38",
                "name": "Sharman-Lowe, T",
                "isStarting": false
            },
            {
                "jerseyNumber": "43",
                "name": "da Silva Moreira, D",
                "isStarting": false
            }
        ]
    },
    away: {
        "players": [
            {
                "jerseyNumber": "1",
                "name": "Sánchez, Robert",
                "cards": {
                    "red": 1,
                    "yellow": 0
                },
                "isStarting": true
            },
            {
                "jerseyNumber": "26",
                "name": "Colwill, L",
                "isStarting": true
            },
            {
                "jerseyNumber": "4",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "15",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "22",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "23",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "20",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "27",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "19",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "10",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "14",
                "name": "Chalobah, T",
                "isStarting": true
            }
        ],
        "substitutes": [
            {
                "jerseyNumber": "33",
                "name": "Fofana, Wesley",
                "isStarting": false
            },
            {
                "jerseyNumber": "35",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "6",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "8",
                "name": "Fernández, Enzo Jeremías",
                "isStarting": false
            },
            {
                "jerseyNumber": "9",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "11",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "17",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "18",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "21",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "25",
                "name": null,
                "isStarting": true
            },
            {
                "jerseyNumber": "38",
                "name": "Sharman-Lowe, T",
                "isStarting": false
            },
            {
                "jerseyNumber": "43",
                "name": "da Silva Moreira, D",
                "isStarting": false
            }
        ]
    },
}

export const mockMatchStats = [
    {
        "name": "Dangerous Attacks",
        "home": 20,
        "away": 20,
        "sequence": 0
    },
    {
        "name": "Dangerous Free Kicks",
        "home": 0,
        "away": 2,
        "sequence": 1
    },
    {
        "name": "Penalties",
        "home": 0,
        "away": 20,
        "sequence": 2
    },
    {
        "name": "Fouls",
        "home": 20,
        "away": 4,
        "sequence": 3
    },
    {
        "name": "Red Cards",
        "home": 20,
        "away": 20,
        "sequence": 4
    }
]

const mockTimelineDataSoccer: PlayLogTimelineModel[] = [
    {
        "eventUtc": 1716454197747,
        "systemLogTime": 1716454197747,
        "team": null,
        "periodName": "HALF_1ST",
        "periodTime": 0,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454197748,
        "systemLogTime": 1716454197748,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 0,
        "type": "KICK_OFFS",
        "dangerState": null,
        "description": "Kick Off",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454200138,
        "systemLogTime": 1716454200138,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454204764,
        "systemLogTime": 1716454204764,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 7,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454207644,
        "systemLogTime": 1716454207644,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 9,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454209534,
        "systemLogTime": 1716454209534,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 11,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454212562,
        "systemLogTime": 1716454212562,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 14,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454214967,
        "systemLogTime": 1716454214967,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 17,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454220672,
        "systemLogTime": 1716454220672,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 22,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454224954,
        "systemLogTime": 1716454224954,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 27,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454229383,
        "systemLogTime": 1716454229383,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 31,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454231543,
        "systemLogTime": 1716454231543,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 33,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454239247,
        "systemLogTime": 1716454239247,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 41,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454246044,
        "systemLogTime": 1716454246044,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 48,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454250323,
        "systemLogTime": 1716454250323,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 52,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454253355,
        "systemLogTime": 1716454253355,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 55,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454255477,
        "systemLogTime": 1716454255477,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 57,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454258524,
        "systemLogTime": 1716454258524,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 60,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454261527,
        "systemLogTime": 1716454261527,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 63,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454267074,
        "systemLogTime": 1716454267074,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 69,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454269336,
        "systemLogTime": 1716454269336,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 71,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454272714,
        "systemLogTime": 1716454272714,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 74,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454272714,
        "systemLogTime": 1716454272714,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 74,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454297937,
        "systemLogTime": 1716454297937,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 100,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454297937,
        "systemLogTime": 1716454297937,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 100,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454308158,
        "systemLogTime": 1716454308158,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 110,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454310482,
        "systemLogTime": 1716454310482,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 112,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454312277,
        "systemLogTime": 1716454312277,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 114,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454322598,
        "systemLogTime": 1716454322598,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 124,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454330378,
        "systemLogTime": 1716454330378,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 132,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454335264,
        "systemLogTime": 1716454335264,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 137,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454335264,
        "systemLogTime": 1716454335264,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 137,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454347816,
        "systemLogTime": 1716454347816,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 150,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454351681,
        "systemLogTime": 1716454351681,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 153,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454353041,
        "systemLogTime": 1716454353041,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 155,
        "type": "GOALS_KICKS",
        "dangerState": null,
        "description": "Goal Kick",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454353041,
        "systemLogTime": 1716454353041,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 155,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454364484,
        "systemLogTime": 1716454364484,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 166,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454368444,
        "systemLogTime": 1716454368444,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 170,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454370802,
        "systemLogTime": 1716454370802,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 173,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454374874,
        "systemLogTime": 1716454374874,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 177,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454374874,
        "systemLogTime": 1716454374874,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 177,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454384972,
        "systemLogTime": 1716454384972,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 187,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454388525,
        "systemLogTime": 1716454388525,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 190,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454392168,
        "systemLogTime": 1716454392168,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 194,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454394993,
        "systemLogTime": 1716454394993,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 197,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454400896,
        "systemLogTime": 1716454400896,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 203,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454400896,
        "systemLogTime": 1716454400896,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 203,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454415893,
        "systemLogTime": 1716454415893,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 218,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454420638,
        "systemLogTime": 1716454420638,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 222,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454420638,
        "systemLogTime": 1716454420638,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 222,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454427415,
        "systemLogTime": 1716454427415,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 229,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454432979,
        "systemLogTime": 1716454432979,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 235,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454437884,
        "systemLogTime": 1716454437884,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 240,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454439918,
        "systemLogTime": 1716454439918,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 242,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454442392,
        "systemLogTime": 1716454442392,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 244,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454444275,
        "systemLogTime": 1716454444275,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 246,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454452087,
        "systemLogTime": 1716454452087,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 254,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454454496,
        "systemLogTime": 1716454454496,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 256,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454456814,
        "systemLogTime": 1716454456814,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 259,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454462325,
        "systemLogTime": 1716454462325,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 264,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454469079,
        "systemLogTime": 1716454469079,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 271,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454472444,
        "systemLogTime": 1716454472444,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 274,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454475528,
        "systemLogTime": 1716454475528,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 277,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454485268,
        "systemLogTime": 1716454485268,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 287,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454490116,
        "systemLogTime": 1716454490116,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 292,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454492062,
        "systemLogTime": 1716454492062,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 294,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454494886,
        "systemLogTime": 1716454494886,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 297,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454500886,
        "systemLogTime": 1716454500886,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 303,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454504442,
        "systemLogTime": 1716454504442,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 306,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454510025,
        "systemLogTime": 1716454510025,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 312,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454516190,
        "systemLogTime": 1716454516190,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 318,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454519872,
        "systemLogTime": 1716454519872,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 322,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454522420,
        "systemLogTime": 1716454522420,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 324,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454525599,
        "systemLogTime": 1716454525599,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 327,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454528760,
        "systemLogTime": 1716454528760,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 331,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454532174,
        "systemLogTime": 1716454532174,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 334,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454534366,
        "systemLogTime": 1716454534366,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 336,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454538566,
        "systemLogTime": 1716454538566,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 340,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454542200,
        "systemLogTime": 1716454542200,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 344,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454545738,
        "systemLogTime": 1716454545738,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 347,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454549077,
        "systemLogTime": 1716454549077,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 351,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454555970,
        "systemLogTime": 1716454555970,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 358,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_CORNER",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454583131,
        "systemLogTime": 1716454583131,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 385,
        "type": "CORNER",
        "dangerState": null,
        "description": "Corner",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454583131,
        "systemLogTime": 1716454583131,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 385,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454585176,
        "systemLogTime": 1716454585176,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 387,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454594734,
        "systemLogTime": 1716454594734,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 396,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454603819,
        "systemLogTime": 1716454603819,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 406,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454606638,
        "systemLogTime": 1716454606638,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 408,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454610278,
        "systemLogTime": 1716454610278,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 412,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454613241,
        "systemLogTime": 1716454613241,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 415,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454616340,
        "systemLogTime": 1716454616340,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 418,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454616340,
        "systemLogTime": 1716454616340,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 418,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454632889,
        "systemLogTime": 1716454632889,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 435,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454635496,
        "systemLogTime": 1716454635496,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 437,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454641561,
        "systemLogTime": 1716454641561,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 443,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454644812,
        "systemLogTime": 1716454644812,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 447,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454647344,
        "systemLogTime": 1716454647344,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 449,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454652691,
        "systemLogTime": 1716454652691,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 454,
        "type": "GOALS",
        "dangerState": null,
        "description": "Goal!",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454652691,
        "systemLogTime": 1716454652691,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 454,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_GOAL",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454652691,
        "systemLogTime": 1716454652691,
        "team": null,
        "periodName": "HALF_1ST",
        "periodTime": 454,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454710300,
        "systemLogTime": 1716454710300,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 512,
        "type": "KICK_OFFS",
        "dangerState": null,
        "description": "Kick Off",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454712630,
        "systemLogTime": 1716454712630,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 514,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454724595,
        "systemLogTime": 1716454724595,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 526,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454730715,
        "systemLogTime": 1716454730715,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 532,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454730715,
        "systemLogTime": 1716454730715,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 532,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454738547,
        "systemLogTime": 1716454738547,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 540,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454743100,
        "systemLogTime": 1716454743100,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 545,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454746943,
        "systemLogTime": 1716454746943,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 549,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454750976,
        "systemLogTime": 1716454750976,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 553,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454754316,
        "systemLogTime": 1716454754316,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 556,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454756548,
        "systemLogTime": 1716454756548,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 558,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454762618,
        "systemLogTime": 1716454762618,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 564,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454767792,
        "systemLogTime": 1716454767792,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 570,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454772657,
        "systemLogTime": 1716454772657,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 574,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454774751,
        "systemLogTime": 1716454774751,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 577,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454785850,
        "systemLogTime": 1716454785850,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 588,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454785850,
        "systemLogTime": 1716454785850,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 588,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACKING_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454789816,
        "systemLogTime": 1716454789816,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 590,
        "type": "YELLOW_CARD",
        "dangerState": null,
        "description": "has been shown a yellow card.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454837201,
        "systemLogTime": 1716454837201,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 639,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454842915,
        "systemLogTime": 1716454842915,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 645,
        "type": "GOALS",
        "dangerState": null,
        "description": "Goal!",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454842915,
        "systemLogTime": 1716454842915,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 645,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_GOAL",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454842915,
        "systemLogTime": 1716454842915,
        "team": null,
        "periodName": "HALF_1ST",
        "periodTime": 645,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454884847,
        "systemLogTime": 1716454884847,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 687,
        "type": "KICK_OFFS",
        "dangerState": null,
        "description": "Kick Off",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454886371,
        "systemLogTime": 1716454886371,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 688,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454888674,
        "systemLogTime": 1716454888674,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 690,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454892907,
        "systemLogTime": 1716454892907,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 695,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454894486,
        "systemLogTime": 1716454894486,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 696,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454897251,
        "systemLogTime": 1716454897251,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 699,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454901131,
        "systemLogTime": 1716454901131,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 703,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454905380,
        "systemLogTime": 1716454905380,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 707,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454905380,
        "systemLogTime": 1716454905380,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 707,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454930738,
        "systemLogTime": 1716454930738,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 732,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454932738,
        "systemLogTime": 1716454932738,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 734,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454936334,
        "systemLogTime": 1716454936334,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 738,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454944266,
        "systemLogTime": 1716454944266,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 746,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716454944266,
        "systemLogTime": 1716454944266,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 746,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455006275,
        "systemLogTime": 1716455006275,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 808,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455009681,
        "systemLogTime": 1716455009681,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 811,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455013743,
        "systemLogTime": 1716455013743,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 815,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455015918,
        "systemLogTime": 1716455015918,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 818,
        "type": "BLOCKED_SHOTS",
        "dangerState": null,
        "description": "Blocked Shots",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455021572,
        "systemLogTime": 1716455021572,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 823,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_CORNER",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455051483,
        "systemLogTime": 1716455051483,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 853,
        "type": "CORNER",
        "dangerState": null,
        "description": "Corner",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455051483,
        "systemLogTime": 1716455051483,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 853,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455054461,
        "systemLogTime": 1716455054461,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 856,
        "type": "SHOTS_OFF_TARGET",
        "dangerState": null,
        "description": "Shots Off Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455056560,
        "systemLogTime": 1716455056560,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 858,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455057556,
        "systemLogTime": 1716455057556,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 859,
        "type": "GOALS_KICKS",
        "dangerState": null,
        "description": "Goal Kick",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455057556,
        "systemLogTime": 1716455057556,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 859,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455065542,
        "systemLogTime": 1716455065542,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 867,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455074051,
        "systemLogTime": 1716455074051,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 876,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455081262,
        "systemLogTime": 1716455081262,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 883,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455086063,
        "systemLogTime": 1716455086063,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 888,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455094645,
        "systemLogTime": 1716455094645,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 896,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455099245,
        "systemLogTime": 1716455099245,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 901,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455100271,
        "systemLogTime": 1716455100271,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 902,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455102436,
        "systemLogTime": 1716455102436,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 904,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455108094,
        "systemLogTime": 1716455108094,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 910,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455110351,
        "systemLogTime": 1716455110351,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 912,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455116503,
        "systemLogTime": 1716455116503,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 918,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455116503,
        "systemLogTime": 1716455116503,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 918,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455148246,
        "systemLogTime": 1716455148246,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 950,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455153130,
        "systemLogTime": 1716455153130,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 955,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455156443,
        "systemLogTime": 1716455156443,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 958,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455158938,
        "systemLogTime": 1716455158938,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 961,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455165475,
        "systemLogTime": 1716455165475,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 967,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_CORNER",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455198671,
        "systemLogTime": 1716455198671,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1000,
        "type": "CORNER",
        "dangerState": null,
        "description": "Corner",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455198671,
        "systemLogTime": 1716455198671,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1000,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455204679,
        "systemLogTime": 1716455204679,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1006,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455207181,
        "systemLogTime": 1716455207181,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1009,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455217839,
        "systemLogTime": 1716455217839,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1020,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455220290,
        "systemLogTime": 1716455220290,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1022,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455228056,
        "systemLogTime": 1716455228056,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1030,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455233846,
        "systemLogTime": 1716455233846,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1036,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455238995,
        "systemLogTime": 1716455238995,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1041,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455246000,
        "systemLogTime": 1716455246000,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1048,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455248248,
        "systemLogTime": 1716455248248,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1050,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455252347,
        "systemLogTime": 1716455252347,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1054,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455254962,
        "systemLogTime": 1716455254962,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1057,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455260339,
        "systemLogTime": 1716455260339,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1062,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455264658,
        "systemLogTime": 1716455264658,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1066,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455266819,
        "systemLogTime": 1716455266819,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1069,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455274641,
        "systemLogTime": 1716455274641,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1076,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455278778,
        "systemLogTime": 1716455278778,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1081,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455284901,
        "systemLogTime": 1716455284901,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1087,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455292965,
        "systemLogTime": 1716455292965,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1095,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455292965,
        "systemLogTime": 1716455292965,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1095,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455312630,
        "systemLogTime": 1716455312630,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1114,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455317173,
        "systemLogTime": 1716455317173,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1119,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455317173,
        "systemLogTime": 1716455317173,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1119,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACKING_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455340527,
        "systemLogTime": 1716455340527,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1142,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455348154,
        "systemLogTime": 1716455348154,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1150,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455352772,
        "systemLogTime": 1716455352772,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1155,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455355365,
        "systemLogTime": 1716455355365,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1157,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455359856,
        "systemLogTime": 1716455359856,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1162,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455361848,
        "systemLogTime": 1716455361848,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1164,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455365582,
        "systemLogTime": 1716455365582,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1167,
        "type": "SHOTS_OFF_TARGET",
        "dangerState": null,
        "description": "Shots Off Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455367815,
        "systemLogTime": 1716455367815,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1170,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455368724,
        "systemLogTime": 1716455368724,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1170,
        "type": "GOALS_KICKS",
        "dangerState": null,
        "description": "Goal Kick",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455368724,
        "systemLogTime": 1716455368724,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1170,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455388133,
        "systemLogTime": 1716455388133,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1190,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455396434,
        "systemLogTime": 1716455396434,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1198,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455399115,
        "systemLogTime": 1716455399115,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1201,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455402178,
        "systemLogTime": 1716455402178,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1204,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455402178,
        "systemLogTime": 1716455402178,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1204,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455414259,
        "systemLogTime": 1716455414259,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1216,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455421739,
        "systemLogTime": 1716455421739,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1223,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455423550,
        "systemLogTime": 1716455423550,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1225,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455426893,
        "systemLogTime": 1716455426893,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1229,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455430849,
        "systemLogTime": 1716455430849,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1233,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455432720,
        "systemLogTime": 1716455432720,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1234,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455448128,
        "systemLogTime": 1716455448128,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1250,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455448128,
        "systemLogTime": 1716455448128,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1250,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACKING_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455491264,
        "systemLogTime": 1716455491264,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1293,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455493821,
        "systemLogTime": 1716455493821,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1296,
        "type": "SHOTS_ON_TARGET",
        "dangerState": null,
        "description": "Shot On Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455497564,
        "systemLogTime": 1716455497564,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1299,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455502155,
        "systemLogTime": 1716455502155,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1304,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455502155,
        "systemLogTime": 1716455502155,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1304,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455522657,
        "systemLogTime": 1716455522657,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1324,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455525896,
        "systemLogTime": 1716455525896,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1328,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455528131,
        "systemLogTime": 1716455528131,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1330,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455531444,
        "systemLogTime": 1716455531444,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1333,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455534675,
        "systemLogTime": 1716455534675,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1336,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455536379,
        "systemLogTime": 1716455536379,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1338,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455539117,
        "systemLogTime": 1716455539117,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1341,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455541916,
        "systemLogTime": 1716455541916,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1344,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455545742,
        "systemLogTime": 1716455545742,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1347,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455548079,
        "systemLogTime": 1716455548079,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1350,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455552443,
        "systemLogTime": 1716455552443,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1354,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455556266,
        "systemLogTime": 1716455556266,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1358,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455556266,
        "systemLogTime": 1716455556266,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1358,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455577844,
        "systemLogTime": 1716455577844,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1380,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455580026,
        "systemLogTime": 1716455580026,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1382,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455580026,
        "systemLogTime": 1716455580026,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1382,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455593099,
        "systemLogTime": 1716455593099,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1395,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455596636,
        "systemLogTime": 1716455596636,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1398,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455599355,
        "systemLogTime": 1716455599355,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1401,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455603960,
        "systemLogTime": 1716455603960,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1406,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455613088,
        "systemLogTime": 1716455613088,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1415,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455613088,
        "systemLogTime": 1716455613088,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1415,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455658446,
        "systemLogTime": 1716455658446,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1460,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455660685,
        "systemLogTime": 1716455660685,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1462,
        "type": "SHOTS_ON_TARGET",
        "dangerState": null,
        "description": "Shot On Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455665053,
        "systemLogTime": 1716455665053,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1467,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_CORNER",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455689598,
        "systemLogTime": 1716455689598,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1491,
        "type": "CORNER",
        "dangerState": null,
        "description": "Corner",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455689598,
        "systemLogTime": 1716455689598,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1491,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455692166,
        "systemLogTime": 1716455692166,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1494,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455694034,
        "systemLogTime": 1716455694034,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1496,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455700551,
        "systemLogTime": 1716455700551,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1502,
        "type": "GOALS",
        "dangerState": null,
        "description": "Goal!",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455700551,
        "systemLogTime": 1716455700551,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1502,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_GOAL",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455700551,
        "systemLogTime": 1716455700551,
        "team": null,
        "periodName": "HALF_1ST",
        "periodTime": 1502,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455760630,
        "systemLogTime": 1716455760630,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1562,
        "type": "KICK_OFFS",
        "dangerState": null,
        "description": "Kick Off",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455762186,
        "systemLogTime": 1716455762186,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1564,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455764867,
        "systemLogTime": 1716455764867,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1567,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455767319,
        "systemLogTime": 1716455767319,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1569,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455771745,
        "systemLogTime": 1716455771745,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1573,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    }/*,
    {
        "eventUtc": 1716455775669,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1577,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455786264,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1588,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455787383,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1589,
        "type": "GOALS_KICKS",
        "dangerState": null,
        "description": "Goal Kick",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455787383,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1589,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455806976,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1609,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455813784,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1616,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455813784,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1616,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455934266,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1736,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455936934,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1739,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455939178,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1741,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455942617,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1744,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455945540,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1747,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455949374,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1751,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455952380,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1754,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455957537,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1759,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455961965,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1763,
        "type": "OFFSIDES",
        "dangerState": null,
        "description": "Offside",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455961965,
        "team": null,
        "periodName": "HALF_1ST",
        "periodTime": 1763,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455979646,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1781,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455983503,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1785,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455986023,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1788,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455987966,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1790,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455990278,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1792,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455992280,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1794,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455994858,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1797,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716455997957,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1800,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456002100,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1804,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456005398,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1807,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456008499,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1810,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456010544,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1812,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456014818,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1817,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456014818,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1817,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456032942,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1835,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456035561,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1837,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456038366,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1840,
        "type": "SHOTS_ON_TARGET",
        "dangerState": null,
        "description": "Shot On Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456042313,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1844,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456044262,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1846,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456047287,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1849,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456048926,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1851,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456051057,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1853,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456054357,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1856,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456058174,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1860,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456063713,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1865,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456071779,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1874,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456075032,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1877,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456081804,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1884,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456081804,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1884,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456107982,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1910,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456111716,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1913,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456115597,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1917,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456117955,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1920,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456120986,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1923,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456120986,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1923,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456134192,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1936,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456138118,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1940,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456140859,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1943,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456143728,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1945,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456147887,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1950,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456149896,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1952,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456152099,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1954,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456153996,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1956,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456156760,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 1959,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456161931,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1964,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456165759,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1968,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456172997,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1975,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456183092,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1985,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456189217,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1991,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456192490,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1994,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456194613,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1996,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456197340,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 1999,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456200859,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2003,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456204131,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2006,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456204131,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2006,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACKING_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456243978,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2046,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456249140,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2051,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456254531,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2056,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456254531,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2056,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456285197,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2087,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456288162,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2090,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456294620,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2096,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456297894,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2100,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456301009,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2103,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456306280,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2108,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456313380,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2115,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456320543,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2122,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456325125,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2127,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456330700,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2132,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456330700,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2132,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456346647,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2148,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456349989,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2152,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456351794,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2154,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456358246,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2160,
        "type": "SHOTS_OFF_TARGET",
        "dangerState": null,
        "description": "Shots Off Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456360175,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2162,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456361025,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2163,
        "type": "GOALS_KICKS",
        "dangerState": null,
        "description": "Goal Kick",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456361025,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2163,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456379020,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2181,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456385738,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2187,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456391324,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2193,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456391324,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2193,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456404600,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2206,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456407056,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2209,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456409943,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2212,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456412036,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2214,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456415063,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2217,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456416058,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2218,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456420879,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2223,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456420879,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2223,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456434854,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2237,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456442599,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2244,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456449696,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2251,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456451305,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2253,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456453446,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2255,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456459156,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2261,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456463019,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2265,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456463019,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2265,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456471482,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2273,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456483709,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2285,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456488478,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2290,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456491676,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2293,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456495417,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2297,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456497189,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2299,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456500980,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2303,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456504795,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2307,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456504795,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2307,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456623091,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2425,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456626224,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2428,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456627929,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2430,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456630100,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2432,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456635919,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2438,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456635919,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2438,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456673646,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2475,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456675840,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2478,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456678527,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2480,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456680725,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2482,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456681933,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2484,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456687162,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2489,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456693268,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2495,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456696146,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2498,
        "type": "BLOCKED_SHOTS",
        "dangerState": null,
        "description": "Blocked Shots",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456699085,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2501,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456704475,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2506,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456704475,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2506,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456795756,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2598,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456799521,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2601,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456802261,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2604,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456804091,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2606,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456809257,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2611,
        "type": "SHOTS_OFF_TARGET",
        "dangerState": null,
        "description": "Shots Off Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456819569,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2621,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456820717,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2622,
        "type": "GOALS_KICKS",
        "dangerState": null,
        "description": "Goal Kick",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456820717,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2622,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456824697,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2626,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456827609,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2629,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456829429,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2631,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456832056,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2634,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456833840,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2636,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456835581,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2637,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_CORNER",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456848235,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2650,
        "type": "CORNER",
        "dangerState": null,
        "description": "Corner",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456848235,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2650,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456853087,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2655,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_CORNER",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456872273,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2674,
        "type": "CORNER",
        "dangerState": null,
        "description": "Corner",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456872273,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2674,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456877971,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2680,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456881696,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2683,
        "type": "SHOTS_OFF_TARGET",
        "dangerState": null,
        "description": "Shots Off Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456884734,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2686,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456885910,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2688,
        "type": "GOALS_KICKS",
        "dangerState": null,
        "description": "Goal Kick",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456885910,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2688,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456892245,
        "team": null,
        "periodName": "HALF_1ST",
        "periodTime": 2694,
        "type": "STOPPAGE_TIME",
        "dangerState": null,
        "description": "Additional Time null'",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456910635,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2712,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456914145,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2716,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456915448,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2717,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456921135,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2723,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456921135,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2723,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456952567,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2754,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456954516,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2756,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456957161,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2759,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456960120,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2762,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456964076,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2766,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456964076,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2766,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACKING_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456997356,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2799,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716456999094,
        "team": "HOME",
        "periodName": "HALF_1ST",
        "periodTime": 2801,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716457001642,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2803,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716457015081,
        "team": "AWAY",
        "periodName": "HALF_1ST",
        "periodTime": 2817,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716457021371,
        "team": null,
        "periodName": "HALF_TIME",
        "periodTime": 0,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458333959,
        "team": null,
        "periodName": "HALF_2ND",
        "periodTime": 0,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458333964,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 0,
        "type": "KICK_OFFS",
        "dangerState": null,
        "description": "Kick Off",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458335934,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458337827,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 3,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458340961,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 7,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458345730,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 11,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458351444,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 17,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458351444,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 17,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACKING_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458380762,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 46,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458383007,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 49,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458385998,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 52,
        "type": "SHOTS_ON_TARGET",
        "dangerState": null,
        "description": "Shot On Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458387838,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 53,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458392558,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 58,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458399163,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 65,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458401868,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 67,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458413808,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 79,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458420277,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 86,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458425674,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 91,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458430607,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 96,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458434802,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 100,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458434802,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 100,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458447038,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 113,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458451243,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 117,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458457457,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 123,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458460584,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 126,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458467119,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 133,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458471140,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 137,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458471140,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 137,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458481888,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 147,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458487659,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 153,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458489690,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 155,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458489690,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 155,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458498948,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 164,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458503179,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 169,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458508158,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 174,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458508158,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 174,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458532127,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 198,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458542562,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 208,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458549763,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 215,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458549763,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 215,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458564358,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 230,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458566401,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 232,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458569703,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 235,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458571715,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 237,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458576250,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 242,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458581186,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 247,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458585274,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 251,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458587199,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 253,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458593082,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 259,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458597019,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 263,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458599799,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 265,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458602277,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 268,
        "type": "SHOTS_ON_TARGET",
        "dangerState": null,
        "description": "Shot On Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458604218,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 270,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458608729,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 274,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458613732,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 279,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458615528,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 281,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458618699,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 284,
        "type": "SHOTS_ON_TARGET",
        "dangerState": null,
        "description": "Shot On Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458623314,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 289,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_CORNER",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458658502,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 324,
        "type": "CORNER",
        "dangerState": null,
        "description": "Corner",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458658502,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 324,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458660721,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 326,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458664266,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 330,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458671644,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 337,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458671644,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 337,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458695986,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 362,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458700291,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 366,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458700291,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 366,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458718220,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 384,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458721968,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 388,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458726613,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 392,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458726613,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 392,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458732344,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 398,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458734758,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 400,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458738776,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 404,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458742553,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 408,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458747385,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 413,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458749614,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 415,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458752006,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 418,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458754320,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 420,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458756416,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 422,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458763813,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 429,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458769020,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 435,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458772664,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 438,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458778279,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 444,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458784722,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 450,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458792211,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 458,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458795421,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 461,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458800098,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 466,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458802622,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 468,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458804936,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 470,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458808696,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 474,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458814500,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 480,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458821676,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 487,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458826652,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 492,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458826652,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 492,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458882916,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 548,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458886730,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 552,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458890692,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 556,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458894314,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 560,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458900415,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 566,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458903119,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 569,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458904980,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 571,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458907427,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 573,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458917245,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 583,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458919809,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 585,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458922863,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 588,
        "type": "SHOTS_ON_TARGET",
        "dangerState": null,
        "description": "Shot On Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458924511,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 590,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458930099,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 596,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458936451,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 602,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458941730,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 607,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458948469,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 614,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458953663,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 619,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458956285,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 622,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458958370,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 624,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458966256,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 632,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458968312,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 634,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458970408,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 636,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458972918,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 638,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458978096,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 644,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458981670,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 647,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458983949,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 649,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458985150,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 651,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458988507,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 654,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458993216,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 659,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458997958,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 663,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716458997958,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 663,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACKING_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459004552,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 670,
        "type": "SUBSTITUTION",
        "dangerState": null,
        "description": "Makes a substitution.  replaces .",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459103017,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 769,
        "type": "SUBSTITUTION",
        "dangerState": null,
        "description": "Makes a substitution.  replaces .",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459169782,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 835,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459172256,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 838,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459175856,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 841,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459177558,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 843,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459177558,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 843,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459184366,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 850,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459186745,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 852,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459191295,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 857,
        "type": "SHOTS_ON_TARGET",
        "dangerState": null,
        "description": "Shot On Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459192857,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 858,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459195952,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 861,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459202258,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 868,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459202258,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 868,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459215852,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 881,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459232442,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 898,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459235590,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 901,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459239706,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 905,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459239706,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 905,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459265400,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 931,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459265400,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 931,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459268998,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 935,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459271244,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 937,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459273653,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 939,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459277973,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 944,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459281256,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 947,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459283855,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 949,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459288014,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 954,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459291238,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 957,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459295157,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 961,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459297080,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 963,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459297080,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 963,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459305893,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 971,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459308466,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 974,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459310218,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 976,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459312064,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 978,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459312064,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 978,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459322387,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 988,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459325219,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 991,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459331479,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 997,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459333762,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 999,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459336262,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1002,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459340303,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1006,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459342933,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1008,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459351962,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1018,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459361969,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1028,
        "type": "SHOTS_OFF_TARGET",
        "dangerState": null,
        "description": "Shots Off Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459365752,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1031,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459366658,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1032,
        "type": "GOALS_KICKS",
        "dangerState": null,
        "description": "Goal Kick",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459366658,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1032,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459387957,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1053,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459387957,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1053,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459406539,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1072,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459408948,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1074,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459408948,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1074,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459423565,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1089,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459428102,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1094,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459432758,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1098,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459437889,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1103,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459437889,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1103,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459461750,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1127,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459465458,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1131,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459467677,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1133,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459471298,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1137,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459475376,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1141,
        "type": "BLOCKED_SHOTS",
        "dangerState": null,
        "description": "Blocked Shots",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459478576,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1144,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459484659,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1150,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459484659,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1150,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459493416,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1159,
        "type": "SUBSTITUTION",
        "dangerState": null,
        "description": "Makes a substitution.  replaces .",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459510698,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1176,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459513649,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1179,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459517377,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1183,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459517377,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1183,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459532276,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1198,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459546758,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1212,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459552188,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1218,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459555505,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1221,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459555505,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1221,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACKING_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459645660,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1311,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459649868,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1315,
        "type": "SHOTS_OFF_TARGET",
        "dangerState": null,
        "description": "Shots Off Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459651600,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1317,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459652521,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1318,
        "type": "GOALS_KICKS",
        "dangerState": null,
        "description": "Goal Kick",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459652521,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1318,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459678553,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1344,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459682848,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1348,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459682848,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1348,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459690024,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1356,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459696724,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1362,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459700635,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1366,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459704002,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1370,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459708423,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1374,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459708423,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1374,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459728942,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1394,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459737322,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1403,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459740153,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1406,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459744599,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1410,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459750967,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1417,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459758908,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1424,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459760823,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1426,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459776960,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1443,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459776960,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1443,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459786065,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1452,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459788835,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1454,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459792003,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1458,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459796603,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1462,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459796603,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1462,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459885150,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1551,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459887932,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1553,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459892643,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1558,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459892643,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1558,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459913323,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1579,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459915111,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1581,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459918960,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1585,
        "type": "SHOTS_ON_TARGET",
        "dangerState": null,
        "description": "Shot On Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459921014,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1587,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459923953,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1589,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459925882,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1591,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459926671,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1592,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459928524,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1594,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459931754,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1597,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459940554,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1606,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459941401,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1607,
        "type": "GOALS_KICKS",
        "dangerState": null,
        "description": "Goal Kick",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459941401,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1607,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459961329,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1627,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459966995,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1633,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459971601,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1637,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459975721,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1641,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459980574,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1646,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459985212,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1651,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459987324,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1653,
        "type": "BLOCKED_SHOTS",
        "dangerState": null,
        "description": "Blocked Shots",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459991013,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1657,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716459998072,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1664,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460000982,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1667,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460004233,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1670,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460007177,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1673,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460012661,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1678,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460015191,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1681,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460017591,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1683,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460020992,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1687,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460022993,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1689,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460029713,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1695,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460033391,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1699,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460039836,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1705,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460050311,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1716,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460052969,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1719,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460055469,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1721,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460058347,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1724,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460065467,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1731,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_CORNER",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460160251,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1826,
        "type": "SUBSTITUTION",
        "dangerState": null,
        "description": "Makes a substitution.  replaces .",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460182330,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1848,
        "type": "CORNER",
        "dangerState": null,
        "description": "Corner",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460182330,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1848,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460184970,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1851,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460187107,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1853,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460189588,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1855,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460191720,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1857,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460194608,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1860,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460197409,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1863,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460200206,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1866,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460203148,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1869,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460207322,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1873,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460207322,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1873,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460228888,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1894,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460232866,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1898,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460234789,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1900,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460238086,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1904,
        "type": "SHOTS_ON_TARGET",
        "dangerState": null,
        "description": "Shot On Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460240626,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1906,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460244092,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1910,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460247430,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1913,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460251318,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1917,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460254328,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1920,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460258687,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1924,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460262637,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1927,
        "type": "OFFSIDES",
        "dangerState": null,
        "description": "Offside",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460262637,
        "team": null,
        "periodName": "HALF_2ND",
        "periodTime": 1927,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460269403,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1935,
        "type": "SUBSTITUTION",
        "dangerState": null,
        "description": "Makes a substitution.  replaces .",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460274774,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1940,
        "type": "SUBSTITUTION",
        "dangerState": null,
        "description": "Makes a substitution.  replaces .",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460287499,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1953,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460290710,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1956,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460296959,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1963,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460296959,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1963,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460301948,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1967,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460308249,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1974,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460311549,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1977,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460316353,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1982,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460321590,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1987,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460324160,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 1990,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460326561,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1992,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460331008,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1997,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460333510,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 1999,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460335470,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2001,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460337388,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2003,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460338767,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2004,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460344571,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2010,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460344571,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2010,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460367539,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2033,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460370172,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2036,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460377288,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2043,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460382134,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2048,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460382134,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2048,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460401849,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2067,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460406120,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2072,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460409546,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2075,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460415441,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2081,
        "type": "SHOTS_OFF_TARGET",
        "dangerState": null,
        "description": "Shots Off Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460417451,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2083,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460418050,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2084,
        "type": "GOALS_KICKS",
        "dangerState": null,
        "description": "Goal Kick",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460418050,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2084,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460437190,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2103,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460440722,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2106,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460446881,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2112,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460450451,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2116,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460455520,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2121,
        "type": "GOALS",
        "dangerState": null,
        "description": "Goal!",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460455520,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2121,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_GOAL",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460455520,
        "team": null,
        "periodName": "HALF_2ND",
        "periodTime": 2121,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460510649,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2176,
        "type": "KICK_OFFS",
        "dangerState": null,
        "description": "Kick Off",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460513748,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2179,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460516131,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2182,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460518813,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2184,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460519812,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2185,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460522527,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2188,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460526240,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2192,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460528723,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2194,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460530917,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2196,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460534490,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2200,
        "type": "SHOTS_ON_TARGET",
        "dangerState": null,
        "description": "Shot On Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460536352,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2202,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460551003,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2217,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460551003,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2217,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460631184,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2297,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460635595,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2301,
        "type": "GOALS_KICKS",
        "dangerState": null,
        "description": "Goal Kick",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460635595,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2301,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460667777,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2333,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460670819,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2336,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460676061,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2342,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460678996,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2345,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460681253,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2347,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460681982,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2348,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460685250,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2351,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460691466,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2357,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460693172,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2359,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460699115,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2365,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460701550,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2367,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460705869,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2371,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460709509,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2375,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460714103,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2380,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460718232,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2384,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460721427,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2387,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460724502,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2390,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460724502,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2390,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460731260,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2397,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460734110,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2400,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460736551,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2402,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460736551,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2402,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460740953,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2406,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460743320,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2409,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460749548,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2415,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460749548,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2415,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACKING_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460822093,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2488,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460824580,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2490,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460827649,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2493,
        "type": "BLOCKED_SHOTS",
        "dangerState": null,
        "description": "Blocked Shots",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460830543,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2496,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460834381,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2500,
        "type": "SHOTS_ON_TARGET",
        "dangerState": null,
        "description": "Shot On Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460835869,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2501,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460843267,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2509,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460845350,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2511,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460849950,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2515,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460853111,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2519,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460857247,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2523,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460860990,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2527,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460863529,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2529,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460875579,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2541,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460875579,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2541,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460901640,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2543,
        "type": "YELLOW_CARD",
        "dangerState": null,
        "description": "Sánchez, Robert has been shown a yellow card.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460901640,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2543,
        "type": "RED_CARD",
        "dangerState": null,
        "description": "Sánchez, Robert has been sent off.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460928047,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2594,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460933108,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2599,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460936196,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2602,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460937129,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2603,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460938948,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2604,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460940893,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2606,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460941650,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2607,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460943508,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2609,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460945783,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2611,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460947969,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2614,
        "type": "SHOTS_ON_TARGET",
        "dangerState": null,
        "description": "Shot On Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460949571,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2615,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460951819,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2617,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460957425,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2623,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460959659,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2625,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460959659,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2625,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460979864,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2645,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460987968,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2654,
        "type": "FOULS",
        "dangerState": null,
        "description": "has made a foul.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460987968,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2654,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACKING_FREE_KICK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716460996026,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2660,
        "type": "YELLOW_CARD",
        "dangerState": null,
        "description": "has been shown a yellow card.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461019996,
        "team": null,
        "periodName": "HALF_2ND",
        "periodTime": 2686,
        "type": "STOPPAGE_TIME",
        "dangerState": null,
        "description": "Additional Time null'",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461025556,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2691,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461036528,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2702,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461039820,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2705,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461044223,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2710,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461044223,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2710,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461056610,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2722,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461058290,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2724,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461064327,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2730,
        "type": "SHOTS_OFF_TARGET",
        "dangerState": null,
        "description": "Shots Off Target",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461066338,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2732,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461067072,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2733,
        "type": "GOALS_KICKS",
        "dangerState": null,
        "description": "Goal Kick",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461067072,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2733,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461138664,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2804,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461141511,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2807,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461146905,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2812,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461152731,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2818,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461159224,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2825,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461159224,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2825,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461172433,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2838,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461174978,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2841,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461176848,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2842,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461179864,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2845,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461181153,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2847,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461188470,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2854,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461188470,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2854,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461196398,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2862,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461200169,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2866,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461202092,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2868,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461202092,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2868,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461263753,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2929,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461266742,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2932,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461269183,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2935,
        "type": "THROW_INS",
        "dangerState": null,
        "description": "Throw Ins",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461269183,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2935,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461277035,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2943,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461278236,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2944,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461280375,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2946,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461282719,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2948,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461286756,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2952,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461288535,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2954,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461290874,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2956,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461292837,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2958,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461295650,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2961,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461300653,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 2966,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_DANGEROUS_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461305909,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2971,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461310143,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2976,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461313555,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2979,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461315568,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2981,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "HOME_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461323332,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 2988,
        "type": "OFFSIDES",
        "dangerState": null,
        "description": "Offside",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461323332,
        "team": null,
        "periodName": "HALF_2ND",
        "periodTime": 2988,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461367464,
        "team": "HOME",
        "periodName": "HALF_2ND",
        "periodTime": 3031,
        "type": "RED_CARD",
        "dangerState": null,
        "description": "has been sent off.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461373226,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 3037,
        "type": "RED_CARD",
        "dangerState": null,
        "description": "has been sent off.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461427948,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 3092,
        "type": "YELLOW_CARD",
        "dangerState": null,
        "description": "has been shown a yellow card.",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461439228,
        "team": "AWAY",
        "periodName": "HALF_2ND",
        "periodTime": 3105,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "AWAY_ATTACK",
        "description": "Danger State Changed",
        "isConfirmed": true
    },
    {
        "eventUtc": 1716461448049,
        "team": null,
        "periodName": "FULL_TIME",
        "periodTime": 0,
        "type": "DANGER_STATE_CHANGES",
        "dangerState": "SAFE",
        "description": "Danger State Changed",
        "isConfirmed": true
    }*/
]

const mockTimelineDataBasketball: PlayLogTimelineModel[] = [
    {
        "eventUtc": 1720051394789,
        "systemLogTime": 1720051394789,
        "team": null,
        "periodName": "QUARTER_1ST",
        "periodTime": 600000,
        "type": "PHASE_CHANGES",
        "dangerState": null,
        "description": "Phase Change",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720051396471,
        "systemLogTime": 1720051396471,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 599000,
        "type": "MATCH_TIP_OFF_WINNER_CHANGES",
        "dangerState": null,
        "description": "Match Tip Off Winner Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051398383,
        "systemLogTime": 1720051398383,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 597000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051399083,
        "systemLogTime": 1720051399083,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 596000,
        "type": "POSSESSION_ARROW_CHANGES",
        "dangerState": null,
        "description": "Possession Arrow Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051409523,
        "systemLogTime": 1720051409523,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 586000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051412851,
        "systemLogTime": 1720051412851,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 583000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051422972,
        "systemLogTime": 1720051422972,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 573000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051439020,
        "systemLogTime": 1720051439020,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 560000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051461972,
        "systemLogTime": 1720051461972,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 541000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051461972,
        "systemLogTime": 1720051461972,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 541000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051496045,
        "systemLogTime": 1720051496045,
        "team": null,
        "periodName": "QUARTER_1ST",
        "periodTime": 541000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051509699,
        "systemLogTime": 1720051509699,
        "team": "NEUTRAL",
        "periodName": "QUARTER_1ST",
        "periodTime": 541000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051509699,
        "systemLogTime": 1720051509699,
        "team": null,
        "periodName": "QUARTER_1ST",
        "periodTime": 541000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051512363,
        "systemLogTime": 1720051512363,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 540000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051518891,
        "systemLogTime": 1720051518891,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 534000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051518891,
        "systemLogTime": 1720051518891,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 534000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051543884,
        "systemLogTime": 1720051543884,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 534000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720051543884,
        "systemLogTime": 1720051543884,
        "team": null,
        "periodName": "QUARTER_1ST",
        "periodTime": 534000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051558018,
        "systemLogTime": 1720051558018,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 534000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720051558018,
        "systemLogTime": 1720051558018,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 534000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051558018,
        "systemLogTime": 1720051558018,
        "team": null,
        "periodName": "QUARTER_1ST",
        "periodTime": 534000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051563709,
        "systemLogTime": 1720051563709,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 534000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051575412,
        "systemLogTime": 1720051575412,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 520000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720051575412,
        "systemLogTime": 1720051575412,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 520000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051589628,
        "systemLogTime": 1720051589628,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 506000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720051589629,
        "systemLogTime": 1720051589629,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 506000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051604402,
        "systemLogTime": 1720051604402,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 491000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720051604403,
        "systemLogTime": 1720051604403,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 491000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051616180,
        "systemLogTime": 1720051616180,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 479000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720051616182,
        "systemLogTime": 1720051616182,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 479000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051630834,
        "systemLogTime": 1720051630834,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 463000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720051630835,
        "systemLogTime": 1720051630835,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 463000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051653738,
        "systemLogTime": 1720051653738,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 440000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051660015,
        "systemLogTime": 1720051660015,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 434000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051694962,
        "systemLogTime": 1720051694962,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 413000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051695762,
        "systemLogTime": 1720051695762,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 412000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720051695763,
        "systemLogTime": 1720051695763,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 412000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051714481,
        "systemLogTime": 1720051714481,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 394000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },/*
    {
        "eventUtc": 1720051714481,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 394000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051743986,
        "team": null,
        "periodName": "QUARTER_1ST",
        "periodTime": 394000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051757583,
        "team": "NEUTRAL",
        "periodName": "QUARTER_1ST",
        "periodTime": 394000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051757583,
        "team": null,
        "periodName": "QUARTER_1ST",
        "periodTime": 394000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051759162,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 394000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051774416,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 381000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051774416,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 381000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051777314,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 381000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051794059,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 377000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051794059,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 377000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051795914,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 377000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051807115,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 373000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051807115,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 373000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051828762,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 373000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720051828762,
        "team": null,
        "periodName": "QUARTER_1ST",
        "periodTime": 373000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051841330,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 373000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720051841330,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 373000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051841330,
        "team": null,
        "periodName": "QUARTER_1ST",
        "periodTime": 373000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051844626,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 373000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051862410,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 357000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051886140,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 345000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051906986,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 337000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051923482,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 322000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720051923483,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 322000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051938665,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 307000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720051938666,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 307000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051962327,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 284000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720051975001,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 279000,
        "type": "TIMEOUTS",
        "dangerState": null,
        "description": "Timeout",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052100543,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 279000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052170937,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 263000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052170937,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 263000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052201640,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 262000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052201640,
        "team": null,
        "periodName": "QUARTER_1ST",
        "periodTime": 262000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052213587,
        "team": "NEUTRAL",
        "periodName": "QUARTER_1ST",
        "periodTime": 262000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052213587,
        "team": null,
        "periodName": "QUARTER_1ST",
        "periodTime": 262000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052216065,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 261000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052233424,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 244000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052233425,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 244000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052282083,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 218000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052287760,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 213000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052290988,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 211000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052306818,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 203000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052306819,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 203000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052319992,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 190000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052319993,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 190000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052341544,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 168000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052341545,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 168000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052354112,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 156000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052354116,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 156000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052398160,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 127000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052398160,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 127000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052421498,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 127000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052421498,
        "team": null,
        "periodName": "QUARTER_1ST",
        "periodTime": 127000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052448039,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 127000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052448039,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 127000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052448039,
        "team": null,
        "periodName": "QUARTER_1ST",
        "periodTime": 127000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052501332,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 115000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052506738,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 109000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052522760,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 93000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052522760,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 93000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052538447,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 78000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052538448,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 78000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052549855,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 66000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052552639,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 63000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052552640,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 63000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052576184,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 50000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052576184,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 50000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052594881,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 50000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052594881,
        "team": null,
        "periodName": "QUARTER_1ST",
        "periodTime": 50000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052610545,
        "team": "NEUTRAL",
        "periodName": "QUARTER_1ST",
        "periodTime": 50000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052610545,
        "team": null,
        "periodName": "QUARTER_1ST",
        "periodTime": 50000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052641504,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 22000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052649862,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 13000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052673430,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 6000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052673430,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 6000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052683214,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 6000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052683214,
        "team": null,
        "periodName": "QUARTER_1ST",
        "periodTime": 6000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052698023,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 6000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052698023,
        "team": "HOME",
        "periodName": "QUARTER_1ST",
        "periodTime": 6000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052698023,
        "team": null,
        "periodName": "QUARTER_1ST",
        "periodTime": 6000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052702361,
        "team": "AWAY",
        "periodName": "QUARTER_1ST",
        "periodTime": 6000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052715794,
        "team": "NEUTRAL",
        "periodName": "BEFORE_SECOND_QUARTER",
        "periodTime": 0,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052715794,
        "team": null,
        "periodName": "BEFORE_SECOND_QUARTER",
        "periodTime": 0,
        "type": "PHASE_CHANGES",
        "dangerState": null,
        "description": "Phase Change",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052907934,
        "team": null,
        "periodName": "QUARTER_2ND",
        "periodTime": 600000,
        "type": "PHASE_CHANGES",
        "dangerState": null,
        "description": "Phase Change",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052909749,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 599000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052915855,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 593000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052919656,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 589000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052919657,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 589000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052934342,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 574000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052934343,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 574000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052949550,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 554000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052949551,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 554000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052965901,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 537000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720052965902,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 537000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720052997658,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 521000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053001813,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 517000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053001814,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 517000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053017255,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 501000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053037565,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 492000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053056671,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 472000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053070293,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 459000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053081631,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 448000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053081632,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 448000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053096703,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 433000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053103258,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 426000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053103258,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 426000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053235964,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 426000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053235964,
        "team": null,
        "periodName": "QUARTER_2ND",
        "periodTime": 426000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053247172,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 426000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053247172,
        "team": null,
        "periodName": "QUARTER_2ND",
        "periodTime": 426000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053258973,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 426000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053258973,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 426000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053258973,
        "team": null,
        "periodName": "QUARTER_2ND",
        "periodTime": 426000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053262352,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 426000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053278780,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 410000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053278781,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 410000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053292526,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 396000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053292526,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 396000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053293908,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 396000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053324005,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 396000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053324005,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 396000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053324005,
        "team": null,
        "periodName": "QUARTER_2ND",
        "periodTime": 396000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053327985,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 396000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053343742,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 380000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053343743,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 380000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053364459,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 359000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053370353,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 353000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053370354,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 353000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053391889,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 332000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053396956,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 327000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053396957,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 327000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053406876,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 326000,
        "type": "TIMEOUTS",
        "dangerState": null,
        "description": "Timeout",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053585029,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 326000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053593203,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 318000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053593204,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 318000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053614914,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 296000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053623580,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 283000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },*/
    {
        "eventUtc": 1720053629515,
        "systemLogTime": 1720053629515,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 277000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053629516,
        "systemLogTime": 1720053629516,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 277000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053662284,
        "systemLogTime": 1720053662284,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 274000,
        "type": "TIMEOUTS",
        "dangerState": null,
        "description": "Timeout",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053758427,
        "systemLogTime": 1720053758427,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 274000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053840944,
        "systemLogTime": 1720053840944,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 259000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053840945,
        "systemLogTime": 1720053840945,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 259000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053856604,
        "systemLogTime": 1720053856604,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 239000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053856605,
        "systemLogTime": 1720053856605,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 239000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053877940,
        "systemLogTime": 1720053877940,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 218000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053890666,
        "systemLogTime": 1720053890666,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 202000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053897050,
        "systemLogTime": 1720053897050,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 196000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053897051,
        "systemLogTime": 1720053897051,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 196000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },/*
    {
        "eventUtc": 1720053905018,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 189000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053949777,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 173000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053954674,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 168000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053954676,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 168000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720053968985,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 154000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720053968986,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 154000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054015081,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 135000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054036338,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 114000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720054036340,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 114000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054056809,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 100000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054065225,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 92000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054085390,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 88000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054091530,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 82000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720054091531,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 82000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054106817,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 67000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054106817,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 67000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054109497,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 67000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054150841,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 54000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054150841,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 54000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054154825,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 53000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054188328,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 41000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054196561,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 34000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054219473,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 26000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054219473,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 26000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054248418,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 26000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720054248418,
        "team": null,
        "periodName": "QUARTER_2ND",
        "periodTime": 26000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054266604,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 26000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720054266604,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 26000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054266604,
        "team": null,
        "periodName": "QUARTER_2ND",
        "periodTime": 26000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054271802,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 26000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054292338,
        "team": "AWAY",
        "periodName": "QUARTER_2ND",
        "periodTime": 5000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720054292339,
        "team": "HOME",
        "periodName": "QUARTER_2ND",
        "periodTime": 5000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054308868,
        "team": "NEUTRAL",
        "periodName": "HALF_TIME",
        "periodTime": 0,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720054308868,
        "team": null,
        "periodName": "HALF_TIME",
        "periodTime": 0,
        "type": "PHASE_CHANGES",
        "dangerState": null,
        "description": "Phase Change",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055258957,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 600000,
        "type": "PHASE_CHANGES",
        "dangerState": null,
        "description": "Phase Change",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055261177,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 598000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055267304,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 592000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055286637,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 569000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055286637,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 569000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055316222,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 568000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055316222,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 568000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055333268,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 568000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055333268,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 568000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055333268,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 568000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055336956,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 568000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055346546,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 558000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055357156,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 546000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055357156,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 546000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055358412,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 546000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055385054,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 546000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055385054,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 546000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055385054,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 546000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055389708,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 545000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055412628,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 522000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055412629,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 522000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055436724,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 498000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055449133,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 486000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055449134,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 486000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055464906,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 470000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055464907,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 470000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055482797,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 451000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055482798,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 451000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055527568,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 439000,
        "type": "TIMEOUTS",
        "dangerState": null,
        "description": "Timeout",
        "isConfirmed": true
    },*/
    {
        "eventUtc": 1720055576267,
        "systemLogTime": 1720055576267,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 439000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055577203,
        "systemLogTime": 1720055577203,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 439000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055595755,
        "systemLogTime": 1720055595755,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 422000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055597275,
        "systemLogTime": 1720055597275,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 420000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055597275,
        "systemLogTime": 1720055597275,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 420000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055599533,
        "systemLogTime": 1720055599533,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 420000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055629756,
        "systemLogTime": 1720055629756,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 420000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055629756,
        "systemLogTime": 1720055629756,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 420000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055655300,
        "systemLogTime": 1720055655300,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 408000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055655300,
        "systemLogTime": 1720055655300,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 408000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },/*
    {
        "eventUtc": 1720055682107,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 408000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055682107,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 408000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055682107,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 408000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055697123,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 408000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055697123,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 408000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055697123,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 408000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055702197,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 406000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055718506,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 390000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055718508,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 390000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055735738,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 373000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055735738,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 373000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055763266,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 373000,
        "type": "TIMEOUTS",
        "dangerState": null,
        "description": "Timeout",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055942859,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 373000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055942859,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 373000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055956010,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 373000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055956010,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 373000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055956010,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 373000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055959113,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 373000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720055975914,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 356000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720055975914,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 356000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056001810,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 331000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056001811,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 331000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056028736,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 304000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056028736,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 304000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056029877,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 304000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056083514,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 304000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056083514,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 304000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056083514,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 304000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056087726,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 304000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056098217,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 293000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056098217,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 293000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056110313,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 293000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056121359,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 288000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056121360,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 288000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056133433,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 276000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056136913,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 273000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056136914,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 273000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056163537,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 261000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056163537,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 261000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056165529,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 261000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056187993,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 261000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056187993,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 261000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056198217,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 261000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056198217,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 261000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056198217,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 261000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056201402,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 261000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056213328,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 249000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056213329,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 249000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056228946,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 234000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056265576,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 215000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056265577,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 215000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056282737,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 198000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056288339,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 193000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056288339,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 193000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056316097,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 192000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056327792,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 192000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056327792,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 192000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056327792,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 192000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056331609,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 192000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056350704,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 181000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056350704,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 181000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056372280,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 181000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056372280,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 181000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056386438,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 181000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056386438,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 181000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056386438,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 181000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056389944,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 181000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056422704,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 158000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056422704,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 158000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056444957,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 158000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056444957,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 158000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056460808,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 158000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056460808,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 158000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056460808,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 158000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056464653,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 158000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056479744,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 143000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056479745,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 143000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056493368,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 129000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056493369,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 129000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056515503,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 107000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056521841,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 101000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056521842,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 101000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056540135,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 83000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056540136,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 83000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056556627,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 65000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056564519,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 57000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056564520,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 57000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056586240,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 40000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056625816,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 35000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056625816,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 35000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056627519,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 34000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056649483,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 34000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056649483,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 34000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056649483,
        "team": null,
        "periodName": "QUARTER_3RD",
        "periodTime": 34000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056656599,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 31000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056665746,
        "team": "HOME",
        "periodName": "QUARTER_3RD",
        "periodTime": 21000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056665747,
        "team": "AWAY",
        "periodName": "QUARTER_3RD",
        "periodTime": 21000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056697015,
        "team": "NEUTRAL",
        "periodName": "BEFORE_FOURTH_QUARTER",
        "periodTime": 0,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056697015,
        "team": null,
        "periodName": "BEFORE_FOURTH_QUARTER",
        "periodTime": 0,
        "type": "PHASE_CHANGES",
        "dangerState": null,
        "description": "Phase Change",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056725559,
        "team": "AWAY",
        "periodName": "BEFORE_FOURTH_QUARTER",
        "periodTime": 0,
        "type": "POSSESSION_ARROW_CHANGES",
        "dangerState": null,
        "description": "Possession Arrow Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056883376,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 600000,
        "type": "PHASE_CHANGES",
        "dangerState": null,
        "description": "Phase Change",
        "isConfirmed": true
    },*/
    {
        "eventUtc": 1720056886830,
        "systemLogTime": 1720056886830,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 597000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056896839,
        "systemLogTime": 1720056896839,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 587000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056900702,
        "systemLogTime": 1720056900702,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 583000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056924502,
        "systemLogTime": 1720056924502,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 560000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056924503,
        "systemLogTime": 1720056924503,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 560000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056967927,
        "systemLogTime": 1720056967927,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 531000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056973011,
        "systemLogTime": 1720056973011,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 526000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720056973012,
        "systemLogTime": 1720056973012,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 526000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720056989974,
        "systemLogTime": 1720056989974,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 509000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057005270,
        "systemLogTime": 1720057005270,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 494000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057021366,
        "systemLogTime": 1720057021366,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 479000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057077182,
        "systemLogTime": 1720057077182,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 456000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057102594,
        "systemLogTime": 1720057102594,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 438000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057132693,
        "systemLogTime": 1720057132693,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 431000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057134046,
        "systemLogTime": 1720057134046,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 430000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720057134048,
        "systemLogTime": 1720057134048,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 430000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057153544,
        "systemLogTime": 1720057153544,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 407000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720057153545,
        "systemLogTime": 1720057153545,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 407000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057178925,
        "systemLogTime": 1720057178925,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 398000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057208090,
        "systemLogTime": 1720057208090,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 379000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057218533,
        "systemLogTime": 1720057218533,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 374000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057218533,
        "systemLogTime": 1720057218533,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 374000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057253581,
        "systemLogTime": 1720057253581,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 374000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },/*
    {
        "eventUtc": 1720057253581,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 374000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057270813,
        "team": "NEUTRAL",
        "periodName": "QUARTER_4TH",
        "periodTime": 374000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057270813,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 374000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057272909,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 374000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057290102,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 357000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720057290103,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 357000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057302014,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 345000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720057302015,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 345000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057325189,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 328000,
        "type": "TIMEOUTS",
        "dangerState": null,
        "description": "Timeout",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720057464758,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 328000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057519324,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 320000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057533508,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 309000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720057533509,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 309000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057584316,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 287000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057589749,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 282000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057589749,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 282000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057759755,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 281000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057759755,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 281000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057780338,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 281000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720057780338,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 281000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057788163,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 281000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057788163,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 281000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057793987,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 281000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057806478,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 281000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720057806478,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 281000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057806478,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 281000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057809923,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 281000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057836147,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 265000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057836147,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 265000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057854435,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 265000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720057854435,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 265000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057870051,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 265000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720057870051,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 265000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057870051,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 265000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057873812,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 265000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057887698,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 251000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720057887700,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 251000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057905356,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 233000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057905356,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 233000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057942475,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 233000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720057952228,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 233000,
        "type": "TIMEOUTS",
        "dangerState": null,
        "description": "Timeout",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720058135794,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 233000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720058135794,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 233000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058135794,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 233000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058140250,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 233000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058158681,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 217000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058169474,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 207000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058204574,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 200000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058207601,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 197000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720058207602,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 197000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058235540,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 190000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058235540,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 190000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058240490,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 190000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720058240490,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 190000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058253345,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 190000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720058253345,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 190000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058253345,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 190000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058261681,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 186000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058274789,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 173000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058283739,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 164000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058294033,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 154000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058294033,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 154000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058319762,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 153000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720058319762,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 153000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058332970,
        "team": "NEUTRAL",
        "periodName": "QUARTER_4TH",
        "periodTime": 153000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058332970,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 153000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058334649,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 153000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058347554,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 140000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720058347556,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 140000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058363186,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 125000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720058363187,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 125000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058373740,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 114000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058373740,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 114000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058398389,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 114000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720058398389,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 114000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058412298,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 114000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720058412298,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 114000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058412298,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 114000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058416036,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 113000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058433409,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 96000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058456721,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 87000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058556344,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 70000,
        "type": "TIMEOUTS",
        "dangerState": null,
        "description": "Timeout",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720058668270,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 68000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058688500,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 47000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058698959,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 37000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058713258,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 23000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720058713259,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 23000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058720807,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 21000,
        "type": "TIMEOUTS",
        "dangerState": null,
        "description": "Timeout",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720058808768,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 21000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058821367,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 16000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058832975,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 4000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058832975,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 4000,
        "type": "FOULS",
        "dangerState": null,
        "description": "Foul",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058857447,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 4000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720058857447,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 4000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058869015,
        "team": "AWAY",
        "periodName": "QUARTER_4TH",
        "periodTime": 4000,
        "type": "POINTS",
        "dangerState": null,
        "description": "Point",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720058869015,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 4000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058869015,
        "team": null,
        "periodName": "QUARTER_4TH",
        "periodTime": 4000,
        "type": "FREE_THROW_OUTCOMES",
        "dangerState": null,
        "description": "Free Throw Outcome",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058877191,
        "team": "HOME",
        "periodName": "QUARTER_4TH",
        "periodTime": 5000,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058887041,
        "team": "NEUTRAL",
        "periodName": "BEFORE_OVERTIME",
        "periodTime": 0,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720058887041,
        "team": null,
        "periodName": "BEFORE_OVERTIME",
        "periodTime": 0,
        "type": "PHASE_CHANGES",
        "dangerState": null,
        "description": "Phase Change",
        "isConfirmed": true
    },
    {
        "eventUtc": 1720059481765,
        "team": "NEUTRAL",
        "periodName": "POST_MATCH",
        "periodTime": 0,
        "type": "POSSESSION_CHANGES",
        "dangerState": null,
        "description": "Possession Change",
        "isConfirmed": null
    },
    {
        "eventUtc": 1720059481765,
        "team": null,
        "periodName": "POST_MATCH",
        "periodTime": 0,
        "type": "PHASE_CHANGES",
        "dangerState": null,
        "description": "Phase Change",
        "isConfirmed": true
    }*/
]

export const mockTimelineData = (sportName: string) => {
    return (sportName === "SOCCER") ? mockTimelineDataSoccer : mockTimelineDataBasketball
}