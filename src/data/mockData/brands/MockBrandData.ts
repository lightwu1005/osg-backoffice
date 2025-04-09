export const mockBrandData = {
    "totalElements": 999,
    "pageSize": 10,
    "content": [
        {
            "id": "12345",
            "brandName": "bbim brand1",
            "brandId": "12345",
            "ownerName": "John Gu",
            "ownerId": "12345678",
            "email": "abc@brand1.com",
            "locationName": "AMERICA",
            "oddsFormat": ["American", "Decimal"],
            "margin": 5,
            "regTime": 1703471869,
            "status": "ACTIVE"
        },
        {
            "id": "23456",
            "brandName": "bbim brand2",
            "brandId": "23456",
            "ownerName": "John Gu",
            "ownerId": "23456789",
            "email": "abc@brand2.com",
            "locationName": "CHINA",
            "oddsFormat": ["Decimal"],
            "margin": 10,
            "regTime": 1703471869,
            "status": "SUSPENDED"
        },
        {
            "id": "34567",
            "brandName": "bbim brand3",
            "brandId": "34567",
            "ownerName": "John Gu",
            "ownerId": "34567890",
            "email": "abc@brand3.com",
            "locationName": "TAIWAN",
            "oddsFormat": ["American", "Fractional"],
            "margin": 15,
            "regTime": 1703471869,
            "status": "PENDING"
        },
        {
            "id": "45678",
            "brandName": "bbim brand4",
            "brandId": "45678",
            "ownerName": "John Gu",
            "ownerId": "45678901",
            "email": "abc@brand4.com",
            "locationName": "INDIA",
            "oddsFormat": ["American", "Malay", "Hong Kong"],
            "margin": 20,
            "regTime": 1703471869,
            "status": "PROCEEDING"
        },
        {
            "id": "56789",
            "brandName": "bbim brand5",
            "brandId": "56789",
            "ownerName": "John Gu",
            "ownerId": "56789012",
            "email": "abc@brand5.com",
            "locationName": "INDIA",
            "oddsFormat": ["American", "Malay", "Hong Kong", "Fractional"],
            "margin": 25,
            "regTime": 1703471869,
            "status": "PROCEEDING"
        },
        {
            "id": "567891",
            "brandName": "bbim brand5",
            "brandId": "56789",
            "ownerName": "Jiaku D",
            "ownerId": "567890121",
            "email": "abc@brand5.com",
            "locationName": "INDIA",
            "oddsFormat": ["American", "Malay", "Hong Kong", "Fractional"],
            "margin": 35,
            "regTime": 1703471869,
            "status": "MAINTAIN"
        }
    ]
}

export const mockBrandDetailData = {
    "brandName": "BrandNo1",
    "brandId": "78901",
    "ownerName": "John Gu",
    "ownerId": "OSGABCD00002",
    "email": "ABC123@ollehsports.com",
    "locationName": "AMERICA",
    "margin": 10,
    "oddsFormat": [
        "American",
        "Decimal"
    ],
}

const mockRemoveBrandsData = {
    "successIds": ["23456", "78901"],
    "failureIds": []
}

export const mockUpdateEventsStatusData = {
    "successIds": ["54321", "98765"],
    "failureIds": ["34567"],
}

const mockRemoveBrandsPartialSuccessData = {
    "successIds": ["23456"],
    "failureIds": ["98765"]
}

export const mockRemoveBrandsDataOptions = [
    mockRemoveBrandsData,
    mockRemoveBrandsPartialSuccessData
]

const mockUpdateBrandStatusData = {
    "successIds": ["23456", "67890"],
    "failureIds": []
}

const mockUpdateBrandStatusPartialSuccessData = {
    "successIds": ["87654"],
    "failureIds": ["23456", "76543"]
}

const mockUpdateBrandStatusPartialSuccessDataMoreThan3 = {
    "successIds": ["12345"],
    "failureIds": ["65432", "98765", "87654", "76543"]
}

export const mockUpdateBrandDataOptions = [
    mockUpdateBrandStatusData,
    mockUpdateBrandStatusPartialSuccessData,
    mockUpdateBrandStatusPartialSuccessDataMoreThan3
];