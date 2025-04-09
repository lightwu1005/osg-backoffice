import {GetRiskGroupDetailModel} from "@/services/@core/module/CommonDataModels";
import {RiskGroupListModel, RiskGroupsApplyingPuntersListModel} from "@/services/@core/module/ResponseDataModels";

export const mockUpdateRiskGroupApplyData = {
    "successIds": ["12345", "943458"],
    "failureIds": ["23456"],
}

export const mockMarketGroupData = [
    {
        "groupId": "14",
        "groupName": "半場",
        "marketIds": null,
        "status": "OPEN"
    },
    {
        "groupId": "15",
        "groupName": "大小",
        "marketIds": [
            "157b582e-624b-4549-9deb-5b8d39a0301d",
            "2194231c-9159-4117-9e11-272b8523af52",
            "24610024-2fce-4668-ab29-fa7381d9b19c",
            "28a9726b-76e2-4590-86aa-dbb38b614ceb",
            "2bb46b70-842f-4141-bcb7-1f79b022bf21",
            "514f5e9e-5fff-40b7-8274-6962e9781ea2",
            "67827ef3-1d0b-4d3a-9cb2-efeb36411d54",
            "98edde50-54b3-4db5-915d-e47439d874df",
            "99ab07c5-75cb-4904-b514-81134a281e11",
            "b35b5464-3a00-4d2d-912b-ec419e58a8ef"
        ],
        "status": "OPEN"
    },
    {
        "groupId": "18",
        "groupName": "所有投注",
        "marketIds": [
            "0aefd0a0-09a5-4e29-8533-1a2e4430f766",
            "18ead0a9-2fe5-4219-8f73-9a31487a0162",
            "1aa9f3ca-71dc-4d4d-a10e-1d98ba6a2080",
            "22e0f73e-7114-45e1-ac8b-f04c1d802d98",
            "2e10ac9c-ee8e-43fb-bce7-8a2b2967213d",
            "3689749b-a8d2-4e7d-bf04-a9387bbb18fe",
            "373f29d5-66c3-4cdf-be92-43cdd9e464e3",
            "3a8e43fc-2666-4ab9-89b1-efee71fd9825",
            "3d7042e2-af1f-427e-8cd8-989d8a5724ae",
            "41666b00-d327-4d43-b727-4c7ab98bb7ec",
            "43cfdf0d-60e2-4f25-8a28-89ef2f6753aa",
            "46a1a981-8752-436e-8389-402567572432",
            "579d9732-d2e3-4cec-a827-b69b7c9c3b87",
            "617f769c-d9b8-435b-a693-c1dee62c4cb0",
            "7181aa9c-c273-4710-80f2-750b3740e42e",
            "825d253c-328e-4f0b-8c13-cab0a4554de0",
            "9ecb373b-760e-4110-a26d-9459808a4777",
            "a776623c-b56f-4948-b9ef-544f52fdc097",
            "a8877411-e956-484b-8dd2-7af0a501c780",
            "bc8deee0-2ba8-4bb1-9910-ae0f59de33f9",
            "bd6ddc25-87fb-4248-95ee-6a6277ac161b",
            "c49a7684-41fc-4436-896d-077198258653",
            "d802eb06-63e9-4351-a88b-94648195b69d",
            "d96c3be0-292c-423f-b940-c20b2fcf44b2",
            "dc9886e0-3d3f-4404-b79b-72a4b3ef29cf",
            "dd2686ca-c968-4e59-9227-1efba33b3b3f",
            "e7299dd9-3dce-44f0-89f6-d4252504911a",
            "f1e0ff3a-3166-4a54-83f0-385f8b87543a",
            "fd840e81-cd7a-448a-b8ca-ba9032ed4f66"
        ],
        "status": "OPEN"
    },
    {
        "groupId": "12",
        "groupName": "時間類",
        "marketIds": [
            "00a64aaf-ba92-4812-bc33-6e4911e704e2",
            "0503e8a4-6b3d-43f7-b6bd-6c388c93b6c2",
            "064768dc-d8b7-40e6-9205-9beb0374d5fa",
            "0b49ac00-21c5-4d5b-88b3-ec5fa8775fee",
            "1980c20e-fdb7-45ee-896a-a13994710733",
            "1ae04a03-10bb-4e03-968e-8bbb87da2ce1",
            "210e3b50-d0e8-4848-91c2-b1473f48bac6",
            "226e056a-4971-4656-b26e-c420995f8991",
            "253c8aed-f53f-4d72-9161-7b69c81570dc",
            "28a15052-44c7-4353-9537-8610acbcf10c",
            "292e37d8-a5a8-4d3e-b1a1-f7101288fed9",
            "2e73c72f-a855-45c8-85fd-57ae47354a14",
            "33561c63-b5c0-4949-8ed7-20a03e7f0e43",
            "374bbede-152a-4cae-a550-06312b0ba731",
            "446edc0e-a2e4-4b7f-b316-1eba93d93c8f",
            "46a1a981-8752-436e-8389-402567572432",
            "46faf1e0-851a-4be2-8d24-e216dd91c94a",
            "4f14228e-6c68-4db3-9182-5fd78116dd53",
            "51324f82-61a6-46f4-b16b-4e005b24fd9d",
            "526de683-f85d-4084-8af9-31862f223814",
            "5821929a-714d-4563-ba2e-3164f428fb4f",
            "5cc8f0f2-e8a5-4e7a-a609-63fca8f7c546",
            "60d7f5f7-276f-4704-b7cf-11ee4ee67e46",
            "62cd0763-239d-4394-9577-24f4a1f2a4ee",
            "638862bf-c04d-4efd-8fdd-1b124117eb6c",
            "64f2def7-afba-4510-9bad-ded41d570c41",
            "678aacd5-544c-4a66-ac20-e96174f0596a",
            "729c973e-0d4f-4a53-9918-9fd4ce0f4739",
            "7d57af0f-48cb-4a14-bf72-1040ee1545d9",
            "7d7086ea-bd74-4b75-9037-b35a4a17d585",
            "7e23be41-c81c-4953-b9e8-4d6d60a43814",
            "7f3ee37d-9552-4e96-ba51-bcba5ba6cd54",
            "81cc3b80-e14d-4f4e-bf97-3a5f30fe16e7",
            "835e872e-574f-44cd-8f62-1c23982bb12e",
            "83932279-2bbc-4869-8897-177c23e7f907",
            "8835a7e1-01d3-4ffc-9da4-946bcbbad30e",
            "889f81d5-38d8-4efe-a1a1-eed0f1d92d7e",
            "91f96969-58e5-4c22-852a-bd9d4f8b2608",
            "92db7b64-c1c6-470e-8f03-92911269c6d6",
            "93360b82-8986-4e6b-8988-0f05174aad3c",
            "93f16c62-655e-4e7c-a90f-e7c5ecebad41",
            "98435c7f-6c5d-421e-b98e-5ee7ecb06db4",
            "9da5fa1a-ffa9-4105-975a-d9d643782f09",
            "9fa07caf-8fab-497b-8dfc-8be135221f49",
            "a8877411-e956-484b-8dd2-7af0a501c780",
            "ac753944-24b6-45ae-be52-75ccf853244c",
            "adaa9592-8158-405f-a5ab-c65eef3a5479",
            "bb7bdafc-af58-4e9b-9321-cf74d03d4251",
            "c0d2915b-b9c6-4b39-b89e-88d53d16231a",
            "cd4c0f02-3834-41e8-9c3c-abe78fafff28",
            "cf3032ac-65e9-4745-b32e-f46229e572b4",
            "d10d97f4-1cc3-4b64-aede-57f34a39473e",
            "d4ca0f74-5809-4c5b-af93-dffebf59e4d8",
            "d5c94405-1037-467c-9184-1c44f4723304",
            "d6d2f930-b53a-444d-a4a0-f7a45a047b09",
            "d75a20d2-cd94-414a-8136-60cc2c5f610e",
            "d92c8ec4-c4f0-4741-88d5-039d14b7bbca",
            "de5ee78b-a854-4382-abf0-718bbd716f3d",
            "ea8195ef-972a-4cf6-a13f-8d3c6f588ee1",
            "eb68c419-617e-4c04-bd57-88b84ec9aed9",
            "f522f706-9f14-453f-a562-c230e015fa93",
            "f6b977ed-f399-4802-a05d-bf8e91270689",
            "f85ddce8-ce29-420e-9267-6748a3534ee4",
            "f8e3e3fd-2240-4417-8872-225140289fcc",
            "fa75b774-2a4f-44e8-a86b-d73fc700b26c",
            "fc9c7746-2076-4778-bcde-f31e1876b540",
            "ff2201e2-54f9-4179-9eb6-46bff2772402"
        ],
        "status": "OPEN"
    },
    {
        "groupId": "13",
        "groupName": "波膽",
        "marketIds": [
            "1aa9f3ca-71dc-4d4d-a10e-1d98ba6a2080",
            "7b47b23a-25b8-4e30-b70d-f1e825053663",
            "e7299dd9-3dce-44f0-89f6-d4252504911a"
        ],
        "status": "OPEN"
    },
    {
        "groupId": "17",
        "groupName": "熱門",
        "marketIds": [
            "2bb46b70-842f-4141-bcb7-1f79b022bf21",
            "5012eec5-8293-4e0d-b635-a63d0062ca51",
            "b16633b2-8a1c-49d0-b0a8-259f9e404aac",
            "b35b5464-3a00-4d2d-912b-ec419e58a8ef",
            "dc9886e0-3d3f-4404-b79b-72a4b3ef29cf"
        ],
        "status": "OPEN"
    },
    {
        "groupId": "10",
        "groupName": "罰牌",
        "marketIds": null,
        "status": "OPEN"
    },
    {
        "groupId": "11",
        "groupName": "角球",
        "marketIds": null,
        "status": "OPEN"
    },
    {
        "groupId": "16",
        "groupName": "讓球",
        "marketIds": [
            "0c572308-f6ec-49a7-b94c-82996d38f99f",
            "5012eec5-8293-4e0d-b635-a63d0062ca51",
            "6885d037-a5a1-4576-83bf-861b02684d52",
            "8b9afbfd-cb49-4dfd-82c8-7baec8522fe6",
            "909906c5-f31f-434b-9ac7-044656ab5906",
            "aef8429e-3ca4-45cf-82d5-c29e4445e014",
            "dc9886e0-3d3f-4404-b79b-72a4b3ef29cf"
        ],
        "status": "OPEN"
    },
    {
        "groupId": "17",
        "groupName": "角球17",
        "marketIds": [
            "0c572308-f6ec-49a7-b94c-82996d38f99f",
            "5012eec5-8293-4e0d-b635-a63d0062ca51",
        ],
        "status": "OPEN"
    },
    {
        "groupId": "18",
        "groupName": "角球18",
        "marketIds": [
            "0c572308-f6ec-49a7-b94c-82996d38f99f",
            "5012eec5-8293-4e0d-b635-a63d0062ca51",
        ],
        "status": "OPEN"
    },
    {
        "groupId": "19",
        "groupName": "角球19",
        "marketIds": [
            "0c572308-f6ec-49a7-b94c-82996d38f99f",
            "5012eec5-8293-4e0d-b635-a63d0062ca51",
        ],
        "status": "OPEN"
    },
    {
        "groupId": "20",
        "groupName": "角球20",
        "marketIds": [
            "0c572308-f6ec-49a7-b94c-82996d38f99f",
            "5012eec5-8293-4e0d-b635-a63d0062ca51",
        ],
        "status": "OPEN"
    },
]

export const mockRiskGroupData: RiskGroupListModel = {
    "totalElements": 100,
    "content": [
        {
            "riskId": "123456",
            "riskName": "Level 1",
            "riskColor": "#FFFFFF",
            "punterNumber": 100,
            "tags": [
                {
                    "tagId": "98765",
                    "tagName": "Unusual IP"
                },
                {
                    "tagId": "23456",
                    "tagName": "Block"
                },
                {
                    "tagId": "34567",
                    "tagName": "High-Risk"
                },
                {
                    "tagId": "45678",
                    "tagName": "Low-Risk"
                },
                {
                    "tagId": "89012",
                    "tagName": "Medium-Risk"
                }
            ]
        },
        {
            "riskId": "23456",
            "riskName": "Level 2",
            "riskColor": "#FFFFF0",
            "punterNumber": 200,
            "tags": [
                {
                    "tagId": "23456",
                    "tagName": "Block"
                }
            ]
        },
        {
            "riskId": "34567",
            "riskName": "Level 3",
            "riskColor": "#FFFF00",
            "punterNumber": 2468,
            "tags": [
                {
                    "tagId": "98765",
                    "tagName": "Unusual IP"
                },
                {
                    "tagId": "23456",
                    "tagName": "Block"
                },
                {
                    "tagId": "34567",
                    "tagName": "High-Risk"
                },
                {
                    "tagId": "45678",
                    "tagName": "Low-Risk"
                },
                {
                    "tagId": "89012",
                    "tagName": "Medium-Risk"
                }
            ]
        },
        {
            "riskId": "45678",
            "riskName": "Level 4",
            "riskColor": "#FFD700",
            "punterNumber": 1234,
            "tags": [
                {
                    "tagId": "45678",
                    "tagName": "Low-Risk"
                }
            ]
        },
        {
            "riskId": "56789",
            "riskName": "Level 5",
            "riskColor": "#FFA500",
            "punterNumber": 5678,
            "tags": [
                {
                    "tagId": "56789",
                    "tagName": "Medium-Risk"
                }
            ]
        },
        {
            "riskId": "67890",
            "riskName": "Level 6",
            "riskColor": "#FF8C00",
            "punterNumber": 9876,
            "tags": [
                {
                    "tagId": "67890",
                    "tagName": "High-Risk"
                }
            ]
        },
        {
            "riskId": "78901",
            "riskName": "Level 7",
            "riskColor": "#FF4500",
            "punterNumber": 5432,
            "tags": [
                {
                    "tagId": "98765",
                    "tagName": "Unusual IP"
                },
                {
                    "tagId": "23456",
                    "tagName": "Block"
                },
                {
                    "tagId": "34567",
                    "tagName": "High-Risk"
                },
                {
                    "tagId": "45678",
                    "tagName": "Low-Risk"
                },
                {
                    "tagId": "89012",
                    "tagName": "Medium-Risk"
                }
            ]
        },
        {
            "riskId": "89012",
            "riskName": "Level 8",
            "riskColor": "#FF0000",
            "punterNumber": 8765,
            "tags": [
                {
                    "tagId": "89012",
                    "tagName": "Medium-Risk"
                }
            ]
        },
        {
            "riskId": "90123",
            "riskName": "Level 9",
            "riskColor": "#DC143C",
            "punterNumber": 4321,
            "tags": [
                {
                    "tagId": "90123",
                    "tagName": "High-Risk"
                }
            ]
        },
        {
            "riskId": "01234",
            "riskName": "Level 10",
            "riskColor": "#8B0000",
            "punterNumber": 1357,
            "tags": [
                {
                    "tagId": "01234",
                    "tagName": "Low-Risk"
                }
            ]
        },
        {
            "riskId": "012345",
            "riskName": "Level 11",
            "riskColor": "#8B0000",
            "punterNumber": 1357,
            "tags": [
                {
                    "tagId": "98765",
                    "tagName": "Unusual IP"
                },
                {
                    "tagId": "23456",
                    "tagName": "Block"
                },
                {
                    "tagId": "34567",
                    "tagName": "High-Risk"
                },
                {
                    "tagId": "45678",
                    "tagName": "Low-Risk"
                },
                {
                    "tagId": "89012",
                    "tagName": "Medium-Risk"
                }
            ]
        },
        {
            "riskId": "0123456",
            "riskName": "Level 12",
            "riskColor": "#8B0000",
            "punterNumber": 1357,
            "tags": [
                {
                    "tagId": "0123456",
                    "tagName": "Low-Risk-Medium"
                }
            ]
        },
        {
            "riskId": "01234567",
            "riskName": "Level 13",
            "riskColor": "#8B0000",
            "punterNumber": 1357,
            "tags": [
                {
                    "tagId": "01234567",
                    "tagName": "Low-Risk-High"
                }
            ]
        },
        {
            "riskId": "012345678",
            "riskName": "Level 14",
            "riskColor": "#8B0000",
            "punterNumber": 1357,
            "tags": [
                {
                    "tagId": "012345678",
                    "tagName": "Low-Risk-Low2"
                }
            ]
        },
        {
            "riskId": "0123456789",
            "riskName": "Level 15",
            "riskColor": "#8B0000",
            "punterNumber": 1357,
            "tags": [
                {
                    "tagId": "0123456789",
                    "tagName": "Low-Risk-Low3"
                }
            ]
        },
        {
            "riskId": "01234567890",
            "riskName": "Level 16",
            "riskColor": "#8B0000",
            "punterNumber": 1357,
            "tags": [
                {
                    "tagId": "01234567890",
                    "tagName": "Low-Risk-Low4"
                }
            ]
        },
        {
            "riskId": "012345678901",
            "riskName": "Level 17",
            "riskColor": "#8B0000",
            "punterNumber": 1357,
            "tags": [
                {
                    "tagId": "012345678901",
                    "tagName": "Low-Risk-Low5"
                }
            ]
        },
        {
            "riskId": "98765",
            "riskName": "Level 18",
            "riskColor": "#8B0000",
            "punterNumber": 1357,
            "tags": [
                {
                    "tagId": "98765",
                    "tagName": "Low-Risk-Low6"
                }
            ]
        },
        {
            "riskId": "987654",
            "riskName": "Level 19",
            "riskColor": "#8B0000",
            "punterNumber": 1357,
            "tags": [
                {
                    "tagId": "987654",
                    "tagName": "Low-Risk-Low7"
                }
            ]
        },
        {
            "riskId": "9876543",
            "riskName": "Level 20",
            "riskColor": "#8B0000",
            "punterNumber": 1357,
            "tags": [
                {
                    "tagId": "9876543",
                    "tagName": "Low-Risk-Low8"
                }
            ]
        },
        {
            "riskId": "98765432",
            "riskName": "Level 21",
            "riskColor": "#8B0000",
            "punterNumber": 1357,
            "tags": [
                {
                    "tagId": "98765432",
                    "tagName": "Low-Risk-Low9"
                }
            ]
        },
        {
            "riskId": "987654321",
            "riskName": "Level 22",
            "riskColor": "#8B0000",
            "punterNumber": 1357,
            "tags": [
                {
                    "tagId": "987654321",
                    "tagName": "Low-Risk-Low10"
                }
            ]
        },
        {
            "riskId": "9876543210",
            "riskName": "Level 23",
            "riskColor": "#8B0000",
            "punterNumber": 1357,
            "tags": [
                {
                    "tagId": "9876543210",
                    "tagName": "Low-Risk-Low11"
                }
            ]
        },
        {
            "riskId": "98765432101",
            "riskName": "Level 24",
            "riskColor": "#8B0000",
            "punterNumber": 1357,
            "tags": [
                {
                    "tagId": "98765432101",
                    "tagName": "Low-Risk-Low12"
                }
            ]
        }
    ]
}

export const getRiskGroupDetailData = () => {
    const limitationType = Math.random() < 0.5 ? 'daily' : 'single';
    if (limitationType === 'daily') return mockRiskGroupDailyDetailData;
    else return mockRiskGroupSingleDetailData;
}

const mockRiskGroupDailyDetailData: GetRiskGroupDetailModel = {
    "riskName": "Level 1",
    "riskColor": "#9FA6AD",
    "betAmountSettings": {
        "minimum": 5,
        "maximum": 1000,
    },
    "winLossRateSettings": {
        "successBet": 10,
        "winRate": "No data - for newbie",
        "dayInterval": 5
    },
    "limitationType": "daily",
    "dailyBetLimitation": {
        "oddsDecrease": 0.01,
        "dailyLimit": 50000,
        "delayAcceptance": 10
    },
    "singleBetLimitation": undefined,
    "tags": [
        {
            "tagId": "34567",
            "tagName": "High-Risk"
        }
    ]
}

const mockRiskGroupSingleDetailData: GetRiskGroupDetailModel = {
    "riskName": "Level 1",
    "riskColor": "#9FA6AD",
    "betAmountSettings": {
        "minimum": 5,
        "maximum": 1000
    },
    "winLossRateSettings": {
        "successBet": 10,
        "winRate": "No data - for newbie",
        "dayInterval": 5
    },
    "limitationType": "single",
    "dailyBetLimitation": undefined,
    "singleBetLimitation": {
        "oddsAdjustment": 0.01,
        "amountAdjustment": 100,
        "delayAcceptance": 10
    },
    "tags": [
        {
            "tagId": "id_3",
            "tagName": "fake_tag_3"
        }
    ]
}

export const mockRiskGroupsApplyingPuntersData: RiskGroupsApplyingPuntersListModel = {
    "totalElements": 999,
    "content": [
        {
            "punterId": "123455",
            "punterAccount": "123@ollehsports.com",
            "lastUpdate": 1703471869
        },
        {
            "punterId": "234324",
            "punterAccount": "324666@ollehsports.com",
            "lastUpdate": 1724143667
        },
        {
            "punterId": "687970",
            "punterAccount": "sdf4566@ollehsports.com",
            "lastUpdate": 1704471869
        },
        {
            "punterId": "2436633",
            "punterAccount": "hhh123@ollehsports.com",
            "lastUpdate": 1724142367
        }
    ]
}