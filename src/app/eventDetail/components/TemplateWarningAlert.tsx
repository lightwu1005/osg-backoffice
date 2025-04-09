import React from 'react';
import { Alert, Button, Stack } from '@mui/material';
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export enum WarningSettingBarStatus {
    KeepOld,
    UseNew,
    Restore
}

interface WarningAlertProps {
    isPreferValueSelected: boolean;
    onRestore: () => void;
    onKeepOld: () => void;
    onUseNew: () => void;
}

export const WarningAlert = ({ isPreferValueSelected, onRestore, onKeepOld, onUseNew }: WarningAlertProps) => {
    const intl = useIntl();
    const funType = LocalizationFunctionType.Template;

    return (
        <Alert severity={isPreferValueSelected ? "success" : "warning"}
               action={
                   <Stack direction="row" spacing={1}>
                       {isPreferValueSelected ? (
                           <Button color="inherit" size="small" onClick={onRestore}>
                               {intl.formatMessage({ id: `${funType}.restore`, defaultMessage: 'RESTORE' })}
                           </Button>
                       ) : (
                           <>
                               <Button color="inherit" size="small" onClick={onKeepOld}>
                                   {intl.formatMessage({ id: `${funType}.keepPreviousSettings`,
                                       defaultMessage: 'KEEP PREVIOUS SETTINGS' })}
                               </Button>
                               <Button color="inherit" size="small" onClick={onUseNew}>
                                   {intl.formatMessage({ id: `${funType}.useNew`, defaultMessage: 'USE NEW' })}
                               </Button>
                           </>
                       )}
                   </Stack>
               }
        >
            {
                isPreferValueSelected
                ? intl.formatMessage({ id: `${funType}.updatedSuccessful`, defaultMessage: 'Updated successful!' })
                : intl.formatMessage({ id: `${funType}.inconsistentSettings`, defaultMessage: 'Inconsistent settings' })
            }
        </Alert>
    );
};
