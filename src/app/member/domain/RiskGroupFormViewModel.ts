import {RiskGroupFormProps} from "@/app/member/components/pageComponent/RiskGroupFormDialog";
import useRiskGroupRepository from "@/services/@riskGroups/repository/useRiskGroupsRepository";
import {useCallback, useEffect, useRef, useState} from "react";
import {RiskGroupDetailModel} from "@/services/@core/module/CommonDataModels";
import {
    toAddRiskGroupDetail,
    toGetRiskGroupDetailProps,
    toUpdateRiskGroupDetail
} from "@/app/member/models/RequestDataMapping";
import {getEnumKeyByValue, useDynamicValueUpdater} from "@/modules/common/DataProcessUnit";
import {cloneDeep, isEqual} from "lodash";
import {RiskLevelGroupWordingType, useRiskLevelGroupTranslate} from "@/app/member/models/useRiskGroupTranslate";
import {TagModel} from "@/services/@core/module/ResponseDataModels";
import {OptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {GlobalController} from "@/modules/common/GlobalController";
import {delay} from "@/utils/tools";
import {LocalizedRiskGroupDetail} from "@/app/member/models/MemberParameters";

export enum WinLossRateType {
    NO_DATA_FOR_NEWBIE = 'No data - for newbie',
    PERCENT_0_TO_10 = '0~10%',
    PERCENT_11_TO_20 = '11~20%',
    PERCENT_21_TO_30 = '21~30%',
    PERCENT_31_TO_40 = '31~40%',
    PERCENT_41_TO_50 = '41~50%',
    PERCENT_51_TO_60 = '51~60%',
    ABOVE_61 = 'Above 61%',
    BLOCK = 'Block'
}

export enum BetLimitationType {
    DAILY = 'DAILY',
    SINGLE = 'SINGLE',
}

export const RiskGroupFormViewModel = (props: Readonly<RiskGroupFormProps>) => {
    const {riskId, setOpen} = props;
    const riskRepo = useRiskGroupRepository();

    const getRiskGroupDetail = useCallback(async (riskId: string) => {
        return await riskRepo.getRiskGroupDetail(toGetRiskGroupDetailProps(riskId))
    }, [riskRepo])

    const addRiskGroupDetail = useCallback(async (riskGroupDetail: RiskGroupDetailModel) => {
        return await riskRepo.addRiskGroup(toAddRiskGroupDetail(riskGroupDetail))
    }, [riskRepo])

    const updateRiskGroupDetail = useCallback(async (riskGroupDetail: RiskGroupDetailModel) => {
        if (!riskId) return;
        return await riskRepo.updateRiskGroupDetail(toUpdateRiskGroupDetail(riskId, riskGroupDetail))
    }, [riskRepo, riskId])

    const {getTranslatedWord} = useRiskLevelGroupTranslate()
    const clonedRiskGroupDetail = useRef<LocalizedRiskGroupDetail>()
    const [riskGroupDetail, setRiskGroupDetail] = useState<LocalizedRiskGroupDetail>()
    const updateValueChanged = useDynamicValueUpdater<LocalizedRiskGroupDetail>(setRiskGroupDetail)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
    const globalController = GlobalController.getInstance()
    const [isBetMinimumValid, setIsBetMinimumValid] = useState<boolean>(true)
    const [isBetMaximumValid, setIsBetMaximumValid] = useState<boolean>(true)

    useEffect(() => {
        if (riskId) {
            getRiskGroupDetail(riskId).then((data) => {
                let {dailyBetLimitation, singleBetLimitation, ...others} = data;
                if (dailyBetLimitation) {
                    singleBetLimitation = {
                        oddsAdjustment: 0,
                        amountAdjustment: 0,
                        delayAcceptance: 0
                    }
                } else if (singleBetLimitation) {
                    dailyBetLimitation = {
                        oddsDecrease: 0,
                        dailyLimit: 0,
                        delayAcceptance: 0
                    }
                }

                const cloneData: LocalizedRiskGroupDetail = {
                    riskName: others.riskName,
                    riskColor: others.riskColor,
                    betAmountSettings: others.betAmountSettings,
                    winLossRateSettings: others.winLossRateSettings,
                    tags: others.tags,
                    limitationType: others.limitationType,
                    dailyBetLimitation: {
                        oddsDecrease: dailyBetLimitation?.oddsDecrease || 0,
                        dailyLimit: dailyBetLimitation?.dailyLimit || 0,
                        delayAcceptance: dailyBetLimitation?.delayAcceptance || 0
                    },
                    singleBetLimitation: {
                        oddsAdjustment: singleBetLimitation?.oddsAdjustment || 0,
                        amountAdjustment: singleBetLimitation?.amountAdjustment || 0,
                        delayAcceptance: singleBetLimitation?.delayAcceptance || 0
                    }
                }

                setRiskGroupDetail(cloneData)
                clonedRiskGroupDetail.current = cloneDeep(cloneData)
            })
        } else {
            const initialData: LocalizedRiskGroupDetail = {
                riskName: undefined,
                riskColor: undefined,
                betAmountSettings: {
                    minimum: undefined,
                    maximum: undefined
                },
                winLossRateSettings: {
                    successBet: undefined,
                    winRate: Object.values(WinLossRateType)[0],
                    dayInterval: undefined
                },
                tags: undefined,
                limitationType: BetLimitationType.DAILY,
                dailyBetLimitation: {
                    oddsDecrease: undefined,
                    dailyLimit: undefined,
                    delayAcceptance: undefined
                },
                singleBetLimitation: {
                    oddsAdjustment: undefined,
                    amountAdjustment: undefined,
                    delayAcceptance: undefined
                }
            }

            setRiskGroupDetail(initialData)
            clonedRiskGroupDetail.current = cloneDeep(initialData)
        }
    }, []);

    const getRiskTitle = useCallback(() => {
        if (riskId) {
            return getTranslatedWord(RiskLevelGroupWordingType.EditRiskGroup)
        } else {
            return getTranslatedWord(RiskLevelGroupWordingType.CreateRiskGroup)
        }
    }, [riskId, getTranslatedWord])

    const handleValueChanged = (path: string) => (value: any) => {
        if (path === 'tags') {
            handleTagsChange(value);
        } else if (path === 'limitationType') {
            handleLimitationTypeChange(value);
        } else if (path === 'winLossRateSettings.winRate') {
            const winLossRateKey = getEnumKeyByValue(WinLossRateType, value)
            updateValueChanged(path)(winLossRateKey);
        } else {
            updateValueChanged(path)(value);
        }

        checkBetAmountSettingsValid(path)
    };

    const handleTagsChange = (value: any) => {
        const tags: TagModel[] = (value as OptionItem[]).map((item) => ({
            tagId: item.id,
            tagName: item.name,
        }));
        updateValueChanged('tags')(tags);
    };

    const handleLimitationTypeChange = (value: any) => {
        const targetValue = getEnumKeyByValue(BetLimitationType, value.target.value);
        updateValueChanged('limitationType')(targetValue);

        setRiskGroupDetail((prev) => {
            if (!prev) return prev;
            const updatedDetail: LocalizedRiskGroupDetail = {
                ...prev,
                limitationType: targetValue ?? '',
            };

            return updatedDetail;
        });
    };

    const areRequiredFieldsFilled = (current: LocalizedRiskGroupDetail): boolean => {
        const {
            riskName,
            riskColor,
            betAmountSettings,
            winLossRateSettings,
            limitationType,
            tags,
            dailyBetLimitation,
            singleBetLimitation,
        } = current;

        if (!riskName || !riskColor?.trim() || !limitationType?.trim() || !tags?.length) {
            return false;
        }

        if (!betAmountSettings?.minimum?.toString()?.trim() || !betAmountSettings?.maximum?.toString()?.trim()) {
            return false;
        }

        if (!winLossRateSettings?.successBet?.toString()?.trim() || !winLossRateSettings?.winRate?.trim() || !winLossRateSettings?.dayInterval?.toString()?.trim()) {
            return false;
        }

        if (limitationType === BetLimitationType.DAILY) {
            if (!dailyBetLimitation?.oddsDecrease?.toString()?.trim() ||
                !dailyBetLimitation?.dailyLimit?.toString()?.trim() ||
                !dailyBetLimitation?.delayAcceptance?.toString()?.trim()) {
                return false;
            }
        } else if (limitationType === BetLimitationType.SINGLE) {
            if (!singleBetLimitation?.oddsAdjustment?.toString()?.trim() ||
                !singleBetLimitation?.amountAdjustment?.toString()?.trim() ||
                !singleBetLimitation?.delayAcceptance?.toString()?.trim()) {
                return false;
            }
        } else {
            return false;
        }

        return true;
    };

    const compareRequiredFields = (
        current: LocalizedRiskGroupDetail,
        original: LocalizedRiskGroupDetail
    ) => {
        const normalize = (value: any) => (value === undefined || value === '') ? null : value;

        let limitationFieldsChanged = false;

        if (current.limitationType === BetLimitationType.DAILY) {
            limitationFieldsChanged = !isEqual(current.dailyBetLimitation, original?.dailyBetLimitation);
        } else if (current.limitationType === BetLimitationType.SINGLE) {
            limitationFieldsChanged = !isEqual(current.singleBetLimitation, original?.singleBetLimitation);
        }

        return (
            normalize(current.riskName) !== normalize(original.riskName) ||
            normalize(current.riskColor) !== normalize(original.riskColor) ||
            normalize(current.limitationType) !== normalize(original.limitationType) ||
            !isEqual(current.tags, original.tags) ||
            normalize(current.betAmountSettings?.minimum) !== normalize(original.betAmountSettings?.minimum) ||
            normalize(current.betAmountSettings?.maximum) !== normalize(original.betAmountSettings?.maximum) ||
            normalize(current.winLossRateSettings?.successBet) !== normalize(original.winLossRateSettings?.successBet) ||
            normalize(current.winLossRateSettings?.winRate) !== normalize(original.winLossRateSettings?.winRate) ||
            normalize(current.winLossRateSettings?.dayInterval) !== normalize(original.winLossRateSettings?.dayInterval) ||
            limitationFieldsChanged
        );
    };

    useEffect(() => {
        if (!riskGroupDetail) {
            setIsButtonDisabled(true);
            return;
        }

        const allFieldsFilled = areRequiredFieldsFilled(riskGroupDetail);
        const minMaxAmountValid = isBetMinimumValid && isBetMaximumValid;

        if (riskId) {
            if (!clonedRiskGroupDetail.current) return;
            const hasChanged = compareRequiredFields(riskGroupDetail, clonedRiskGroupDetail.current);

            const isButtonDisabled = !(allFieldsFilled && hasChanged && minMaxAmountValid);
            setIsButtonDisabled(isButtonDisabled);
        } else {
            const isButtonDisabled = !(allFieldsFilled && minMaxAmountValid);
            setIsButtonDisabled(isButtonDisabled);
        }
    }, [riskGroupDetail, riskId]);

    function getRequestData(): RiskGroupDetailModel | undefined {
        if (!riskGroupDetail) return;

        const betAmountSettings = getBetAmountSettings();
        const winLossRateSettings = getWinLossRate();
        const limitationType = riskGroupDetail.limitationType || '';
        const tagIds = riskGroupDetail.tags?.map(tag => tag.tagId) || [];
        const dailyBetLimitation = getDailyBetLimitation(limitationType);
        const singleBetLimitation = getSingleBetLimitation(limitationType);

        return {
            riskName: riskGroupDetail.riskName || '',
            riskColor: riskGroupDetail.riskColor || '',
            betAmountSettings,
            winLossRateSettings,
            limitationType,
            tagIds,
            dailyBetLimitation,
            singleBetLimitation,
        };
    }

    function getBetAmountSettings(): { minimum: number; maximum: number } {

        return {
            minimum: riskGroupDetail?.betAmountSettings.minimum || 0,
            maximum: riskGroupDetail?.betAmountSettings.maximum || 0
        };
    }

    function getWinLossRate(): { successBet: number; winRate: string; dayInterval: number } {
        return {
            successBet: riskGroupDetail?.winLossRateSettings.successBet || 0,
            winRate: riskGroupDetail?.winLossRateSettings.winRate || '',
            dayInterval: riskGroupDetail?.winLossRateSettings.dayInterval || 0
        };
    }

    function getDailyBetLimitation(limitationType: string): { oddsDecrease: number; dailyLimit: number; delayAcceptance: number } | undefined {
        if (limitationType === BetLimitationType.DAILY) {
            return {
                oddsDecrease: riskGroupDetail?.dailyBetLimitation.oddsDecrease || 0,
                dailyLimit: riskGroupDetail?.dailyBetLimitation.dailyLimit || 0,
                delayAcceptance: riskGroupDetail?.dailyBetLimitation.delayAcceptance || 0
            };
        }
    }

    function getSingleBetLimitation(limitationType: string): { oddsAdjustment: number; amountAdjustment: number; delayAcceptance: number } | undefined {
        if (limitationType === BetLimitationType.SINGLE) {
            return {
                oddsAdjustment: riskGroupDetail?.singleBetLimitation.oddsAdjustment || 0,
                amountAdjustment: riskGroupDetail?.singleBetLimitation.amountAdjustment || 0,
                delayAcceptance: riskGroupDetail?.singleBetLimitation.delayAcceptance || 0
            };
        }
    }

    const createRiskGroupDetail = useCallback(async () => {
        const requestData = getRequestData();
        if (!requestData) return;

        addRiskGroupDetail(requestData).then((response) => {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'success',
                show: true,
                message: response?.result
            })
        })
            .catch((error) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: error?.message
                })
            })
            .finally(() => {
                delay(300).then(() => {
                    setOpen(false);
                    props.onFinished()
                })
            })
    }, [addRiskGroupDetail, globalController, riskGroupDetail, setOpen])

    const editRiskGroupDetail = useCallback(async () => {
        const requestData = getRequestData();
        if (!requestData) return;

        updateRiskGroupDetail(requestData).then((response) => {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'success',
                show: true,
                message: response?.result
            })
        })
            .catch((error) => {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: error?.message
                })
            })
            .finally(() => {
                delay(300).then(() => {
                    setOpen(false);
                    props.onFinished()
                })
            })
    }, [globalController, riskGroupDetail, updateRiskGroupDetail, setOpen])

    const handlePublish = async () => {
        if (riskId && riskGroupDetail) {
            await editRiskGroupDetail();
        } else if (!riskId && riskGroupDetail) {
            await createRiskGroupDetail();
        }
    };

    const checkBetAmountSettingsValid = (path: string) => {
        if (path === 'betAmountSettings.minimum') {
            if (!riskGroupDetail?.betAmountSettings.minimum || !riskGroupDetail.betAmountSettings.maximum) {
                setIsBetMinimumValid(true);
                return
            }

            setIsBetMinimumValid(riskGroupDetail.betAmountSettings.minimum < riskGroupDetail.betAmountSettings.maximum);
        } else if (path === 'betAmountSettings.maximum') {
            if (!riskGroupDetail?.betAmountSettings.minimum || !riskGroupDetail.betAmountSettings.maximum) {
                setIsBetMaximumValid(true);
                return
            }

            setIsBetMaximumValid(riskGroupDetail.betAmountSettings.minimum < riskGroupDetail.betAmountSettings.maximum);
        }
    }

    return {
        getRiskTitle,
        handlePublish,
        getTranslatedWord,
        setRiskGroupDetail,
        handleValueChanged,
        riskGroupDetail,
        isButtonDisabled,
        isBetMinimumValid,
        isBetMaximumValid
    }
}
