import React, {useCallback, useRef} from "react";
import {Box, Stack} from "@mui/material";
import ChartWrapper from "@/app/dashboard/components/ChartWrapper";
import {formatDateRange} from "@/modules/common/DisplayFormatConverter";
import {DateOption} from "@/app/member/[id]/models/DateOption";
import {DateRange} from "@mui/x-date-pickers-pro";
import {Dayjs} from "dayjs";
import {DateRangeDialog} from "@/modules/components/dialog/DateRangeDialog";
import TestProps from "@/modules/interface/TestProps";
import lodash from "lodash";

interface CustomDatePerformanceProps {
    readonly title: string
    readonly children?: React.ReactNode;
    readonly dateRangeList: DateOption[]
    readonly customDateRange: DateOption
    readonly handleDateChange?: (dateOption: DateOption) => void
}

function CustomDatePerformanceFrame({title, children, dateRangeList, customDateRange, handleDateChange, testId}: CustomDatePerformanceProps & TestProps) {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const handleDateChanged = useCallback((options: string[]) => {
        if (options[0] === customDateRange.name) {
            setShowDatePicker(true)
        } else if (handleDateChange) {
            handleDateChange(dateRangeList.find(option => option.name === options[0]) as DateOption);
        }
    }, [dateRangeList])

    const onDateChange = (dateRange: DateRange<Dayjs>) => {
        if (handleDateChange) {
            handleDateChange({
                name: formatDateRange(dateRange),
                range: dateRange
            })
        }
    }

    return (
        <Box sx={{width: '50%', height: 'auto'}} ref={anchorRef}>
            <ChartWrapper
                testId={testId}
                title={title}
                isSingle={true}
                flexDirection={'row'}
                options={[...dateRangeList.map(option => option.name), ...[customDateRange.name]]}
                onOptionsSelected={handleDateChanged} >
                <Stack alignItems={"center"} width={'100%'}>
                    {children}
                </Stack>
            </ChartWrapper>
            <DateRangeDialog date={customDateRange.range} anchorEl={anchorRef} open={showDatePicker} setOpen={setShowDatePicker} onDateChange={onDateChange}/>
        </Box>
    );
}

export default React.memo(CustomDatePerformanceFrame, (prevProps, nextProps) => {
    return lodash.isEqual(
        lodash.omit(prevProps, ['handleDateChange']),
        lodash.omit(nextProps, ['handleDateChange']),
    )
})