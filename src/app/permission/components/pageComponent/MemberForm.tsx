import {FullScreenDialog} from "@/modules/components/dialog/FullScreenDialog";
import React from "react";
import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import {RegexPatterns} from "@/modules/common/CommonRegexChecker";
import {InfoInputComponent, InfoSelectComponent} from "@/modules/components/TextField";
import ToggleProps from "@/modules/interface/ToggleProps";
import useMemberFormViewModel from "@/app/permission/domain/useMemberFormViewModel";
import LoadingAnimation from "@/modules/components/general/LoadingAnimation";

export interface MemberFormProps extends ToggleProps {
    uuid: string
    roleList: string[]
    onFinished: () => void
}

export const MemberForm = (props: MemberFormProps) => {
    const {
        loading,
        title,
        subTitle,
        submitButtonText,
        fieldValues,
        isPublishEnabled,
        isEditable,
        handleFieldChange,
        handleSubmit,
        intl,
        funType
    } = useMemberFormViewModel(props)

    return <Stack height={'100%'} direction={"column"}>
        <Stack spacing={1} direction={"column"}>
            <Typography variant={'h1'}>{title}</Typography>
            <Typography variant={'body1'}>{subTitle}</Typography>
        </Stack>
        <Grid container spacing={2} paddingTop={4}>
            <Grid item xs={12} sm={6}>
                <InfoInputComponent
                    id={'userName'}
                    header={intl.formatMessage({id: `${funType}.formName`, defaultMessage: 'User Name'})}
                    error={false}
                    label={intl.formatMessage({
                        id: `${funType}.formNameLabel`, defaultMessage: 'Input the user name'
                    })}
                    helperText={intl.formatMessage({
                        id: `${funType}.formNameHelperText`, defaultMessage: 'Please enter a valid user name'
                    })}
                    format={'text'}
                    regex={RegexPatterns.UserName}
                    value={fieldValues.userName}
                    onChange={handleFieldChange('userName')}
                    disable={!isEditable}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InfoInputComponent
                    id={'email'}
                    header={intl.formatMessage({id: `${funType}.formEmail`, defaultMessage: 'Email'})}
                    error={false}
                    label={intl.formatMessage({
                        id: `${funType}.formEmailLabel`,
                        defaultMessage: 'Input contact email'
                    })}
                    helperText={intl.formatMessage({
                        id: `${funType}.formEmailHelperText`,
                        defaultMessage: 'Email incorrect, please try again'
                    })}
                    format={'text'}
                    regex={RegexPatterns.Email}
                    value={fieldValues.email}
                    onChange={handleFieldChange('email')}
                    disable={!isEditable}
                />
            </Grid>
        </Grid>
        <Grid container spacing={2} paddingTop={4}>
            <Grid item xs={12} sm={6}>
                <InfoSelectComponent
                    id={'role'}
                    header={intl.formatMessage({id: `${funType}.formRole`, defaultMessage: 'Role'})}
                    menu={{
                        options: props.roleList,
                        label: intl.formatMessage({
                            id: `${funType}.formRoleLabel`,
                            defaultMessage: 'Select a role'
                        }),
                        value: fieldValues.role,
                        onChange: (role) => {
                            handleFieldChange('role')({target: {value: role}} as React.ChangeEvent<HTMLInputElement>);
                        },
                    }}
                    disabled={!isEditable}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InfoInputComponent
                    id={'companyName'}
                    header={intl.formatMessage({
                        id: `${funType}.formCompanyName`,
                        defaultMessage: 'Company Name'
                    })}
                    error={false}
                    label={intl.formatMessage({
                        id: `${funType}.formCompanyNameLabel`,
                        defaultMessage: 'Input a company name'
                    })}
                    helperText={intl.formatMessage({
                        id: `${funType}.formCompanyNameHelperText`,
                        defaultMessage: 'Please input a company name'
                    })}
                    format={'text'}
                    value={fieldValues.organization}
                    onChange={handleFieldChange('organization')}
                    disable={!isEditable}
                />
            </Grid>
        </Grid>
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            height: '100%',
            width: '100%',
            position: 'relative',
        }}>
            <Button
                id={'publish'}
                variant={'contained'}
                color={'primary'}
                disabled={!isPublishEnabled}
                onClick={() => {
                    handleSubmit()
                }}
            >
                {submitButtonText}
            </Button>
        </Box>
        <LoadingAnimation isLoading={loading}/>
    </Stack>
}
export default function MemberFormDialog(props: MemberFormProps) {
    const {open, setOpen} = props
    return <FullScreenDialog
        open={open} setOpen={setOpen}
        content={
            <MemberForm  {...props}/>
        }
    />
}