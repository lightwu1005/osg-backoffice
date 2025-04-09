import React from "react";
import LineupTable from "@/app/eventDetail/components/playLog/LineupTable";
import useLineUpsViewModel from "@/app/eventDetail/domain/useLineUpsViewModel";
import {Box, Grid} from "@mui/material";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export interface LineupsPageProps {
    eventId: string
}

const LineupsPage = ({eventId}: LineupsPageProps) => {
    const {lineupTables} = useLineUpsViewModel({eventId})
    const intl = useIntl()
    const funCommonType = LocalizationFunctionType.Common

    return (
        <Box data-testid='line-ups-page' width='100%'>
            {
                lineupTables ?
                    <Grid container spacing={6}>
                        {
                            lineupTables.map((table, index) => (
                                <Grid item xs={12} sm={12} md={6} key={`lineups-${index}`}>
                                    <LineupTable
                                        key={`LineupTable-${index}`}
                                        type={table.type}
                                        players={table.players}
                                        substitutes={table.substitutes}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                    :
                    <Grid container spacing={5} direction={"column"}>
                        <Grid item xs={12} key={'lineups-no-data'}>
                            {
                                intl.formatMessage({id: `${funCommonType}.noData`, defaultMessage: 'No Data'})
                            }
                        </Grid>
                    </Grid>
            }
        </Box>
    )
}

const MemorizedLineupsPage = React.memo(LineupsPage)
MemorizedLineupsPage.displayName = "LineupsPage"
export default MemorizedLineupsPage