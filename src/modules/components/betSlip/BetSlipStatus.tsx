import {Stack, Tooltip} from "@mui/material";
import {MatchBetStatusChip} from "@/modules/components/chip/MatchStatusChip";
import {BetStatus} from "@/services/@core/module/Enum";
import {InfoOutlined} from "@mui/icons-material";
import * as React from "react";
import {StatusPartModel} from "@/services/@core/module/ResponseDataModels";

export default function BetSlipStatus({statusPart}: {readonly statusPart: StatusPartModel}) {
    return <Stack direction="row" spacing={0.5} alignContent="start" alignItems="center">
        <MatchBetStatusChip status={statusPart.status as BetStatus}/>
        {
            statusPart.description &&
            <Tooltip title={statusPart.description} arrow placement="top-start">
                <InfoOutlined sx={{color: 'text.disabled'}} fontSize={'small'}/>
            </Tooltip>
        }
    </Stack>
}