import * as React from "react";
import {Button, Stack} from "@mui/material";
import {InfoInputComponent} from "@/modules/components/TextField";
import LoadingAnimation from "@/modules/components/general/LoadingAnimation";
import {SingleMemberInfoResponseDataModel} from "@/services/@core/module/ResponseDataModels";
import useGeneralAccountSettingFormViewModel from "@/app/accountSetting/domain/useGeneralAccountSettingFormViewModel";
import {RegexPatterns} from "@/modules/common/CommonRegexChecker";

export interface GeneralAccountSettingFormProps {
    initialData?: SingleMemberInfoResponseDataModel
    onUpdated: () => void
}

export default function GeneralAccountSettingForm(props: GeneralAccountSettingFormProps) {
    const {
        isLoading,
        formData,
        userInfo,
        isSubmitEnabled,
        handleInputChange,
        handleSubmit,
        formError,
        handleErrorChange,
        userName,
        userNameHelperText,
        email,
        jobTitle,
        jobTitleHelperText,
        phoneNumber,
        phoneNumberHelperText,
        save
    } = useGeneralAccountSettingFormViewModel(props)

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4} direction={'row'}>
                <InfoInputComponent
                    header={userName} error={formError.userName}
                    handleErrorChange={handleErrorChange('userName')}
                    label={''} helperText={userNameHelperText}
                    value={formData?.userName}
                    regex={RegexPatterns.UserName}
                    onChange={handleInputChange('userName')}
                />
                <InfoInputComponent
                    header={email} error={false}
                    label={''} helperText={''}
                    value={userInfo.current?.email}
                    disable={true}
                />
            </Stack>
            <Stack spacing={4} mt={4} direction={'row'}>
                <InfoInputComponent
                    header={jobTitle} error={formError.jobTitle}
                    handleErrorChange={handleErrorChange('jobTitle')}
                    label={''} helperText={jobTitleHelperText}
                    value={formData?.jobTitle}
                    regex={RegexPatterns.UserName}
                    onChange={handleInputChange('jobTitle')}
                />
                <InfoInputComponent
                    header={phoneNumber} error={formError.phoneNumber}
                    handleErrorChange={handleErrorChange('phoneNumber')}
                    label={''} helperText={phoneNumberHelperText}
                    value={formData?.phoneNumber}
                    regex={RegexPatterns.PhoneNumber}
                    onChange={handleInputChange('phoneNumber')}
                />
            </Stack>
            <Stack mt={4}
                   sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Button
                    data-testid={'submitButton'}
                    type="submit"
                    variant={'contained'}
                    color={'primary'}
                    disabled={!isSubmitEnabled}
                >
                    {save}
                </Button>
            </Stack>
            <LoadingAnimation isLoading={isLoading}/>
        </form>
    )
}
