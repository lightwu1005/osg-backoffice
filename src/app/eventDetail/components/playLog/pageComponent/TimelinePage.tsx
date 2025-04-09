import React from "react";
import {Stack} from "@mui/material";
import useTimelineViewModel from "@/app/eventDetail/domain/useTimelineViewModel";
import TimelineEvent from "@/app/eventDetail/components/playLog/TimelineEvent";
import {AutoMultiMenuTextField} from "@/modules/components/TextField";
import {convertPeriodOrTypeDisplay} from "@/services/@event/useCase";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export interface TimelinePageProps {
    eventId: string
    sportType: string
    defaultStates?: string[]
}

const TimelinePage = ({eventId, sportType, defaultStates}: TimelinePageProps) => {
    const {
        events,
        allStates,
        allTeams,
        handleStates,
        handleTeams,
        selectedStates,
        selectedTeams
    } = useTimelineViewModel(eventId, sportType, defaultStates)
    const intl = useIntl()
    const funType = LocalizationFunctionType.Event
    const funCommonType = LocalizationFunctionType.Common

    const displayStates = intl.formatMessage({
        id: `${funType}.displayStates`,
        defaultMessage: 'States',
    } ,{count: selectedStates?.length ?? 0})

    const displayTeams = intl.formatMessage({
        id: `${funType}.displayTeams`,
        defaultMessage: 'Teams',
    } ,{count: selectedTeams?.length ?? 0})

    return (
        <Stack data-testid='timeline-page' width="100%" spacing={8}>
            <Stack spacing={1} direction={"row"}>
                <AutoMultiMenuTextField
                    id={'select-the-states'}
                    label={displayStates}
                    placeholder={displayStates}
                    options={allStates.map(option => convertPeriodOrTypeDisplay(option))}
                    onChange={handleStates}
                    initialSelectedOptions={defaultStates}
                />
                <AutoMultiMenuTextField
                    id={'select-the-teams'}
                    label={displayTeams}
                    placeholder={displayTeams}
                    options={allTeams.map(option => convertPeriodOrTypeDisplay(option))}
                    onChange={handleTeams}
                />
            </Stack>
            <Stack spacing={1}>
                {
                    events && events.length > 0 ? events.map((event, index) => {
                        const i = events.length - index
                        return <TimelineEvent
                            key={`${event.clockTime}-${i}`}
                            index={i}
                            {...event}
                        />
                    }) : intl.formatMessage({id: `${funCommonType}.noData`, defaultMessage: 'No Data'})
                }
            </Stack>
        </Stack>
    )
}

export default TimelinePage