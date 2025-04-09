import React from "react";
import {Box, Stack} from "@mui/material";
import useMatchStatsViewModel from "@/app/eventDetail/domain/useMatchStatsViewModel";
import MatchStatsCard from "@/app/eventDetail/components/playLog/MatchStatsCard";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export interface MatchStatsPageProps {
    eventId: string
}

const MatchStatsPage = ({eventId}: MatchStatsPageProps) => {
    const {matches} = useMatchStatsViewModel({eventId})
    const intl = useIntl()
    const funCommonType = LocalizationFunctionType.Common

    return (
        <Box data-testid='match-stats-page' width="100%">
            <Stack spacing={5} direction={"column"} alignContent={"center"}>
                {
                    matches && matches.length > 0 ? matches.map((match, index) => (
                        <MatchStatsCard
                            key={`MatchStats-${index}`}
                            title={match.name}
                            leftValue={Number(match.home)}
                            rightValue={Number(match.away)}
                        />
                    )) : intl.formatMessage({id: `${funCommonType}.noData`, defaultMessage: 'No Data'})
                }
            </Stack>
        </Box>
    )
}

const MemorizedMatchStatsPage = React.memo(MatchStatsPage)
MemorizedMatchStatsPage.displayName = "MatchStatsPage"
export default MemorizedMatchStatsPage