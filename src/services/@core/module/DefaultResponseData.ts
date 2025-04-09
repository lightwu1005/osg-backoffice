import {MemberStatus} from '@/services/@core/module/Enum';
import {
    AccountInfoModel,
    AddTemplateDataModel,
    BaseEventDataModel,
    BelowMarginSetting,
    BetModel,
    BetPartLegsModel,
    BetPartModel,
    BetSlipsDataModel,
    BetSlipsModel,
    BrandDetailModel,
    CardModel,
    ChannelDetailModel,
    ConfigurationModel,
    DelayedSettings,
    Deviation,
    DisplayTypeModel,
    EventDataModel,
    EventDetailDataModel,
    EventMarketHeavyBettingModel,
    EventMarketImbalanceBettingsModel,
    EventMarketModel,
    EventMarketOddsSettingsModel,
    EventMarketSettingsModel,
    EventMarketSingleBetSettingsModel,
    GetTemplateDetailModel,
    ImbalanceSetting,
    LeagueModel,
    LineSettingModel,
    LineupCards,
    LineupsModel,
    ListResponseModel,
    LocationModel,
    LoginResponseDataModel,
    MarketModel,
    NotificationUnreadNumberModel,
    OddDataModel,
    OddModel,
    OddsFormatModel,
    OddsListModel,
    OddsMarginCalculateModel,
    OddsMarketBalanceModel,
    ParlayAlert,
    ParlaySGPSetting,
    ParticipantDataModel,
    PlayLogCompetitorsModel,
    PlayLogSummaryModel,
    PlayLogTimelineModel,
    ProviderInformationModel,
    PushNotificationModel,
    RiskGroupDataModel,
    RiskMemberModel,
    RiskMembersModel,
    RiskMembersPerformanceModel,
    RiskModel,
    SingleMemberInfoResponseDataModel,
    SportsDataModel,
    StatusPartModel,
    SuccessFailureIdsModel,
    SuccessFailureRemoveTemplate,
    TagModel,
    TagsDataModel,
    TeamLineupsInfo,
    TeamLineupsModel,
} from "@/services/@core/module/ResponseDataModels";
import {
    ConfigurationDangerBallSettings,
    ConfigurationOddsSettings,
    RiskBetAmountSettings,
    RiskDailyBetLimitation,
    GetRiskGroupDetailModel,
    RiskSingleBetLimitation,
    RiskWinLossRateSettings
} from "@/services/@core/module/CommonDataModels";

export const defaultLoginResponseDataModel: LoginResponseDataModel = {
    access_token: '',
    uuid: '',
}

export const defaultSingleMemberInfoResponseDataModel: SingleMemberInfoResponseDataModel = {
    id: '',
    uuid: '',
    userAccount: '',
    email: '',
    userName: '',
    organization: '',
    functionality: '',
    role: '',
    jobTitle: '',
    phoneNumber: '',
    status: MemberStatus.Disabled,
    lastLogin: 0,
    createDate: 0,
    disableDate: 0,
}

export const defaultListResponseModel: ListResponseModel<any> = {
    totalElements: 0,
    content: []
}

export const defaultSportsDataModel: SportsDataModel = {
    sportType: '',
    sportName: '',
    sportId: '',
    icon: '',
}

export const defaultBaseEventDataModel: BaseEventDataModel = {
    id: '',
    eventId: '',
    eventName: '',
    leagueId: '',
    leagueName: '',
    sportId: '',
    sportType: '',
    sportName: '',
    leagueAbbreviation: '',
    locationName: '',
    startTime: 0,
    updateTime: 0,
    runningTime: "",
    isClockRunning: false,
    isLive: false,
    status: '',
    applyTemplates: []
}

export const defaultBetSlipsModel: BetSlipsModel = {
    accept: 0,
    acceptAmount: 0,
    pending: 0,
    pendingAmount: 0,
    rejected: 0,
    rejectedAmount: 0
}

export const defaultEventDataModel: EventDataModel = {
    oddsData: [],
    marketStatus: {
        runningNumber: 0,
        suspendedNumber: 0,
        closedNumber: 0,
    },
    participants:[],
    betSlips: defaultBetSlipsModel,
    eventSuspendedStatus: '',
    ...defaultBaseEventDataModel,
}

export const defaultEventDetailDataModel: EventDetailDataModel = {
    participants: [],
    ...defaultBaseEventDataModel
}

export const defaultParticipantDataModel: ParticipantDataModel = {
    id: '',
    name: '',
    abbreviation: '',
    score: 0,
    type: '',
    isHome: false,
    imageUrl: '',
    eventSuspendedStatus: ''
}

export const defaultOddDataModel: OddDataModel = {
    marketType: '',
    marketName: '',
    marketId: '',
    provider: '',
    marketSuspendedStatus: '',
}

export const defaultLeaguesModel: LeagueModel = {
    leagueName: '',
    leagueId: '',
}

export const defaultLocationModel: LocationModel = {
    locationName: '',
    locationId: '',
}

export const defaultProviderInformationModel: ProviderInformationModel = {
    id: '',
    providerName: '',
    runningEventCount: 0,
    updateTime: 0,
    status: '',
}


export const defaultDisplayTypeModel: DisplayTypeModel = {
    id: 0,
    typeName: '',
}

export const defaultEventMarketModel: EventMarketModel = {
    marketType: '',
    marketName: '',
    marketId: '',
    providers: [],
}

export const defaultCardModel: CardModel = {
    cardType: 'red',
    cardCount: 0,
}

export const defaultOddsListModel: OddsListModel = {
    provider: '',
    isPreferred: false,
    odds: [],
}

export const defaultOddModel: OddModel = {
    baseLine: '',
    marketId: '',
    isMostBalance: false,
    bets: [],
    oddsSuspendedStatus: '',
}

export const defaultBetModel: BetModel = {
    betId: '',
    betName: '',
    line: '',
    price: 0,
    updateTime: 0,
    betSlips: defaultBetSlipsModel,
    originalPrice: 0,
    acceptedAmount: 0,
    acceptedNumber: 0,
    adjustedNumber:0,
    betStatus: 'OPEN'
}

export const defaultOddsMarketBalanceModel: OddsMarketBalanceModel = {
    totalAmount: 0,
    currency: '',
    balance: [],
}

export const defaultOddsMarginCalculateModel: OddsMarginCalculateModel = {
    margin: 0,
    minOdds: 0,
    maxOdds: 0,
}

export const defaultNotificationUnreadNumberModel: NotificationUnreadNumberModel = {
    totalUnread: 0
}

export const defaultPushNotificationModel: PushNotificationModel = {
    notificationId: '',
    notificationType: '',
    notificationName: '',
    notificationTime: '',
    description: '',
}

export const defaultChannelDetailModel: ChannelDetailModel = {
    channelId: '',
    channelName: '',
    ownerName: '',
    ownerId: '',
    email: '',
    locationName: '',
    oddsFormat: [],
    configuration: {
        oddsProviders: [],
        oddsSettings: {
            minimum: 0,
            maximum: 0,
            difference: 0,
        },
        lineSettings: '',
        rounding: [],
    },
}

export const defaultBrandDetailModel: BrandDetailModel = {
    brandId: '',
    brandName: '',
    ownerId: '',
    ownerName: '',
    email: '',
    locationName: '',
    margin: 0,
    oddsFormat: [],
}

export const defaultOddsFormatModel: OddsFormatModel = {
    options: [],
    display: []
}

export const defaultLineSettingModel: LineSettingModel = {
    conditions: [],
    receive: ''
}

export const defaultConfigurationOddsSettings: ConfigurationOddsSettings = {
    minimum: 0,
    maximum: 0,
    difference: 0,
}

export const defaultConfigurationDangerBallSettings: ConfigurationDangerBallSettings = {
    autoAcceptBetSlips: [],
    autoHoldBetSlips: [],
    autoRejectBetSlips: [],
}

export const defaultConfigurationModel: ConfigurationModel = {
    eventType: '',
    oddsFormat: defaultOddsFormatModel,
    oddsSettings: defaultConfigurationOddsSettings,
    supportProviders: [],
    defaultMargin: 0,
    lineSetting: defaultLineSettingModel,
    rounding: [],
    roundingIncrement: [],
    dangerBallSettings: defaultConfigurationDangerBallSettings,
}

export const defaultSuccessFailureIdsModel: SuccessFailureIdsModel = {
    successIds: [],
    failureIds: [],
}

export const defaultSuccessFailureRemoveTemplate: SuccessFailureRemoveTemplate = {
    successes: [],
    failures: [],
}

export const defaultEventMarketOddsSettingsModel: EventMarketOddsSettingsModel = {
    minimum: 0,
    maximum: 0,
    difference: 0,
}

export const defaultEventMarketImbalanceDecreaseModel: EventMarketImbalanceBettingsModel = {
    updateType: '',
    difference: 0,
    decrease: 0,
    recalculate: 0,
}

export const defaultBetSlipSettingImbalanceSetting: ImbalanceSetting = {
    type: 'PERCENTAGE',
    action: 'AUTO_HOLD'
}

export const defaultEventMarketHeavyBettingModel: EventMarketHeavyBettingModel = {
    updateType: '',
    timeLimit: 0,
    amount: 0,
    decrease: 0,
}

export const defaultEventMarketSingleBetSettingsModel: EventMarketSingleBetSettingsModel = {
    minimum: 0,
    maximum: 0,
    maxPayout: 0,
}

export const defaultParlaySGPSetting: ParlaySGPSetting = {
    enabled: false,
    minimumLegs: 0,
    maximumLegs: 0,
    minimum: 0,
    maximum: 0,
    maxPayout: 0,
}

export const defaultDeviation: Deviation = {
    percentage: 0,
    action: '',
}

export const defaultEventMarketSettingsModel: EventMarketSettingsModel = {
    eventType: '',
    sportId: '',
    sportName: '',
    templateId: '',
    templateName: '',
    leagueId: '',
    leagueName: '',
    margin: 0,
    oddsSettings: defaultEventMarketOddsSettingsModel,
    providerPriority: [],
    imbalanceBettings: defaultEventMarketImbalanceDecreaseModel,
    heavyBettings: defaultEventMarketHeavyBettingModel,
    singleBetSettings: defaultEventMarketSingleBetSettingsModel,
    parlaySettings: defaultParlaySGPSetting,
    sgpSettings: defaultParlaySGPSetting,
    lineSettings: 'UNKNOWN',
    delayedSettings: undefined,
    deviation: defaultDeviation,
    marketSettings: [],
    feederSuspend: 'AUTO_HOLD',
    dangerAttackAction: 'AUTO_HOLD',
    parlayAlert: {
        type: '',
        targetNumber: 0,
        alertRecipients: [],
        sendEmail: false,
        potentialWin: 0
    },
    autoSettlementSettings: {
        enabled: false,
        delaySettlement: 0
    },
    rapidBetEntrySettings: {
        enabled: false,
        triggerTime: 0,
        numberOfBets: 0,
        suspendLine: 0
    }
}

export const defaultAddTemplateDataModel: AddTemplateDataModel = {
    templateId: ''
}

export const defaultDelayedSettings: DelayedSettings = {
    situation: [],
    delayedSecond: 0,
}

export const defaultGetTemplateDetailModel: GetTemplateDetailModel = {
    isDefault: false,
    templateId: '',
    templateName: '',
    sportId: '',
    sportName: '',
    leagues: [],
    margin: 0,
    oddsSettings: defaultEventMarketOddsSettingsModel,
    providerPriority: [],
    imbalanceBettings: defaultEventMarketImbalanceDecreaseModel,
    imbalanceSettings: defaultBetSlipSettingImbalanceSetting,
    heavyBettings: defaultEventMarketHeavyBettingModel,
    singleBetSettings: defaultEventMarketSingleBetSettingsModel,
    parlaySettings: defaultParlaySGPSetting,
    sgpSettings: defaultParlaySGPSetting,
    marketSettings: [],
    lineSettings: 'UNKNOWN',
    eventType: '',
    delayedSettings: defaultDelayedSettings,
    deviation: defaultDeviation,
    belowMarginSettings: {
        margin: 0,
        alertRecipients: []
    },
    feederSuspend: 'AUTO_HOLD',
    dangerAttackAction: 'AUTO_HOLD',
    parlayAlert: {
        type: '',
        targetNumber: 80,
        alertRecipients: [],
        sendEmail: false,
        potentialWin: 10000
    },
    autoSettlementSettings: {
        enabled: false,
        delaySettlement: 0,
    },
    rapidBetEntrySettings: {
        enabled: false,
        triggerTime: 0,
        numberOfBets: 0,
        suspendLine: 0,
    }
}

export const defaultPlayLogCompetitorsModel: PlayLogCompetitorsModel = {
    type: '',
    homeName: '',
    homeClubName: '',
    awayName: '',
    awayClubName: '',
}

export const defaultPlayLogSummaryModel: PlayLogSummaryModel = {
    leagueName: '',
    eventName: '',
    eventDuration: 0,
    currentPeriodName: '',
    animationLink: '',
    competitors: defaultPlayLogCompetitorsModel,
    periodScores: [],
    statisticCounts: [],
}

export const defaultTeamLineupsModel: TeamLineupsModel = {
    players: [],
    substitutes: [],
}

export const defaultLineupsModel: LineupsModel = {
    home: defaultTeamLineupsModel,
    away: defaultTeamLineupsModel,
}

export const defaultLineupCards: LineupCards = {
    red: 0,
    yellow: 0,
}

export const defaultTeamLineupsInfo: TeamLineupsInfo = {
    jerseyNumber: '',
    name: '',
    cards: defaultLineupCards,
    isStarting: false
}

export const defaultPlayLogTimelineModel: PlayLogTimelineModel = {
    eventUtc: 0,
    systemLogTime: 0,
    team: '',
    periodName: '',
    periodTime: 0,
    type: '',
    dangerState: '',
    description: '',
    isConfirmed: false
}

export const defaultAccountInfoModel: AccountInfoModel = {
    punterAccount: '',
    punterId: '',
    ipAddress: '',
    device: ''
}

export const defaultRiskModel: RiskModel = {
    riskId: '',
    riskName: '',
    riskColor: ''
}


export const defaultBetPartModel: BetPartModel = {
    betType: '',
    betAmount: 0,
    payout: 0,
    maxPayout: 0,
    legs: []
}

export const defaultStatusPartModel: StatusPartModel = {
    status: '',
    result: '',
    settlement: '',
    description: ''
}

export const defaultBetSlipsDataModel: BetSlipsDataModel = {
    id: '',
    betSlipId: '',
    betTime: 0,
    accountInfo: defaultAccountInfoModel,
    risk: defaultRiskModel,
    betPart: defaultBetPartModel,
    statusPart: defaultStatusPartModel
}

export const defaultBetPartLegsModel: BetPartLegsModel = {
    id: '',
    sportName: '',
    sportId: '',
    leagueName: '',
    leagueId: '',
    eventName: '',
    eventId: '',
    providerName: '',
    eventStatus: '',
    eventTime: 0,
    marketName: '',
    marketId: '',
    betName: '',
    betId: '',
    line: '',
    odds: 0,
    status: '',
    isMostBalance: false,
    eventType: '',
    participants: []
}

export const defaultMarketModel: MarketModel = {
    marketId: '',
    marketName: ''
}

export const defaultImbalanceSetting: ImbalanceSetting = {
    type: '',
    autoAccept: 0,
    action: ''
}

export const defaultBelowMargin: BelowMarginSetting = {
    margin: 0,
    alertRecipients: []
}

export const defaultParlayAlert: ParlayAlert = {
    type: '',
    potentialWin: 0,
    targetNumber: 0,
    alertRecipients: [],
    sendEmail: false
}

export const defaultRiskGroupDataModel: RiskGroupDataModel = {
    riskId: '',
    riskName: '',
    riskColor: '',
    punterNumber: 0,
    tags: []
}

export const defaultTagModel: TagModel = {
    tagId: '',
    tagName: '',
}

export const defaultTagsDataModel: TagsDataModel = {
    tagId: '',
    tagName: '',
    tagType: '',
}


export const defaultRiskBetAmountSettings: RiskBetAmountSettings = {
    minimum: 0,
    maximum: 0,
}

export const defaultRiskWinRateSettings: RiskWinLossRateSettings = {
    successBet: 0,
    winRate: '',
    dayInterval: 0,
}

export const defaultRiskDailyBetLimitation: RiskDailyBetLimitation = {
    oddsDecrease: 0,
    dailyLimit: 0,
    delayAcceptance: 0,
}

export const defaultRiskSingleBetLimitation: RiskSingleBetLimitation = {
    oddsAdjustment: 0,
    amountAdjustment: 0,
    delayAcceptance: 0,
}

export const defaultRiskGroupDetailModel: GetRiskGroupDetailModel = {
    riskName: '',
    riskColor: '',
    betAmountSettings: defaultRiskBetAmountSettings,
    winLossRateSettings: defaultRiskWinRateSettings,
    limitationType: '',
    dailyBetLimitation: defaultRiskDailyBetLimitation,
    singleBetLimitation: defaultRiskSingleBetLimitation,
    tags: []
}

export const defaultRiskMembersPerformanceModel: RiskMembersPerformanceModel = {
    infoTitle: '',
    infoSubtitle: '',
    infoId: '',
    totalNumber: 0,
    infoData: []
}

export const defaultRiskMemberModel: RiskMemberModel = {
    riskId: '',
    riskName: '',
    riskColor: '',
    riskTags: []
}

export const defaultRiskMembersModel: RiskMembersModel = {
    punterId: '',
    punterAccount: '',
    risk: defaultRiskMemberModel,
    tags: [],
    registerTime: 0,
}
