import { AuditModel } from '@/services/@core/module/ResponseDataModels';

export const mockAuditsActions: string[] = [
    "Login",
    "Logout"
]

export const mockAuditData: AuditModel = {
    "totalElements": 999,
    "content": [
        {
            "id": "0",
            "userName": "John Gu",
            "action": "create",
            "requestUrl": "/permission",
            "requestBody": "create account",
            "isSuccess": true,
            "companyName": "Olleh Sports",
            "logTime": 1706471869
        },
        {
            "id": "1",
            "userName": "John Gu",
            "action": "delete",
            "requestUrl": "/events/12345",
            "requestBody": "delete something",
            "isSuccess": false,
            "companyName": "Olleh Sports",
            "logTime": 1703571869
        },
        {
            "id": "2",
            "userName": "John Gu",
            "action": "update",
            "requestUrl": "/events/12345",
            "requestBody": "update something",
            "isSuccess": false,
            "companyName": "Olleh Sports",
            "logTime": 1703483869
        },
        {
            "id": "3",
            "userName": "John Gu",
            "action": "login",
            "requestUrl": "/login",
            "requestBody": "login account",
            "isSuccess": true,
            "companyName": "Olleh Sports",
            "logTime": 1703471869
        },
        {
            "id": "4",
            "userName": "John Gu",
            "action": "login",
            "requestUrl": "/login",
            "requestBody": "login account",
            "isSuccess": true,
            "companyName": "Olleh Sports",
            "logTime": 1703471869
        },
        {
            "id": "5",
            "userName": "John Gu",
            "action": "login",
            "requestUrl": "/login",
            "requestBody": "login account",
            "isSuccess": true,
            "companyName": "Olleh Sports",
            "logTime": 1703471869
        },
        {
            "id": "6",
            "userName": "John Gu",
            "action": "login",
            "requestUrl": "/login",
            "requestBody": "login account",
            "isSuccess": true,
            "companyName": "Olleh Sports",
            "logTime": 1703471869
        },
        {
            "id": "7",
            "userName": "John Gu",
            "action": "login",
            "requestUrl": "/login",
            "requestBody": "login account",
            "isSuccess": true,
            "companyName": "Olleh Sports",
            "logTime": 1703471869
        },
        {
            "id": "8",
            "userName": "John Gu",
            "action": "login",
            "requestUrl": "/login",
            "requestBody": "login account",
            "isSuccess": true,
            "companyName": "Olleh Sports",
            "logTime": 1703471869
        },
        {
            "id": "9",
            "userName": "John Gu",
            "action": "login",
            "requestUrl": "/login",
            "requestBody": "login account",
            "isSuccess": true,
            "companyName": "Olleh Sports",
            "logTime": 1703471869
        },
        {
            "id": "10",
            "userName": "John Gu",
            "action": "login",
            "requestUrl": "/login",
            "requestBody": "login account",
            "isSuccess": true,
            "companyName": "Olleh Sports",
            "logTime": 1703471869
        }
    ]
}