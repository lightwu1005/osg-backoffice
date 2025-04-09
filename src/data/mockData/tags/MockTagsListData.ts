import {TagsListModel} from "@/services/@core/module/ResponseDataModels";

export const mockTagsList: TagsListModel = {
    "totalElements": 999,
    "content": [
        {
            "tagId": "123456",
            "tagName": "Unusual IP",
            "tagType": ""
        },
        {
            "tagId": "23456",
            "tagName": "Block",
            "tagType": ""
        },
        {
            "tagId": "34567",
            "tagName": "Duplicate Accounts",
            "tagType": ""
        },
        {
            "tagId": "45678",
            "tagName": "High-Risk",
            "tagType": ""
        },
        {
            "tagId": "56789",
            "tagName": "New",
            "tagType": ""
        }
    ]
}