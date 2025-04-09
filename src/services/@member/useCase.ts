import {useIntl} from "react-intl";
import {MemberTableType} from "@/app/member/domain/useMemberViewModel";
import {StatusItem} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import {ActionItem} from "@/modules/components/buttons/actionButton/ActionButton";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export const useMemberLocalization = () => {
    const intl = useIntl();
    const funType = `${LocalizationFunctionType.Member}`

    const DefaultMemberTableTypes = (): StatusItem[] => {
        return [
            {
                key: MemberTableType.MemberList,
                text: intl.formatMessage({
                    id: `${funType}.memberList`,
                    defaultMessage: 'Member List'
                }),
                type: ''
            },
            {
                key: MemberTableType.MemberLevelSetting,
                text: intl.formatMessage({
                    id: `${funType}.memberLevelSetting`,
                    defaultMessage: 'Member Level Setting'
                }),
                type: ''
            }
        ]
    }

    const DefaultMemberSearchOptionTypes = (): ActionItem[] => {
        const funCommonType = LocalizationFunctionType.Common

        return [
            {
                key: 'ACCOUNT', value: intl.formatMessage({id: `${funCommonType}.account`, defaultMessage: 'Account'})
            },
            {
                key: 'PUNTER_ID', value: intl.formatMessage({id: `${funCommonType}.memberId`, defaultMessage: 'Member ID'})
            }
        ]
    }

    return {
        DefaultMemberTableTypes,
        DefaultMemberSearchOptionTypes
    }
}

