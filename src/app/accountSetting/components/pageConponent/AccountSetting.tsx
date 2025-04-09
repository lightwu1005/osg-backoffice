import * as React from "react";
import {Stack, Typography} from "@mui/material";
import {StatusButtonGroup} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import AccountSettingContainer from "@/app/accountSetting/components/pageConponent/AccountSettingContainer";
import GeneralAccountSettingForm from "@/app/accountSetting/components/pageConponent/GeneralAccountSettingForm";
import SecurityAccountSettingForm from "@/app/accountSetting/components/pageConponent/SecurityAccountSettingForm";
import LoadingAnimation from "@/modules/components/general/LoadingAnimation";
import useAccountSettingViewModel from "@/app/accountSetting/domain/useAccountSettingViewModel";
import ToggleProps from "@/modules/interface/ToggleProps";
import {FullScreenDialog} from "@/modules/components/dialog/FullScreenDialog";

function AccountSetting() {
    const {
        isLoading,
        title,
        status,
        statusItems,
        userInfo,
        handleSettingFormChange,
        handleDataUpdated
    } = useAccountSettingViewModel()

    const MemoizedGeneralAccountSettingForm = React.memo(GeneralAccountSettingForm);
    const MemoizedSecurityAccountSettingForm = React.memo(SecurityAccountSettingForm);

    const getContent = () => {
        switch (status) {
            case 'general':
                return <MemoizedGeneralAccountSettingForm initialData={userInfo} onUpdated={handleDataUpdated}/>;
            case 'security':
                return <MemoizedSecurityAccountSettingForm />;
            default:
                return null;
        }
    };

    return (
        <Stack spacing={4}>
            <Typography variant={'h1'}>{title}</Typography>
            <StatusButtonGroup
                items={statusItems}
                selectedIndex={statusItems.findIndex(item => item.key === status)}
                onClick={(_: number, key: string) => {
                    handleSettingFormChange(key)
                }}
            />
            <AccountSettingContainer>
                {getContent()}
            </AccountSettingContainer>
            <LoadingAnimation isLoading={isLoading}/>
        </Stack>
    )
}

export default function AccountSettingDialog(toggle: ToggleProps) {
    return <FullScreenDialog
        {...toggle}
        content={
            <AccountSetting/>
        }
    />
}