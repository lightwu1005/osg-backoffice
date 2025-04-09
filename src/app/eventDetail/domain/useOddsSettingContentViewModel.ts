import {
    toOddsMarginCalculateProps,
    toOddsMarginProps,
    toUpdateOddsMarginProps
} from "@/app/eventDetail/models/RequestDataMapping";
import {OddsMarginCalculateModel} from "@/services/@core/module/ResponseDataModels";
import {UpdateOddsMarginParameter} from "@/app/eventDetail/models/UpdateOddsMarginParameter";
import useOddsRepository from "@/services/@odds/respository/useOddsRepository";
import {GlobalController} from "@/modules/common/GlobalController";
import * as React from "react";
import {useCallback, useEffect, useRef, useState} from "react";
import {debounce} from "lodash";
import {Dayjs} from "dayjs";

interface SubmitFormField {
    defaultMargin: string;
    manualMarginOverride: string
    maximumPayout: string;
    adjustedMinimumOdds: string;
    adjustedMaximumOdds: string;
    adjustedAlignDifference: string;
    effectiveTime?: number;
}

const useOddsSettingContentViewModel = (eventId: string, marketId: string, provider: string) => {
    const oddsRepo = useOddsRepository();

    const getOddsMargin = async (eventId: string, marketId?: string, baseLineId?: string) => {
        const response = await oddsRepo.getOddsMargin(toOddsMarginProps(eventId, marketId, baseLineId))
        return response
    }

    const updateOddsMargin = async (parameter: UpdateOddsMarginParameter) => {
        const response = await oddsRepo.updateOddsMargin(toUpdateOddsMarginProps(parameter))
        return response
    }


    const oddsMarginCalculate = async (maxPayout: number, margin?: number, minOdds?: number, maxOdds?: number) => {
        const response = await oddsRepo.oddsMarginCalculate(toOddsMarginCalculateProps(maxPayout, margin, minOdds, maxOdds))
        return response
    }

    const globalController = GlobalController.getInstance()
    const [isLoading, setIsLoading] = useState(false);
    const [textFieldValues, setTextFieldValues] = useState<SubmitFormField>({
        defaultMargin: '',
        manualMarginOverride: '',
        maximumPayout: '',
        adjustedMinimumOdds: '',
        adjustedMaximumOdds: '',
        adjustedAlignDifference: ''
    });

    // Use useRef to store the last field value
    const prevValues = useRef({
        manualMarginOverride: '',
        maximumPayout: '',
        adjustedMinimumOdds: '',
        adjustedMaximumOdds: '',
    });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setTextFieldValues(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleEffectiveTimeChange = useCallback((selectedDates: Dayjs | null) => {
        setTextFieldValues(prev => ({
            ...prev,
            ['effectiveTime']: selectedDates?.unix(),
        }));
    }, []);

    const isSubmitEnabled = textFieldValues === null
        ? false : Object.values(textFieldValues).every((value: string) => {
            return value !== '';
        });

    const submit = async () => {
        // TODO: Temporary props, need to be adjusted after the demand is determined.
        const prop: UpdateOddsMarginParameter = {
            eventId: eventId,
            marketId: marketId,
            provider: provider,
            overrideMargin: Number(textFieldValues.manualMarginOverride),
            maxPayout: Number(textFieldValues.maximumPayout),
            minOdds: Number(textFieldValues.adjustedMinimumOdds),
            maxOdds: Number(textFieldValues.adjustedMaximumOdds),
            alertDifference: Number(textFieldValues.adjustedAlignDifference),
            alignMaxDifference: Number(textFieldValues.adjustedAlignDifference),
            effectiveTime: textFieldValues.effectiveTime,
        };
        setIsLoading(true);
        try {
            const response = await updateOddsMargin(prop);
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: response.isSuccess ? 'success' : 'error',
                show: true,
                message: response.isSuccess ? 'publish success' : 'publish failed.'
            });
        } finally {
            setIsLoading(false);
        }
    }

    // Using debounce for event delay.
    const debouncedOddsMarginCalculate = useCallback(debounce(async (
        {
            maxPayout,
            margin,
            minOdds,
            maxOdds,
            setIsLoading,
            callback
        }: {
            maxPayout: number;
            setIsLoading: (isLoading: boolean) => void;
            callback: (response: OddsMarginCalculateModel) => void;
            margin?: number;
            minOdds?: number;
            maxOdds?: number;
        }) => {
        setIsLoading(true);
        try {
            const response: OddsMarginCalculateModel = await oddsMarginCalculate(
                maxPayout, margin, minOdds, maxOdds);

            callback(response);
        } finally {
            setIsLoading(false);
        }
    }, 500), []);

    useEffect(() => {
        if (textFieldValues.maximumPayout === prevValues.current.maximumPayout
            && textFieldValues.manualMarginOverride === prevValues.current.manualMarginOverride
            && textFieldValues.adjustedMinimumOdds === prevValues.current.adjustedMinimumOdds
            && textFieldValues.adjustedMaximumOdds === prevValues.current.adjustedMaximumOdds
        ) {
            return;
        }

        const maxPayout = Number(textFieldValues.maximumPayout);
        const margin = Number(textFieldValues.manualMarginOverride);
        const minOdds = Number(textFieldValues.adjustedMinimumOdds);
        const maxOdds = Number(textFieldValues.adjustedMaximumOdds);

        const isValidRule1 = !isNaN(maxPayout) && !isNaN(margin);
        const isValidRule2 = !isNaN(maxPayout) && !isNaN(minOdds) && !isNaN(maxOdds);

        if (isValidRule1 || isValidRule2) {
            debouncedOddsMarginCalculate({
                maxPayout,
                margin,
                minOdds,
                maxOdds,
                setIsLoading,
                callback: (response: OddsMarginCalculateModel) => {
                    setTextFieldValues(prevValues => ({
                        ...prevValues,
                        manualMarginOverride: response.margin.toString(),
                        adjustedMinimumOdds: response.minOdds.toString(),
                        adjustedMaximumOdds: response.maxOdds.toString(),
                    }));
                    prevValues.current = {
                        maximumPayout: maxPayout.toString(),
                        manualMarginOverride: response.margin.toString(),
                        adjustedMinimumOdds: response.minOdds.toString(),
                        adjustedMaximumOdds: response.maxOdds.toString(),
                    };
                },
            });
        } else {
            globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                severity: 'warning',
                show: true,
                message: 'Invalid input: Input does not meet validation criteria.'
            });
        }
    }, [textFieldValues.maximumPayout, textFieldValues.manualMarginOverride, textFieldValues.adjustedMinimumOdds,
        textFieldValues.adjustedMaximumOdds]);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getOddsMargin(eventId, marketId);
                if (isMounted) {
                    setTextFieldValues(prevValues => ({
                        ...prevValues,
                        defaultMargin: response.defaultMargin.toString(),
                        manualMarginOverride: response.overrideMargin.toString(),
                        maximumPayout: response.maxPayout.toString(),
                        adjustedMinimumOdds: response.minOdds.toString(),
                        adjustedMaximumOdds: response.maxOdds.toString(),
                        adjustedAlignDifference: response.alertDifference.toString(),
                    }));
                    prevValues.current = {
                        manualMarginOverride: response.overrideMargin.toString(),
                        maximumPayout: response.maxPayout.toString(),
                        adjustedMinimumOdds: response.minOdds.toString(),
                        adjustedMaximumOdds: response.maxOdds.toString()
                    };

                    setIsLoading(false);
                }
            } catch (error) {
                globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                    severity: 'error',
                    show: true,
                    message: `Error fetching odds margin: ${error}`
                });
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        isLoading,
        isSubmitEnabled,
        textFieldValues,
        submit,
        handleEffectiveTimeChange,
        handleChange
    }
}

export default useOddsSettingContentViewModel