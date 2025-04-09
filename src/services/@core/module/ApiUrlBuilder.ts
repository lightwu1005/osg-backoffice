// UrlInterface.ts
import Builder from "@/config/Builder";

export interface UrlInterface {
    baseUrl: string;
    url: string;
}

const ApiDomainType = {
    // Set mock server domain same with gateway is to let the mock api able to match.
    mockServer: process.env.NEXT_PUBLIC_BOGW_API_URL || '',
    gatewayServer: {
        osgOAuth: process.env.NEXT_PUBLIC_OAUTH_API_URL || '',
        osgBboGateway: process.env.NEXT_PUBLIC_BOGW_API_URL || '',
        osgBOBetGateway: process.env.NEXT_PUBLIC_BO_BET_API_URL || '', // for test place bet
        osgBOFeedGateway: process.env.NEXT_PUBLIC_BO_FEED_API_URL || '', // for test place bet
        osgBboWSGateway: (process.env.NEXT_PUBLIC_BOGW_API_URL || '').replace('https://', 'wss://'),
    },
}
// ApiUrlBuilder.ts
class ApiUrlBuilder {
    static readonly MockServer = {
        // Login
        login: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/oauth2/token'),
        logout: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/token'),
        // Member
        member: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/member'),
        members: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/members'),
        singleMember: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/member'),
        updateMemberInfo: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/member'),
        updateMembersStatus: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/member/updateStatus'),
        getMemberRoles: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/member/roles'),
        resetPassword: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/member/resetPwd'),
        generateTokenViaEmail: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/member/generateToken/{email}'),
        resetPwdWithOld: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/member/resetPwdWithOld'),
        // Commons
        sportsCategories: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/sportsCategories'),
        leagues: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/leagues'),
        providers: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/providers'),
        locations: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/locations'),
        providerInformation: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/providerInformation'),
        markets: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/markets'),
        // Event
        eventList: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/events'),
        eventDetail: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/events/detail/{eventId}'),
        eventMarketDetail: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/events/detail/{eventId}/markets'),
        marketSettings: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v2.0/events/marketSettings'),
        getEventStatus: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/eventStatus'),
        updateEventsStatus: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/events/updateStatus'),
        eventPins: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/events/pinTop'),
        dangerBalls: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/dangerBalls'),
        getEventPerformance: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/performance/{infoType}/event/{eventId}'),
        getMarketGroups: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/marketGroups'),
        updateAutoPayout: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/events/updateAutoPayout'),
        // Event - PlayLog
        playLogSummary: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/events/{eventId}/playLog/summary'),
        lineups: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/events/{eventId}/playLog/lineups'),
        eventPlayLogMatchStats: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/events/{eventId}/playLog/matchStats'),
        eventPlayLogTimeline: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/events/{eventId}/playLog/timeline/{provider}'),
        timelineStatuses: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/events/{eventId}/playLog/timelineStatuses/{provider}'),
        // Odds
        displayType: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/odds/displayTypes'),
        oddsList: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/odds'),
        marketBalance: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/odds/marketBalance'),
        oddsMarketStatus: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/odds/updateStatus'),
        updateOddsEventStatus: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/odds/updateEventStatus'),
        setProviderPreference: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/odds/setProviderPreference'),
        oddsMargin: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/odds/margin'),
        oddsMarginCalculate: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/odds/marginCalculate'),
        // Channels
        channels: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/channels'),
        channelDetail: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/channel/{channelId}'),
        updateChannelStatus: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/channels/updateStatus'),
        channelConfiguration: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/channels/configuration'),
        availableOwner: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/availableOwners'),
        // Brands
        brands: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/brands'),
        brandDetail: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/brands/{brandId}'),
        updateBrandStatus: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/brands/updateStatus'),
        brandConfiguration: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/brands/configuration'),
        // Audits
        auditsActions: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/audits/actions'),
        audits: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/audits'),
        // Notifications
        notifications: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/notifications'),
        notificationsReadStatus: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/notifications/readStatus'),
        notificationsUnreadNumber: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/notifications/unreadNumber'),
        pushNotification: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/pushNotification'),
        // Dashboard
        getPerformance: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/performance/{infoType}'),
        // Template
        templates: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v2.0/templates'),
        templatesDetail: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v2.0/templates/{templateId}'),
        applyingEvents: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v2.0/templates/applyingEvents'),
        templateMarkets: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/template/markets'),
        defaultConflict: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v2.0/template/defaultConflict'),
        activatingItems: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v2.0/template/activatingItems'),
        // BetSlips
        betSlips: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/betSlips'),
        betSlipsAcceptance: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/betSlips/acceptance'),
        betSlipVoidBetLegs: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/betSlips/voidBetLegs'),
        betSlipsExport: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/betSlips/export'),
        // RiskGroup
        riskGroups: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/riskGroups'),
        riskGroupDetail: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/riskGroups/{riskId}'),
        riskGroupsApplyingPunters: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/riskGroup/applyingPunters'),
        updateRiskGroupApply: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/riskGroups/apply'),
        // RiskMember
        riskMembers: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/punters'),
        riskMembersBetSlips: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/punters/betSlips'),
        riskMembersPerformanceTotalAmount: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/punters/performance/totalAmount'),
        riskMembersPerformanceWinLossRate: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/punters/performance/winlossRate'),
        // RiskMember - Tags
        tags: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/tags'),
        tagsApply: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/tags/apply'),

        // Test Place Bet - need to remove when user test complete
        placeBet: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBOBetGateway, '/api/v1.0/bet/placeBet'),
        triggerDangerBall: ApiUrlBuilder.buildUrl('https://sl-osg-feed-handler.ollehsports.com', '/api/v1.0/Genius/pushDangerBall'),
        vendorEventId: ApiUrlBuilder.buildUrl(ApiDomainType.mockServer, '/api/v1.0/events/{canonicalId}/{vendor}/id'),
    }

    static readonly GatewayServer = {
        ...ApiUrlBuilder.MockServer,
        // Login
        login: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgOAuth, '/oauth2/token'),
        logout: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgOAuth, '/api/v1.0/token'),
        // Member
        members: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/members'),
        singleMember: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/member/{uuid}'),
        member: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/member'),
        updateMembersStatus: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/member/updateStatus'),
        getMemberRoles: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/member/roles'),
        resetPassword: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/member/resetPwd'),
        generateTokenViaEmail: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/member/generateToken/{email}'),
        resetPwdWithOld: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/member/resetPwdWithOld'),
        // Common
        providers: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/providers'),
        sportsCategories: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/sportsCategories'),
        providerInformation: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/providerInformation'),
        leagues: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/leagues'),
        locations: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/locations'),
        markets: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/markets'),
        // Event
        eventList: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/events'),
        eventDetail: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/events/detail/{eventId}'),
        eventMarketDetail: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/events/detail/{eventId}/markets'),
        marketSettings: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v2.0/events/marketSettings'),
        getEventStatus: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/eventStatus'),
        updateEventsStatus: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/events/updateStatus'),
        eventPins: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/events/pinTop'),
        dangerBalls: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/dangerBalls'),
        getEventPerformance: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/performance/{infoType}/event/{eventId}'),
        getMarketGroups: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/marketGroups'),
        updateAutoPayout: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/events/updateAutoPayout'),
        // Event - PlayLog
        playLogSummary: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/events/{eventId}/playLog/summary'),
        lineups: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/events/{eventId}/playLog/lineups'),
        eventPlayLogMatchStats: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/events/{eventId}/playLog/matchStats'),
        eventPlayLogTimeline: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/events/{eventId}/playLog/timeline/{provider}'),
        timelineStatuses: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/events/{eventId}/playLog/timelineStatuses/{provider}'),
        // Odds
        displayType: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/odds/displayTypes'),
        oddsMarketStatus: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/odds/updateStatus'),
        // Channels
        channels: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/channels'),
        channelDetail: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/channels/{channelId}'),
        updateChannelStatus: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/channels/updateStatus'),
        channelConfiguration: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/channels/configuration'),
        availableOwner: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/availableOwners'),
        // Brands
        brands: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/brands'),
        brandDetail: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/brands/{brandId}'),
        updateBrandStatus: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/brands/updateStatus'),
        brandConfiguration: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/brands/configuration'),
        // Audits
        auditsActions: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/audits/actions'),
        audits: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/audits'),
        // Notifications
        notifications: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/notifications'),
        notificationsReadStatus: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/notifications/readStatus'),
        notificationsUnreadNumber: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/notifications/unreadNumber'),
        pushNotification: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/pushNotification'),
        // Dashboard
        getPerformance: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/performance/{infoType}'),
        // Template
        templates: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v2.0/templates'),
        templatesDetail: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v2.0/templates/{templateId}'),
        applyingEvents: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v2.0/templates/applyingEvents'),
        templateMarkets: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/template/markets'),
        defaultConflict: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v2.0/template/defaultConflict'),
        activatingItems: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v2.0/template/activatingItems'),
        // BetSlips
        betSlips: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/betSlips'),
        betSlipsAcceptance: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/betSlips/acceptance'),
        betSlipVoidBetLegs: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/betSlips/voidBetLegs'),
        betSlipsExport: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/betSlips/export'),
        // RiskGroup
        riskGroups: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/riskGroups'),
        riskGroupDetail: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/riskGroups/{riskId}'),
        riskGroupsApplyingPunters: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/riskGroup/applyingPunters'),
        updateRiskGroupApply: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/riskGroups/apply'),
        // RiskMember
        riskMembers: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/punters'),
        riskMembersBetSlips: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/punters/betSlips'),
        riskMembersPerformanceTotalAmount: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/punters/performance/totalAmount'),
        riskMembersPerformanceWinLossRate: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/punters/performance/winlossRate'),
        // RiskMember - Tags
        tags: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/tags'),
        tagsApply: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/tags/apply'),

        // Test Place Bet - need to remove when user test complete
        placeBet: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBOBetGateway, '/api/v1.0/bet/placeBet'),
        triggerDangerBall: ApiUrlBuilder.buildUrl('https://sl-osg-feed-handler.ollehsports.com', '/api/v1.0/Genius/pushDangerBall'),
        vendorEventId: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboGateway, '/api/v1.0/events/{canonicalId}/{vendor}/id'),
    }

    static readonly DevSocket = {
        oddsAdjustment: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboWSGateway, '/odds/adjustment'),
        dataSubscription: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboWSGateway, '/events/data/subscription'),
        livePlayLog: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboWSGateway, '/genius/live/playLog/{sport}'),
        liveDataMixed: ApiUrlBuilder.buildUrl(ApiDomainType.gatewayServer.osgBboWSGateway, '/live/data/mixed'),
    }

    static buildUrl(baseUrl: string, url: string): UrlInterface {
        return { baseUrl, url };
    }

    static getPath(api: UrlInterface) {
        return `${api.baseUrl}${api.url}`
    }

    static getApiUrlByEnvironment() {
        if (Builder.isMock) {
            return this.MockServer;
        } else {
            return this.GatewayServer;
        }
    }
}

export default ApiUrlBuilder;
