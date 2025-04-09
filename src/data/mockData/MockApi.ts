import {
    mockDangerBalls,
    mockDisplayTypes,
    mockLeague,
    mockLocations,
    mockMarkets,
    mockMemberList,
    mockMemberRoles,
    mockProviderInformation,
    mockProviders,
    mockSingleMember,
    mockSportCategories
} from "@/data/mockData/common/MockRowData";
import {mockEventList, mockEventPins} from "@/data/mockData/event/MockEventRowData";
import {
    mockBalanceData,
    mockEventDetail,
    mockMarketsList,
    mockOddsDataList
} from "@/data/mockData/event/MockEventDetailData";
import {
    mockAddEventPinsData,
    mockAvailableOwners,
    mockChannelData,
    mockChannelDetailData,
    mockConfigurationData,
    mockRemoveChannelDataOptions,
    mockUpdateChannelDataOptions,
    mockUpdateEventsStatusData
} from "@/data/mockData/channel/MockChannelData";
import {mockEmpty} from "@/data/mockData/common/EmptyData";
import ApiUrlBuilder from "@/services/@core/module/ApiUrlBuilder";
import {mockAuditData, mockAuditsActions} from "@/data/mockData/audit/AuditData";
import {mockNotificationListData} from "@/data/mockData/notifications/NotificationListData";
import {
    mockEventMarketSettingsData,
    mockUpdateEventMarketSettingsPartialSuccessData
} from "@/data/mockData/event/MockEventMarketSettingsData";
import {
    mockActivatingItems,
    mockApplyEvents,
    mockTemplateDetail,
    mockTemplateList,
    mockTemplateMarkets
} from "@/data/mockData/template/MockTemplateList";
import {
    mockLineupsData,
    mockMatchStats,
    mockPlayLogSummary,
    mockTimelineData,
    mockTimelineStatuses
} from "@/data/mockData/event/MockPlayLogData";
import {mockBetSlipsData} from "@/data/mockData/betslips/MockBetSlipsData";
import {toInfoTypeData} from "@/data/mockData/dashboard/MockPerformanceData";
import {InfoType} from "@/services/@core/module/Enum";
import {mockBrandData, mockBrandDetailData, mockRemoveBrandsDataOptions} from "@/data/mockData/brands/MockBrandData";
import {mockOddsMargin} from "@/data/mockData/odds/MockMarginData";
import {Method} from "@/services/@core/RequestBuilder";
import {
    getRiskGroupDetailData, mockMarketGroupData,
    mockRiskGroupData,
    mockRiskGroupsApplyingPuntersData,
    mockUpdateRiskGroupApplyData
} from "@/data/mockData/riskGroup/MockRiskGroupData";
import {mockTagsList} from "@/data/mockData/tags/MockTagsListData";
import {
    mockRiskMembersBetSlipsData,
    mockRiskMembersData,
    mockRiskMembersPerformanceTotalAmountData, mockRiskMembersPerformanceWinLossRateData
} from "@/data/mockData/riskMember/MockRiskMemberData";

const MockApi = () => {

    function replaceDynamicPlaceholder(url: string): string {
        return url.replace(/{([^}]+)}/g, ':$1');
    }

    function replacePlaceholderWithValue(url: string, value: string | string[]): string {
        if (Array.isArray(value)) {
            let index = 0;
            return url.replace(/{[^}]+}/g, () => value[index++] || '');
        }
        return url.replace(/{[^}]+}/g, value);
    }

    const sportsCategories = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.sportsCategories),
        method: "GET",
        status: 200,
        response: mockSportCategories
    }

    const eventList = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.eventList) + '?eventType=:eventType&sportId=:sportId&page=:page&pageSize=:pageSize',
        method: "GET",
        status: 200,
        response: (request: any) => {
            const {searchParams} = request;
            const {page, pageSize} = searchParams;
            const first = Number(page - 1) * Number(pageSize)
            const last = first + Number(pageSize)
            return {
                totalElements: mockEventList.totalElements,
                content: mockEventList.content.slice(first, last)
            }
        }
    }

    const getProviders = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.providers),
        method: 'GET',
        status: 200,
        response: mockProviders
    }

    const getProvidersWithSportId = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.providers) + `?sportId=:sportId`,
        method: 'GET',
        status: 200,
        response: mockProviders
    }

    const getProviderInformation = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.providerInformation) + `?page=:page&pageSize=:pageSize&sportId=:sportId`,
        method: 'GET',
        status: 200,
        response: mockProviderInformation
    }

    const getProviderInformationWithProvider = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.providerInformation) + `?page=:page&pageSize=:pageSize&sportId=:sportId&search=:search`,
        method: 'GET',
        status: 200,
        response: mockProviderInformation
    }

    const getProviderInformationWithFullSearch = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.providerInformation) + `?page=:page&pageSize=:pageSize&sportId=:sportId&search=:search&status=:status`,
        method: 'GET',
        status: 200,
        response: mockProviderInformation
    }

    const locations = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.locations) + `?sportId=:sportId`,
        method: "GET",
        status: 200,
        response: mockLocations
    }

    const getSingleMemberInfoWithoutID = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.member),
        method: "GET",
        status: 200,
        response: mockSingleMember
    }

    const getSingleMemberInfo = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.member) + '/:uuid',
        method: "GET",
        status: 200,
        response: mockSingleMember
    }

    const updateMemberInfo = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.member) + '/:uuid',
        method: "PUT",
        status: 200,
        response: mockEmpty
    }
    const getMemberList = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.member) + "?page=:page&pageSize=:pageSize&functionality=:functionality",
        method: "GET",
        status: 200,
        response: mockMemberList
    }

    const getMemberListForPermission = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.members) + "?page=:page&pageSize=:pageSize",
        method: "GET",
        status: 200,
        response: mockMemberList
    }

    const addMember = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.member),
        method: "POST",
        status: 200,
        response: mockEmpty
    }

    const getMemberListForChannel = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.members) + "?page=:page&pageSize=:pageSize&roles=Channel%20Admin",
        method: "GET",
        status: 200,
        response: mockMemberList
    }

    const removeMembers = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.member),
        method: "DELETE",
        status: 200,
        response: mockEmpty
    }

    const updateMembers = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.singleMember),
        method: "PUT",
        status: 200,
        response: mockEmpty
    }

    const updateMembersStatus = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.updateMembersStatus),
        method: "PUT",
        status: 200,
        response: mockEmpty
    }

    const getMemberRoles = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.getMemberRoles),
        method: "GET",
        status: 200,
        response: mockMemberRoles
    }

    const leagues = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.leagues) + `?sportIds=:sportId`,
        method: "GET",
        status: 200,
        response: mockLeague
    }

    const displayTypes = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.displayType),
        method: "GET",
        status: 200,
        response: mockDisplayTypes
    }

    const marketBalance = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.marketBalance) + "?marketId=:marketId&eventId=:eventId",
        method: "GET",
        status: 200,
        response: mockBalanceData
    }

    const oddsList = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.oddsList)}?eventId=:eventId&eventType=:eventType`,
        method: "GET",
        status: 200,
        response: mockOddsDataList
    }

    const oddsList1 = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.oddsList)}?eventId=:eventId&marketIds=:marketIds&eventType=:eventType`,
        method: "GET",
        status: 200,
        response: mockOddsDataList
    }

    const oddsList2 = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.oddsList)}?eventId=:eventId&marketIds=:marketIds&marketIds%5B1%5D=:marketIds&eventType=:eventType`,
        method: "GET",
        status: 200,
        response: mockOddsDataList
    }

    const oddsMargin = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.oddsMargin) + '?eventId=:eventId&marketId=:marketId',
        method: "GET",
        status: 200,
        response: mockOddsMargin
    }

    const eventMarketDetail = {
        url: replaceDynamicPlaceholder(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.eventMarketDetail)) + '?eventType=:eventType',
        method: "GET",
        status: 200,
        response: mockMarketsList
    }

    const eventDetail = {
        url: replaceDynamicPlaceholder(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.eventDetail)),
        method: "GET",
        status: 200,
        response: mockEventDetail
    }

    const updateEventsStatus = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.updateEventsStatus),
        method: "POST",
        status: 200,
        response: mockUpdateEventsStatusData
    }

    const getEventMarketSettings = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.marketSettings) + '?eventId=:eventId',
        method: "GET",
        status: 200,
        response: mockEventMarketSettingsData
    }

    const updateEventMarketSettings = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.marketSettings),
        method: "POST",
        status: 200,
        response: mockUpdateEventMarketSettingsPartialSuccessData
    }

    const getChannelList = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.channels)}?page=:page&pageSize=:pageSize`,
        method: "GET",
        status: 200,
        response: mockChannelData
    }

    const getBrandList = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.brands)}?page=:page&pageSize=:pageSize`,
        method: "GET",
        status: 200,
        response: mockBrandData
    }

    const getChannelListWithLocation = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.channels)}?page=:page&pageSize=:pageSize&location=:location`,
        method: "GET",
        status: 200,
        response: mockChannelData
    }

    const getBrandListWithLocation = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.brands)}?page=:page&pageSize=:pageSize&location=:location`,
        method: "GET",
        status: 200,
        response: mockBrandData
    }

    const getChannelListWithDate = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.channels)}?page=:page&pageSize=:pageSize&startDate=:startDate&endDate=:endDate`,
        method: "GET",
        status: 200,
        response: mockChannelData
    }

    const getBrandListWithDate = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.brands)}?page=:page&pageSize=:pageSize&startDate=:startDate&endDate=:endDate`,
        method: "GET",
        status: 200,
        response: mockBrandData
    }

    const getChannelListWithLocationDate = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.channels)}?page=:page&pageSize=:pageSize&location=:location&startDate=:startDate&endDate=:endDate`,
        method: "GET",
        status: 200,
        response: mockChannelData
    }

    const getBrandListWithLocationDate = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.brands)}?page=:page&pageSize=:pageSize&location=:location&startDate=:startDate&endDate=:endDate`,
        method: "GET",
        status: 200,
        response: mockBrandData
    }

    const addChannel = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.channels),
        method: "POST",
        status: 200,
        response: mockEmpty
    }

    const updateChannel = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.channels) + '/:channelId',
        method: "PUT",
        status: 200,
        response: mockEmpty
    }

    const removeChannels = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.channels),
        method: "DELETE",
        status: 200,
        response: mockRemoveChannelDataOptions[Math.floor(Math.random() * 2)]
    }

    const removeBrands = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.brands),
        method: "DELETE",
        status: 200,
        response: mockRemoveBrandsDataOptions[Math.floor(Math.random() * 2)]
    }

    const updateChannelsStatus = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.updateChannelStatus),
        method: "PUT",
        status: 200,
        response: mockUpdateChannelDataOptions[Math.floor(Math.random() * 3)]
    }

    const updateBrandsStatus = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.updateBrandStatus),
        method: "PUT",
        status: 200,
        response: mockUpdateChannelDataOptions[Math.floor(Math.random() * 3)]
    }

    const getAvailableOwners = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.availableOwner) + '?page=1&pageSize=20&functionality=:functionality',
        method: "GET",
        status: 200,
        response: mockAvailableOwners
    }

    const addBrand = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.brands),
        method: "POST",
        status: 200,
        response: mockEmpty
    }

    const updateBrand = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.brands) + '?brandId=:brandId',
        method: "PUT",
        status: 200,
        response: mockEmpty
    }

    const getBrandDetail = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.brands) + '?brandId=:brandId',
        method: "GET",
        status: 200,
        response: mockBrandDetailData
    }

    const getAuditActions = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.auditsActions),
        method: "GET",
        status: 200,
        response: mockAuditsActions
    }

    const getAuditList = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.audits) + "?page=:page&pageSize=:pageSize",
        method: "GET",
        status: 200,
        response: mockAuditData
    }

    const getAuditListWithSearchActions = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.audits) + "?page=:page&pageSize=:pageSize" +
            "&actions=:actions",
        method: "GET",
        status: 200,
        response: mockAuditData
    }

    const getAuditListWithSearchDate = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.audits) + "?page=:page&pageSize=:pageSize" +
            "&startDate=:startDate&endDate=:endDate",
        method: "GET",
        status: 200,
        response: mockAuditData
    }

    const getAuditListWithSearchActionsAndDate = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.audits) + "?page=:page&pageSize=:pageSize" +
            "&actions=:actions&startDate=:startDate&endDate=:endDate",
        method: "GET",
        status: 200,
        response: mockAuditData
    }

    const getNotificationList = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.notifications) + '?page=:page&pageSize=:pageSize',
        method: "GET",
        status: 200,
        response: mockNotificationListData
    }

    const readStatus = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.notificationsReadStatus),
        method: "PUT",
        status: 200,
        response: mockNotificationListData
    }

    const getChannelDetail = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.channels) + '/:channelId',
        method: "GET",
        status: 200,
        response: mockChannelDetailData
    }

    const resetPassword = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.resetPassword),
        method: "POST",
        status: 200,
        response: mockEmpty
    }

    const eventPins = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.eventPins)}?sportId=:sportId&eventType=:eventType`,
        method: "GET",
        status: 200,
        response: mockEventPins
    }

    const updateEventPints = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.eventPins),
        method: "POST",
        status: 200,
        response: mockAddEventPinsData
    }

    const getTemplates = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.templates) + '?eventType=eventType&page=page&pageSize=pageSize',
        method: "GET",
        status: 200,
        response: mockTemplateList
    }

    const addTemplate = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.templates),
        method: "POST",
        status: 200,
        response: mockEmpty
    }

    const removeTemplates = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.templates),
        method: "DELETE",
        status: 200,
        response: mockEmpty
    }

    const getTemplateDetail = {
        url: replaceDynamicPlaceholder(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.templatesDetail)),
        method: "GET",
        status: 200,
        response: mockTemplateDetail
    }

    const updateTemplateDetail = {
        url: replaceDynamicPlaceholder(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.templatesDetail)),
        method: "PUT",
        status: 200,
        response: mockEmpty
    }

    const getTemplateMarkets = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.templateMarkets) + "?page=page&pageSize=pageSize",
        method: "GET",
        status: 200,
        response: mockTemplateMarkets
    }

    const playLogSummary = {
        url: replaceDynamicPlaceholder(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.playLogSummary)),
        method: "GET",
        status: 200,
        response: mockPlayLogSummary
    }

    const getLineups = {
        url: replaceDynamicPlaceholder(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.lineups)),
        method: "GET",
        status: 200,
        response: mockLineupsData
    }

    const getEventPlayLogTimeline = {
        url: `${replaceDynamicPlaceholder(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.eventPlayLogTimeline))}?sportType=:sportType`,
        method: "GET",
        status: 200,
        response: mockTimelineData("SOCCER")
    }

    const timelineStatuses = {
        url: replaceDynamicPlaceholder(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.timelineStatuses)),
        method: "GET",
        status: 200,
        response: mockTimelineStatuses
    }

    const getApplyEvents = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.applyingEvents) + '?eventType=eventType&page=page&pageSize=pageSize&templateId=templateId',
        method: "GET",
        status: 200,
        response: mockApplyEvents
    }

    const getMatchStats = {
        url: replaceDynamicPlaceholder(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.eventPlayLogMatchStats)),
        method: "GET",
        status: 200,
        response: mockMatchStats
    }

    const getLeaguesWithSportId = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.leagues) + '?page=1&pageSize=20&sportIds=sportId',
        method: "GET",
        status: 200,
        response: mockLeague
    }

    const getLeagues = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.leagues) + '?page=1&pageSize=20',
        method: "GET",
        status: 200,
        response: mockLeague
    }

    const getDangerBallList = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.dangerBalls),
        method: "GET",
        status: 200,
        response: mockDangerBalls
    }

    const getConfiguration = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.channelConfiguration) + '?eventType=:eventType',
        method: "GET",
        status: 200,
        response: mockConfigurationData
    }

    const updateConfiguration = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.channelConfiguration) + '?eventType=:eventType',
        method: "PUT",
        status: 200,
        response: mockEmpty
    }

    const getBrandConfiguration = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.brandConfiguration) + '?eventType=:eventType',
        method: "GET",
        status: 200,
        response: mockConfigurationData
    }

    const updateBrandConfiguration = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.brandConfiguration) + '?eventType=:eventType',
        method: "PUT",
        status: 200,
        response: mockEmpty
    }

    const getBetSlipList = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.betSlips),
        method: "POST",
        status: 200,
        response: mockBetSlipsData
    }

    const betSlipExport = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.betSlipsExport),
        method: "POST",
        status: 200,
        response: mockEmpty
    }

    const getMarkets = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.markets) + '?page=:page&pageSize=:pageSize',
        method: "GET",
        status: 200,
        response: (request: any) => {
            const {searchParams} = request;
            const {page, pageSize} = searchParams;
            const first = Number(page - 1) * Number(pageSize)
            const total = mockMarkets.totalElements
            const last = Math.min(total - 1, first + Number(pageSize) - 1)
            return {
                totalElements: total,
                content: mockMarkets.content.slice(0, last - first + 1).map((model, index) => {
                    const num = first + index
                    if (num < 6) return model
                    return {
                        marketId: `id_${num}`,
                        marketName: `fake_market_${num}`
                    }
                })
            }
        }
    }

    const getMarketsWithSearch = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.markets) + '?page=:page&pageSize=:pageSize&search=:search',
        method: "GET",
        status: 200,
        response: (request: any) => {
            const {searchParams} = request;
            const {page, pageSize, search} = searchParams;
            const first = Number(page - 1) * Number(pageSize)
            const total = mockMarkets.totalElements
            const last = Math.min(total - 1, first + Number(pageSize) - 1)
            const allContent = mockMarkets.content.map((model, index) => {
                const num = index
                if (num < 6) return model
                return {
                    marketId: `id_${num}`,
                    marketName: `fake_market_${num}`
                }
            }).filter(model => model.marketName.toLowerCase().includes(search.toLowerCase()))

            return {
                totalElements: allContent.length,
                content: allContent.slice(first, last + 1)
            }
        }
    }

    const getEventPerformanceDevice = {
        url: `${replacePlaceholderWithValue(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.getEventPerformance), [InfoType.Device, ':eventId'])}`,
        method: "GET",
        status: 200,
        response: toInfoTypeData(InfoType.Device)
    }

    const getEventPerformanceBetSlips = {
        url: `${replacePlaceholderWithValue(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.getEventPerformance), [InfoType.BetSlips, ':eventId'])}`,
        method: "GET",
        status: 200,
        response: toInfoTypeData(InfoType.BetSlips)
    }
    const getEventPerformanceSports = {
        url: `${replacePlaceholderWithValue(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.getEventPerformance), [InfoType.Sports, ':eventId'])}`,
        method: "GET",
        status: 200,
        response: toInfoTypeData(InfoType.Sports)
    }
    const getEventPerformanceImbalance = {
        url: `${replacePlaceholderWithValue(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.getEventPerformance), [InfoType.Imbalance, ':eventId'])}`,
        method: "GET",
        status: 200,
        response: toInfoTypeData(InfoType.Imbalance)
    }
    const getEventPerformanceLeague = {
        url: `${replacePlaceholderWithValue(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.getEventPerformance), [InfoType.League, ':eventId'])}`,
        method: "GET",
        status: 200,
        response: toInfoTypeData(InfoType.League)
    }
    const getEventPerformanceMarket = {
        url: `${replacePlaceholderWithValue(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.getEventPerformance), [InfoType.Market, ':eventId'])}`,
        method: "GET",
        status: 200,
        response: toInfoTypeData(InfoType.Market)
    }

    const getPerformanceDevice = {
        url: `${replacePlaceholderWithValue(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.getPerformance), InfoType.Device)}?startDate=:startDate&endDate=:endDate`,
        method: "GET",
        status: 200,
        response: toInfoTypeData(InfoType.Device)
    }
    const getPerformanceBetSlips = {
        url: `${replacePlaceholderWithValue(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.getPerformance), InfoType.BetSlips)}?startDate=:startDate&endDate=:endDate&betType=:betType`,
        method: "GET",
        status: 200,
        response: toInfoTypeData(InfoType.BetSlips)
    }
    const getPerformanceSports = {
        url: `${replacePlaceholderWithValue(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.getPerformance), InfoType.Sports)}?startDate=:startDate&endDate=:endDate`,
        method: "GET",
        status: 200,
        response: toInfoTypeData(InfoType.Sports)
    }
    const getPerformanceImbalance = {
        url: `${replacePlaceholderWithValue(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.getPerformance), InfoType.Imbalance)}?startDate=:startDate&endDate=:endDate`,
        method: "GET",
        status: 200,
        response: toInfoTypeData(InfoType.Imbalance)
    }
    const getPerformanceLeague = {
        url: `${replacePlaceholderWithValue(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.getPerformance), InfoType.League)}?startDate=:startDate&endDate=:endDate`,
        method: "GET",
        status: 200,
        response: toInfoTypeData(InfoType.League)
    }
    const getPerformanceMarket = {
        url: `${replacePlaceholderWithValue(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.getPerformance), InfoType.Market)}?startDate=:startDate&endDate=:endDate`,
        method: "GET",
        status: 200,
        response: toInfoTypeData(InfoType.Market)
    }
    const generateTokenViaEmail = {
        url: replaceDynamicPlaceholder(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.generateTokenViaEmail)),
        method: "GET",
        status: 200,
        response: mockEmpty
    }
    const getRiskGroups = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.riskGroups)}?page=:page&pageSize=:pageSize`,
        method: "GET",
        status: 200,
        response: mockRiskGroupData
    }
    const getRiskGroupsWithRandomData = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.riskGroups)}?page=:page&pageSize=:pageSize`,
        method: "GET",
        status: 200,
        response: (request: any) => {
            const {searchParams} = request;
            const {page, pageSize} = searchParams;
            const first = Number(page - 1) * Number(pageSize)
            const total = mockRiskGroupData.totalElements
            const last = Math.min(total - 1, first + Number(pageSize) - 1)
            return {
                totalElements: total,
                content: mockRiskGroupData.content.slice(0, last - first + 1).map((model, index) => {
                    const num = first + index
                    return {
                        riskId: `id_${num}`,
                        riskName: `fake_risk_${num}`,
                        riskColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                        punterNumber: 100,
                        tags: []
                    }
                })
            }
        }
    }

    const getRiskGroupsApplyingPunters = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.riskGroupsApplyingPunters)}?riskId=:riskId&page=:page&pageSize=:pageSize`,
        method: Method.get,
        status: 200,
        response: mockRiskGroupsApplyingPuntersData
    }

    const updateRiskGroupApply = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.updateRiskGroupApply),
        method: Method.put,
        status: 200,
        response: mockUpdateRiskGroupApplyData
    }

    const getRiskMembers = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.riskMembers)}?page=:page&pageSize=:pageSize`,
        method: Method.get,
        status: 200,
        response: mockRiskMembersData
    }

    const getSingleRiskMembers = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.riskMembers)}?page=:page&pageSize=:pageSize&searchKey=:searchKey&searchValue=:searchValue`,
        method: Method.get,
        status: 200,
        response: {
            totalElements: 1,
            content: [mockRiskMembersData.content[1]]
        }
    }

    const getTagsWithRandomData = {
        url: `${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.tags)}?page=:page&pageSize=:pageSize`,
        method: "GET",
        status: 200,
        response: (request: any) => {
            const {searchParams} = request;
            const {page, pageSize} = searchParams;
            const first = Number(page - 1) * Number(pageSize)
            const total = mockTagsList.totalElements
            const last = Math.min(total - 1, first + Number(pageSize) - 1)
            return {
                totalElements: total,
                content: mockTagsList.content.slice(0, last - first + 1).map((model, index) => {
                    const num = first + index
                    return {
                        tagId: `id_${num}`,
                        tagName: `fake_tag_${num}`,
                        tagType: ''
                    }
                })
            }
        }
    }

    const updateTagsApply = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.tagsApply),
        method: "PUT",
        status: 200,
        response: mockEmpty
    }

    const getRiskGroupDetail = {
        url: replaceDynamicPlaceholder(ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.riskGroupDetail)),
        method: "GET",
        status: 200,
        response: getRiskGroupDetailData
    }

    const getRiskMembersBetSlips = {
        url: replaceDynamicPlaceholder(`${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.riskMembersBetSlips)}?punterId=:punterId&page=:page&pageSize=:pageSize&startDate=:startDate&endDate=:endDate`),
        method: "GET",
        status: 200,
        response: mockRiskMembersBetSlipsData
    }

    const getRiskMembersPerformanceTotalAmount = {
        url: replaceDynamicPlaceholder(`${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.riskMembersPerformanceTotalAmount)}?punterId=:punterId&startDate=:startDate&endDate=:endDate&dimensions=:dimensions`),
        method: "GET",
        status: 200,
        response: mockRiskMembersPerformanceTotalAmountData
    }

    const getRiskMembersPerformanceWinLossRate = {
        url: replaceDynamicPlaceholder(`${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.riskMembersPerformanceWinLossRate)}?punterId=:punterId&startDate=:startDate&endDate=:endDate`),
        method: "GET",
        status: 200,
        response: mockRiskMembersPerformanceWinLossRateData
    }

    const getActivatingItems = {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.activatingItems) + '?templateId=templateId&pageSize=pageSize&page=page&searchType=searchType',
        method: "GET",
        status: 200,
        response: mockActivatingItems
    }

    const getMarketGroups = {
        url: replaceDynamicPlaceholder(`${ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.getMarketGroups)}?eventType=:eventType&sportId=:sportId`),
        method: "GET",
        status: 200,
        response: mockMarketGroupData
    }

    return {
        sportsCategories,
        eventList,
        getProviders,
        getProvidersWithSportId,
        getProviderInformation,
        getProviderInformationWithProvider,
        getProviderInformationWithFullSearch,
        locations,
        leagues,
        displayTypes,
        marketBalance,
        oddsList,
        oddsList1,
        oddsList2,
        oddsMargin,
        eventMarketDetail,
        eventDetail,
        updateEventsStatus,
        getEventMarketSettings,
        updateEventMarketSettings,
        getSingleMemberInfo,
        getSingleMemberInfoWithoutID,
        updateMemberInfo,
        getMemberList,
        addMember,
        removeMembers,
        updateMembers,
        addChannel,
        updateChannel,
        getChannelList,
        getChannelListWithLocation,
        getChannelListWithDate,
        getChannelListWithLocationDate,
        getChannelDetail,
        removeChannels,
        updateChannelsStatus,
        addBrand,
        updateBrand,
        getBrandDetail,
        getAvailableOwners,
        getMemberRoles,
        getAuditActions,
        getAuditList,
        getAuditListWithSearchActions,
        getAuditListWithSearchDate,
        getAuditListWithSearchActionsAndDate,
        getNotificationList,
        readStatus,
        getMemberListForChannel,
        getMemberListForPermission,
        updateMembersStatus,
        resetPassword,
        eventPins,
        updateEventPints,
        getTemplates,
        addTemplate,
        removeTemplates,
        getTemplateDetail,
        updateTemplateDetail,
        playLogSummary,
        getApplyEvents,
        getLineups,
        getEventPlayLogTimeline,
        timelineStatuses,
        getMatchStats,
        getLeagues,
        getDangerBallList,
        getConfiguration,
        updateConfiguration,
        getBrandConfiguration,
        updateBrandConfiguration,
        getBetSlipList,
        betSlipExport,
        getMarkets,
        getTemplateMarkets,
        getMarketsWithSearch,
        getLeaguesWithSportId,
        getEventPerformanceDevice,
        getEventPerformanceBetSlips,
        getEventPerformanceSports,
        getEventPerformanceImbalance,
        getEventPerformanceLeague,
        getEventPerformanceMarket,
        getPerformanceDevice,
        getPerformanceBetSlips,
        getPerformanceSports,
        getPerformanceImbalance,
        getPerformanceLeague,
        getPerformanceMarket,
        generateTokenViaEmail,
        getBrandList,
        getBrandListWithLocation,
        getBrandListWithDate,
        getBrandListWithLocationDate,
        removeBrands,
        updateBrandsStatus,
        getRiskGroups,
        getRiskGroupsWithRandomData,
        getRiskGroupsApplyingPunters,
        updateRiskGroupApply,
        getRiskMembers,
        getSingleRiskMembers,
        getTagsWithRandomData,
        updateTagsApply,
        getRiskGroupDetail,
        getRiskMembersBetSlips,
        getRiskMembersPerformanceTotalAmount,
        getRiskMembersPerformanceWinLossRate,
        getActivatingItems,
        getMarketGroups
    }
}

export default MockApi