import {ChannelStatus, MemberStatus} from '@/services/@core/module/Enum';
import {PenaltyType} from "@/app/eventDetail/components/playLog/PenaltyIcon";
import {
    ConfigurationDangerBallSettings,
    ConfigurationOddsSettings,
    ConfigurationRounding,
    ConfigurationRoundingIncrement,
} from "@/services/@core/module/CommonDataModels";

export interface LoginResponseDataModel {
    access_token: string;
    uuid: string;
    user_info?: LoginUserInfoDataModel;
}

export interface LoginUserInfoDataModel {
    uuid: string;
    username: string;
    user_account: string;
    organization: string;
    functionality: string;
    role: string;
    channel_id: string;
    brand_id: string;
}

export interface SingleMemberInfoResponseDataModel {
    id: string;
    uuid: string;
    userAccount: string;
    email: string;
    userName?: string | null;
    organization?: string | null;
    functionality?: string | null;
    role: string;
    jobTitle?: string | null;
    phoneNumber?: string | null;
    status: MemberStatus;
    lastLogin?: number | null;
    createDate: number;
    disableDate?: number | null;
}

export interface ListResponseModel<T> {
    totalElements: number;
    content: T[]
}

export interface MemberInfoListResponseDataModel extends ListResponseModel<SingleMemberInfoResponseDataModel> {
}

export interface SportsDataModel {
    sportType: string;
    sportName: string;
    sportId: string;
    icon: string;
}

export interface BaseEventDataModel {
    id?: string;
    eventId: string;
    eventName: string;
    leagueId: string;
    leagueName: string;
    sportId: string;
    sportType: string;
    sportName: string;
    applyTemplates: ApplyTemplate[];
    leagueAbbreviation: string;
    locationName: string;
    startTime: number;
    updateTime: number;
    runningTime?: string | null;
    runningReceiveTime?: number | null;
    isClockRunning?: boolean | null;
    isLive: boolean;
    status: string;
}

export interface EventListModel extends ListResponseModel<EventDataModel> {
}

export interface EventDataModel extends BaseEventDataModel {
    dangerBallState?: string;
    oddsData: OddDataModel[];
    betSlips: BetSlipsModel;
    marketStatus: MarketStatusModel;
    participants: Omit<ParticipantDataModel, 'eventSuspendedStatus'>[];
    eventSuspendedStatus?: string;
}

export interface EventDetailDataModel extends BaseEventDataModel {
    participants: ParticipantDataModel[];
}

/**
 * @param id The participant id
 * @param name Participant name
 * @param participantEnName Participant Eng. name (for odds sorting)
 * @param abbreviation Participant abberviation name
 * @param score The number of the point this participant scored
 * @param type Represent the type of this participant is team or person
 * @param cards The card info of this participant
 * @param isHome Represent this participant is home or away
 * @param imageUrl The url of image for participant display
 * @param eventSuspendedStatus The status of this participant
 * @param corner The number of corner this participant have
 * @param finalScore The final score of this participant
 **/
export interface ParticipantDataModel {
    id: string;
    name: string;
    participantEnName?: string;
    abbreviation: string;
    score: number;
    type: string;
    cards?: CardModel[];
    isHome: boolean;
    imageUrl: string;
    eventSuspendedStatus: string;
    corner?: number;
    finalScore?: number;
    extraScores?: ExtraScore[];
}

export interface ExtraScore {
    type: string;
    score: number;
}

export interface ApplyTemplate {
    templateId: string;
    templateName: string;
}

export interface OddDataModel {
    marketType: string;
    marketName: string;
    marketId: string;
    provider: string;
    odds?: OddModel[];
    marketSuspendedStatus?: string | null;
    applyTemplate?: ApplyTemplate;
}

export interface ApplyTemplate {
    templateId: string;
    templateName: string;
}

export interface LeagueModel {
    leagueName: string;
    leagueId: string;
}

export interface LocationModel {
    locationName: string;
    locationId: string;
}

export interface ProviderInformationModel {
    id?: string;
    providerName: string;
    runningEventCount: number;
    updateTime: number;
    status: string;
}

export interface ProviderInformationListModel extends ListResponseModel<ProviderInformationModel> {
}

export interface DisplayTypeModel {
    id: number;
    typeName: string;
}

export interface EventMarketModel {
    marketType: string;
    marketName: string;
    marketId: string;
    providers: string[];
}

/**
 * @param cardType Represent the type of the card
 * @param cardCount The count numbers of card this participant have
 * @param cardImage The url of image for card display
 **/
export interface CardModel {
    cardType: PenaltyType;
    cardCount: number;
    cardImage?: string;
}

export interface OddsListModel {
    provider: string;
    isPreferred: boolean;
    odds: OddModel[];
}

//Only for api response
export interface ApiOddModel {
    baseLine?: string;
    marketId?: string;
    isMostBalance?: boolean
    status?: string
    bets: BetModel[];
    oddsSuspendedStatus?: string
}

/**
 * @param oddsSuspendedStatus The status of the odds (user 手動調整的狀態）
 */
export interface OddModel {
    baseLine?: string;
    marketId?: string;
    isMostBalance?: boolean
    bets: BetModel[];
    oddsSuspendedStatus?: string
}

/**
 * @param betStatus The status of the bet (vendor 的狀態)
 */
export interface BetModel {
    betId: string;
    betName: string;
    line: string;
    price: number;
    updateTime?: number;
    betSlips?: BetSlipsModel,
    originalPrice?: number
    adjustedNumber?: number
    acceptedAmount?: number
    acceptedNumber?: number
    betStatus: string
}

export interface BetSlipsModel {
    accept: number
    acceptAmount: number
    pending: number
    pendingAmount: number
    rejected: number
    rejectedAmount: number
}

export interface MarketStatusModel {
    runningNumber: number
    suspendedNumber: number
    closedNumber: number
}

export interface OddsMarketBalanceModel {
    totalAmount: number;
    currency: string;
    balance: BalanceItemModel[];
}

export interface BalanceItemModel {
    balanceName: string;
    balanceNumber: number;
}

export interface OddsMarginModel {
    defaultMargin: number;
    overrideMargin: number;
    maxPayout: number;
    minOdds: number;
    maxOdds: number;
    alertDifference: number;
    alignMaxDifference: number;
    effectiveTime?: number | null;
}

export interface OddsMarginCalculateModel {
    margin: number;
    minOdds: number;
    maxOdds: number;
}

export interface ChannelListModel extends ListResponseModel<ChannelModel> {
}

export interface ChannelModel {
    id?: string;
    channelName: string;
    channelId: string;
    ownerName: string;
    ownerId: string;
    email: string;
    locationName: string;
    oddsFormat: string[];
    regTime: number;
    status: ChannelStatus
}

export interface AvailableOwnerModel extends ListResponseModel<AvailableOwnerContent> {
}

export interface AvailableOwnerContent {
    uuid: string;
    userAccount: string;
    userName: string;
}

export interface AuditModel extends ListResponseModel<AuditContent> {
}

export interface AuditContent {
    id?: string;
    userName: string;
    action: string;
    requestUrl: string;
    requestBody: string;
    isSuccess: boolean;
    companyName: string;
    logTime: number;
}

export interface NotificationListModel extends ListResponseModel<NotificationModel> {
}

export interface NotificationModel {
    id?: string;
    notificationId: string;
    notificationType: string;
    notificationName: string;
    notificationTime: number;
    eventId?: string,
    readStatus: boolean;
    description: string;
}

export interface NotificationUnreadNumberModel {
    totalUnread: number
}

export interface PushNotificationSSEModel {
    event: string
    data: {
        data: PushNotificationModel
    }
    id: string
    retry: number
}

export interface PushNotificationModel {
    notificationId: string
    notificationType: string
    notificationName: string
    notificationTime: string
    description: string
}

export interface ChannelDetailModel {
    channelId?: string;
    channelName: string;
    ownerName: string;
    ownerId: string;
    email: string;
    locationName: string;
    oddsFormat: string[];
    configuration: {
        oddsProviders: string[];
        oddsSettings: {
            minimum: number;
            maximum: number;
            difference: number;
        };
        lineSettings: string;
        rounding: ConfigurationRounding[];
    };
}

export interface ConfigurationDetailModel {
    oddsProviders: string[];
    oddsSettings: {
        minimum: number;
        maximum: number;
        difference: number;
    };
    lineSettings: string;
    rounding: ConfigurationRounding[];
}

export interface BrandListModel extends ListResponseModel<BrandModel> {
}

export interface BrandModel {
    id?: string;
    brandName: string;
    brandId: string;
    ownerName: string;
    ownerId: string;
    email: string;
    locationName: string;
    margin: number;
    oddsFormat: string[];
    regTime: number;
    status: ChannelStatus
}

export interface BrandDetailModel {
    brandId?: string;
    brandName: string;
    ownerId: string;
    ownerName: string;
    email: string;
    locationName: string;
    margin: number;
    oddsFormat: string[];
}

export interface OddsFormatModel {
    options: string[],
    display: string[]
}

export interface LineSettingModel {
    conditions: string[],
    receive: string
}

export interface ConfigurationModel {
    eventType?: string,
    oddsFormat: OddsFormatModel
    oddsSettings: ConfigurationOddsSettings
    supportProviders: string[]
    defaultMargin: number
    lineSetting: LineSettingModel
    rounding: ConfigurationRounding[]
    roundingIncrement: ConfigurationRoundingIncrement[]
    dangerBallSettings: ConfigurationDangerBallSettings
}

export interface UpdateConfigurationModel {
    oddsFormat?: string[]
    oddsSettings?: ConfigurationOddsSettings
    defaultMargin?: number
    lineSetting?: string
    rounding?: ConfigurationRounding[]
    roundingIncrement?: ConfigurationRoundingIncrement[]
    dangerBallSettings?: ConfigurationDangerBallSettings
}

export interface SuccessFailureIdsModel {
    successIds: string[];
    failureIds: string[];
}

export interface SuccessFailureRemoveTemplate {
    successes: TemplateData[]
    failures: TemplateData[]
}

export interface TemplateData {
    templateId: string
    templateName: string
}

export interface UpdateEventMarketSettingsModel {
    eventIds: string[]
    eventType: string
    templateId: string
    marketId?: string
}

export interface TemplateDefaultConflictsModel {
    content: GetTemplateDetailModel[]
}

export interface EventMarketSettingsModel extends Omit<GetTemplateDetailModel, 'isDefault' | 'leagues'> {
    leagueId?: string | null
    leagueName?: string
}

export interface EventMarketOddsSettingsModel {
    minimum: number;
    maximum: number;
    difference: number;
}

export interface EventMarketProviderPriorityModel {
    order: number;
    provider: string;
}

export interface EventMarketImbalanceBettingsModel {
    updateType: string;
    difference: number;
    decrease?: number;
    recalculate: number;
}

export interface EventMarketHeavyBettingModel {
    updateType: string;
    timeLimit?: number;
    amount?: number;
    decrease?: number;
}

export interface EventMarketSingleBetSettingsModel {
    minimum: number;
    maximum: number;
    maxPayout: number;
}

export interface EventMarketParlaySettingsModel {
    enableParlay: boolean;
    enableSGP: boolean;
    minimum: number;
    maximum: number;
    maxPayout: number;
}

export interface PerformanceDataModel {
    totalNumber: number
    infoTitle: string
    infoId: string
    infoData: InfoDataModel[]
}

export interface MarketGroupModel {
    groupId: string
    groupName: string
    marketIds: string[] | null
    status: string
}

export interface InfoDataModel {
    dataName: string
    dataNumber: number
}

export interface TokenModel {
    token: string
}

export interface MainOdds {
    minumum: number
    maximum: number
}

export interface Template {
    templateId: string
    templateName: string
    isDefault: boolean
    settingLevel: SettingLevelInfo
    sportId: string
    sportName: string
    eventNumber: number
    mainOdds: MainOdds
    margin: number
    updateTime: number
    eventType: string
}

interface SettingLevelInfo {
    level: string
    totalNumber: number
}

export interface GetTemplateListDataModel extends ListResponseModel<Template> {
}

export interface AddTemplateDataModel {
    templateId: string
}

export interface ParlaySGPSetting {
    enabled: boolean
    minimumLegs?: number
    maximumLegs?: number
    minimum?: number
    maximum?: number
    maxPayout?: number
}

export interface DelayedSettings {
    situation: string[]
    delayedSecond: number
}

export interface Deviation {
    percentage: number
    action: string
}

export interface GetTemplateDetailModel {
    eventType: string
    templateId: string
    templateName: string
    sportId: string
    sportName: string
    leagues?: LeagueModel[] | null
    providerPriority: EventMarketProviderPriorityModel[]
    oddsSettings: EventMarketOddsSettingsModel
    margin: number
    lineSettings: string | 'NO_LIMIT' | 'MAINLINE_ONLY'
    deviation: Deviation
    imbalanceBettings: EventMarketImbalanceBettingsModel
    heavyBettings: EventMarketHeavyBettingModel
    isDefault: boolean
    feederSuspend: string
    dangerAttackAction: string
    imbalanceSettings?: ImbalanceSetting
    belowMarginSettings?: BelowMarginSetting
    delayedSettings?: DelayedSettings
    singleBetSettings: EventMarketSingleBetSettingsModel
    parlaySettings: ParlaySGPSetting
    sgpSettings: ParlaySGPSetting
    parlayAlert: ParlayAlert
    rapidBetEntrySettings?: RapidBetEntrySetting
    autoSettlementSettings?: AutoSettlementSetting
    marketSettings?: MarketConfigModel[],
    isCustomized?: boolean
}

export interface BelowMarginSetting {
    margin: number
    alertRecipients: string[]
}

export interface RapidBetEntrySetting {
    enabled: boolean
    triggerTime: number
    numberOfBets: number
    suspendLine: number
}

export interface AutoSettlementSetting {
    enabled: boolean
    delaySettlement: number
}

interface ApplyEventContent {
    eventId: string
    eventName: string
    leagueId: string
    leagueName: string
    location: string
    status: string
    startTime: number
}

export interface GetApplyEventsDataModel extends ListResponseModel<ApplyEventContent> {
}

export interface GetTemplateMarketsDataModel extends ListResponseModel<MarketModel> {
}

export interface GetActivatingItemsDataModel extends ListResponseModel<ActivatingItem> {
}

interface ActivatingItem {
    itemId: string
    itemName: string
    margin: number
    minimumDifference: number
    lineSettings: string
}

export interface PlayLogSummaryModel {
    leagueName: string;
    eventName: string;
    eventDuration?: number | null;
    isClockRunning?: boolean | null;
    currentPeriodName?: string | null;
    animationLink?: string | null;
    competitors: PlayLogCompetitorsModel;
    periodScores: PlayLogStatisticModel[];
    statisticCounts: PlayLogStatisticModel[];
    runningReceiveTime?: number | null;
}

export interface PlayLogCompetitorsModel {
    type: string;
    homeName: string;
    homeClubName?: string | null;
    awayName: string;
    awayClubName?: string | null;
}

export interface PlayLogStatisticModel {
    name: string;
    home: string;
    away: string;
    sequence?: number | null;
}

export interface LineupsModel {
    home: TeamLineupsModel;
    away: TeamLineupsModel;
}

export interface TeamLineupsModel {
    players: TeamLineupsInfo[];
    substitutes: TeamLineupsInfo[];
}

export interface TeamLineupsInfo {
    jerseyNumber: string;
    name?: string | null;
    cards?: LineupCards;
    isStarting: boolean
}

export interface LineupCards {
    red: number,
    yellow: number
}

export interface PlayLogTimelineModel {
    eventUtc: number;
    systemLogTime: number;
    team?: string | null;
    periodName: string;
    periodTime: number;
    type: string;
    dangerState?: string | null;
    description: string;
    isConfirmed?: boolean | null;
}

export interface BetSlipsListModel extends ListResponseModel<BetSlipsDataModel> {
}

export interface BetSlipsDataModel {
    id?: string;
    betSlipId: string,
    betTime: number,
    operatorTime?: number,
    operator?: string,
    accountInfo: AccountInfoModel,
    risk?: RiskModel,
    betPart: BetPartModel,
    statusPart: StatusPartModel
}

/**
 * @param punterAccount The account used by the punter to place this bet
 * @param punterId The punter's unique identifier
 * @param ipAddress The IP address of the device used to place this bet
 * @param device The device used to place this bet
 * */
export interface AccountInfoModel {
    punterAccount: string,
    punterId: string,
    ipAddress: string,
    device: string
}

/**
 * @param riskId The unique identifier of the risk level
 * @param riskName The name of the risk level
 * @param riskColor The color of the risk level
 * */
export interface RiskModel {
    riskId: string,
    riskName: string,
    riskColor: string
}


export interface BetPartModel {
    betType: string,
    betAmount: number,
    payout: number,
    maxPayout: number,
    legs: BetPartLegsModel[]
}

export interface RiskMembersBetSlipsBetPartModel extends Omit<BetPartModel, 'legs'>{
    legs: Legs[]
}

export interface BetParticipantDataModel extends Omit<ParticipantDataModel, 'abbreviation' | 'imageUrl' | 'eventSuspendedStatus' | 'corner'> {
    corners?: number
}

export interface BetPartLegsModel {
    id?: string, // The data grid component requires all rows to have a unique `id` property.
    sportName: string,
    sportId: string,
    leagueName: string,
    leagueId: string,
    eventName: string,
    eventId: string,
    providerName: string,
    eventStatus: string,
    eventTime: number,
    marketName: string,
    marketId: string,
    betName: string,
    betId: string,
    line: string,
    odds: number,
    status: string,
    isMostBalance: boolean,
    eventType: string,
    participants: BetParticipantDataModel[];
    betResults?: BetResultModel[];
}

/**
 * @param name Type of settlement by market
 * @param current The current number of the score when place bet
 * @param finalScore The final number of the score
 * @param position To represent this participant is home or away
 * */
export interface BetResultModel {
    name: string,
    current: number,
    finalScore: number
    position: number,
}

export interface Legs extends Omit<BetPartLegsModel, 'providerName' | 'eventTime' | 'status'> {}

/**
 * @param status The condition status of this bet
 * @param result The result of this bet
 * @param settlement The settlement of this bet slip
 * @param description The description of the status
 * */
export interface StatusPartModel {
    status: string,
    result: string,
    settlement: string,
    description: string
}

export interface MarketsModel extends ListResponseModel<MarketModel> {
}

export interface MarketModel {
    marketId: string,
    marketName: string
}

export interface ImbalanceSetting {
    type: string
    autoAccept?: number
    action: string
}

export interface ParlayAlert {
    type: string
    targetNumber: number
    potentialWin: number
    alertRecipients: string[]
    sendEmail: boolean
}

export interface RiskGroupListModel extends ListResponseModel<RiskGroupDataModel> {
}

export interface RiskGroupDataModel {
    riskId: string;
    riskName: string;
    riskColor: string;
    punterNumber: number;
    tags: TagModel[];
}


export interface RiskGroupsApplyingPuntersListModel extends ListResponseModel<RiskGroupsApplyingPuntersModel> {}

export interface RiskGroupsApplyingPuntersModel {
    punterId: string
    punterAccount: string
    lastUpdate: number
}

export interface RiskMembersListModel extends ListResponseModel<RiskMembersModel> {}

export interface RiskMembersModel {
    punterId: string
    punterAccount: string
    risk: RiskMemberModel
    tags: TagModel[]
    registerTime: number
}

export interface RiskMemberModel {
    riskId: string
    riskName: string
    riskColor: string
    riskTags: TagModel[]
}

export interface RiskMembersBetSlipsListModel extends ListResponseModel<RiskMembersBetSlipsModel> {}

export interface RiskMembersBetSlipsModel {
    betSlipId: string
    betTime: number
    accountInfo: RiskAccountInfoModel
    risk: RiskModel
    betPart: RiskMembersBetSlipsBetPartModel
    statusPart: StatusPartModel
}

export interface RiskAccountInfoModel {
    ipAddress: string
    device: string
}

export interface RiskMembersPerformanceModel {
    infoTitle: string
    infoSubtitle: string
    infoId: string
    totalNumber: number
    infoData: InfoDataModel[]
}

export interface TagModel {
    tagId: string;
    tagName: string;
}

export interface TagsListModel extends ListResponseModel<TagsDataModel> {

}

export interface TagsDataModel {
    tagId: string
    tagName: string
    tagType: string
}

export interface MarketConfigModel {
    marketId: string;
    marketName: string;
    margin: number;
    minimumDifference: number;
    lineSettings: string;
    singleBetSettings: SingleBetSetting;
    parlayable: boolean;
    sgpable: boolean;
}

export interface SingleBetSetting {
    minimum: number;
    maximum: number;
    maxPayout: number;
}