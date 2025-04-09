import {useCallback} from 'react';
import sendRequest from '@/services/@core/ApiClient';
import {Method} from '@/services/@core/RequestBuilder';
import {
    AddTemplateDataModel,
    ApiOddModel,
    AuditModel,
    AvailableOwnerModel,
    BetSlipsListModel,
    BrandDetailModel,
    BrandListModel,
    ChannelDetailModel,
    ChannelListModel,
    ConfigurationModel,
    DisplayTypeModel,
    EventDataModel,
    EventDetailDataModel,
    EventListModel,
    EventMarketModel,
    EventMarketSettingsModel,
    GetActivatingItemsDataModel,
    GetApplyEventsDataModel,
    GetTemplateDetailModel,
    GetTemplateListDataModel,
    GetTemplateMarketsDataModel,
    LeagueModel,
    LineupsModel,
    ListResponseModel,
    LocationModel,
    LoginResponseDataModel,
    MarketGroupModel,
    MarketsModel,
    MemberInfoListResponseDataModel,
    NotificationListModel,
    NotificationUnreadNumberModel,
    OddDataModel,
    OddsListModel,
    OddsMarginCalculateModel,
    OddsMarginModel,
    OddsMarketBalanceModel,
    PerformanceDataModel,
    PlayLogStatisticModel,
    PlayLogSummaryModel,
    PlayLogTimelineModel,
    ProviderInformationListModel,
    RiskGroupListModel,
    RiskGroupsApplyingPuntersListModel,
    RiskMembersBetSlipsListModel,
    RiskMembersListModel,
    RiskMembersPerformanceModel,
    SingleMemberInfoResponseDataModel,
    SportsDataModel,
    SuccessFailureIdsModel,
    SuccessFailureRemoveTemplate,
    TagsListModel,
} from '@/services/@core/module/ResponseDataModels';
import {createRequest} from '@/services/@core/module/RequestConfigBuilder';
import {
    AddBrandProps,
    AddChannelProps,
    AddEventPinsProps,
    AddMemberProps,
    AddRiskGroupProps,
    AddTemplateProps,
    AuditProps,
    BetSlipAcceptanceProps,
    BetSlipExportProps,
    BetSlipVoidBetLegsProps,
    BrandListProps,
    ChannelListProps,
    DeleteMembersProps,
    DeleteRiskGroupsProps,
    EventDetailProps,
    EventListProps,
    EventMarketsDetailProps,
    GenerateTokenViaEmailProps,
    GetActivatingItemsProps,
    GetApplyEventsProps,
    GetAvailableOwnerProps,
    GetBetSlipsProps,
    GetBrandDetailProps,
    GetChannelDetailProps,
    GetConfigurationProps,
    GetEventMarketSettingsProps,
    GetEventPerformanceProps,
    GetEventPinsProps,
    GetEventPlayLogMatchStatsProps,
    GetEventPlayLogTimelineProps,
    GetLineupsProps,
    GetMarketGroups,
    GetMarketsProps,
    GetMemberListProps,
    GetPerformanceProps,
    GetPlayLogSummaryProps,
    GetRiskGroupDetailProps,
    GetRiskGroupsProps,
    GetRiskMembersBetSlipsProps,
    GetRiskMembersPerformanceProps,
    GetRiskMembersProps,
    GetSingleMemberInfoProps,
    GetTagsProps,
    GetTemplateDefaultConflictsProps,
    GetTemplateDetailProps,
    GetTemplateMarketsProps,
    GetTemplatesProps,
    LeaguesProps,
    LocationsProps,
    LoginProps,
    LogoutProps,
    MarketBalanceProps,
    NotificationListProps,
    NotificationReadStatusProps,
    OddsListProps,
    OddsMarginCalculateProps,
    OddsMarginProps,
    OddsMarketStatusProps,
    OddsUpdateEventStatusProps,
    ProviderInformationProps,
    ProvidersProps,
    RemoveBrandProps,
    RemoveChannelsProps,
    RemoveTemplatesProps,
    ResetPasswordProps,
    ResetPasswordWithOldProps,
    RiskGroupsApplyingPuntersProps,
    SetProviderPreferenceProps,
    TimelineStatusesProps,
    UpdateAutoPayoutProps,
    UpdateBrandConfigurationProps,
    UpdateBrandProps,
    UpdateBrandStatusProps,
    UpdateChannelProps,
    UpdateChannelStatusProps,
    UpdateConfigurationProps,
    UpdateEventMarketSettingsProp,
    UpdateEventsStatusProps,
    UpdateMemberInfoProps,
    UpdateMemberStatusProps,
    UpdateOddsMarginProps,
    UpdateRiskGroupApplyProps,
    UpdateRiskGroupDetailProps,
    UpdateTagsApplyProps,
    UpdateTemplateDetailProps
} from '@/services/@core/module/RequestDataModels';
import ApiUrlBuilder from '@/services/@core/module/ApiUrlBuilder';
import ApiResponse from '@/services/@core/ApiResponse';
import {
    mockDangerBalls,
    mockDisplayTypes,
    mockLeague,
    mockLocations,
    mockLogin,
    mockMarkets,
    mockMemberList,
    mockMemberRoles,
    mockProviderInformation,
    mockProviders,
    mockRemoveMembersDataOptions,
    mockSingleMember,
    mockSportCategories
} from '@/data/mockData/common/MockRowData';
import {mockEventList, mockEventPins, mockEventStatusData} from '@/data/mockData/event/MockEventRowData';
import {
    mockBalanceData,
    mockEventDetail,
    mockMarketsList,
    mockOddsDataList
} from '@/data/mockData/event/MockEventDetailData';
import {mockOddsMargin, mockOddsMarginCalculate} from '@/data/mockData/odds/MockMarginData';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {toChannelStatus} from '@/services/@core/module/Enum';
import {
    mockAddEventPinsData,
    mockAvailableOwners,
    mockChannelData,
    mockChannelDetailData,
    mockConfigurationData,
    mockRemoveChannelDataOptions,
    mockUpdateChannelDataOptions,
    mockUpdateEventsStatusData
} from '@/data/mockData/channel/MockChannelData';
import {mockAuditData, mockAuditsActions} from '@/data/mockData/audit/AuditData';
import {
    mockNotificationListData,
    mockNotificationUnreadNumber
} from "@/data/mockData/notifications/NotificationListData";
import {toInfoTypeData} from "@/data/mockData/dashboard/MockPerformanceData"
import {mockEmpty} from "@/data/mockData/common/EmptyData";
import Builder from "@/config/Builder";
import {ApiError} from "@/services/@core/ApiErrorHandle";
import {EventStatus} from "@/services/@core/module/EventStatus";
import {
    mockEventMarketSettingsData,
    mockUpdateEventMarketSettingsData
} from "@/data/mockData/event/MockEventMarketSettingsData";
import {
    mockLineupsData,
    mockMatchStats,
    mockPlayLogSummary,
    mockTimelineData,
    mockTimelineStatuses
} from "@/data/mockData/event/MockPlayLogData";
import {
    mockActivatingItems,
    mockAddTemplatesData,
    mockApplyEvents,
    mockRemoveTemplatesData,
    mockTemplateDefaultConflicts,
    mockTemplateDetail,
    mockTemplateList,
    mockTemplateMarkets
} from "@/data/mockData/template/MockTemplateList"
import {mockBetslipAcceptanceData, mockBetSlipsData} from "@/data/mockData/betslips/MockBetSlipsData";
import {
    mockBrandData,
    mockBrandDetailData,
    mockRemoveBrandsDataOptions,
    mockUpdateBrandDataOptions
} from "@/data/mockData/brands/MockBrandData";
import {
    getRiskGroupDetailData,
    mockMarketGroupData,
    mockRiskGroupData,
    mockRiskGroupsApplyingPuntersData
} from "@/data/mockData/riskGroup/MockRiskGroupData";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {
    TestDangerBallTriggerProps,
    TestGetVendorEventIdProps,
    TestGetVendorEventIdResponse,
    TestPlaceBetProps
} from "@/app/testPlaceBet/models/TestPlaceBetParameters";
import ApiRequestManager from "@/services/@core/ApiRequestManager";
import {
    defaultAddTemplateDataModel,
    defaultBrandDetailModel,
    defaultChannelDetailModel,
    defaultConfigurationModel,
    defaultEventDetailDataModel,
    defaultEventMarketSettingsModel,
    defaultGetTemplateDetailModel,
    defaultLineupsModel,
    defaultListResponseModel,
    defaultLoginResponseDataModel,
    defaultNotificationUnreadNumberModel,
    defaultOddsMarginCalculateModel,
    defaultOddsMarketBalanceModel,
    defaultPlayLogSummaryModel,
    defaultRiskGroupDetailModel,
    defaultRiskMembersPerformanceModel,
    defaultSingleMemberInfoResponseDataModel,
    defaultSuccessFailureIdsModel,
    defaultSuccessFailureRemoveTemplate
} from "@/services/@core/module/DefaultResponseData";
import {mockTagsList} from "@/data/mockData/tags/MockTagsListData";
import {GetRiskGroupDetailModel} from './module/CommonDataModels';
import {
    mockRiskMembersBetSlipsData,
    mockRiskMembersData,
    mockRiskMembersPerformanceTotalAmountData,
    mockRiskMembersPerformanceWinLossRateData
} from "@/data/mockData/riskMember/MockRiskMemberData";

const useApiInteractor = () => {
    const apiUrl = ApiUrlBuilder.getApiUrlByEnvironment();
    const isMock = Builder.isMock;
    const intl = useIntl();
    const funType = LocalizationFunctionType.API;
    const defaultErrorMsg = intl.formatMessage({
        id: `${funType}.defaultErrorMsg`,
        defaultMessage: 'Oops, something went wrong; please try again later.'
    });

    // Test Place Bet - need to remove when user test complete
    const placeBet = useCallback(async (requestData: TestPlaceBetProps): Promise<any> => {
        const builder = createRequest(apiUrl.placeBet, Method.post, requestData)
        try {
            return await sendRequest(builder, '', undefined, true);
        } catch (e) {
            let result = defaultErrorMsg
            if (e instanceof ApiError) {
                throw e
            }
            throw result
        }
    }, [apiUrl.placeBet, isMock])

    const triggerDangerBall = useCallback(async (requestData: TestDangerBallTriggerProps): Promise<any> => {
        const builder = createRequest(apiUrl.triggerDangerBall, Method.post, requestData)
        try {
            return await sendRequest(builder, '', undefined, true);
        } catch (e) {
            throw '危險球觸發失敗，請稍後再重試，或選擇別場賽事、條件';
        }
    }, [apiUrl.triggerDangerBall, isMock])

    const getVendorEventId = useCallback(async (requestData: TestGetVendorEventIdProps): Promise<TestGetVendorEventIdResponse> => {
        const builder = createRequest(apiUrl.vendorEventId, Method.get, requestData)
        try {
            return await sendRequest(builder, {eventId: ''}, undefined, true);
        } catch (e) {
            throw '這場賽事無法觸發危險球，請選擇別場賽事';
        }
    }, [apiUrl.vendorEventId, isMock])

    // Login
    const userLogin = useCallback(async (requestData: LoginProps): Promise<LoginResponseDataModel> => {
        const builder = createRequest(apiUrl.login, Method.post, requestData)
        try {
            return (isMock ? mockLogin : await sendRequest(builder, defaultLoginResponseDataModel, undefined, true))
        } catch (e) {
            const {BadRequest, Unauthorized, Forbidden, TooManyRequests, InternalServerError} = HttpStatusCode
            let needToContactSupport = false;
            let message;
            if (e instanceof ApiError) {
                if (e.status === BadRequest) {
                    switch (e.errorCode) {
                        case 8600:
                            message = intl.formatMessage({
                                id: `${funType}.login.invalidDoubleSlashUri`,
                                defaultMessage: 'Invalid double slash uri'
                            });
                            break;
                        case 8601:
                            message = intl.formatMessage({
                                id: `${funType}.login.invalidToken`,
                                defaultMessage: 'Invalid token'
                            })
                            break;
                        case 8602:
                            message = intl.formatMessage({
                                id: `${funType}.login.tokenMissing`,
                                defaultMessage: 'Token missing'
                            })
                            break;
                        case 8603:
                            message = intl.formatMessage({
                                id: `${funType}.login.checkTokenFail`,
                                defaultMessage: 'Check token fail'
                            })
                            break;
                        case 8604:
                            message = intl.formatMessage({
                                id: `${funType}.login.userNotFound`,
                                defaultMessage: 'User Not found'
                            })
                            break;
                        case 8605:
                            message = intl.formatMessage({
                                id: `${funType}.login.pageOutOfRange`,
                                defaultMessage: 'Page out of range'
                            })
                            break;
                        default:
                            message = intl.formatMessage({
                                id: `${funType}.login.exceededVerificationAttempts`,
                                defaultMessage: 'Exceeded verification attempts'
                            })
                            break;
                    }
                } else if (e.status === Unauthorized) {
                    switch (e.errorCode) {
                        case 8606:
                        case 8608:
                        default:
                            message = intl.formatMessage({
                                id: `${funType}.login.passwordOrEmailIncorrect`,
                                defaultMessage: 'Password or Email is incorrect'
                            })
                            needToContactSupport = true;
                            break;
                    }
                } else if (e.status === Forbidden) {
                    message = intl.formatMessage({
                        id: `${funType}.login.tokenWrong`,
                        defaultMessage: 'Token was wrong'
                    })
                } else if (e.status === TooManyRequests) {
                    message = intl.formatMessage({
                        id: `${funType}.login.tooManyRequests`,
                        defaultMessage: 'Too many requests'
                    })
                } else if (e.status === InternalServerError) {
                    message = intl.formatMessage({
                        id: `${funType}.login.internalServerError`,
                        defaultMessage: 'Internal Server Error'
                    })
                }
            }
            if (!message)
                message = defaultErrorMsg;

            throw {
                needToContactSupport: needToContactSupport,
                message: message
            }
        }
    }, [apiUrl.login, isMock])

    const userLogout = useCallback(async (requestData: LogoutProps): Promise<void> => {
        ApiRequestManager.getInstance().cancelAllRequests();
        const builder = createRequest(apiUrl.logout, Method.delete, requestData)
        try {
            return isMock ? mockEmpty : await sendRequest(builder);
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.logout, isMock])

    // Member
    const getMemberList = useCallback(async (requestData: GetMemberListProps): Promise<MemberInfoListResponseDataModel> => {
        const builder = createRequest(apiUrl.members, Method.get, requestData)
        try {
            return (isMock ? mockMemberList : await sendRequest(builder, defaultListResponseModel, {
                convert: (rowData: AxiosResponse<any, any>): any => {
                    const {content} = rowData.data
                    if (content !== undefined) {
                        for (let item of content) {
                            item.id = item.uuid
                        }
                    }
                    return rowData.data
                }
            }))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.members, isMock])

    const getSingleMemberInfo = useCallback(async (requestData: GetSingleMemberInfoProps): Promise<SingleMemberInfoResponseDataModel> => {
        const builder = createRequest(apiUrl.singleMember, Method.get, requestData)
        try {
            return (isMock ? mockSingleMember : await sendRequest(builder, defaultSingleMemberInfoResponseDataModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.singleMember, isMock])

    const updateMemberInfo = useCallback(async (requestData: UpdateMemberInfoProps): Promise<SingleMemberInfoResponseDataModel> => {
        const builder = createRequest(apiUrl.singleMember, Method.put, requestData)
        try {
            return (isMock ? mockSingleMember : await sendRequest(builder, defaultSingleMemberInfoResponseDataModel, undefined, true))
        } catch (e) {
            let result = defaultErrorMsg
            if (e instanceof ApiError) {
                result = e.message
            }
            throw result
        }
    }, [apiUrl.singleMember, isMock])

    const updateMembersStatus = useCallback(async (requestData: UpdateMemberStatusProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.updateMembersStatus, Method.put, requestData)
        try {
            await (isMock ? {} : sendRequest(builder, '', undefined, true))
            return {
                isSuccess: true,
                result: `User has been ${requestData.body.status.toLowerCase()} successfully!`
            }
        } catch (e) {
            return {
                isSuccess: false,
                result: defaultErrorMsg
            }
        }
    }, [apiUrl.updateMembersStatus, isMock])

    const addMembers = useCallback(async (requestData: AddMemberProps): Promise<SingleMemberInfoResponseDataModel> => {
        const builder = createRequest(apiUrl.member, Method.post, requestData)
        try {
            return (isMock ? {} : await sendRequest(builder, defaultSingleMemberInfoResponseDataModel, undefined, true))
        } catch (e) {
            let result = defaultErrorMsg
            if (e instanceof ApiError) {
                result = e.message
            }
            throw result
        }
    }, [apiUrl.member, isMock])

    const deleteMembers = useCallback(async (requestData: DeleteMembersProps): Promise<SuccessFailureIdsModel> => {
        const builder = createRequest(apiUrl.member, Method.delete, requestData)
        try {
            return (isMock ? mockRemoveMembersDataOptions[Math.floor(Math.random() * 2)] : await sendRequest(builder, defaultSuccessFailureIdsModel, undefined, true))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.member, isMock])

    const getMemberRoles = useCallback(async (): Promise<string[]> => {
        const builder = createRequest(apiUrl.getMemberRoles, Method.get)
        try {
            return (isMock ? mockMemberRoles : await sendRequest(builder, []))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.getMemberRoles, isMock])

    const resetPassword = useCallback(async (requestData: ResetPasswordProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.resetPassword, Method.post, requestData)
        try {
            await (isMock ? {} : sendRequest(builder, undefined, undefined, true))
            return {
                isSuccess: true,
                result: intl.formatMessage({
                    id: `${funType}.resetPassword.success`,
                    defaultMessage: 'Password set successfully!'
                })
            }
        } catch (e) {
            let message = defaultErrorMsg
            if (e instanceof ApiError) message = e.message
            return {
                isSuccess: false,
                result: message
            }
        }
    }, [apiUrl.resetPassword, isMock])

    const resetPwdWithOld = useCallback(async (requestData: ResetPasswordWithOldProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.resetPwdWithOld, Method.post, requestData)
        try {
            await (isMock ? {} : sendRequest(builder, undefined, undefined, true))
            return {
                isSuccess: true,
                result: intl.formatMessage({
                    id: `${funType}.resetPassword.success`,
                    defaultMessage: 'Password set successfully!'
                })
            }
        } catch (e) {
            let result = intl.formatMessage({
                id: `${funType}.resetPassword.failed`,
                defaultMessage: 'Failed to set password, please try again later.'
            });
            if (e instanceof ApiError && e.errorCode === 88099) {
                result = intl.formatMessage({
                    id: `${funType}.resetPassword.currentPasswordNotMatch`,
                    defaultMessage: 'Current password does not match.'
                })
            }
            return {
                isSuccess: false,
                result: result
            }
        }
    }, [apiUrl.resetPwdWithOld, isMock])

    // Common
    const getSportsCategories = useCallback(async (): Promise<SportsDataModel[]> => {
        const builder = createRequest(apiUrl.sportsCategories, Method.get)
        try {
            return (isMock ? mockSportCategories : await sendRequest(builder, []))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.sportsCategories, isMock])

    const getLeagues = useCallback(async (requestData?: LeaguesProps): Promise<ListResponseModel<LeagueModel>> => {
        const builder = createRequest(apiUrl.leagues, Method.get, requestData)
        try {
            return (isMock ? mockLeague : await sendRequest(builder, []))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.leagues, isMock])

    const getLocations = useCallback(async (requestData: LocationsProps): Promise<LocationModel[]> => {
        const builder = createRequest(apiUrl.locations, Method.get, requestData)
        try {
            return (isMock ? mockLocations : await sendRequest(builder, []))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.locations, isMock])

    const getProviders = useCallback(async (requestData: ProvidersProps): Promise<string[]> => {
        const builder = createRequest(apiUrl.providers, Method.get, requestData)
        try {
            return (isMock ? mockProviders : await sendRequest(builder, []))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.providers, isMock])

    const getProviderInformation = useCallback(async (requestData: ProviderInformationProps): Promise<ProviderInformationListModel> => {
        const builder = createRequest(apiUrl.providerInformation, Method.get, requestData);
        try {
            return (isMock ? mockProviderInformation : await sendRequest(builder, defaultListResponseModel, {
                convert: (rowData: AxiosResponse<any, any>): any => {
                    const {content} = rowData.data
                    if (content !== undefined) {
                        for (let i = 0; i < content.length; i++) {
                            content[i].id = i
                        }
                    }
                    return rowData.data
                }
            }))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.providerInformation, isMock])

    const getMarkets = useCallback(async (requestData: GetMarketsProps): Promise<MarketsModel> => {
        const builder = createRequest(apiUrl.markets, Method.get, requestData);
        try {
            return (isMock ? mockMarkets : await sendRequest(builder, defaultListResponseModel));
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.markets, isMock])

    // Event
    const getEventList = useCallback(async (requestData: EventListProps): Promise<EventListModel> => {
        const builder = createRequest(apiUrl.eventList, Method.get, requestData)
        try {
            return (isMock ? mockEventList : await sendRequest(builder, defaultListResponseModel, {
                convert: (rowData: AxiosResponse<any, any>): any => {
                    rowData.data.content = (rowData.data.content as Array<EventDataModel>).map(eventData => {
                        eventData.id = eventData.eventId
                        if (eventData.status !== undefined) {
                            eventData.status = EventStatus[eventData.status]
                        }
                        eventData.oddsData = eventData.oddsData.map((oddsData: OddDataModel) => {
                            // const marketStatus = oddsData.marketSuspendedStatus
                            return {
                                ...oddsData,
                                odds: undefined
                                // odds: oddsData.odds?.map((odd: OddModel) => {
                                //     return {
                                //         ...odd,
                                //         oddsSuspendedStatus: marketStatus ?? undefined
                                //     }
                                // })
                            }
                        })
                        return eventData
                    })
                    return rowData.data
                }
            }))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.eventList, isMock])

    const getDisplayTypes = useCallback(async (): Promise<DisplayTypeModel[]> => {
        const displayTypesBuilder = createRequest(apiUrl.displayType, Method.get)
        try {
            return (isMock ? mockDisplayTypes : await sendRequest(displayTypesBuilder, []))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.displayType, isMock])

    const getEventMarketDetail = useCallback(async (requestData: EventMarketsDetailProps): Promise<EventMarketModel[]> => {
        const builder = createRequest(apiUrl.eventMarketDetail, Method.get, requestData)
        try {
            return (isMock ? mockMarketsList : await sendRequest(builder, []))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.eventMarketDetail, isMock])

    const getEventStatus = useCallback(async (): Promise<string[]> => {
        const builder = createRequest(apiUrl.getEventStatus, Method.get)
        const response = await (isMock ? mockEventStatusData : sendRequest(builder, []))
        return response
    }, [apiUrl.getEventStatus, isMock])

    const updateEventsStatus = useCallback(async (requestData: UpdateEventsStatusProps): Promise<SuccessFailureIdsModel> => {
        const builder = createRequest(apiUrl.updateEventsStatus, Method.post, requestData)
        try {
            return (isMock ? mockUpdateEventsStatusData : await sendRequest(builder, defaultSuccessFailureIdsModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.updateEventsStatus, isMock])

    const getEventDetail = useCallback(async (requestData: EventDetailProps): Promise<EventDetailDataModel> => {
        const builder = createRequest(apiUrl.eventDetail, Method.get, requestData)
        try {
            return (isMock ? mockEventDetail : await sendRequest(builder, defaultEventDetailDataModel, {
                convert: (rowData: AxiosResponse<any, any>): any => {
                    if (rowData.data.status !== undefined) {
                        rowData.data.status = EventStatus[rowData.data.status]
                    }
                    return rowData.data
                }
            }))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.eventDetail, isMock])

    const getDangerBalls = useCallback(async (): Promise<string[]> => {
        const builder = createRequest(apiUrl.dangerBalls, Method.get)
        try {
            return (isMock ? mockDangerBalls : await sendRequest(builder, []))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.dangerBalls, isMock])

    const getEventPins = useCallback(async (requestData: GetEventPinsProps): Promise<EventDataModel[]> => {
        const builder = createRequest(apiUrl.eventPins, Method.get, requestData)
        const response = await (isMock ? mockEventPins : sendRequest(builder, [], {
            convert: (rowData: AxiosResponse<any, any>): any => {
                return (rowData.data as Array<EventDataModel>).map(eventData => {
                    eventData.id = eventData.eventId
                    if (eventData.status !== undefined) {
                        eventData.status = EventStatus[eventData.status]
                    }
                    return {
                        ...eventData,
                        oddsData: eventData.oddsData.map((oddsData: OddDataModel) => {
                            return {
                                ...oddsData,
                                odds: undefined
                            }
                        })
                    }
                })
            }
        }))
        return response
    }, [apiUrl.eventPins, isMock])

    const updateEventPins = useCallback(async (requestData: AddEventPinsProps): Promise<SuccessFailureIdsModel> => {
        const builder = createRequest(apiUrl.eventPins, Method.post, requestData)
        const response = await (isMock ? mockAddEventPinsData : sendRequest(builder, defaultSuccessFailureIdsModel))
        return response
    }, [apiUrl.eventPins, isMock])

    const getEventMarketSettings = useCallback(async (requestData: GetEventMarketSettingsProps): Promise<EventMarketSettingsModel> => {
        const builder = createRequest(apiUrl.marketSettings, Method.get, requestData)
        const response = await (isMock ? mockEventMarketSettingsData : sendRequest(builder, defaultEventMarketSettingsModel, undefined, true))
        return response
    }, [apiUrl.marketSettings, isMock])

    const updateEventMarketSettings = useCallback(async (requestData: UpdateEventMarketSettingsProp): Promise<SuccessFailureIdsModel> => {
        const builder = createRequest(apiUrl.marketSettings, Method.post, requestData)
        const response = await (isMock ? mockUpdateEventMarketSettingsData : sendRequest(builder, defaultSuccessFailureIdsModel))
        return response
    }, [apiUrl.marketSettings, isMock])

    const updateAutoPayout = useCallback(async (requestData: UpdateAutoPayoutProps): Promise<SuccessFailureIdsModel> => {
        const builder = createRequest(apiUrl.updateAutoPayout, Method.post, requestData)
        const response = await (isMock ? mockUpdateEventMarketSettingsData : sendRequest(builder, defaultSuccessFailureIdsModel))
        return response
    }, [apiUrl.updateAutoPayout, isMock])

    // Play by play log
    const getPlayLogSummary = useCallback(async (requestData: GetPlayLogSummaryProps): Promise<PlayLogSummaryModel> => {
        const builder = createRequest(apiUrl.playLogSummary, Method.get, requestData)
        try {
            return isMock ? mockPlayLogSummary : await sendRequest(builder, defaultPlayLogSummaryModel, undefined, true)
        } catch (e) {
            if (e instanceof ApiError) {
                throw e
            } else {
                throw new ApiError(defaultErrorMsg, -999)
            }
        }
    }, [apiUrl.playLogSummary, isMock])

    const getLineUps = useCallback(async (requestData: GetLineupsProps): Promise<LineupsModel> => {
        const builder = createRequest(apiUrl.lineups, Method.get, requestData)
        try {
            return isMock ? mockLineupsData : await sendRequest(builder, defaultLineupsModel, undefined, true)
        } catch (e) {
            if (e instanceof ApiError) {
                throw e
            } else {
                throw new ApiError(defaultErrorMsg, -999)
            }
        }
    }, [apiUrl.lineups, isMock])

    const getEventPlayLogMatchStats = useCallback(async (requestData: GetEventPlayLogMatchStatsProps): Promise<PlayLogStatisticModel[]> => {
        const builder = createRequest(apiUrl.eventPlayLogMatchStats, Method.get, requestData)
        try {
            return isMock ? mockMatchStats : await sendRequest(builder, [], undefined, true)
        } catch (e) {
            if (e instanceof ApiError) {
                throw e
            } else {
                throw new ApiError(defaultErrorMsg, -999)
            }
        }
    }, [apiUrl.eventPlayLogMatchStats, isMock])

    const getEventPlayLogTimeline = useCallback(async (requestData: GetEventPlayLogTimelineProps): Promise<PlayLogTimelineModel[]> => {
        const builder = createRequest(apiUrl.eventPlayLogTimeline, Method.get, requestData)
        try {
            return isMock
                ? mockTimelineData(requestData.query.sportName)
                : await sendRequest(builder, [], undefined, true)
        } catch (e) {
            if (e instanceof ApiError) {
                throw e
            } else {
                throw new ApiError(defaultErrorMsg, -999)
            }
        }
    }, [apiUrl.eventPlayLogTimeline, isMock])

    const timelineStatuses = useCallback(async (requestData: TimelineStatusesProps): Promise<string[]> => {
        const builder = createRequest(apiUrl.timelineStatuses, Method.get, requestData)
        try {
            return isMock ? mockTimelineStatuses : await sendRequest(builder, [], undefined, true)
        } catch (e) {
            if (e instanceof ApiError) {
                throw e
            } else {
                throw new ApiError(defaultErrorMsg, -999)
            }
        }
    }, [apiUrl.timelineStatuses, isMock])

    // Odds
    const getOddsList = useCallback(async (requestData: OddsListProps): Promise<OddsListModel[]> => {
        const builder = createRequest(apiUrl.oddsList, Method.get, requestData)
        try {
            return (isMock ? mockOddsDataList : await sendRequest(builder, [], {
                convert: (rowData: AxiosResponse<any, any>): any => {
                    rowData.data = (rowData.data as Array<OddsListModel>).map(oddsListModel => {
                        return {
                            ...oddsListModel,
                            odds: oddsListModel.odds.map(odds => {
                                const apiOdds = odds as ApiOddModel
                                return {
                                    baseLine: apiOdds.baseLine,
                                    marketId: apiOdds.marketId,
                                    isMostBalance: apiOdds.isMostBalance,
                                    bets: apiOdds.bets,
                                    oddsSuspendedStatus: apiOdds.status
                                }
                            })
                        }
                    })
                    return rowData.data
                }
            }))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.oddsList, isMock])

    const getMarketBalance = useCallback(async (requestData: MarketBalanceProps): Promise<OddsMarketBalanceModel> => {
        const builder = createRequest(apiUrl.marketBalance, Method.get, requestData)
        try {
            return (isMock ? mockBalanceData : await sendRequest(builder, defaultOddsMarketBalanceModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.marketBalance, isMock])

    const updateOddsMarketStatus = useCallback(async (requestData: OddsMarketStatusProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.oddsMarketStatus, Method.post, requestData)
        try {
            await sendRequest(builder, undefined, undefined, true)
            return {
                isSuccess: true,
                result: intl.formatMessage({
                    id: `${funType}.updateSuccess`,
                    defaultMessage: 'Updated successfully!'
                })
            }
        } catch (e) {
            return {
                isSuccess: false,
                result: defaultErrorMsg
            }
        }
    }, [apiUrl.oddsMarketStatus])

    const updateOddsEventStatus = useCallback(async (requestData: OddsUpdateEventStatusProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.updateOddsEventStatus, Method.post, requestData)
        try {
            await sendRequest(builder, undefined, undefined, true)
            return {
                isSuccess: true,
                result: intl.formatMessage({
                    id: `${funType}.updateSuccess`,
                    defaultMessage: 'Updated successfully!'
                })
            }
        } catch (e) {
            return {
                isSuccess: false,
                result: defaultErrorMsg
            }
        }
    }, [apiUrl.updateOddsEventStatus])

    const setProviderPreference = useCallback(async (requestData: SetProviderPreferenceProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.setProviderPreference, Method.post, requestData)
        try {
            await sendRequest(builder, undefined, undefined, true)
            return {
                isSuccess: true,
                result: intl.formatMessage({
                    id: `${funType}.updateSuccess`,
                    defaultMessage: 'Updated successfully!'
                })
            }
        } catch (e) {
            return {
                isSuccess: false,
                result: defaultErrorMsg
            }
        }
    }, [apiUrl.setProviderPreference])

    const getOddsMargin = useCallback(async (requestData: OddsMarginProps): Promise<OddsMarginModel> => {
        const builder = createRequest(apiUrl.oddsMargin, Method.get, requestData)
        try {
            return (isMock ? mockOddsMargin : await sendRequest(builder, defaultSuccessFailureIdsModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.oddsMargin, isMock])

    const updateOddsMargin = useCallback(async (requestData: UpdateOddsMarginProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.oddsMargin, Method.put, requestData)
        try {
            await (isMock ? {} : sendRequest(builder, undefined, undefined, true))
            return {
                isSuccess: true,
                result: intl.formatMessage({
                    id: `${funType}.updateSuccess`,
                    defaultMessage: 'Updated successfully!'
                })
            }
        } catch (e) {
            return {
                isSuccess: false,
                result: defaultErrorMsg
            }
        }
    }, [apiUrl.oddsMargin, isMock])

    const oddsMarginCalculate = useCallback(async (requestData: OddsMarginCalculateProps): Promise<OddsMarginCalculateModel> => {
        const builder = createRequest(apiUrl.oddsMarginCalculate, Method.post, requestData)
        try {
            return (isMock ? mockOddsMarginCalculate : await sendRequest(builder, defaultOddsMarginCalculateModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.oddsMarginCalculate, isMock])

    // Channel
    const addChannel = useCallback(async (requestData: AddChannelProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.channels, Method.post, requestData)
        try {
            await (isMock ? {} : sendRequest(builder, undefined, undefined, true))
            return {
                isSuccess: true,
                result: intl.formatMessage({
                    id: `${funType}.createSuccess`,
                    defaultMessage: 'Created successfully!'
                })
            }
        } catch (e) {
            return {
                isSuccess: false,
                result: defaultErrorMsg
            }
        }
    }, [apiUrl.channels, isMock])

    const updateChannel = useCallback(async (requestData: UpdateChannelProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.channelDetail, Method.put, requestData)
        try {
            await (isMock ? {} : sendRequest(builder, undefined, undefined, true))
            return {
                isSuccess: true,
                result: intl.formatMessage({
                    id: `${funType}.updateSuccess`,
                    defaultMessage: 'Updated successfully!'
                })
            }
        } catch (e) {
            return {
                isSuccess: false,
                result: defaultErrorMsg
            }
        }
    }, [apiUrl.channelDetail, isMock])

    const getChannelList = useCallback(async (requestData: ChannelListProps): Promise<ChannelListModel> => {
        const builder = createRequest(apiUrl.channels, Method.get, requestData)
        try {
            return (isMock ? mockChannelData : await sendRequest(builder, defaultListResponseModel, {
                convert: (rowData: AxiosResponse<any, any>): any => {
                    const {content} = rowData.data
                    if (content !== undefined) {
                        for (let item of content) {
                            item.id = item.channelId
                            item.status = toChannelStatus(item.status)
                        }
                    }
                    return rowData.data
                }
            }));
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.channels, isMock])

    const getChannelDetail = useCallback(async (requestData: GetChannelDetailProps): Promise<ChannelDetailModel> => {
        const builder = createRequest(apiUrl.channelDetail, Method.get, requestData)
        try {
            return (isMock ? mockChannelDetailData : await sendRequest(builder, defaultChannelDetailModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.channelDetail, isMock])

    const removeChannels = useCallback(async (requestData: RemoveChannelsProps): Promise<SuccessFailureIdsModel> => {
        const builder = createRequest(apiUrl.channels, Method.delete, requestData)
        try {
            return (isMock ? mockRemoveChannelDataOptions[Math.floor(Math.random() * 2)] : await sendRequest(builder, defaultSuccessFailureIdsModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.channels, isMock])

    const updateChannelStatus = useCallback(async (requestData: UpdateChannelStatusProps): Promise<SuccessFailureIdsModel> => {
        const builder = createRequest(apiUrl.updateChannelStatus, Method.put, requestData)
        try {
            return (isMock
                ? mockUpdateChannelDataOptions[Math.floor(Math.random() * 3)]
                : await sendRequest(builder, defaultSuccessFailureIdsModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.updateChannelStatus, isMock])


    const getAvailableOwners = useCallback(async (requestData: GetAvailableOwnerProps): Promise<AvailableOwnerModel> => {
        const builder = createRequest(apiUrl.availableOwner, Method.get, requestData);
        try {
            return (isMock ? mockAvailableOwners : await sendRequest(builder, defaultListResponseModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.availableOwner, isMock])

    // Brands
    const addBrand = useCallback(async (requestData: AddBrandProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.brands, Method.post, requestData)
        try {
            await (isMock ? {} : sendRequest(builder, undefined, undefined, true))
            return {
                isSuccess: true,
                result: intl.formatMessage({
                    id: `${funType}.createSuccess`,
                    defaultMessage: 'Created successfully!'
                })
            }
        } catch (e) {
            return {
                isSuccess: false,
                result: defaultErrorMsg
            }
        }
    }, [apiUrl.brands, isMock])

    const updateBrand = useCallback(async (requestData: UpdateBrandProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.brandDetail, Method.put, requestData)
        try {
            await (isMock ? {} : sendRequest(builder, undefined, undefined, true))
            return {
                isSuccess: true,
                result: intl.formatMessage({
                    id: `${funType}.updateSuccess`,
                    defaultMessage: 'Updated successfully!'
                })
            }
        } catch (e) {
            return {
                isSuccess: false,
                result: defaultErrorMsg
            }
        }
    }, [apiUrl.brandDetail, isMock])

    const getBrandList = useCallback(async (requestData: BrandListProps): Promise<BrandListModel> => {
        const builder = createRequest(apiUrl.brands, Method.get, requestData)
        try {
            return (isMock ? mockBrandData : await sendRequest(builder, defaultListResponseModel, {
                convert: (rowData: AxiosResponse<any, any>): any => {
                    const {content} = rowData.data
                    if (content !== undefined) {
                        for (let item of content) {
                            item.id = item.brandId
                            item.status = toChannelStatus(item.status)
                        }
                    }
                    return rowData.data
                }
            }));
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.brands, isMock])

    const getBrandDetail = useCallback(async (requestData: GetBrandDetailProps): Promise<BrandDetailModel> => {
        const builder = createRequest(apiUrl.brandDetail, Method.get, requestData)
        try {
            return (isMock ? mockBrandDetailData : await sendRequest(builder, defaultBrandDetailModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.brandDetail, isMock])

    const removeBrands = useCallback(async (requestData: RemoveBrandProps): Promise<SuccessFailureIdsModel> => {
        const builder = createRequest(apiUrl.brands, Method.delete, requestData)
        try {
            return (isMock ? mockRemoveBrandsDataOptions[Math.floor(Math.random() * 2)] : await sendRequest(builder, defaultSuccessFailureIdsModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.brands, isMock])

    const updateBrandStatus = useCallback(async (requestData: UpdateBrandStatusProps): Promise<SuccessFailureIdsModel> => {
        const builder = createRequest(apiUrl.updateBrandStatus, Method.put, requestData)
        try {
            return (isMock
                ? mockUpdateBrandDataOptions[Math.floor(Math.random() * 3)]
                : await sendRequest(builder, defaultSuccessFailureIdsModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.updateBrandStatus, isMock])


    // Channel Configuration
    const getChannelConfiguration = useCallback(async (requestData: GetConfigurationProps): Promise<ConfigurationModel> => {
        const builder = createRequest(apiUrl.channelConfiguration, Method.get, requestData)
        try {
            return (isMock ? mockConfigurationData : await sendRequest(builder, defaultConfigurationModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.channelConfiguration, isMock])

    const updateChannelConfiguration = useCallback(async (requestData: UpdateConfigurationProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.channelConfiguration, Method.put, requestData)
        try {
            await (isMock ? mockEmpty : await sendRequest(builder, undefined, undefined, true))
            return {
                isSuccess: true,
                result: intl.formatMessage({
                    id: `${funType}.updateSuccess`,
                    defaultMessage: 'Updated successfully!'
                })
            }
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.channelConfiguration, isMock])

    // Brand Configuration
    const getBrandConfiguration = useCallback(async (requestData: GetConfigurationProps): Promise<ConfigurationModel> => {
        const builder = createRequest(apiUrl.brandConfiguration, Method.get, requestData)
        try {
            return (isMock ? mockConfigurationData : await sendRequest(builder, defaultConfigurationModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.brandConfiguration, isMock])

    const updateBrandConfiguration = useCallback(async (requestData: UpdateBrandConfigurationProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.brandConfiguration, Method.put, requestData)
        try {
            await (isMock ? mockEmpty : await sendRequest(builder, undefined, undefined, true))
            return {
                isSuccess: true,
                result: intl.formatMessage({
                    id: `${funType}.updateSuccess`,
                    defaultMessage: 'Updated successfully!'
                })
            }
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.brandConfiguration, isMock])

    // Audit
    const getAuditActions = useCallback(async (): Promise<string[]> => {
        const builder = createRequest(apiUrl.auditsActions, Method.get)
        try {
            return (isMock ? mockAuditsActions : await sendRequest(builder, []))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.auditsActions, isMock])

    const getAuditList = useCallback(async (requestData: AuditProps): Promise<AuditModel> => {
        const builder = createRequest(apiUrl.audits, Method.get, requestData)
        try {
            return (isMock ? mockAuditData : await sendRequest(builder, defaultListResponseModel, {
                convert: (rowData: AxiosResponse<any, any>): any => {
                    const {content} = rowData.data
                    if (content !== undefined) {
                        for (let i = 0; i < content.length; i++) {
                            content[i].id = i
                        }
                    }
                    return rowData.data
                }
            }));
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.audits, isMock])

    // Notifications
    const getNotificationList = useCallback(async (requestData: NotificationListProps): Promise<NotificationListModel> => {
        const builder = createRequest(apiUrl.notifications, Method.get, requestData);
        try {
            return (isMock ? mockNotificationListData : await sendRequest(builder, defaultListResponseModel, {
                convert: (rowData: AxiosResponse<any, any>): any => {
                    const {content} = rowData.data
                    if (content !== undefined) {
                        for (let item of content) {
                            item.id = item.notificationId
                        }
                    }
                    return rowData.data
                }
            }))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.notifications, isMock])

    const notificationRead = useCallback(async (requestData: NotificationReadStatusProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.notificationsReadStatus, Method.put, requestData);
        try {
            await (isMock ? {} : sendRequest(builder, undefined, undefined, true))
            return {
                isSuccess: true,
                result: intl.formatMessage({
                    id: `${funType}.updateSuccess`,
                    defaultMessage: 'Updated successfully!'
                })
            }
        } catch (e) {
            return {
                isSuccess: false,
                result: defaultErrorMsg
            }
        }
    }, [apiUrl.notificationsReadStatus, isMock])

    const getNotificationUnreadNumber = useCallback(async (): Promise<NotificationUnreadNumberModel> => {
        const builder = createRequest(apiUrl.notificationsUnreadNumber, Method.get);
        return (isMock ? mockNotificationUnreadNumber : await sendRequest(builder, defaultNotificationUnreadNumberModel))
    }, [apiUrl.notificationsUnreadNumber, isMock])

    // Dashboard
    const getPerformance = useCallback(async (requestData: GetPerformanceProps): Promise<PerformanceDataModel[]> => {
        const builder = createRequest(apiUrl.getPerformance, Method.get, requestData);
        return (isMock ? toInfoTypeData(requestData.endPoint.infoType) : await sendRequest(builder, []));
    }, [apiUrl.getPerformance, isMock])

    const generateTokenViaEmail = useCallback(async (requestData: GenerateTokenViaEmailProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.generateTokenViaEmail, Method.get, requestData)
        try {
            await (isMock ? {} : sendRequest(builder, undefined, undefined, true))
            return {
                isSuccess: true,
                result: intl.formatMessage({
                    id: `${funType}.forgotPassword.emailAlreadySent`,
                    defaultMessage: 'Please check your email box.'
                })
            }
        } catch (e) {
            let result = defaultErrorMsg;
            if (e instanceof ApiError && e.errorCode === 88099) {
                result = intl.formatMessage({
                    id: `${funType}.forgotPassword.memberNotExist`,
                    defaultMessage: 'Member does not exist.'
                })
            }
            return {
                isSuccess: false,
                result: result
            }
        }
    }, [apiUrl.generateTokenViaEmail, isMock])

    // Templates
    const getTemplates = useCallback(async (requestData: GetTemplatesProps): Promise<GetTemplateListDataModel> => {
        const builder = createRequest(apiUrl.templates, Method.get, requestData);
        const response = await (isMock ? mockTemplateList : sendRequest(builder, defaultListResponseModel));
        return response
    }, [apiUrl.templates, isMock])

    const getApplyEvents = useCallback(async (requestData: GetApplyEventsProps): Promise<GetApplyEventsDataModel> => {
        const builder = createRequest(apiUrl.applyingEvents, Method.get, requestData);
        const response = await (isMock ? mockApplyEvents : sendRequest(builder, defaultListResponseModel));
        return response
    }, [apiUrl.applyingEvents, isMock])

    const addTemplate = useCallback(async (requestData: AddTemplateProps): Promise<AddTemplateDataModel> => {
        const builder = createRequest(apiUrl.templates, Method.post, requestData);
        try {
            return (isMock ? mockAddTemplatesData : await sendRequest(builder, defaultAddTemplateDataModel, undefined, true))
        } catch (e) {
            let result = defaultErrorMsg
            if (e instanceof ApiError) {
                result = e.message
            }
            throw result
        }
    }, [apiUrl.templates, isMock])

    const removeTemplates = useCallback(async (requestData: RemoveTemplatesProps): Promise<SuccessFailureRemoveTemplate> => {
        const builder = createRequest(apiUrl.templates, Method.delete, requestData);
        try {
            return (isMock ? mockRemoveTemplatesData : await sendRequest(builder, defaultSuccessFailureRemoveTemplate, undefined, true))
        } catch (e) {
            let result = defaultErrorMsg
            if (e instanceof ApiError) {
                result = e.message
            }
            throw result
        }
    }, [apiUrl.templates, isMock])

    const getTemplateDetail = useCallback(async (requestData: GetTemplateDetailProps): Promise<GetTemplateDetailModel> => {
        const builder = createRequest(apiUrl.templatesDetail, Method.get, requestData);
        return (isMock ? mockTemplateDetail : await sendRequest(builder, defaultGetTemplateDetailModel));
    }, [apiUrl.templatesDetail, isMock])

    const updateTemplateDetail = useCallback(async (requestData: UpdateTemplateDetailProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.templatesDetail, Method.put, requestData);
        try {
            await (isMock ? {} : sendRequest(builder, undefined, undefined, true))
            return {
                isSuccess: true,
                result: intl.formatMessage({
                    id: `${funType}.updateSuccess`,
                    defaultMessage: 'Updated successfully!'
                })
            }
        } catch (e) {
            return {
                isSuccess: false,
                result: defaultErrorMsg
            }
        }
    }, [apiUrl.templatesDetail, isMock])

    const getTemplateMarkets = useCallback(async (requestData: GetTemplateMarketsProps): Promise<GetTemplateMarketsDataModel> => {
        const builder = createRequest(apiUrl.templateMarkets, Method.post, requestData);
        const response = await (isMock ? mockTemplateMarkets : sendRequest(builder, defaultListResponseModel));
        return response
    }, [apiUrl.templateMarkets, isMock])

    const getTemplateDefaultConflicts = useCallback(async (requestData: GetTemplateDefaultConflictsProps): Promise<GetTemplateDetailModel[]> => {
        const builder = createRequest(apiUrl.defaultConflict, Method.post, requestData);
        const response = await (isMock ? mockTemplateDefaultConflicts : sendRequest(builder));
        return response
    }, [apiUrl.defaultConflict, isMock])

    const getActivatingItems = useCallback(async (requestData: GetActivatingItemsProps): Promise<GetActivatingItemsDataModel> => {
        const builder = createRequest(apiUrl.activatingItems, Method.get, requestData);
        const response = await (isMock ? mockActivatingItems : sendRequest(builder, defaultListResponseModel));
        return response
    }, [apiUrl.activatingItems, isMock])

    // BetSlips
    const getBetSlipList = useCallback(async (requestData: GetBetSlipsProps): Promise<BetSlipsListModel> => {
        const builder = createRequest(apiUrl.betSlips, Method.post, requestData);
        try {
            return (isMock ? mockBetSlipsData : await sendRequest(builder, defaultListResponseModel, {
                convert: (rowData: AxiosResponse<any, any>): any => {
                    const {content} = rowData.data
                    if (content !== undefined) {
                        for (let i = 0; i < content.length; i++) {
                            content[i].id = i
                        }
                    }
                    return rowData.data
                }
            }));
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.betSlips, isMock])

    const betSlipAcceptance = useCallback(async (requestData: BetSlipAcceptanceProps): Promise<SuccessFailureIdsModel> => {
        const builder = createRequest(apiUrl.betSlipsAcceptance, Method.put, requestData);
        try {
            return (isMock ? mockBetslipAcceptanceData : await sendRequest(builder, defaultSuccessFailureIdsModel));
        } catch (e) {
            throw defaultErrorMsg
        }
    }, [apiUrl.betSlipsAcceptance, isMock])

    const betSlipVoidBetLegs = useCallback(async (requestData: BetSlipVoidBetLegsProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.betSlipVoidBetLegs, Method.put, requestData);
        try {
            return (isMock ? {} : await sendRequest(builder, undefined, undefined, true))
        } catch (e) {
            throw defaultErrorMsg
        }
    }, [apiUrl.betSlipVoidBetLegs, isMock])

    const betSlipExport = useCallback(async (requestData: BetSlipExportProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.betSlipsExport, Method.post, requestData);
        try {
            await (isMock ? {} : sendRequest(builder, undefined, undefined, true))
            return {
                isSuccess: true,
                result: intl.formatMessage({
                    id: `${funType}.betSlip.exportSuccess`, defaultMessage: 'Export successfully!'
                })
            }
        } catch (e) {
            let result
            if (e instanceof ApiError && e.errorCode === 96099) {
                result = intl.formatMessage({
                    id: `${funType}.betSlip.exportNoData`,
                    defaultMessage: 'Not Found'
                })
            }
            return {
                isSuccess: false,
                result: result ?? defaultErrorMsg
            }
        }
    }, [apiUrl.betSlipsExport, isMock])

    const getEventPerformance = useCallback(async (requestData: GetEventPerformanceProps): Promise<PerformanceDataModel[]> => {
        const builder = createRequest(apiUrl.getEventPerformance, Method.get, requestData);
        return (isMock ? toInfoTypeData(requestData.endPoint.infoType) : sendRequest(builder, []));
    }, [apiUrl.getEventPerformance, isMock])

    const getMarketGroups = useCallback(async (requestData: GetMarketGroups): Promise<MarketGroupModel[]> => {
        const builder = createRequest(apiUrl.getMarketGroups, Method.get, requestData);
        const response = await (isMock ? mockMarketGroupData : sendRequest(builder, []));
        return response
    }, [apiUrl.getMarketGroups, isMock])

    // Risk Management
    const getRiskGroups = useCallback(async (requestData: GetRiskGroupsProps): Promise<RiskGroupListModel> => {
        const builder = createRequest(apiUrl.riskGroups, Method.get, requestData)
        try {
            return (isMock ? mockRiskGroupData : await sendRequest(builder, defaultListResponseModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.riskGroups, isMock])

    const addRiskGroup = useCallback(async (requestData: AddRiskGroupProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.riskGroups, Method.post, requestData)
        try {
            await (isMock ? {} : sendRequest(builder, undefined, undefined, true))
            return {
                isSuccess: true,
                result: 'Risk group created successfully.'
            }
        } catch (e) {
            return {
                isSuccess: false,
                result: defaultErrorMsg
            }
        }
    }, [apiUrl.riskGroups, isMock])

    const deleteRiskGroups = useCallback(async (requestData: DeleteRiskGroupsProps): Promise<SuccessFailureIdsModel> => {
        const builder = createRequest(apiUrl.riskGroups, Method.delete, requestData)
        try {
            return (isMock ? mockUpdateEventsStatusData : await sendRequest(builder, defaultSuccessFailureIdsModel, undefined, true))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.riskGroups, isMock])

    const getRiskGroupDetail = useCallback(async (requestData: GetRiskGroupDetailProps): Promise<GetRiskGroupDetailModel> => {
        const builder = createRequest(apiUrl.riskGroupDetail, Method.get, requestData)
        try {
            return (isMock ? getRiskGroupDetailData() : await sendRequest(builder, defaultRiskGroupDetailModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.riskGroupDetail, isMock])

    const updateRiskGroupDetail = useCallback(async (requestData: UpdateRiskGroupDetailProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.riskGroupDetail, Method.put, requestData)
        try {
            await (isMock ? {} : await sendRequest(builder, undefined, undefined, true))
            return {
                isSuccess: true,
                result: 'Risk group updated successfully.'
            }
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.riskGroupDetail, isMock])

    const getRiskGroupsApplyingPunters = useCallback(async (requestData: RiskGroupsApplyingPuntersProps): Promise<RiskGroupsApplyingPuntersListModel> => {
        const builder = createRequest(apiUrl.riskGroupsApplyingPunters, Method.get, requestData)
        try {
            return (isMock ? mockRiskGroupsApplyingPuntersData : await sendRequest(builder, defaultListResponseModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.riskGroupsApplyingPunters, isMock])

    const updateRiskGroupApply = useCallback(async (requestData: UpdateRiskGroupApplyProps): Promise<SuccessFailureIdsModel> => {
        const builder = createRequest(apiUrl.updateRiskGroupApply, Method.put, requestData)
        try {
            return (isMock ? mockUpdateEventsStatusData : await sendRequest(builder, defaultSuccessFailureIdsModel, undefined, true))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [])

    // RiskMembers
    const getRiskMembers = useCallback(async (requestData: GetRiskMembersProps): Promise<RiskMembersListModel> => {
        const builder = createRequest(apiUrl.riskMembers, Method.get, requestData)
        try {
            return (isMock ? mockRiskMembersData : await sendRequest(builder, defaultListResponseModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.riskMembers, isMock])

    const getRiskMembersBetSlips = useCallback(async (requestData: GetRiskMembersBetSlipsProps): Promise<RiskMembersBetSlipsListModel> => {
        const builder = createRequest(apiUrl.riskMembersBetSlips, Method.get, requestData)
        try {
            return (isMock ? mockRiskMembersBetSlipsData : await sendRequest(builder, defaultListResponseModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.riskMembersBetSlips, isMock])

    const getRiskMembersPerformanceTotalAmount = useCallback(async (requestData: GetRiskMembersPerformanceProps): Promise<RiskMembersPerformanceModel> => {
        const builder = createRequest(apiUrl.riskMembersPerformanceTotalAmount, Method.get, requestData)
        try {
            return (isMock ? mockRiskMembersPerformanceTotalAmountData : await sendRequest(builder, defaultRiskMembersPerformanceModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.riskMembersPerformanceTotalAmount, isMock])

    const getRiskMembersPerformanceWinLossRate = useCallback(async (requestData: GetRiskMembersPerformanceProps): Promise<RiskMembersPerformanceModel> => {
        const builder = createRequest(apiUrl.riskMembersPerformanceWinLossRate, Method.get, requestData)
        try {
            return (isMock ? mockRiskMembersPerformanceWinLossRateData : await sendRequest(builder, defaultRiskMembersPerformanceModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.riskMembersPerformanceWinLossRate, isMock])

    // Tags
    const getTags = useCallback(async (requestData: GetTagsProps): Promise<TagsListModel> => {
        const builder = createRequest(apiUrl.tags, Method.get, requestData)
        try {
            return (isMock ? mockTagsList : await sendRequest(builder, defaultListResponseModel))
        } catch (e) {
            throw defaultErrorMsg;
        }
    }, [apiUrl.tags, isMock])

    const updateTagsApply = useCallback(async (requestData: UpdateTagsApplyProps): Promise<ApiResponse<string>> => {
        const builder = createRequest(apiUrl.tagsApply, Method.put, requestData)
        try {
            await (isMock ? {} : sendRequest(builder, undefined, undefined, true))
            return {
                isSuccess: true,
                result: intl.formatMessage({
                    id: `${funType}.updateSuccess`,
                    defaultMessage: 'Updated successfully!'
                })
            }
        } catch (e) {
            return {
                isSuccess: false,
                result: defaultErrorMsg
            }
        }
    }, [apiUrl.tagsApply, isMock])


    return {
        placeBet,
        triggerDangerBall,
        getVendorEventId,
        userLogin,
        userLogout,
        getMemberList,
        getSingleMemberInfo,
        updateMemberInfo,
        getSportsCategories,
        getProviders,
        getMarkets,
        getProviderInformation,
        getEventList,
        getLeagues,
        getLocations,
        getDisplayTypes,
        getEventMarketDetail,
        getEventDetail,
        getPlayLogSummary,
        getEventMarketSettings,
        updateEventMarketSettings,
        getOddsList,
        getMarketBalance,
        updateOddsMarketStatus,
        updateOddsEventStatus,
        setProviderPreference,
        getOddsMargin,
        updateOddsMargin,
        oddsMarginCalculate,
        addChannel,
        updateChannel,
        getChannelList,
        removeChannels,
        updateChannelStatus,
        getAvailableOwners,
        addBrand,
        updateBrand,
        getBrandList,
        removeBrands,
        updateBrandStatus,
        getBrandDetail,
        addMembers,
        deleteMembers,
        getMemberRoles,
        getAuditActions,
        getAuditList,
        getNotificationList,
        notificationRead,
        getNotificationUnreadNumber,
        getChannelDetail,
        updateMembersStatus,
        resetPassword,
        resetPwdWithOld,
        getEventStatus,
        updateEventsStatus,
        getEventPins,
        updateEventPins,
        updateAutoPayout,
        getPerformance,
        generateTokenViaEmail,
        getTemplates,
        addTemplate,
        removeTemplates,
        getTemplateDetail,
        updateTemplateDetail,
        getApplyEvents,
        getLineUps,
        getEventPlayLogMatchStats,
        getEventPlayLogTimeline,
        timelineStatuses,
        getDangerBalls,
        getChannelConfiguration,
        updateChannelConfiguration,
        getBrandConfiguration,
        updateBrandConfiguration,
        getBetSlipList,
        betSlipAcceptance,
        betSlipVoidBetLegs,
        betSlipExport,
        getTemplateMarkets,
        getTemplateDefaultConflicts,
        getEventPerformance,
        getRiskGroups,
        addRiskGroup,
        deleteRiskGroups,
        getRiskGroupDetail,
        updateRiskGroupDetail,
        getRiskGroupsApplyingPunters,
        updateRiskGroupApply,
        getRiskMembers,
        getRiskMembersBetSlips,
        getRiskMembersPerformanceTotalAmount,
        getRiskMembersPerformanceWinLossRate,
        getTags,
        updateTagsApply,
        getActivatingItems,
        getMarketGroups
    };
};

export default useApiInteractor;
