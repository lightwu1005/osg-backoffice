import * as React from "react"
import { Button, Stack } from "@mui/material"
import LoadingAnimation from "@/modules/components/general/LoadingAnimation"
import useSecurityAccountSettingFormViewModel from "@/app/accountSetting/domain/useSecrityAccountSettingFormViewModel"
import { InfoPasswordComponent} from "@/modules/components/TextField/InfoInputPassword"

export default function SecurityAccountSettingForm() {
    const {
        isLoading,
        checkIsSubmitEnabled,
        handleInputChange,
        handleSubmit,
        showCurrentPassword,
        showNewPassword,
        showConfirmPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        confirmPasswordErrorMessage,
        currentPassword,
        newPassword,
        confirmPassword,
        save
    } = useSecurityAccountSettingFormViewModel()

    return (
        <form onSubmit={handleSubmit}>
            <Stack direction={'column'}>
                <InfoPasswordComponent
                    header={currentPassword}
                    props={{
                        label: "",
                        placeholder: "",
                        name: "currentPassword",
                        handleChange: handleInputChange('currentPassword'),
                        handleBlur: handleInputChange('currentPassword'),
                        errorMessage: '',
                        showPassword: showCurrentPassword,
                        handleClickShowPassword: () => handleClickShowPassword('currentPassword'),
                        handleMouseDownPassword
                    }}
                />
                <InfoPasswordComponent
                    header={newPassword}
                    props={{
                        label: "",
                        placeholder: "",
                        name: "newPassword",
                        handleChange: handleInputChange('newPassword'),
                        handleBlur: handleInputChange('newPassword'),
                        errorMessage: '',
                        showPassword: showNewPassword,
                        handleClickShowPassword: () => handleClickShowPassword('newPassword'),
                        handleMouseDownPassword
                    }}
                />
                <InfoPasswordComponent
                    header={confirmPassword}
                    props={{
                        label: "",
                        placeholder: "",
                        name: "confirmPassword",
                        handleChange: handleInputChange('confirmPassword'),
                        handleBlur: handleInputChange('confirmPassword'),
                        errorMessage: confirmPasswordErrorMessage,
                        showPassword: showConfirmPassword,
                        handleClickShowPassword: () => handleClickShowPassword('confirmPassword'),
                        handleMouseDownPassword
                    }}
                />
            </Stack>
            <Stack mt={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Button
                    data-testid={'submitButton'}
                    type="submit"
                    variant={'contained'}
                    color={'primary'}
                    disabled={!checkIsSubmitEnabled}
                >
                    {save}
                </Button>
            </Stack>
            <LoadingAnimation isLoading={isLoading} />
        </form>
    )
}
