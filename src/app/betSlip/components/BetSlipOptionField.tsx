import React from "react";
import {Button, Stack} from "@mui/material";
import {BetStatus} from "@/services/@core/module/Enum";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

interface BetSlipOptionFieldProps {
    enableAccept: boolean
    enableDelete: boolean
    enableReject: boolean
    onClick: (optionType: BetStatus) => void
}

const BetSlipOptionField = (props: BetSlipOptionFieldProps) => {
    const intl = useIntl()
    const funType = LocalizationFunctionType.BetSlip

    return (
        <Stack direction={'row'}>
            <Button
                variant={'text'} color={'primary'}
                disabled={!props.enableAccept}
                onClick={() => props.onClick(BetStatus.ACCEPTED)}
            >
                { intl.formatMessage({id: `${funType}.actionAccept`, defaultMessage: 'Accept'}) }
            </Button>
            <Button
                variant={'text'} color={'secondary'}
                disabled={!props.enableReject}
                onClick={() => props.onClick(BetStatus.REJECTED)}
            >
                { intl.formatMessage({id: `${funType}.actionReject`, defaultMessage: 'Reject'}) }
            </Button>
            <Button
                variant={'text'} color={'error'}
                disabled={!props.enableDelete}
                onClick={() => props.onClick(BetStatus.VOID)}
            >
                { intl.formatMessage({id: `${funType}.actionDelete`, defaultMessage: 'Delete'}) }
            </Button>
        </Stack>
    )
}

const MemoizedOptionField = React.memo(BetSlipOptionField)
MemoizedOptionField.displayName = 'BetSlipOptionField'

export default MemoizedOptionField