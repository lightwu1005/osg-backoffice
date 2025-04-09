import {
    ImpactTemplateTabContentProps
} from "@/app/template/components/ImpactTemlateTabContent/ImpactTemplateTabContent";
import {useEffect, useState} from "react";
import {BasicTemplateTabContentProps} from "@/app/template/components/ImpactTemlateTabContent/BasicTemplateTabContent";
import {GetTemplateDetailModel} from "@/services/@core/module/ResponseDataModels";
import {allFirstCharToUpperCase, firstCharToUpperCase} from "@/modules/common/DisplayFormatConverter";
import {ImpactTemplatesViewWordingType, useTemplateTranslate} from "@/app/template/models/useTranslateMapping";
import {moneyFormat} from "@/utils/tools";
import {getEnumValueByKey} from "@/modules/common/DataProcessUnit";
import {convertArrayToString} from "@/app/eventDetail/domain/useTemplateSummaryFormViewModel";
import {FeederSuspendActionType, ImbalanceAmountActionType} from "@/app/template/models/actionType";

const useImpactTemplateTabContentViewModel = (props: Readonly<ImpactTemplateTabContentProps>) => {
    const {contentType, newTemplates, oldTemplates, onCellButtonClick} = props
    const {getTranslatedWord} = useTemplateTranslate()
    const blockTitles = [
        getTranslatedWord(ImpactTemplatesViewWordingType.LABEL_New),
        getTranslatedWord(ImpactTemplatesViewWordingType.LABEL_Old)
    ];

    const [contentData, setContentData] = useState<BasicTemplateTabContentProps[]>(
        [
            {
                title: getTranslatedWord(ImpactTemplatesViewWordingType.TAB_Feeder),
                headers: [],
                cells: []
            },
            {
                title: getTranslatedWord(ImpactTemplatesViewWordingType.TAB_Feeder),
                headers: [],
                cells: []
            }
        ]
    )

    function makeDefaultTemplateData(template: GetTemplateDetailModel) {
        return [
            [
                {
                    isButton: true,
                    value: `${getTranslatedWord(ImpactTemplatesViewWordingType.Leagues)}(${template.leagues?.length ?? 0})`,
                    onClick: (isNew: boolean, rowIndex: number, cellIndex: number) => {
                        if (onCellButtonClick) {
                            onCellButtonClick(isNew, rowIndex, cellIndex)
                        }
                    }
                }
            ],
            [
                {
                    value: template.templateName
                }
            ]
        ];
    }

    useEffect(() => {
        switch (contentType) {
            case ImpactTemplatesViewWordingType.TAB_TemplateDefault:
            case ImpactTemplatesViewWordingType.TAB_Margin:
                makeTemplateMarginData();
                break;
            case ImpactTemplatesViewWordingType.TAB_Feeder:
                makeFeederData();
                break;
            case ImpactTemplatesViewWordingType.TAB_Risk:
                makeRiskData();
                break;
            case ImpactTemplatesViewWordingType.TAB_Imbalanced:
                makeImbalancedData();
                break;
            case ImpactTemplatesViewWordingType.TAB_BetSlip:
                makeBetSlipData();
                break;
            case ImpactTemplatesViewWordingType.TAB_Parlay:
                makeParlayData();
                break;
            case ImpactTemplatesViewWordingType.TAB_Market:
                makeMarketData();
                break;
            case ImpactTemplatesViewWordingType.TAB_MarketControl:
                makeMarketControlData();
                break;
            case ImpactTemplatesViewWordingType.TAB_BetSlipRisks:
                makeBetSlipRiskData();
                break;
            case ImpactTemplatesViewWordingType.TAB_Alert:
                makeAlertData();
                break;
            case ImpactTemplatesViewWordingType.TAB_RapidBet:
                makeRapidBetData();
                break;
            case ImpactTemplatesViewWordingType.TAB_Settlement:
                makeAutoSettlementData();
                break;
            default:
                break;
        }
    }, [contentType, oldTemplates, newTemplates]);

    function makeTemplateMarginData() {
        function makeTemplatesData(templateList: GetTemplateDetailModel[]) {
            return templateList.map((template) => {
                const basicTemplateData = makeDefaultTemplateData(template);

                const marginData = [
                    {
                        value: `${template.margin}%`
                    }
                ];

                const lineData = [
                    {
                        value: allFirstCharToUpperCase(`${template.lineSettings}`)
                    }
                ];

                return [
                    ...basicTemplateData,
                    marginData,
                    lineData
                ];
            });
        }

        const contentFixedData = {
            title: ImpactTemplatesViewWordingType.TAB_Margin,
            headers: [
                getTranslatedWord(ImpactTemplatesViewWordingType.Leagues),
                getTranslatedWord(ImpactTemplatesViewWordingType.TemplateName),
                getTranslatedWord(ImpactTemplatesViewWordingType.Margin),
                getTranslatedWord(ImpactTemplatesViewWordingType.LineSettings)
            ]
        }

        setContentData(
            [
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(newTemplates)
                },
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(oldTemplates)
                }
            ]
        )
    }

    function makeFeederData() {
        function makeTemplatesData(templateList: GetTemplateDetailModel[]) {
            return templateList.map((template) => {
                const basicTemplateData = makeDefaultTemplateData(template);

                const providerPriorityData = [
                    template.providerPriority.map((provider) => {
                        return {
                            value: `${provider.provider}`
                        };
                    })
                ];

                const oddsSettingsData = [
                    {
                        value: `${moneyFormat(template.oddsSettings.minimum)}`
                    },
                    {
                        value: `${moneyFormat(template.oddsSettings.maximum)}`
                    },
                    {
                        value: `${template.oddsSettings.difference}%`
                    }
                ];

                return [
                    ...basicTemplateData,
                    ...providerPriorityData,
                    oddsSettingsData
                ];
            });
        }

        const contentFixedData = {
            title: ImpactTemplatesViewWordingType.TAB_Feeder,
            headers: [
                getTranslatedWord(ImpactTemplatesViewWordingType.Leagues),
                getTranslatedWord(ImpactTemplatesViewWordingType.TemplateName),
                getTranslatedWord(ImpactTemplatesViewWordingType.OddsFeedProviderPriority),
                getTranslatedWord(ImpactTemplatesViewWordingType.FeederOddsMinimumSetting)
            ]
        }

        setContentData(
            [
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(newTemplates)
                },
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(oldTemplates)
                }
            ]
        );
    }

    function makeMarketControlData() {
        function makeTemplatesData(templateList: GetTemplateDetailModel[]) {
            return templateList.map((template) => {
                const basicTemplateData = makeDefaultTemplateData(template);
                const feederSuspendData = [
                    {
                        value: getEnumValueByKey(FeederSuspendActionType, template.feederSuspend) ?? '',

                    }
                ];
                const dangerAttackActionData = [
                    {
                        value: getEnumValueByKey(FeederSuspendActionType, template.dangerAttackAction) ?? '',
                    }
                ];

                return [
                    ...basicTemplateData,
                    feederSuspendData,
                    dangerAttackActionData
                ];
            });
        }

        const contendFixedData = {
            title: ImpactTemplatesViewWordingType.TAB_MarketControl,
            headers: [
                getTranslatedWord(ImpactTemplatesViewWordingType.Leagues),
                getTranslatedWord(ImpactTemplatesViewWordingType.TemplateName),
                getTranslatedWord(ImpactTemplatesViewWordingType.FeederSuspendMarket),
                getTranslatedWord(ImpactTemplatesViewWordingType.DangerAttackAction)
            ]
        }

        setContentData(
            [
                {
                    ...contendFixedData,
                    cells: makeTemplatesData(newTemplates)
                },
                {
                    ...contendFixedData,
                    cells: makeTemplatesData(oldTemplates)
                }
            ]
        )
    }

    function makeBetSlipRiskData() {
        function makeTemplatesData(templateList: GetTemplateDetailModel[]) {
            return templateList.map((template) => {
                const basicTemplateData = makeDefaultTemplateData(template);
                const isPercentage = template.imbalanceSettings?.type.toLowerCase() === 'percentage';
                const imbalanceSettingData = [
                    {
                        value: firstCharToUpperCase(template.imbalanceSettings?.type ?? '')
                    },
                    {
                        value: `${isPercentage ? '' : "$"}${getEnumValueByKey(ImbalanceAmountActionType, template.imbalanceSettings?.action ?? '')} < ${template.imbalanceSettings?.autoAccept} ${isPercentage ? '%' : ''}`
                    },
                    {
                        value: `${isPercentage ? '' : "$"}${getEnumValueByKey(ImbalanceAmountActionType, template.imbalanceSettings?.action ?? '')} >= ${(template.imbalanceSettings?.autoAccept ?? 0) + 1} ${isPercentage ? '%' : ''}`
                    }
                ];

                const belowMarginData = [
                    {
                        value: `${template.belowMarginSettings?.margin}%`
                    },
                    {
                        value: convertArrayToString(template.belowMarginSettings?.alertRecipients ?? [])
                    }
                ];

                return [
                    ...basicTemplateData,
                    imbalanceSettingData,
                    belowMarginData
                ];
            });
        }

        const contentFixedData = {
            title: ImpactTemplatesViewWordingType.TAB_Risk,
            headers: [
                getTranslatedWord(ImpactTemplatesViewWordingType.Leagues),
                getTranslatedWord(ImpactTemplatesViewWordingType.TemplateName),
                getTranslatedWord(ImpactTemplatesViewWordingType.BetSlipAmountImbalanceSetting),
                getTranslatedWord(ImpactTemplatesViewWordingType.BelowTheMarginSetting)
            ]
        }

        setContentData(
            [
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(newTemplates)
                },
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(oldTemplates)
                }
            ]
        );
    }

    function makeAlertData() {
        function makeTemplatesData(templateList: GetTemplateDetailModel[]) {
            return templateList.map((template) => {
                const basicTemplateData = makeDefaultTemplateData(template);
                const isPercentage = template.parlayAlert?.type.toLowerCase() === 'percentage';

                const alertData = [
                    {value: `${firstCharToUpperCase(template.parlayAlert.type ?? '')}`},
                    {value: `Pass Rate < ${template.parlayAlert.targetNumber} ${isPercentage ? '%' : ''}`},
                    {value: `Potential Win >= ${template.parlayAlert.potentialWin}`},
                    {value: convertArrayToString(template.parlayAlert.alertRecipients)},
                ];

                return [
                    ...basicTemplateData,
                    alertData
                ];
            });
        }

        const contentFixedData = {
            title: ImpactTemplatesViewWordingType.TAB_Alert,
            headers: [
                getTranslatedWord(ImpactTemplatesViewWordingType.Leagues),
                getTranslatedWord(ImpactTemplatesViewWordingType.TemplateName),
                getTranslatedWord(ImpactTemplatesViewWordingType.ParlayAlertSettings),
            ]
        }

        setContentData(
            [
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(newTemplates)
                },
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(oldTemplates)
                }
            ]
        );
    }

    function makeRapidBetData() {
        function makeTemplatesData(templateList: GetTemplateDetailModel[]) {
            return templateList.map((template) => {
                const basicTemplateData = makeDefaultTemplateData(template);

                const rapidBetData = [
                    {
                        value: `${template.rapidBetEntrySettings?.enabled ? 'Enable' : 'Disable'}`
                    },
                    {
                        value: `Trigger Time (Second) ${template.rapidBetEntrySettings?.triggerTime} Second`
                    },
                    {
                        value: `Number of Bets ${template.rapidBetEntrySettings?.numberOfBets}`
                    },
                    {
                        value: `Suspend line (Second) ${template.rapidBetEntrySettings?.suspendLine} Second`
                    }
                ];

                return [
                    ...basicTemplateData,
                    rapidBetData
                ];
            });
        }

        const contentFixedData = {
            title: ImpactTemplatesViewWordingType.TAB_RapidBet,
            headers: [
                getTranslatedWord(ImpactTemplatesViewWordingType.Leagues),
                getTranslatedWord(ImpactTemplatesViewWordingType.TemplateName),
                getTranslatedWord(ImpactTemplatesViewWordingType.RapidBetEntrySettings),
            ]
        }

        setContentData(
            [
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(newTemplates)
                },
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(oldTemplates)
                }
            ]
        );
    }

    function makeAutoSettlementData() {
        function makeTemplatesData(templateList: GetTemplateDetailModel[]) {
            return templateList.map((template) => {
                const basicTemplateData = makeDefaultTemplateData(template);
                const autoSettingStatus = template.autoSettlementSettings?.enabled ? 'Enable' : 'Disable';
                const autoSettlementData = [
                    {
                        value: `${autoSettingStatus} Auto Settlement`
                    },
                    {
                        value: `Delay Settlement ${template.autoSettlementSettings?.delaySettlement} Seconds`
                    }
                ];

                return [
                    ...basicTemplateData,
                    autoSettlementData
                ];
            });
        }

        const contentFixedData = {
            title: ImpactTemplatesViewWordingType.TAB_Settlement,
            headers: [
                getTranslatedWord(ImpactTemplatesViewWordingType.Leagues),
                getTranslatedWord(ImpactTemplatesViewWordingType.TemplateName),
                getTranslatedWord(ImpactTemplatesViewWordingType.AutoSettlementSettings),
            ]
        }

        setContentData(
            [
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(newTemplates)
                },
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(oldTemplates)
                }
            ]
        );
    }

    function makeRiskData() {
        function makeTemplatesData(templateList: GetTemplateDetailModel[]) {
            return templateList.map((template) => {
                const basicTemplateData = makeDefaultTemplateData(template);

                const oddsThresholdData = [
                    {
                        value: `${template.deviation.percentage}%`
                    }
                ];

                const oddsActionData = [
                    {
                        value: allFirstCharToUpperCase(`${template.deviation.action}`)
                    }
                ];

                return [
                    ...basicTemplateData,
                    oddsThresholdData,
                    oddsActionData
                ];
            });
        }

        const contentFixedData = {
            title: ImpactTemplatesViewWordingType.TAB_Risk,
            headers: [
                getTranslatedWord(ImpactTemplatesViewWordingType.Leagues),
                getTranslatedWord(ImpactTemplatesViewWordingType.TemplateName),
                getTranslatedWord(ImpactTemplatesViewWordingType.OddsDeviationThreshold),
                getTranslatedWord(ImpactTemplatesViewWordingType.DeviationResponseActions)
            ]
        }

        setContentData(
            [
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(newTemplates)
                },
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(oldTemplates)
                }
            ]
        );
    }

    function makeImbalancedData() {
        function makeTemplatesData(templateList: GetTemplateDetailModel[]) {
            return templateList.map((template) => {
                const basicTemplateData = makeDefaultTemplateData(template);

                const bettingSettingData = [
                    {
                        value: allFirstCharToUpperCase(`${template.imbalanceBettings.updateType}`)
                    },
                    {
                        value: `${template.imbalanceBettings.difference}%`
                    },
                    {
                        value: `${template.imbalanceBettings.decrease}%`
                    },
                    {
                        value: template.imbalanceBettings.recalculate ? `${template.imbalanceBettings.recalculate}` : ''
                    }
                ];

                const heavyBettingData = [
                    {
                        value: allFirstCharToUpperCase(`${template.heavyBettings.updateType}`)
                    },
                    {
                        value: `${template.heavyBettings.timeLimit}s`
                    },
                    {
                        value: `$${moneyFormat(template.heavyBettings.amount ?? 0, 2)}`
                    },
                    {
                        value: template.heavyBettings.decrease ? `${template.heavyBettings.decrease}%` : ''
                    }
                ];

                return [
                    ...basicTemplateData,
                    bettingSettingData,
                    heavyBettingData
                ];
            });
        }

        const contentFixedData = {
            title: ImpactTemplatesViewWordingType.TAB_Imbalanced,
            headers: [
                getTranslatedWord(ImpactTemplatesViewWordingType.Leagues),
                getTranslatedWord(ImpactTemplatesViewWordingType.TemplateName),
                getTranslatedWord(ImpactTemplatesViewWordingType.ImbalancedBettingSetting),
                getTranslatedWord(ImpactTemplatesViewWordingType.HeavyBetting)
            ]
        }

        setContentData(
            [
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(newTemplates)
                },
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(oldTemplates)
                }
            ]
        );
    }

    function makeBetSlipData() {
        function makeTemplatesData(templateList: GetTemplateDetailModel[]) {
            return templateList.map((template) => {
                const basicTemplateData = makeDefaultTemplateData(template);

                const delayedAcceptanceData = [
                    {
                        value: `${template.delayedSettings?.situation.map((situation) => {
                                return allFirstCharToUpperCase(`${situation}`)
                            }
                        ).join(', ')}`
                    },
                    {
                        value: `${template.delayedSettings?.delayedSecond}s`
                    }
                ];

                const singleBetSettingData = [
                    {
                        value: `$${moneyFormat(template.singleBetSettings.minimum)}`
                    },
                    {
                        value: `$${moneyFormat(template.singleBetSettings.maximum)}`
                    },
                    {
                        value: `$${moneyFormat(template.singleBetSettings.maxPayout)}`
                    }
                ];

                return [
                    ...basicTemplateData,
                    delayedAcceptanceData,
                    singleBetSettingData
                ];
            });
        }

        const contentFixedData = {
            title: ImpactTemplatesViewWordingType.TAB_BetSlip,
            headers: [
                getTranslatedWord(ImpactTemplatesViewWordingType.Leagues),
                getTranslatedWord(ImpactTemplatesViewWordingType.TemplateName),
                getTranslatedWord(ImpactTemplatesViewWordingType.DelayedAcceptanceSetting),
                getTranslatedWord(ImpactTemplatesViewWordingType.SingleBetSetting)
            ]
        }

        setContentData(
            [
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(newTemplates)
                },
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(oldTemplates)
                }
            ]
        );
    }

    function makeParlayData() {
        function makeTemplatesData(templateList: GetTemplateDetailModel[]) {
            return templateList.map((template) => {
                const basicTemplateData = makeDefaultTemplateData(template);

                const parlaySettingData = [
                    [
                        {
                            value: `${template.parlaySettings.enabled ?
                                `${getTranslatedWord(ImpactTemplatesViewWordingType.Enable)} Parlay` :
                                `${getTranslatedWord(ImpactTemplatesViewWordingType.Disable)} Parlay`}`
                        },
                        ...template.parlaySettings.enabled ? [
                            {
                                value: `${getTranslatedWord(ImpactTemplatesViewWordingType.MinimumLegs)} ${template.parlaySettings.minimumLegs}`
                            },
                            {
                                value: `${getTranslatedWord(ImpactTemplatesViewWordingType.MaximumLegs)} ${template.parlaySettings.maximumLegs}`
                            },
                            {
                                value: `${getTranslatedWord(ImpactTemplatesViewWordingType.MinimumOdds)} $${moneyFormat(template.parlaySettings.minimum ?? 0)}`

                            },
                            {
                                value: `${getTranslatedWord(ImpactTemplatesViewWordingType.MaximumOdds)} $${moneyFormat(template.parlaySettings.maximum ?? 0)}`
                            },
                            {
                                value: `${getTranslatedWord(ImpactTemplatesViewWordingType.MaximumPayout)} $${moneyFormat(template.parlaySettings.maxPayout ?? 0)}`
                            }
                        ] : []
                    ]
                ];

                const sgpSettingData = [
                    {
                        value: `${template.sgpSettings.enabled ?
                            `${getTranslatedWord(ImpactTemplatesViewWordingType.Enable)} SGP` :
                            `${getTranslatedWord(ImpactTemplatesViewWordingType.Disable)} SGP`}`
                    },
                    ...template.sgpSettings.enabled ? [
                        {
                            value: `${getTranslatedWord(ImpactTemplatesViewWordingType.MinimumLegs)} ${template.sgpSettings.minimumLegs}`
                        },
                        {
                            value: `${getTranslatedWord(ImpactTemplatesViewWordingType.MaximumLegs)} ${template.sgpSettings.maximumLegs}`
                        },
                        {
                            value: `${getTranslatedWord(ImpactTemplatesViewWordingType.MinimumOdds)} $${moneyFormat(template.sgpSettings.minimum ?? 0)}`
                        },
                        {
                            value: `${getTranslatedWord(ImpactTemplatesViewWordingType.MaximumOdds)} $${moneyFormat(template.sgpSettings.maximum ?? 0)}`
                        },
                        {
                            value: `${getTranslatedWord(ImpactTemplatesViewWordingType.MaximumPayout)} $${moneyFormat(template.sgpSettings.maxPayout ?? 0)}`
                        }] : []
                ];

                return [
                    ...basicTemplateData,
                    ...parlaySettingData,
                    sgpSettingData
                ];
            });
        }

        const contentFixedData = {
            title: ImpactTemplatesViewWordingType.TAB_Parlay,
            headers: [
                getTranslatedWord(ImpactTemplatesViewWordingType.Leagues),
                getTranslatedWord(ImpactTemplatesViewWordingType.TemplateName),
                getTranslatedWord(ImpactTemplatesViewWordingType.ParlaySetting),
                getTranslatedWord(ImpactTemplatesViewWordingType.SGPSetting)
            ]
        }

        setContentData(
            [
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(newTemplates)
                },
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(oldTemplates)
                }
            ]
        );
    }

    function makeMarketData() {
        function makeTemplatesData(templateList: GetTemplateDetailModel[]) {
            return templateList.map((template) => {
                const basicTemplateData = makeDefaultTemplateData(template);

                const marketData = [
                    {
                        isButton: true,
                        value: template.marketSettings ? `${getTranslatedWord(ImpactTemplatesViewWordingType.Markets)}(${template.marketSettings.length})` : '',
                        onClick: (isNew: boolean, rowIndex: number, cellIndex: number) => {
                            if (onCellButtonClick) {
                                onCellButtonClick(isNew, rowIndex, cellIndex)
                            }
                        }
                    }
                ];

                return [
                    ...basicTemplateData,
                    marketData
                ];
            });
        }

        const contentFixedData = {
            title: ImpactTemplatesViewWordingType.TAB_TemplateDefault,
            headers: [
                getTranslatedWord(ImpactTemplatesViewWordingType.Leagues),
                getTranslatedWord(ImpactTemplatesViewWordingType.TemplateName),
                getTranslatedWord(ImpactTemplatesViewWordingType.Markets),
            ]
        }

        setContentData(
            [
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(newTemplates)
                },
                {
                    ...contentFixedData,
                    cells: makeTemplatesData(oldTemplates)
                }
            ]
        )
    }

    return {
        contentData,
        blockTitles
    }
}

export default useImpactTemplateTabContentViewModel