import {
    LoginResponseDataModel,
    MarketsModel,
    ProviderInformationListModel
} from "@/services/@core/module/ResponseDataModels";


export const mockLogin: LoginResponseDataModel = {
    "access_token": "aB3xY8cZ9qR2sLp7oH6fT1mK4wX5jI0uVgN3bE8",
    "uuid": "0823e683-ac06-4ec1-8da3-8940101ff0da",
    "user_info": {
        "uuid": "0823e683-ac06-4ec1-8da3-8940101ff0da",
        "user_account": "admin@ollehsports.com",
        "organization": "Olleh Sports",
        "role": "Channel Admin",
        "functionality": "Odds",
        "channel_id": "bccb1b39-654b-48f2-a2e3-2e93b15e6956",
        "brand_id": "BBIN",
        "username": "admin@ollehsports.com"
    },
}

export const mockSportCategories = [
    {
        "sportType": "SOCCER",
        "sportName": "足球",
        "sportId": 54321,
        "icon": "https://xxx.xxx.xxx/soccer.webp",
    },
    {
        "sportType": "BASKETBALL",
        "sportName": "籃球",
        "sportId": 54322,
        "icon": "https://xxx.xxx.xxx/basketball.webp",
    },
    {
        "sportType": "ROLLER SKATING",
        "sportName": "溜冰",
        "sportId": 54323,
        "icon": "https://xxx.xxx.xxx/soccer.webp",
    },
    {
        "sportType": "TENNIS",
        "sportName": "網球",
        "sportId": 54324,
        "icon": "https://xxx.xxx.xxx/basketball.webp",
    },
    {
        "sportType": "FOOTBALL",
        "sportName": "美式足球",
        "sportId": 54325,
        "icon": "https://xxx.xxx.xxx/soccer.webp",
    },
    {
        "sportType": "VOLLEYBALL",
        "sportName": "排球",
        "sportId": 54326,
        "icon": "https://xxx.xxx.xxx/basketball.webp",
    },
    {
        "sportType": "BASEBALL",
        "sportName": "棒球",
        "sportId": 54327,
        "icon": "https://xxx.xxx.xxx/soccer.webp",
    }
];

export const mockLocations = [
    {
        "locationName": "Alaska",
        "locationId": "1234"
    },
    {
        "locationName": "California",
        "locationId": "2345"
    },
    {
        "locationName": "Florida",
        "locationId": "3456"
    },
    {
        "locationName": "Hawaii",
        "locationId": "4567"
    },
    {
        "locationName": "Indiana",
        "locationId": "5678"
    },
    {
        "locationName": "Kentucky",
        "locationId": "6789"
    }
]

export const mockMemberList = {
    "totalElements": 5,
    "content": [
        {
            "id":  "0823e683-ac06-4ec1-8da3-8940101ff0da",
            "uuid": "0823e683-ac06-4ec1-8da3-8940101ff0da",
            "userAccount": "ABC@ollehsports.com",
            "email": "ABC@ollehsports.com",
            "userName": "John Gu",
            "organization": "AAA",
            "role": "Super Admin",
            "functionality": "Admin",
            "lastLogin": 1703471869,
            "createDate": 1703471869,
            "disableDate": 0,
            "status": "LOCKED"
        },
        {
            "id" : "OSGABCD00002",
            "uuid": "OSGABCD00002",
            "userAccount": "123@ollehsports.com",
            "email": "123@ollehsports.com",
            "userName": "Johnny worker",
            "organization": "AAA",
            "role": "Admin",
            "functionality": "Admin",
            "lastLogin": 1703471869,
            "createDate": 1703471869,
            "disableDate": 0,
            "status": "DISABLED"
        },
        {
            "id": "OSGABCD00003",
            "uuid": "OSGABCD00003",
            "userAccount": "A12d@ollehsports.com",
            "email": "A12d@ollehsports.com",
            "userName": "Test user 003",
            "organization": "AAA",
            "role": "Maintainer",
            "functionality": "Admin",
            "lastLogin": 1703471869,
            "createDate": 1703471869,
            "disableDate": 0,
            "status": "VERIFYING"
        },
        {
            "id": "OSGABCD00004",
            "uuid": "OSGABCD00004",
            "userAccount": "A12d@ollehsports.com",
            "email": "A23b@ollehsports.com",
            "userName": "Test user 004",
            "organization": "AAAB",
            "role": "Maintainer",
            "functionality": "Admin",
            "lastLogin": 1703471869,
            "createDate": 1703471869,
            "disableDate": 0,
            "status": "SUSPENDED"
        },
        {
            "id": "OSGABCD00005",
            "uuid": "OSGABCD00005",
            "userAccount": "A12d@ollehsports.com",
            "email": "A23b@ollehsports.com",
            "userName": "Test user 005",
            "organization": "AAAB",
            "role": "Maintainer",
            "functionality": "Admin",
            "lastLogin": 1703471869,
            "createDate": 1703471869,
            "disableDate": 0,
            "status": "SUSPENDED"
        },
        {
            "id": "OSGABCD00006",
            "uuid": "OSGABCD00006",
            "userAccount": "abd@ollehsports.com",
            "userName": "Test user 006",
            "email": "A23b@ollehsports.com",
            "organization": "AAABC",
            "role": "Channel Admin",
            "functionality": "Odds",
            "lastLogin": 1703471869,
            "createDate": 1703471869,
            "disableDate": 0,
            "status": "ACTIVE"
        },
        {
            "id": "OSGABCD00007",
            "uuid": "OSGABCD00007",
            "userAccount": "abd@ollehsports.com",
            "userName": "Test user 007",
            "email": "A23b@ollehsports.com",
            "organization": "AAABC",
            "role": "Channel Admin",
            "functionality": "Odds",
            "lastLogin": 1703471869,
            "createDate": 1703471869,
            "disableDate": 0,
            "status": "ACTIVE"
        },
        {
            "id": "OSGABCD00008",
            "uuid": "OSGABCD00008",
            "userAccount": "abd@ollehsports.com",
            "userName": "Test user 008",
            "email": "A23b@ollehsports.com",
            "organization": "AAABC",
            "role": "Channel Admin",
            "functionality": "Odds",
            "lastLogin": 1703471869,
            "createDate": 1703471869,
            "disableDate": 0,
            "status": "SUSPENDED"
        }
    ]
}

export const mockLeague = [
    {
        "leagueName": "NBA",
        "leagueId": 12345
    },
    {
        "leagueName": "MLB",
        "leagueId": 13355
    },
    {
        "leagueName": "NHL",
        "leagueId": 12244
    }
]

export const mockProviders = [
    "LSports",
    "NAMI",
    "ProviderA",
    "ProviderB"
]

export const mockProviderInformation: ProviderInformationListModel = {
    "totalElements": 999,
    "content": [
        {
            "id": "1",
            "providerName": "LSports",
            "runningEventCount": 1399,
            "status": "RUNNING",
            "updateTime": 1703471869
        },
        {
            "id": "2",
            "providerName": "Provider2",
            "runningEventCount": 2046,
            "status": "RUNNING",
            "updateTime": 1703471869
        },
        {
            "id": "3",
            "providerName": "Provider3",
            "runningEventCount": 996,
            "status": "LOST_CONNECTION",
            "updateTime": 1703471869
        },
        {
            "id": "4",
            "providerName": "Provider4",
            "runningEventCount": 1995,
            "status": "RUNNING",
            "updateTime": 1703471869
        }
    ]
}

export const mockDisplayTypes = [
    {
        "id": 0,
        "typeName": "American"
    },
    {
        "id": 1,
        "typeName": "Decimal"
    },
    {
        "id": 2,
        "typeName": "Fractional"
    },
    {
        "id": 3,
        "typeName": "Malay"
    },
    {
        "id": 4,
        "typeName": "Hong Kong"
    }
];

export const mockMemberRoles = [
    "Admin",
    "Maintainer",
    "Channel Admin"
]

export const mockSingleMember = {
    "uuid": "OSGABCD00001",
    "userAccount": "ABC@ollehsports.com",
    "userName": "Test user 001",
    "organization": "AAA",
    "functionality": "Odds",
    "role": "Channel Admin",
    "email": "ABC@ollehsports.com",
    "jobTitle": "CTO",
    "lastLogin": 1703471869,
    "createDate": 1703471869,
    "disableDate": 0,
    "status": "ACTIVE",
    "phoneNumber": "0987654321"
}

export const mockDangerBalls = [
    "CORNER_DANGER",
    "CORNER",
    "GOAL",
    "PENALTY_RISK",
    "PENALTY_AWARDED",
    "DANGEROUS_FREE_KICK",
    "DANGEROUS_ATTACK",
    "ATTACK_FREE_KICK",
]

export const mockMarkets: MarketsModel = {
    "totalElements": 87,
    "content": [
        {
            "marketId": "1234567",
            "marketName": "Under/Over",
        },
        {
            "marketId": "2345678",
            "marketName": "1X2"
        },
        {
            "marketId": "3456789",
            "marketName": "Handicape"
        },
        {
            "marketId": "1237567",
            "marketName": "Under/Over3",
        },
        {
            "marketId": "2349678",
            "marketName": "1X24"
        },
        {
            "marketId": "3461789",
            "marketName": "Handicape5"
        },
        {
            "marketId": "1240567",
            "marketName": "Under/Over6",
        },
        {
            "marketId": "2352678",
            "marketName": "1X27"
        },
        {
            "marketId": "3464789",
            "marketName": "Handicape8"
        },
        {
            "marketId": "1243567",
            "marketName": "Under/Over9",
        },
        {
            "marketId": "2355678",
            "marketName": "1X210"
        },
        {
            "marketId": "3467789",
            "marketName": "Handicape11"
        },
        {
            "marketId": "1246567",
            "marketName": "Under/Over12",
        },
        {
            "marketId": "2358678",
            "marketName": "1X213"
        },
        {
            "marketId": "3470789",
            "marketName": "Handicape14"
        },
        {
            "marketId": "1249567",
            "marketName": "Under/Over15",
        },
        {
            "marketId": "2361678",
            "marketName": "1X216"
        },
        {
            "marketId": "3473789",
            "marketName": "Handicape17"
        },
        {
            "marketId": "1252567",
            "marketName": "Under/Over18",
        },
        {
            "marketId": "2364678",
            "marketName": "1X219"
        },
        {
            "marketId": "3476789",
            "marketName": "Handicape20"
        },
        {
            "marketId": "1255567",
            "marketName": "Under/Over21",
        },
        {
            "marketId": "2367678",
            "marketName": "1X222"
        },
        {
            "marketId": "3479789",
            "marketName": "Handicape23"
        },
        {
            "marketId": "1258567",
            "marketName": "Under/Over24",
        },
        {
            "marketId": "2370678",
            "marketName": "1X225"
        },
        {
            "marketId": "3482789",
            "marketName": "Handicape26"
        },
        {
            "marketId": "1261567",
            "marketName": "Under/Over27",
        },
        {
            "marketId": "2373678",
            "marketName": "1X228"
        },
        {
            "marketId": "3485789",
            "marketName": "Handicape29"
        },
        {
            "marketId": "1264567",
            "marketName": "Under/Over30",
        },
        {
            "marketId": "2376678",
            "marketName": "1X231"
        },
        {
            "marketId": "3488789",
            "marketName": "Handicape32"
        },
        {
            "marketId": "1267567",
            "marketName": "Under/Over33",
        },
        {
            "marketId": "2379678",
            "marketName": "1X234"
        },
        {
            "marketId": "3491789",
            "marketName": "Handicape35"
        },
        {
            "marketId": "1270567",
            "marketName": "Under/Over36",
        },
        {
            "marketId": "2382678",
            "marketName": "1X237"
        },
        {
            "marketId": "3494789",
            "marketName": "Handicape38"
        },
        {
            "marketId": "1273567",
            "marketName": "Under/Over39",
        },
        {
            "marketId": "2385678",
            "marketName": "1X240"
        },
        {
            "marketId": "3497789",
            "marketName": "Handicape41"
        },
        {
            "marketId": "1276567",
            "marketName": "Under/Over42",
        },
        {
            "marketId": "2388678",
            "marketName": "1X243"
        },
        {
            "marketId": "3500789",
            "marketName": "Handicape44"
        },
        {
            "marketId": "1279567",
            "marketName": "Under/Over45",
        },
        {
            "marketId": "2391678",
            "marketName": "1X246"
        },
        {
            "marketId": "3503789",
            "marketName": "Handicape47"
        },
        {
            "marketId": "1282567",
            "marketName": "Under/Over48",
        },
        {
            "marketId": "2394678",
            "marketName": "1X249"
        },
        {
            "marketId": "3506789",
            "marketName": "Handicape50"
        },
        {
            "marketId": "1285567",
            "marketName": "Under/Over51"
        },
        {
            "marketId": "2397678",
            "marketName": "1X252"
        },
        {
            "marketId": "3509789",
            "marketName": "Handicape53"
        },
        {
            "marketId": "1288567",
            "marketName": "Under/Over54"
        },
        {
            "marketId": "2400678",
            "marketName": "1X255"
        },
        {
            "marketId": "3512789",
            "marketName": "Handicape56"
        },
        {
            "marketId": "1291567",
            "marketName": "Under/Over57"
        },
        {
            "marketId": "2403678",
            "marketName": "1X258"
        },
        {
            "marketId": "3515789",
            "marketName": "Handicape59"
        },
        {
            "marketId": "1294567",
            "marketName": "Under/Over60"
        },
        {
            "marketId": "2406678",
            "marketName": "1X261"
        },
        {
            "marketId": "3518789",
            "marketName": "Handicape62"
        },
        {
            "marketId": "1297567",
            "marketName": "Under/Over63"
        },
        {
            "marketId": "2409678",
            "marketName": "1X264"
        },
        {
            "marketId": "3521789",
            "marketName": "Handicape65"
        },
        {
            "marketId": "1300567",
            "marketName": "Under/Over66"
        },
        {
            "marketId": "2412678",
            "marketName": "1X267"
        },
        {
            "marketId": "3524789",
            "marketName": "Handicape68"
        },
        {
            "marketId": "1303567",
            "marketName": "Under/Over69"
        },
        {
            "marketId": "2415678",
            "marketName": "1X270"
        },
        {
            "marketId": "3527789",
            "marketName": "Handicape71"
        },
        {
            "marketId": "1306567",
            "marketName": "Under/Over72"
        },
        {
            "marketId": "2418678",
            "marketName": "1X273"
        },
        {
            "marketId": "3530789",
            "marketName": "Handicape74"
        },
        {
            "marketId": "1309567",
            "marketName": "Under/Over75"
        },
        {
            "marketId": "2421678",
            "marketName": "1X276"
        },
        {
            "marketId": "3533789",
            "marketName": "Handicape77"
        },
        {
            "marketId": "1312567",
            "marketName": "Under/Over78"
        },
        {
            "marketId": "2424678",
            "marketName": "1X279"
        },
        {
            "marketId": "3536789",
            "marketName": "Handicape80"
        },
        {
            "marketId": "1315567",
            "marketName": "Under/Over81"
        },
        {
            "marketId": "2427678",
            "marketName": "1X282"
        },
        {
            "marketId": "3539789",
            "marketName": "Handicape83"
        },
        {
            "marketId": "1318567",
            "marketName": "Under/Over84"
        },
        {
            "marketId": "2430678",
            "marketName": "1X285"
        },
        {
            "marketId": "3542789",
            "marketName": "Handicape86"
        },
    ]
}

const mockRemoveMembersData = {
    "successIds": ["12345", "67890"],
    "failureIds": []
}

const mockRemoveMembersPartialSuccessData = {
    "successIds": ["12345"],
    "failureIds": ["67890"]
}

export const mockRemoveMembersDataOptions = [
    mockRemoveMembersData,
    mockRemoveMembersPartialSuccessData
];
