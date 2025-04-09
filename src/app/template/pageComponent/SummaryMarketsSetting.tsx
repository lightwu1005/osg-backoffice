import * as React from "react";
import {useCallback, useEffect, useRef, useState} from "react";
import MemoizedTemplateSummaryCard, {TemplateSummaryCardProps} from "@/app/eventDetail/components/TemplateSummaryCard";
import {useIntl} from "react-intl";
import lodash from "lodash";
import {GridBlock} from "@/app/eventDetail/components/pageComponent/TemplateSummaryForm";
import {Box, Grid, Typography} from "@mui/material";
import {convertBooleanToString, SummaryPropertyType} from "@/app/eventDetail/domain/useTemplateSummaryFormViewModel";
import {
    LocalMarketSetting,
    marketSettingToMarketConfigModel,
    TemplateSummaryEnableType
} from "@/app/eventDetail/models/dataModel/EventDetailOddsDataModel";
import SummaryMarketsSettingNoConflict from "@/app/template/pageComponent/SummaryMarketsSettingNoConflict";
import {MarketConfigModel} from "@/services/@core/module/ResponseDataModels";

export interface TemplateSummaryMarketSettingsProps {
    preValue?: LocalMarketSetting[];
    refValue?: LocalMarketSetting[];
    isDataFromConfiguration?: boolean;
    adjustable?: boolean;
    onSubmitValueChange?: (submitValue: LocalMarketSetting[]) => void
}

const SummaryMarketsSetting = (props: TemplateSummaryMarketSettingsProps) => {
    const {
        preValue = [],
        refValue = [],
        isDataFromConfiguration = false,
        adjustable = true,
        onSubmitValueChange
    } = props;

    const intl = useIntl();
    const funType = "template";
    const [marginMarkets, setMarginMarkets] = useState<LocalMarketSetting[]>([]);
    const [marginProps, setMarginProps] = useState<TemplateSummaryCardProps[]>([]);
    const [minimumDifferenceMarkets, setMinimumDifferenceMarkets] = useState<LocalMarketSetting[]>([]);
    const [minimumDifferenceProps, setMinimumDifferenceProps] = useState<TemplateSummaryCardProps[]>([]);
    const [lineSettingsMarkets, setLineSettingsMarkets] = useState<LocalMarketSetting[]>([]);
    const [lineSettingsProps, setLineSettingsProps] = useState<TemplateSummaryCardProps[]>([]);
    const [singleBetSettingsMarkets, setSingleBetSettingsMarkets] = useState<LocalMarketSetting[]>([]);
    const [singleBetMinimumProps, setSingleBetMinimumProps] = useState<TemplateSummaryCardProps[]>([]);
    const [singleBetMaximumProps, setSingleBetMaximumProps] = useState<TemplateSummaryCardProps[]>([]);
    const [singleBetMaxPayoutProps, setSingleBetMaxPayoutProps] = useState<TemplateSummaryCardProps[]>([]);
    const [parlayableMarkets, setParlayableMarkets] = useState<LocalMarketSetting[]>([]);
    const [parlayableProps, setParlayableProps] = useState<TemplateSummaryCardProps[]>([]);
    const [sgpableMarkets, setSgpableMarkets] = useState<LocalMarketSetting[]>([]);
    const [sgpableProps, setSgpableProps] = useState<TemplateSummaryCardProps[]>([]);
    const initialValue = useRef<LocalMarketSetting[]>([])
    const submitValue = useRef<LocalMarketSetting[]>([]);

    useEffect(() => {
        const createInitialValue = (preValue: LocalMarketSetting[]): LocalMarketSetting[] => {
            return preValue.map((market) => ({
                marketId: market.marketId,
                marketName: market.marketName,
                margin: -1,
                minimumDifference: -1,
                lineSettings: "",
                singleBetSettings: {
                    minimum: -1,
                    maximum: -1,
                    maxPayout: -1,
                },
                parlayable: "none",
                sgpable: "none",
            }));
        };

        initialValue.current = createInitialValue(preValue);
        submitValue.current = createInitialValue(lodash.cloneDeep(initialValue.current));
    }, []);

    const compareMarkets = useCallback(() => {
        const findDifferences = <K extends keyof LocalMarketSetting>(
            key: K,
            refSetter: React.Dispatch<React.SetStateAction<LocalMarketSetting[]>>
        ) => {
            const result = preValue.filter((preMarket) => {
                const refMarket = refValue.find((ref) => ref.marketId === preMarket.marketId);
                return refMarket && !lodash.isEqual(preMarket[key], refMarket[key]);
            });

            refSetter(result);
        };

        findDifferences("margin", setMarginMarkets);
        findDifferences("minimumDifference", setMinimumDifferenceMarkets);
        findDifferences("lineSettings", setLineSettingsMarkets);
        findDifferences("singleBetSettings", setSingleBetSettingsMarkets);
        findDifferences("parlayable", setParlayableMarkets);
        findDifferences("sgpable", setSgpableMarkets);
    }, [preValue, refValue]);

    useEffect(() => {
        compareMarkets();
    }, [compareMarkets]);

    useEffect(() => {
        updateMargin();
        updateMinimumDifference()
        updateLineSettings()
        updateSingleBetMinimum()
        updateSingleBetMaximum()
        updateSingleBetMaxPayout()
        updateParlayable()
        updateSgpable()
    }, [marginMarkets]);


    const handleValueSelected = useCallback((path: string, value: any, index: number, marketId: string) => {
        const newSubmitValue = lodash.cloneDeep(submitValue.current);
        if (value === -1 || value === "" || value === null || value === undefined) {
            value = lodash.get(refValue.find((ref) => ref.marketId === marketId), path);
        }

        value = path === "parlayable" || path === "sgpable" ? convertOptionToBoolean(value) : value

        lodash.set(newSubmitValue[index], path, value);
        submitValue.current = newSubmitValue;
        onSubmitValueChange && onSubmitValueChange(newSubmitValue);
    }, []);

    const updateMargin = () => {
        let items: TemplateSummaryCardProps[] = [];

        marginMarkets.forEach((market, index) => {
            const preMarket = preValue.find((pre) => pre.marketId === market.marketId);
            const refMarket = refValue.find((ref) => ref.marketId === market.marketId);
            if (!preMarket || !refMarket) {
                return;
            }

            items.push({
                items: [
                    {
                        title: market.marketName,
                        isHeader: false,
                        preValue: isDataFromConfiguration ? refMarket.margin : preMarket.margin,
                        refValue: refMarket.margin,
                        currentValue: lodash.isEqual(preMarket.margin, refMarket.margin) ? refMarket.margin : submitValue.current[index].margin,
                        isValueSet: lodash.get(submitValue.current[index], "margin") !== -1,
                        shouldShowWarningSettingBar:
                            adjustable &&
                            !lodash.isEqual(preMarket.margin, refMarket.margin),
                        onValueSelected: (value: SummaryPropertyType) =>
                            handleValueSelected(`margin`, value, index, market.marketId),
                    },
                ],
            });
        });

        setMarginProps(items);
    }

    function MarginSection() {
        return (
            <Box sx={{width: '100%'}}>
                <Typography variant="h6" sx={{mb: 2}}>
                    {intl.formatMessage({id: `${funType}.margin`, defaultMessage: "Margin"})}
                </Typography>
                <Grid container spacing={2}>
                    {marginProps.map((item, index) => (
                        <Grid item xs={6} key={item.items[0].title}>
                            <MemoizedTemplateSummaryCard key={`${index}-${item.items[0].title}`} items={item.items}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }

    function updateMinimumDifference() {
        let items: TemplateSummaryCardProps[] = []

        minimumDifferenceMarkets.forEach((market, index) => {
            const preMarket = preValue.find((pre) => pre.marketId === market.marketId);
            const refMarket = refValue.find((ref) => ref.marketId === market.marketId);
            if (!preMarket || !refMarket) {
                return;
            }

            items.push({
                items: [
                    {
                        title: market.marketName,
                        isHeader: false,
                        preValue: isDataFromConfiguration ? refMarket.minimumDifference : preMarket.minimumDifference,
                        refValue: refMarket.minimumDifference,
                        currentValue: lodash.isEqual(preMarket.minimumDifference, refMarket.minimumDifference) ? refMarket.minimumDifference : submitValue.current[index].minimumDifference,
                        isValueSet: lodash.get(submitValue.current[index], "minimumDifference") !== -1,
                        shouldShowWarningSettingBar:
                            adjustable &&
                            !lodash.isEqual(preMarket.minimumDifference, refMarket.minimumDifference),
                        onValueSelected: (value: SummaryPropertyType) =>
                            handleValueSelected(`minimumDifference`, value, index, market.marketId),
                    },
                ],
            });
        });

        setMinimumDifferenceProps(items);
    }

    function MinimumDifferenceSection() {
        return (
            <Box sx={{width: '100%'}}>
                <Typography variant="h6" sx={{mb: 2}}>
                    {intl.formatMessage({id: `${funType}.minimumDifference`, defaultMessage: "Minimum Difference"})}
                </Typography>
                <Grid container spacing={2}>
                    {minimumDifferenceProps.map((item) => (
                        <Grid item xs={6} key={item.items[0].title}>
                            <MemoizedTemplateSummaryCard items={item.items}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }

    function updateLineSettings() {
        let items: TemplateSummaryCardProps[] = []

        lineSettingsMarkets.forEach((market, index) => {
            const preMarket = preValue.find((pre) => pre.marketId === market.marketId);
            const refMarket = refValue.find((ref) => ref.marketId === market.marketId);
            if (!preMarket || !refMarket) {
                return;
            }

            items.push({
                items: [
                    {
                        title: market.marketName,
                        isHeader: false,
                        preValue: isDataFromConfiguration ? refMarket.lineSettings : preMarket.lineSettings,
                        refValue: refMarket.lineSettings,
                        currentValue: lodash.isEqual(preMarket.lineSettings, refMarket.lineSettings) ? refMarket.lineSettings : submitValue.current[index].lineSettings,
                        isValueSet: lodash.get(submitValue.current[index], "lineSettings") !== "",
                        shouldShowWarningSettingBar:
                            adjustable &&
                            !lodash.isEqual(preMarket.lineSettings, refMarket.lineSettings),
                        onValueSelected: (value: SummaryPropertyType) =>
                            handleValueSelected(`lineSettings`, value, index, market.marketId),
                    },
                ],
            });
        });

        setLineSettingsProps(items);
    }

    function LineSettingsSection() {
        return (
            <Box sx={{width: '100%'}}>
                <Typography variant="h6" sx={{mb: 2}}>
                    {intl.formatMessage({id: `${funType}.lineSetting`, defaultMessage: "Line Setting"})}
                </Typography>
                <Grid container spacing={2}>
                    {lineSettingsProps.map((item) => (
                        <Grid item xs={6} key={item.items[0].title}>
                            <MemoizedTemplateSummaryCard items={item.items}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }

    function updateSingleBetMinimum() {
        let items: TemplateSummaryCardProps[] = [];

        singleBetSettingsMarkets.forEach((market, index) => {
            const preMarket = preValue.find((pre) => pre.marketId === market.marketId);
            const refMarket = refValue.find((ref) => ref.marketId === market.marketId);
            if (!preMarket || !refMarket) {
                return;
            }

            items.push({
                items: [
                    {
                        title: market.marketName,
                        isHeader: false,
                        preValue: isDataFromConfiguration ? refMarket.singleBetSettings.minimum : preMarket.singleBetSettings.minimum,
                        refValue: refMarket.singleBetSettings.minimum,
                        currentValue: lodash.isEqual(preMarket.singleBetSettings.minimum, refMarket.singleBetSettings.minimum) ? refMarket.singleBetSettings.minimum : submitValue.current[index].singleBetSettings.minimum,
                        isValueSet: lodash.get(submitValue.current[index], "singleBetSettings.minimum") !== -1,
                        shouldShowWarningSettingBar:
                            adjustable &&
                            !lodash.isEqual(preMarket.singleBetSettings.minimum, refMarket.singleBetSettings.minimum),
                        onValueSelected: (value: SummaryPropertyType) =>
                            handleValueSelected(`singleBetSettings.minimum`, value, index, market.marketId),
                    },
                ],
            });
        });

        setSingleBetMinimumProps(items);
    }

    function SingleBetMinimumSection() {
        return (
            <Box sx={{width: '100%'}}>
                <Typography variant="h6" sx={{mb: 2}}>
                    {intl.formatMessage({id: `${funType}.singleMinimumAmount`, defaultMessage: "Single Bet Minimum"})}
                </Typography>
                <Grid container spacing={2}>
                    {singleBetMinimumProps.map((item) => (
                        <Grid item xs={6} key={item.items[0].title}>
                            <MemoizedTemplateSummaryCard items={item.items}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }

    function updateSingleBetMaximum() {
        let items: TemplateSummaryCardProps[] = [];

        singleBetSettingsMarkets.forEach((market, index) => {
            const preMarket = preValue.find((pre) => pre.marketId === market.marketId);
            const refMarket = refValue.find((ref) => ref.marketId === market.marketId);
            if (!preMarket || !refMarket) {
                return;
            }

            items.push({
                items: [
                    {
                        title: market.marketName,
                        isHeader: false,
                        preValue: isDataFromConfiguration ? refMarket.singleBetSettings.maximum : preMarket.singleBetSettings.maximum,
                        refValue: refMarket.singleBetSettings.maximum,
                        currentValue: lodash.isEqual(preMarket.singleBetSettings.maximum, refMarket.singleBetSettings.maximum) ? refMarket.singleBetSettings.maximum : submitValue.current[index].singleBetSettings.maximum,
                        isValueSet: lodash.get(submitValue.current[index], "singleBetSettings.maximum") !== -1,
                        shouldShowWarningSettingBar:
                            adjustable &&
                            !lodash.isEqual(preMarket.singleBetSettings.maximum, refMarket.singleBetSettings.maximum),
                        onValueSelected: (value: SummaryPropertyType) =>
                            handleValueSelected(`singleBetSettings.maximum`, value, index, market.marketId),
                    },
                ],
            });
        });

        setSingleBetMaximumProps(items);
    }

    function SingleBetMaximumSection() {
        return (
            <Box sx={{width: '100%'}}>
                <Typography variant="h6" sx={{mb: 2}}>
                    {intl.formatMessage({id: `${funType}.singleMaximumAmount`, defaultMessage: "Single Bet Maximum"})}
                </Typography>
                <Grid container spacing={2}>
                    {singleBetMaximumProps.map((item) => (
                        <Grid item xs={6} key={item.items[0].title}>
                            <MemoizedTemplateSummaryCard items={item.items}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }

    function updateSingleBetMaxPayout() {
        let items: TemplateSummaryCardProps[] = [];

        singleBetSettingsMarkets.forEach((market, index) => {
            const preMarket = preValue.find((pre) => pre.marketId === market.marketId);
            const refMarket = refValue.find((ref) => ref.marketId === market.marketId);
            if (!preMarket || !refMarket) {
                return;
            }

            items.push({
                items: [
                    {
                        title: market.marketName,
                        isHeader: false,
                        preValue: isDataFromConfiguration ? refMarket.singleBetSettings.maxPayout : preMarket.singleBetSettings.maxPayout,
                        refValue: refMarket.singleBetSettings.maxPayout,
                        currentValue: lodash.isEqual(preMarket.singleBetSettings.maxPayout, refMarket.singleBetSettings.maxPayout) ? refMarket.singleBetSettings.maxPayout : submitValue.current[index].singleBetSettings.maxPayout,
                        isValueSet: lodash.get(submitValue.current[index], "singleBetSettings.maxPayout") !== -1,
                        shouldShowWarningSettingBar:
                            adjustable &&
                            !lodash.isEqual(preMarket.singleBetSettings.maxPayout, refMarket.singleBetSettings.maxPayout),
                        onValueSelected: (value: SummaryPropertyType) =>
                            handleValueSelected(`singleBetSettings.maxPayout`, value, index, market.marketId),
                    },
                ],
            });
        });

        setSingleBetMaxPayoutProps(items);
    }

    function SingleBetMaxPayoutSection() {
        return (
            <Box sx={{width: '100%'}}>
                <Typography variant="h6" sx={{mb: 2}}>
                    {intl.formatMessage({
                        id: `${funType}.singleMaximumPayoutAmount`,
                        defaultMessage: "Single Maximum Payout Amount"
                    })}
                </Typography>
                <Grid container spacing={2}>
                    {singleBetMaxPayoutProps.map((item) => (
                        <Grid item xs={6} key={item.items[0].title}>
                            <MemoizedTemplateSummaryCard items={item.items}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }

    function convertOptionToBoolean(value: TemplateSummaryEnableType): boolean {
        const trueOption = ["Enabled", "Selected"]
        const falseOption = ["Disabled", "UnSelected"]

        if (trueOption.includes(value as string)) {
            return true
        } else if (falseOption.includes(value as string)) {
            return false
        } else {
            return value === "true"
        }
    }

    function updateParlayable() {
        let items: TemplateSummaryCardProps[] = []
        const options = ["Disabled", "Enabled"]

        parlayableMarkets.forEach((market, index) => {
                const preMarket = preValue.find((pre) => pre.marketId === market.marketId);
                const refMarket = refValue.find((ref) => ref.marketId === market.marketId);
                if (!preMarket || !refMarket) {
                    return;
                }

                const preTitle = convertBooleanToString(options, preMarket.parlayable)
                const refTitle = convertBooleanToString(options, refMarket.parlayable)
                const currentTitle = lodash.get(submitValue.current[index], 'parlayable')

                items.push({
                    items: [
                        {
                            title: market.marketName,
                            isHeader: false,
                            preValue: isDataFromConfiguration ? refTitle : preTitle,
                            refValue: refTitle,
                            currentValue: lodash.isEqual(preTitle, refTitle) ? refTitle : currentTitle,
                            isValueSet: currentTitle !== "none",
                            shouldShowWarningSettingBar:
                                adjustable &&
                                preTitle !== refTitle,
                            onValueSelected: (value: SummaryPropertyType) =>
                                handleValueSelected(`parlayable`, value, index, market.marketId),
                        },
                    ],
                });
            }
        );
        setParlayableProps(items);
    }

    function ParlayableSection() {
        return (
            <Box sx={{width: '100%'}}>
                <Typography variant="h6" sx={{mb: 2}}>
                    {intl.formatMessage({id: `${funType}.parlay`, defaultMessage: "Parlay"})}
                </Typography>
                <Grid container spacing={2}>
                    {parlayableProps.map((item) => (
                        <Grid item xs={6} key={item.items[0].title}>
                            <MemoizedTemplateSummaryCard items={item.items}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }

    function updateSgpable() {
        let items: TemplateSummaryCardProps[] = []
        const options = ["Disabled", "Enabled"]

        sgpableMarkets.forEach((market, index) => {
                const preMarket = preValue.find((pre) => pre.marketId === market.marketId);
                const refMarket = refValue.find((ref) => ref.marketId === market.marketId);
                if (!preMarket || !refMarket) {
                    return;
                }

                const preTitle = convertBooleanToString(options, preMarket.sgpable)
                const refTitle = convertBooleanToString(options, refMarket.sgpable)
                const currentTitle = lodash.get(submitValue.current[index], 'sgpable')

                items.push({
                    items: [
                        {
                            title: market.marketName,
                            isHeader: false,
                            preValue: isDataFromConfiguration ? refTitle : preTitle,
                            refValue: refTitle,
                            currentValue: lodash.isEqual(preTitle, refTitle) ? refTitle : currentTitle,
                            isValueSet: currentTitle !== "none",
                            shouldShowWarningSettingBar:
                                adjustable &&
                                preTitle !== refTitle,
                            onValueSelected: (value: SummaryPropertyType) =>
                                handleValueSelected(`sgpable`, value, index, market.marketId),
                        },
                    ],
                });
            }
        );
        setSgpableProps(items);
    }

    function SgpableSection() {
        return (
            <Box sx={{width: '100%'}}>
                <Typography variant="h6" sx={{mb: 2}}>
                    {intl.formatMessage({id: `${funType}.sgp`, defaultMessage: "SGP"})}
                </Typography>
                <Grid container spacing={2}>
                    {sgpableProps.map((item) => (
                        <Grid item xs={6} key={item.items[0].title}>
                            <MemoizedTemplateSummaryCard items={item.items}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }

    function NoConflictView() {
        const marketRowData: MarketConfigModel[] = preValue.map((market) => (
            marketSettingToMarketConfigModel(market)
        ));

        return (
            <SummaryMarketsSettingNoConflict
                marketRowData={marketRowData}
            />
        )
    }

    function ConflictView() {
        return (
            <Box>
                {
                    marginProps.length > 0 &&
                    <GridBlock sx={{marginBottom: 3}}>
                        <MarginSection/>
                    </GridBlock>
                }
                {
                    minimumDifferenceProps.length > 0 &&
                    <GridBlock sx={{marginBottom: 3}}>
                        <MinimumDifferenceSection/>
                    </GridBlock>
                }
                {
                    lineSettingsProps.length > 0 &&
                    <GridBlock sx={{marginBottom: 3}}>
                        <LineSettingsSection/>
                    </GridBlock>
                }
                {
                    singleBetMinimumProps.length > 0 &&
                    <GridBlock sx={{marginBottom: 3}}>
                        <SingleBetMinimumSection/>
                    </GridBlock>
                }
                {
                    singleBetMaximumProps.length > 0 &&
                    <GridBlock sx={{marginBottom: 3}}>
                        <SingleBetMaximumSection/>
                    </GridBlock>
                }
                {
                    singleBetMaxPayoutProps.length > 0 &&
                    <GridBlock sx={{marginBottom: 3}}>
                        <SingleBetMaxPayoutSection/>
                    </GridBlock>
                }
                {
                    parlayableProps.length > 0 &&
                    <GridBlock sx={{marginBottom: 3}}>
                        <ParlayableSection/>
                    </GridBlock>
                }
                {
                    sgpableProps.length > 0 &&
                    <GridBlock sx={{marginBottom: 3}}>
                        <SgpableSection/>
                    </GridBlock>
                }
            </Box>
        );
    }

    return (
        <Box>
            {lodash.isEqual(preValue, refValue) ? <NoConflictView/> : <ConflictView/>}
        </Box>
    );
};

export default React.memo(SummaryMarketsSetting);
