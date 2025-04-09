import {BetType, MemberStatus, SortDirection} from "@/services/@core/module/Enum";
import {
    BrandDetailModel,
    ChannelDetailModel,
    UpdateConfigurationModel,
    UpdateEventMarketSettingsModel
} from "@/services/@core/module/ResponseDataModels";
import {
    GetTemplates, ManualSettleBetLegVoid,
    NumberConditionSettings,
    PostTemplate,
    RiskGroupDetailModel,
    TypeSearchSettings,
    UpdateTemplateDetail
} from "@/services/@core/module/CommonDataModels";
import {UpdateRiskGroupApplyParameters} from "@/app/member/models/MemberParameters";

export interface ApiProps {
    endPoint?: Record<string, any>
    query?: Record<string, any>
    body?: Record<string, any>
    headers?: Record<string, any>
}

export interface LoginProps extends ApiProps {
    headers: {
        Authorization: string
        'Content-Type': string,
    },
    body: {
        grant_type: 'password'
        user_account: string
        customerId?: string
        functionality: string
        password?: string
        msToken?: string
    },
}

export interface LogoutProps extends ApiProps {
    headers: {
        Authorization: string
    }
}

export interface UpdateMemberInfoProps extends ApiProps {
    endPoint: {
        uuid: string
    }
    body: {
        userName?: string
        organization?: string
        role?: string
        permission?: string
        status?: string
        email?: string
        jobTitle?: string
        phoneNumber?: string
    }
}

export interface UpdateMemberStatusProps extends ApiProps {
    body: {
        uuids: string[]
        status: string
    }
}

export interface UpdateEventsStatusProps extends ApiProps {
    body: {
        eventIds: string[]
        status: string
    }
}

export interface GetEventPinsProps extends ApiProps {
    query: {
        sportId: string
        eventType: string
    }
}

export interface AddEventPinsProps extends ApiProps {
    body: {
        eventIds: string[]
        action: string
    }
}

export interface GetEventMarketSettingsProps extends ApiProps {
    query: {
        eventId: string
        marketId?: string
        eventType: string
    }
}

export interface UpdateEventMarketSettingsProp extends ApiProps {
    body: UpdateEventMarketSettingsModel
}

export interface EventListProps extends ApiProps {
    query: {
        eventType: string
        sportId: string
        page: number
        pageSize: number
        displayPin?: boolean
        searchType?: string
        searchValue?: string
        locations?: string[]
        status?: string[]
        leagueId?: string[]
        startDate?: number
        endDate?: number
        sortField?: string
        sortDirection?: SortDirection
    }
}

export interface UpdateAutoPayoutProps extends ApiProps {
    body: {
        eventIds: string[]
        action: string
    }
}

export interface ProvidersProps extends ApiProps {
    query: {
        sportId?: string
    }
}

export interface ProviderInformationProps extends ApiProps {
    query: {
        page: number
        pageSize: number
        sportId: string
        search?: string[]
        status?: string[]
        sortField?: string
        sortDirection?: SortDirection
    }
}

export interface LeaguesProps extends ApiProps {
    query: {
        sportIds?: string[]
        eventType?: string
        page: number
        pageSize: number
        name?: string
    }
}

export interface LocationsProps extends ApiProps {
    query: {
        sportId: string
    }
}

export interface EventDetailProps extends ApiProps {
    endPoint: {
        eventId: string
    }
}

export interface OddsListProps extends ApiProps {
    query: {
        eventId: string
        marketIds: string[]
        eventType: string
    }
}

export interface EventMarketsDetailProps extends ApiProps {
    endPoint: {
        eventId: string
    }
    query: {
        eventType: string
    }
}

export interface MarketBalanceProps extends ApiProps {
    query: {
        eventId: string
        marketId: string
    }
}

export interface OddsMarketStatusProps extends ApiProps {
    body: {
        providers: string[]
        eventId: string
        marketId: string
        status: string
        betBaseLine?: string
    }
}

export interface OddsUpdateEventStatusProps extends ApiProps {
    body: {
        eventIds: string[]
        status: string
    }
}

export interface SetProviderPreferenceProps extends ApiProps {
    body: {
        eventId: string
        provider: string
        marketId: string
    }
}

export interface OddsMarginProps extends ApiProps {
    query: {
        eventId: string
        marketId?: string
        baseLineId?: string
    }
}

export interface UpdateOddsMarginProps extends ApiProps {
    body: {
        eventId: string
        marketId?: string
        baseLineId?: string
        provider: string
        overrideMargin: number
        maxPayout: number
        minOdds: number
        maxOdds: number
        alertDifference: number
        alignMaxDifference: number
        effectiveTime?: number
    }
}

export interface OddsMarginCalculateProps extends ApiProps {
    body: {
        margin?: number
        minOdds?: number
        maxOdds?: number
        maxPayout: number
    }
}

export interface AddChannelProps extends ApiProps {
    body: Omit<ChannelDetailModel, 'ownerName' | 'email'>
}

export interface UpdateChannelProps extends ApiProps {
    endPoint: {
        channelId: string
    },
    body: ChannelDetailModel
}

export interface ChannelListProps extends ApiProps {
    query: {
        page: number
        pageSize: number
        locationNames?: string[]
        startDate?: number
        endDate?: number
        sortField?: string
        sortDirection?: SortDirection
    }
}

export interface RemoveChannelsProps extends ApiProps {
    body: {
        channelIds: string[]
    }
}

export interface UpdateChannelStatusProps extends ApiProps {
    body: {
        channelIds: string[]
        status: string
    }
}

export interface BrandListProps extends ApiProps {
    query: {
        page: number
        pageSize: number
        locationNames?: string[]
        startDate?: number
        endDate?: number
        sortField?: string
        sortDirection?: SortDirection
    }
}

export interface GetBrandDetailProps extends ApiProps {
    endPoint: {
        brandId: string
    }
}

export interface AddBrandProps extends ApiProps {
    body: Omit<BrandDetailModel, 'ownerName' | 'email'>
}

export interface UpdateBrandProps extends ApiProps {
    endPoint: {
        brandId: string
    },
    body: Omit<BrandDetailModel, 'ownerName' | 'email' | 'brandId'>
}

export interface RemoveBrandProps extends ApiProps {
    body: {
        brandIds: string[]
    }
}

export interface UpdateBrandStatusProps extends ApiProps {
    body: {
        brandIds: string[]
        status: string
    }
}

export interface GetAvailableOwnerProps extends ApiProps {
    query: {
        page: number,
        pageSize: number,
        functionality: string
    }
}

export interface GetMemberListProps extends ApiProps {
    query: {
        page: number
        pageSize: number
        organization?: string
        search?: string
        roles?: string[]
        functionality?: string
        statuses?: MemberStatus[]
        sortField?: string
        sortDirection?: SortDirection
    }
}

export interface AddMemberProps extends ApiProps {
    body: {
        userName: string
        userAccount: string
        email: string
        role: string
        organization: string
        channelId?: string
    }
}

export interface DeleteMembersProps extends ApiProps {
    body: {
        uuids: string[]
    }
}

export interface GetSingleMemberInfoProps extends ApiProps {
    endPoint: {
        uuid: string
    }
}

export interface AuditProps extends ApiProps {
    query: {
        page: number
        pageSize: number
        search?: string
        actions?: string[]
        startDate?: number
        endDate?: number
        sortField?: string
        sortDirection?: SortDirection
    }
}

export interface NotificationListProps extends ApiProps {
    query: {
        page: number
        pageSize: number
        status?: number
        startDate?: number
        endDate?: number
        sortField?: string
        sortDirection?: SortDirection
    }
}

export interface NotificationReadStatusProps extends ApiProps {
    body: {
        type: string
        notificationId?: string
    }
}

export interface GetChannelDetailProps extends ApiProps {
    endPoint: {
        channelId: string
    }
}

export interface GetConfigurationProps extends ApiProps {
    query: {
        eventType: string
    }
}

export interface UpdateConfigurationProps extends ApiProps {
    query: {
        eventType: string
    },
    body: UpdateConfigurationModel
}

export interface UpdateBrandConfigurationProps extends ApiProps {
    query: {
        eventType: string
    },
    body: Omit<UpdateConfigurationModel, 'defaultMargin' | 'lineSetting' | 'oddsSettings' | 'roundingIncrement'>
}

export interface ResetPasswordProps extends ApiProps {
    body: {
        newPwd: string
        token: string
        c?: string
    },
}

export interface GenerateTokenViaEmailProps extends ApiProps {
    headers: {
        'X-Functionality': string,
    },
    endPoint: {
        email: string
    }
}

export interface GetPerformanceProps extends ApiProps {
    endPoint: {
        infoType: string
    }
    query: {
        startDate: number
        endDate: number
        sportIds?: string[]
        betType?: string
    }
}

export interface GetEventPerformanceProps extends ApiProps {
    endPoint: {
        infoType: string
        eventId: string
    }
}

export interface GetMarketGroups extends ApiProps {
    query: {
        eventType: string
        sportId: string
    }
}

export interface ResetPasswordWithOldProps extends ApiProps {
    body: {
        oldPwd: string
        newPwd: string
    },
}

export interface GetTemplatesProps extends ApiProps {
    query: GetTemplates
}

export interface AddTemplateProps extends ApiProps {
    body: PostTemplate
}

export interface RemoveTemplatesProps extends ApiProps {
    body: {
        templateIds: string[]
    }
}

export interface GetTemplateDetailProps extends ApiProps {
    endPoint: {
        templateId: string
    }
}

export interface GetTemplateMarketsProps extends ApiProps {
    body: {
        page: number
        pageSize: number
        eventType: string,
        sportId: string
        leagueIds?: string[]
    }
}

export interface GetActivatingItemsProps extends ApiProps {
    query: {
        templateId: string
        page: number
        pageSize: number
        searchType?: string
        searchValue?: string
    }
}

export interface GetPlayLogSummaryProps extends ApiProps {
    endPoint: {
        eventId: string
    }
}

export interface UpdateTemplateDetailProps extends ApiProps {
    endPoint: {
        templateId: string
    },
    body: UpdateTemplateDetail
}

export interface GetTemplateDefaultConflictsProps extends ApiProps {
    body: {
        sportId: string
        eventType: string
        leagueIds?: string[]
        templateId?: string
    }
}

export interface GetApplyEventsProps extends ApiProps {
    query: {
        templateId: string
        eventType: string
        page: number
        pageSize: number
        search?: string
    }
}

export interface GetLineupsProps extends ApiProps {
    endPoint: {
        eventId: string
    }
}

export interface GetEventPlayLogMatchStatsProps extends ApiProps {
    endPoint: {
        eventId: string
    }
}

export interface GetEventPlayLogTimelineProps extends ApiProps {
    endPoint: {
        eventId: string,
        provider: string
    }
    query: {
        sportName: string,
        types?: string[],
        participantPositions?: string[]
    }
}

export interface TimelineStatusesProps extends ApiProps {
    endPoint: {
        eventId: string,
        provider: string
    }
}

export interface GetBetSlipsProps extends ApiProps {
    body: {
        page: number,
        pageSize: number,
        eventType?: string,
        search?: TypeSearchSettings,
        betType?: BetType,
        sportIds?: string[],
        leagueIds?: string[],
        marketIds?: string[],
        statuses?: string[],
        settlements?: string[],
        devices?: string[],
        result?: string,
        betAmount?: NumberConditionSettings,
        payout?: NumberConditionSettings,
        maxPayout?: NumberConditionSettings,
        startDate?: number,
        endDate?: number,
        eventStartDate?: number,
        eventEndDate?: number,
    }
}

export interface BetSlipAcceptanceProps extends ApiProps {
    body: {
        betSlipIds: string[],
        status: string,
        sendMsg: boolean,
        description?: string
    }
}

export interface BetSlipVoidBetLegsProps extends ApiProps {
    body: {
        betSlipId: string,
        manualSettleBetLegVoList: ManualSettleBetLegVoid[],
        sendMsg: boolean,
        description?: string
    }
}

export interface BetSlipExportProps extends ApiProps {
    body: {
        startDate: number,
        endDate: number
    }
}

export interface GetMarketsProps extends  ApiProps {
    query: {
        page: number
        pageSize: number
        search?: string
    }
}

export interface GetRiskGroupsProps extends ApiProps {
    query: {
        page: number
        pageSize: number
        sortField?: string
        sortDirection?: SortDirection
    }
}

export interface AddRiskGroupProps extends ApiProps {
    body: RiskGroupDetailModel
}

export interface DeleteRiskGroupsProps extends ApiProps {
    body: {
        riskIds: string[]
    }
}

export interface GetRiskGroupDetailProps extends ApiProps {
    endPoint: {
        riskId: string
    }
}

export interface UpdateRiskGroupDetailProps extends ApiProps {
    endPoint: {
        riskId: string
    },
    body: RiskGroupDetailModel
}

export interface RiskGroupsApplyingPuntersProps extends ApiProps {
    query: {
        riskId: string
        page: number
        pageSize: number
        searchKey?: string
        searchValue?: string
        startDate?: number
        endDate?: number
        sortField?: string
        sortDirection?: SortDirection
    }
}

export interface UpdateRiskGroupApplyProps extends ApiProps {
    body: UpdateRiskGroupApplyParameters
}

export interface GetRiskMembersProps extends ApiProps {
    query: {
        page: number
        pageSize: number
        searchKey?: string
        searchValue?: string
        riskIds?: string[]
        tagIds?: string[]
        startDate?: number
        endDate?: number
        sortField?: string
        sortDirection?: SortDirection
    }
}

export interface GetRiskMembersBetSlipsProps extends ApiProps {
    query: {
        punterId: string
        page: number
        pageSize: number
        startDate: number
        endDate: number
        ipAddress?: string
        leagueIds?: string[]
        marketIds?: string[]
        statuses?: string[]
        sortField?: string
        sortDirection?: SortDirection
    }
}

export interface GetRiskMembersPerformanceProps extends ApiProps {
    query: {
        punterId: string
        startDate: number
        endDate: number
        dimensions?: string
    }
}

export interface GetTagsProps extends GetRiskGroupsProps {
}

export interface UpdateTagsApplyProps extends ApiProps {
    body: {
        punterId: string
        tagIds: string[]
    }
}