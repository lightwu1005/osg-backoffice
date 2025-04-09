import {PerformanceDataModel} from "@/services/@core/module/ResponseDataModels";
import {InfoType} from "@/services/@core/module/Enum";

export const MockMarketPerformanceData = [
    {
        "infoTitle": "1X2",
        "infoId": "11111",
        "totalNumber": 115666,
        "infoData": [
            {
                "dataName": "1X2",
                "dataNumber": 115666
            }
        ]
    },
    {
        "infoTitle": "Under/Over",
        "infoId": "11112",
        "totalNumber": 103002,
        "infoData": [
            {
                "dataName": "Under/Over",
                "dataNumber": 103002
            }
        ]
    },
    {
        "infoTitle": "Asia Handicap",
        "infoId": "11113",
        "totalNumber": 87998,
        "infoData": [
            {
                "dataName": "Asia Handicap",
                "dataNumber": 87998
            }
        ]
    },
    {
        "infoTitle": "Moneyline",
        "infoId": "11114",
        "totalNumber": 76931,
        "infoData": [
            {
                "dataName": "Moneyline",
                "dataNumber": 76931
            }
        ]
    },
    {
        "infoTitle": "Total Corners",
        "infoId": "11115",
        "totalNumber": 56034,
        "infoData": [
            {
                "dataName": "Total Corners",
                "dataNumber": 56034
            }
        ]
    }
]

export const MockImbalancePerformanceData = [
    {
        "infoTitle": "Event 1 jfedfddddddd fhuaif9huwaejifwo fhuaiahf9uweo9ghurot5h9guerinthuerit9uherirui",
        "infoId": "11116",
        "totalNumber": 1000,
        "infoData": [
            {
                "dataName": "Win",
                "dataNumber": 700
            },
            {
                "dataName": "Lose",
                "dataNumber": 300
            }
        ]
    },
    {
        "infoTitle": "Event 2",
        "infoId": "11117",
        "totalNumber": 1000,
        "infoData": [
            {
                "dataName": "Win",
                "dataNumber": 900
            },
            {
                "dataName": "Lose",
                "dataNumber": 100
            }
        ]
    },
    {
        "infoTitle": "Event 3",
        "infoId": "11118",
        "totalNumber": 1000,
        "infoData": [
            {
                "dataName": "Win",
                "dataNumber": 300
            },
            {
                "dataName": "Lose",
                "dataNumber": 700
            }
        ]
    },
    {
        "infoTitle": "Event 4",
        "infoId": "11119",
        "totalNumber": 1000,
        "infoData": [
            {
                "dataName": "Win",
                "dataNumber": 100
            },
            {
                "dataName": "Lose",
                "dataNumber": 900
            }
        ]
    },
    {
        "infoTitle": "Event 5",
        "infoId": "11120",
        "totalNumber": 1000,
        "infoData": [
            {
                "dataName": "Win",
                "dataNumber": 700
            },
            {
                "dataName": "Lose",
                "dataNumber": 300
            }
        ]
    }
]

const MockDevicePerformanceData = [
    {
        "infoTitle": "",
        "infoId": "11121",
        "totalNumber": 350500,
        "infoData": [
            {
                "dataName": "iOS",
                "dataNumber": 100000,
            },
            {
                "dataName": "Android",
                "dataNumber": 100000,
            },
            {
                "dataName": "Website",
                "dataNumber": 100000,
            },
            {
                "dataName": "Unknown",
                "dataNumber": 50500,
            }
        ]
    }
]

const MockSportBetslipPerformanceData = [
    {
        "infoTitle": "Total Income",
        "infoId": "11122",
        "totalNumber": 1350500,
        "infoData": [
            {
                "dataName": "Win",
                "dataNumber": 700000
            },
            {
                "dataName": "Lose",
                "dataNumber": 450000
            },
            {
                "dataName": "Win",
                "dataNumber": 200500
            }
        ]
    },
    {
        "infoTitle": "Settled Amount",
        "infoId": "11123",
        "totalNumber": 134700,
        "infoData": [
            {
                "dataName": "Settled",
                "dataNumber": 100000
            },
            {
                "dataName": "Unsettled",
                "dataNumber": 34700
            }
        ]
    },
    {
        "infoTitle": "Settled Amount",
        "infoId": "11124",
        "totalNumber": 134700,
        "infoData": [
            {
                "dataName": "Settled",
                "dataNumber": 110000
            },
            {
                "dataName": "Unsettled",
                "dataNumber": 24700
            }
        ]
    }
]

const MockLeaguePerformanceData = [
    {
        "infoTitle": "NBA",
        "infoId": "111125",
        "totalNumber": 135566,
        "infoData": [
            {
                "dataName": "NBA",
                "dataNumber": 135566
            }
        ]
    },
    {
        "infoTitle": "CBA",
        "infoId": "11126",
        "totalNumber": 109453,
        "infoData": [
            {
                "dataName": "CBA",
                "dataNumber": 109453
            }
        ]
    },
    {
        "infoTitle": "NHL",
        "infoId": "11127",
        "totalNumber": 68303,
        "infoData": [
            {
                "dataName": "NHL",
                "dataNumber": 68303
            }
        ]
    },
    {
        "infoTitle": "MLB",
        "infoId": "11128",
        "totalNumber": 67104,
        "infoData": [
            {
                "dataName": "MLB",
                "dataNumber": 67104
            }
        ]
    },
    {
        "infoTitle": "NFL",
        "infoId": "11129",
        "totalNumber": 12099,
        "infoData": [
            {
                "dataName": "NFL",
                "dataNumber": 12099
            }
        ]
    }
]

export function toInfoTypeData(path: string): PerformanceDataModel[] {
    let result: PerformanceDataModel[];

    switch (path) {
        case InfoType.Device:
            result = MockDevicePerformanceData;
            break;
        case InfoType.BetSlips:
        case InfoType.Sports:
            result = MockSportBetslipPerformanceData;
            break;
        case InfoType.Imbalance:
            result = MockImbalancePerformanceData;
            break;
        case InfoType.League:
            result = MockLeaguePerformanceData;
            break;
        case InfoType.Market:
            result = MockMarketPerformanceData;
            break;
        default:
            result = [];
    }

    return result;
}