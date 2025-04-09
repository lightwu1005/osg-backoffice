"use client";
import React, {useCallback, useState} from "react";
import {SingleInputDateRangePicker} from "@/modules/components/TextField";
import {Box, Stack} from "@mui/material";
import {Dayjs} from "dayjs";
import {GetChannelsParameters} from "@/app/channel/models/ChannelParameters";
import {StatusButtonGroup} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import {DateRange} from "@mui/x-date-pickers-pro";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {getThisMonthRange, getTodayRange, getYesterdayRange} from "@/utils/tools";

interface PerformanceDateSelectionProps {
    onDateRangeSelected?: (startDate: number, endDate: number) => void;
}

export default function PerformanceDateSelection(props: PerformanceDateSelectionProps) {
    const intl = useIntl();
    const funCommonType = LocalizationFunctionType.Common;
    const eventTypeList = [
        {key: '1', text: intl.formatMessage({id: `${funCommonType}.today`, defaultMessage: 'Today'}), type: 'today'},
        {key: '2', text: intl.formatMessage({id: `${funCommonType}.yesterday`, defaultMessage: 'Yesterday'}), type: 'yesterday'},
        {key: '3', text: intl.formatMessage({id: `${funCommonType}.thisMonth`, defaultMessage: 'This Month'}), type: 'thisMonth'}
    ];
    const [selectedButton, setSelectedButton] = useState<number>(0); // 初始状态为 0，默认选择第一个按钮
    const [isClear, setIsClear] = useState<boolean>(false);
    const [, setQueryParams] = useState<GetChannelsParameters>({
        page: 1,
        pageSize: 10,
        locationNames: undefined,
        statuses: undefined,
        startDate: undefined,
        endDate: undefined
    });

    const handleQueryChange = useCallback((params: Record<string, any>) => {
        const isPageChange = Boolean(params['page'])
        setQueryParams(currentParams => ({
            ...currentParams,
            ...params,
            ...(isPageChange ? undefined : {page: 1})
        }));
    }, []);

    const applyDateRange = (dateRange: DateRange<Dayjs> | null) => {
        const startDate = dateRange?.[0]?.unix();
        const endDate = dateRange?.[1]?.unix();
        handleQueryChange({
            startDate,
            endDate
        });
        if (startDate && endDate && props.onDateRangeSelected) {
            props.onDateRangeSelected(startDate, endDate);
        }
    };

    const handleEventTypeClick = (index: number, key: string) => {
        setSelectedButton(index);
        setIsClear(true)

        let dateRange: DateRange<Dayjs> | null = null;
        switch (key) {
            case '1':
                dateRange = getTodayRange();
                break;
            case '2':
                dateRange = getYesterdayRange();
                break;
            case '3':
                dateRange = getThisMonthRange();
                break;
            default:
                break;
        }

        applyDateRange(dateRange);
    };

    const handleDateRangeChange = (dateRange: DateRange<Dayjs> | null) => {
        setIsClear(false)
        if (dateRange !== null) setSelectedButton(-1)
        applyDateRange(dateRange);
    };

    return (
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Box>
                <StatusButtonGroup
                    items={eventTypeList}
                    selectedIndex={selectedButton}
                    ableToDeselect={true}
                    onClick={handleEventTypeClick}
                    borderRadius={'0.5rem'}
                    isShowGroupBackgroundColor={false}
                />
            </Box>
            <Box width='16.5625rem'>
                <SingleInputDateRangePicker
                    label={intl.formatMessage({id: `${funCommonType}.registrationTime`, defaultMessage: 'Registration Time'})}
                    shouldClear={isClear}
                    onChange={handleDateRangeChange}
                />
            </Box>
        </Stack>
    );
}
