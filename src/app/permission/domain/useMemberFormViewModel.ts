import {toAddMemberProps, toUpdateMemberInfoProps} from "@/app/permission/models/RequestDataMapping";
import {
    AddMemberParameters,
    MemberFormFields,
    UpdateMemberInfoParameters
} from "@/app/permission/models/PermissionParameters";
import useMemberInfoRepository from "@/services/@member/repository/useMemberInfoRepository";
import {GlobalController} from "@/modules/common/GlobalController";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {MemberFormProps} from "@/app/permission/components/pageComponent/MemberForm";
import {toSingleMemberInfoProps} from "@/app/accountSetting/models/RequestDataMapping";
import lodash, {cloneDeep} from "lodash";
import {RegexPatterns} from "@/modules/common/CommonRegexChecker";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {Functionality} from "@/services/@core/module/Enum";
import PermissionHandler from "@/modules/common/PermissionHandler";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

const useMemberFormViewModel = ({uuid, setOpen, onFinished}: MemberFormProps) => {
    const memberRepo = useMemberInfoRepository()
    const {userUUID, userRole, channelId} = IdentityHandler();
    const userFunctionality = process.env.FUNCTIONALITY ?? '';
    const addMember = async (parameters: AddMemberParameters) => {
        return await memberRepo.addMember(toAddMemberProps(parameters))
    }

    const getSingleMember = async (uuid: string) => {
        return await memberRepo.getSingleMember(toSingleMemberInfoProps(uuid))
    }

    const updateMemberInfo = async (parameters: UpdateMemberInfoParameters) => {
        return await memberRepo.updateMemberInfo(toUpdateMemberInfoProps(parameters))
    }

    const intl = useIntl()
    const funType = LocalizationFunctionType.Permission

    const title: string = uuid ?
        intl.formatMessage({id: `${funType}.formTitleUpdate`, defaultMessage: 'Edit User'})
        : intl.formatMessage({id: `${funType}.formTitleCreate`, defaultMessage: 'Add User'})
    const subTitle: string = intl.formatMessage({
        id: `${funType}.formSubtitle`,
        defaultMessage: 'Please setup the role, All forms are necessary.'
    })
    const submitButtonText = uuid ?
        intl.formatMessage({id: `${funType}.formSubmitUpdate`, defaultMessage: 'Save'})
        : intl.formatMessage({id: `${funType}.formSubmitCreate`, defaultMessage: 'Publish'})

    const globalController = GlobalController.getInstance()
    const [fieldValues, setFieldValues] = useState<MemberFormFields>({
        userName: '',
        email: '',
        role: '',
        organization: '',
    });
    const originalFieldsValues = useRef<MemberFormFields>(cloneDeep(fieldValues));
    const [isEditable, setIsEditable] = useState(true);
    const [loading, setLoading] = useState(false);

    const isPublishEnabled = useMemo(() => {
        const validResult = Object.values(fieldValues).every(value => value !== '')
        const isUserNameValid = RegexPatterns.UserName.test(fieldValues.userName);
        const isEmailValid = RegexPatterns.Email.test(fieldValues.email);
        const hasChanged = !lodash.isEqual(fieldValues, originalFieldsValues.current);
        const hasChannelId = (userFunctionality === Functionality.Odds) === (fieldValues.channelId !== '')
        switch (userFunctionality) {
            case Functionality.Admin:
                return validResult && isUserNameValid && isEmailValid && hasChanged
            case  Functionality.Odds:
                return validResult && isUserNameValid && isEmailValid && hasChanged && hasChannelId
            default:
                return validResult && isUserNameValid && isEmailValid && hasChanged
        }
    }, [fieldValues])
    const handleFieldChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setFieldValues(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const closeDialog = () => {
        setTimeout(() => {
            setOpen(false);
            onFinished();
        }, 1500)
    }

    const handleMemberAction = async () => {
        setLoading(true)
        try {
            if (uuid) {
                await updateMemberInfo({
                    uuid: uuid,
                    ...fieldValues
                })
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    show: true,
                    message: intl.formatMessage({
                        id: `${funType}.updateUserSuccess`, defaultMessage: 'User has been updated successfully!'
                    }),
                    severity: 'success',
                })
                closeDialog()
            } else {
                await addMember(fieldValues);
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    show: true,
                    message: intl.formatMessage({
                        id: `${funType}.createUserSuccess`, defaultMessage: 'User has been added successfully!'
                    }),
                    severity: 'success',
                })
                closeDialog()
            }
        } catch (error) {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                show: true,
                message: error,
                severity: 'error',
            })
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = () => {
        handleMemberAction()
    }

    useEffect(() => {
        if(uuid) {
            setLoading(true)
            const {isControlAble} = PermissionHandler()
            const fetchData = async () => {
                getSingleMember(uuid).then((resp) => {
                    const {userName, email, role, organization} = resp
                    const data = {
                        email: email,
                        role: role,
                        userName: userName ?? '',
                        organization: organization ?? ''
                    }
                    setFieldValues(data);
                    /**
                     * @description To check if the user is able to edit the form
                     * @define
                     * **userUUID** is the same as the selected user's uuid
                     * **userRole** is higher than the selected user's role
                     */
                    setIsEditable((uuid !== '' && uuid !== undefined) ?
                        (userUUID === uuid || isControlAble(userRole, data.role)) : true)
                    originalFieldsValues.current = cloneDeep(data);
                }).finally(() => setLoading(false))
            }

            fetchData()
        }
    }, [uuid])


    useEffect(() => {
        if(userFunctionality === Functionality.Odds) {
            setFieldValues(prevState => {
                return {
                    ...prevState,
                    channelId: channelId
                }
            })
        }
    }, [userFunctionality]);

    return {
        loading,
        title,
        subTitle,
        submitButtonText,
        fieldValues,
        isEditable,
        isPublishEnabled,
        handleFieldChange,
        handleSubmit,
        intl,
        funType
    }
}

export default useMemberFormViewModel