import ToggleProps from "@/modules/interface/ToggleProps";
import {FullScreenDialog} from "@/modules/components/dialog/FullScreenDialog";
import React, {useCallback, useState} from "react";
import {MarketSettingPage, MarketSettingProps} from "@/app/eventDetail/components/pageComponent/MarketSetting";
import {MemoizedTemplateSummaryForm, TemplateSummaryFormProps} from "@/app/eventDetail/components/pageComponent/TemplateSummaryForm";
import {Box} from "@mui/material";

interface MarketSettingDialogProps extends ToggleProps{
    marketSettingProps: MarketSettingProps
}

export default function MarketSettingDialog(props: MarketSettingDialogProps) {
    const {open, setOpen, marketSettingProps} = props
    const [isPreview, setIsPreview] = useState(false)
    const data = {
        eventId: marketSettingProps.eventId ?? '',
        eventType: marketSettingProps.eventType ?? '',
        marketId: marketSettingProps.marketId ?? '',
        sportId: marketSettingProps.sportId ?? '',
        sportType: marketSettingProps.sportType ?? '',
        sportName: marketSettingProps.sportName ?? '',
        leagueId: marketSettingProps.leagueId ?? '',
        leagueName: marketSettingProps.leagueName ?? ''
    }
    const [templateSummaryData, setTemplateSummaryData] = useState<TemplateSummaryFormProps | undefined>();

    const handleNext = useCallback((data: TemplateSummaryFormProps) => {
        setTemplateSummaryData(data);
        setIsPreview(true);
    }, []);

    const handleFinished = useCallback(() => {
        setOpen(false);
        setIsPreview(false);
    }, [setOpen]);

    const handleGotoSettingPage = useCallback(() => {
        setIsPreview(false);
    }, []);

    return (<Box>
            <FullScreenDialog
                open={open}
                setOpen={setOpen}
                content={<MarketSettingPage {...data} onNext={handleNext}/>}
            />
            <FullScreenDialog
                open={isPreview} setOpen={setIsPreview}
                content={
                    templateSummaryData &&
                        <MemoizedTemplateSummaryForm
                            {...templateSummaryData}
                            onFinished={handleFinished}
                            gotoSettingPage={handleGotoSettingPage}
                        />
                }
            />
        </Box>
    )
}