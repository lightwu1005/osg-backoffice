import {EventDetailDataModel} from "@/services/@core/module/ResponseDataModels";
import React, {useCallback} from "react";
import {Box, Button, Grid, Stack, Tooltip, Typography} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import LoadingAnimation from "@/modules/components/general/LoadingAnimation";
import OddsRiskCard from "@/app/eventDetail/components/OddsRiskCard";
import useMarketViewModel from "@/app/eventDetail/domain/useMarketViewModel";
import {StatusItem} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import {PauseRounded, PlayCircleRounded, StopCircleRounded} from "@mui/icons-material";
import AlertDialog from "@/modules/components/dialog/AlertDialog";
import {MuiEvent} from "@mui/x-data-grid-pro";
import {PageType} from "@/services/@core/module/Enum";
import MarketLineContainer from "@/app/eventList/components/pageComponent/MarketLineContainer";
import lodash from "lodash";

export interface OddsContentProps {
    pageType: PageType,
    eventType: string,
    eventId: string,
    selectedMarket: StatusItem,
    marketStatusItems: StatusItem[],
    providers: string[],
    detailData?: EventDetailDataModel,
    onClickMarketSetting: (id: string) => void
    isBets: boolean
    onClickAcceptData: (event: MuiEvent) => void
    homeParticipantEnName: string
    awayParticipantEnName: string
    marketType: string
}

export function OddsContent(props: OddsContentProps) {
    const {onClickMarketSetting, isBets, onClickAcceptData, pageType, eventId} = props
    const {
        isLoading,
        displayOddsData,
        statuses,
        handleBetPriceChange,
        handleActiveChange,
        handleSetPreferenceOnClick,
        configuration,
        oddsDisplay,
        showSetPreferenceDialog,
        setShowSetPreferenceDialog,
        setPreferenceAlertDialogProps,
        intl,
        funType,
        selectedMarket
    } = useMarketViewModel(props);

    const handlePriceChange = useCallback((provider: string, betId: string, price: number, originalPrice: number) => {
        handleBetPriceChange(betId, price, originalPrice);
    }, [handleBetPriceChange]);

    const onOddPriceChanged = useCallback((betId: string, price: number, originalPrice: number) =>
        handlePriceChange("GENIUS", betId, price, originalPrice), [handlePriceChange]);

    const onMarketStatusChange = useCallback((eventId: string, marketId: string, providers: string[], status: string) => {
        handleActiveChange(status, marketId)
    }, [handleActiveChange]);

    return (
        <Box>
            {pageType === PageType.EventDetail ? (
                <Box>
                    {displayOddsData.map((item, index) => {
                        const key = item.marketId ?? item.marketName;
                        const status = statuses[item.marketId]
                        const activeChange = (status: string) => {
                            handleActiveChange(status, item.marketId);
                        };
                        return (
                            <Stack spacing={2} key={key}>
                                <Grid container spacing={1} alignItems={"center"} justifyContent="space-between">
                                    <Grid item>
                                        <Typography
                                            data-testid={"marketName"}
                                            sx={{
                                                color: "#171A1C",
                                                "[data-mui-color-scheme='dark'] &": {
                                                    color: "#9FA6AD",
                                                },
                                                fontSize: 20,
                                                fontFamily: "Inter",
                                                fontWeight: "600",
                                            }}
                                        >
                                            {selectedMarket.text}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Stack direction={"row"} spacing={1}>
                                            {status !== "SUSPENDED" ? (
                                                <Tooltip
                                                    title={intl.formatMessage({
                                                        id: `${funType}.suspendedMarket`,
                                                        defaultMessage: "Suspended Market",
                                                    })}
                                                    arrow
                                                    placement="top-end"
                                                >
                                                    <PauseRounded
                                                        sx={{
                                                            color: "#636B74",
                                                            opacity: status === "ACTIVE" ? 1 : 0.38,
                                                        }}
                                                        onClick={() => {
                                                            if (status === "ACTIVE") activeChange("SUSPENDED");
                                                        }}
                                                    />
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title={"Active Market"} arrow placement="top-start">
                                                    <PlayCircleRounded
                                                        sx={{color: "#51BC51"}}
                                                        onClick={() => activeChange("ACTIVE")}
                                                    />
                                                </Tooltip>
                                            )}
                                            {status !== "CLOSE" ? (
                                                <Tooltip
                                                    title={intl.formatMessage({
                                                        id: `${funType}.closeMarket`,
                                                        defaultMessage: "Close Market",
                                                    })}
                                                    arrow
                                                    placement="top-start"
                                                >
                                                    <StopCircleRounded
                                                        sx={{color: "#FF4724"}}
                                                        onClick={() => activeChange("CLOSE")}
                                                    />
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title={"Active Market"} arrow placement="top-start">
                                                    <PlayCircleRounded
                                                        sx={{color: "#51BC51"}}
                                                        onClick={() => activeChange("ACTIVE")}
                                                    />
                                                </Tooltip>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs/>
                                    {!isBets && (
                                        <Grid item>
                                            <Button
                                                variant="text"
                                                startIcon={<CreateIcon/>}
                                                sx={{
                                                    textTransform: "none",
                                                    color: status !== "CLOSE" ? "#32383E" : "#9FA6AD",
                                                    "[data-mui-color-scheme='dark'] &": {
                                                        color: "#9FA6AD",
                                                    },
                                                }}
                                                onClick={() => onClickMarketSetting(item.marketId)}
                                            >
                                                {intl.formatMessage({
                                                    id: `${funType}.marketSetting`,
                                                    defaultMessage: "Market Setting",
                                                })}
                                            </Button>
                                        </Grid>
                                    )}
                                </Grid>
                                <Box data-testid="oddsCard">
                                    {item.listModel.map((odds) => {
                                        const key = `${item.marketId}_${odds.provider}}`;
                                        return (
                                            <Box
                                                key={key}
                                                sx={{
                                                    position: "relative",
                                                    width: "100%",
                                                    height: "fit-content",
                                                }}
                                                marginBottom={4}
                                            >
                                                <OddsRiskCard
                                                    configuration={configuration}
                                                    handlePreference={handleSetPreferenceOnClick}
                                                    handlePriceChange={handlePriceChange}
                                                    provider={odds.provider}
                                                    displayType={oddsDisplay}
                                                    isPreferred={odds.isPreferred}
                                                    odds={odds.odds}
                                                    marketName={item.marketName}
                                                    isBets={isBets}
                                                    marketStatus={status}
                                                    onClickAcceptData={onClickAcceptData}
                                                    homeParticipantEnName={props.homeParticipantEnName}
                                                    awayParticipantEnName={props.awayParticipantEnName}
                                                    marketType={props.marketType}
                                                />
                                            </Box>
                                        );
                                    })}
                                </Box>
                                <LoadingAnimation isLoading={isLoading}/>
                            </Stack>
                        );
                    })}
                    <AlertDialog
                        open={showSetPreferenceDialog}
                        setOpen={setShowSetPreferenceDialog}
                        {...setPreferenceAlertDialogProps}
                    />
                </Box>
            ) : (
                displayOddsData.map((item, index) => (
                    <MarketLineContainer
                        key={`${eventId}-${item.marketId}`}
                        eventId={eventId}
                        marketName={selectedMarket.text}
                        marketId={item.marketId}
                        marketStatus={statuses[item.marketId]}
                        provider={"GENIUS"}
                        odds={item.listModel[0]?.odds ?? []}
                        onMarketStatusChange={onMarketStatusChange}
                        onOddPriceChanged={onOddPriceChanged}
                        homeParticipantEnName={props.homeParticipantEnName}
                        awayParticipantEnName={props.awayParticipantEnName}
                        marketType={props.marketType}
                        displayType={oddsDisplay}
                        configuration={configuration}
                    />
                ))
            )}
        </Box>
    );
}

export default React.memo(OddsContent, (prevProps, nextProps) => (
    lodash.isEqual(
        lodash.omit(prevProps, ['onClickMarketSetting', 'onClickAcceptData']),
        lodash.omit(nextProps, ['onClickMarketSetting', 'onClickAcceptData'])
    ))
)