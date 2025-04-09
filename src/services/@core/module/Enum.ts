/**
 * @enum {string}
 * @description Enum for channel status indicating the current state of a channel.
 */
export enum ChannelStatus {
    Pending = 'PENDING',
    Active = 'ACTIVE',
    Proceeding = 'PROCEEDING',
    Suspended = 'SUSPENDED',
    Maintained = 'MAINTAIN'
    /** Channel has been removed from the user, and is not visible in channel list */
    // Deactivate = 'DEACTIVATE'
}

const ChannelStatusMapping: {[key: string]: ChannelStatus} = {
    'PENDING': ChannelStatus.Pending,
    'ACTIVE': ChannelStatus.Active,
    'PROCEEDING': ChannelStatus.Proceeding,
    'SUSPENDED': ChannelStatus.Suspended,
    'MAINTAIN': ChannelStatus.Maintained
    // 'DEACTIVATE': ChannelStatus.Deactivate
}

export function toChannelStatus(value: string | ChannelStatus): ChannelStatus {
    if (ChannelStatusMapping.hasOwnProperty(value)) {
        return ChannelStatusMapping[value];
    }
    throw new Error(`Invalid status value: ${value}`);
}

export enum MemberStatus {
    Locked = "LOCKED",
    Verifying = "VERIFYING",
    Active = "ACTIVE",
    Suspended = "SUSPENDED",
    Disabled = "DISABLED"
}

export enum PageType {
    Login = 'login',
    Dashboard = 'dashboard',
    Channel = 'channel',
    Permission = 'permission',
    Configuration = 'configuration',
    EventList = 'eventList',
    Template = 'template',
    Cms = 'cms',
    BetSlip = 'betSlip',
    Member = 'member',
    Audit = 'audit',
    Notification = 'notification',
    EventDetail = 'eventDetail',
    // Only For Test
    TestPlaceBet = 'testPlaceBet',
}

export enum RoleType {
    SuperAdmin = 'Super Admin',
    Admin = 'Admin',
    Maintainer = 'Maintainer',
    ChannelAdmin = 'Channel Admin',
    Manager = 'Manager',
    Trader = 'Trader',
    Viewer = 'Viewer',
    BetsAdmin = 'Bets Admin',
    TeamLead = 'Team Lead',
    Operator = 'Operator',
    NoRole = 'No Role'
}

export enum VendorStatus {
    Running = 'RUNNING',
    LostConnection = 'LOST_CONNECTION'
}

export enum Functionality {
    Admin = 'Admin',
    Odds = 'Odds',
    Bets = 'Bets',
    None = 'None'
}

export const enum Action {
    Add,
    Remove,
    Suspend,
    Active
}

export enum Country {
    AFGHANISTAN = "AFGHANISTAN",
    ALBANIA = "ALBANIA",
    ALGERIA = "ALGERIA",
    AMERICA = "AMERICA",
    ANDORRA = "ANDORRA",
    ANGOLA = "ANGOLA",
    ANTIGUA_AND_BARBUDA = "ANTIGUA AND BARBUDA",
    ARGENTINA = "ARGENTINA",
    ARMENIA = "ARMENIA",
    AUSTRALIA = "AUSTRALIA",
    AUSTRIA = "AUSTRIA",
    AZERBAIJAN = "AZERBAIJAN",
    BAHAMAS = "BAHAMAS",
    BAHRAIN = "BAHRAIN",
    BANGLADESH = "BANGLADESH",
    BARBADOS = "BARBADOS",
    BELARUS = "BELARUS",
    BELGIUM = "BELGIUM",
    BELIZE = "BELIZE",
    BENIN = "BENIN",
    BHUTAN = "BHUTAN",
    BOLIVIA = "BOLIVIA",
    BOSNIA_AND_HERZEGOVINA = "BOSNIA AND HERZEGOVINA",
    BOTSWANA = "BOTSWANA",
    BRAZIL = "BRAZIL",
    BRUNEI = "BRUNEI",
    BULGARIA = "BULGARIA",
    BURKINA_FASO = "BURKINA FASO",
    BURUNDI = "BURUNDI",
    CABO_VERDE = "CABO VERDE",
    CAMBODIA = "CAMBODIA",
    CAMEROON = "CAMEROON",
    CANADA = "CANADA",
    CENTRAL_AFRICAN_REPUBLIC = "CENTRAL AFRICAN REPUBLIC",
    CHAD = "CHAD",
    CHILE = "CHILE",
    CHINA = "CHINA",
    COLOMBIA = "COLOMBIA",
    COMOROS = "COMOROS",
    CONGO__DEMOCRATIC_REPUBLIC_OF_THE = "CONGO, DEMOCRATIC REPUBLIC OF THE",
    CONGO__REPUBLIC_OF_THE = "CONGO, REPUBLIC OF THE",
    COSTA_RICA = "COSTA RICA",
    CROATIA = "CROATIA",
    CUBA = "CUBA",
    CYPRUS = "CYPRUS",
    CZECH_REPUBLIC = "CZECH REPUBLIC",
    DENMARK = "DENMARK",
    DJIBOUTI = "DJIBOUTI",
    DOMINICA = "DOMINICA",
    DOMINICAN_REPUBLIC = "DOMINICAN REPUBLIC",
    EAST_TIMOR = "EAST TIMOR",
    ECUADOR = "ECUADOR",
    EGYPT = "EGYPT",
    EL_SALVADOR = "EL SALVADOR",
    EQUATORIAL_GUINEA = "EQUATORIAL GUINEA",
    ERITREA = "ERITREA",
    ESTONIA = "ESTONIA",
    ESWATINI = "ESWATINI",
    ETHIOPIA = "ETHIOPIA",
    FIJI = "FIJI",
    FINLAND = "FINLAND",
    FRANCE = "FRANCE",
    GABON = "GABON",
    GAMBIA = "GAMBIA",
    GEORGIA = "GEORGIA",
    GERMANY = "GERMANY",
    GHANA = "GHANA",
    GREECE = "GREECE",
    GRENADA = "GRENADA",
    GUATEMALA = "GUATEMALA",
    GUINEA = "GUINEA",
    GUINEA_BISSAU = "GUINEA-BISSAU",
    GUYANA = "GUYANA",
    HAITI = "HAITI",
    HONDURAS = "HONDURAS",
    HUNGARY = "HUNGARY",
    ICELAND = "ICELAND",
    INDIA = "INDIA",
    INDONESIA = "INDONESIA",
    IRAN = "IRAN",
    IRAQ = "IRAQ",
    IRELAND = "IRELAND",
    ISRAEL = "ISRAEL",
    ITALY = "ITALY",
    IVORY_COAST = "IVORY COAST",
    JAMAICA = "JAMAICA",
    JAPAN = "JAPAN",
    JORDAN = "JORDAN",
    KAZAKHSTAN = "KAZAKHSTAN",
    KENYA = "KENYA",
    KIRIBATI = "KIRIBATI",
    NORTH_KOREA = "NORTH KOREA",
    SOUTH_KOREA = "SOUTH KOREA",
    KOSOVO = "KOSOVO",
    KUWAIT = "KUWAIT",
    KYRGYZSTAN = "KYRGYZSTAN",
    LAOS = "LAOS",
    LATVIA = "LATVIA",
    LEBANON = "LEBANON",
    LESOTHO = "LESOTHO",
    LIBERIA = "LIBERIA",
    LIBYA = "LIBYA",
    LIECHTENSTEIN = "LIECHTENSTEIN",
    LITHUANIA = "LITHUANIA",
    LUXEMBOURG = "LUXEMBOURG",
    MADAGASCAR = "MADAGASCAR",
    MALAWI = "MALAWI",
    MALAYSIA = "MALAYSIA",
    MALDIVES = "MALDIVES",
    MALI = "MALI",
    MALTA = "MALTA",
    MARSHALL_ISLANDS = "MARSHALL ISLANDS",
    MAURITANIA = "MAURITANIA",
    MAURITIUS = "MAURITIUS",
    MEXICO = "MEXICO",
    MICRONESIA = "MICRONESIA",
    MOLDOVA = "MOLDOVA",
    MONACO = "MONACO",
    MONGOLIA = "MONGOLIA",
    MONTENEGRO = "MONTENEGRO",
    MOROCCO = "MOROCCO",
    MOZAMBIQUE = "MOZAMBIQUE",
    MYANMAR = "MYANMAR",
    NAMIBIA = "NAMIBIA",
    NAURU = "NAURU",
    NEPAL = "NEPAL",
    NETHERLANDS = "NETHERLANDS",
    NEW_ZEALAND = "NEW ZEALAND",
    NICARAGUA = "NICARAGUA",
    NIGER = "NIGER",
    NIGERIA = "NIGERIA",
    NORTH_MACEDONIA = "NORTH MACEDONIA",
    NORWAY = "NORWAY",
    OMAN = "OMAN",
    PAKISTAN = "PAKISTAN",
    PALAU = "PALAU",
    PALESTINE = "PALESTINE",
    PANAMA = "PANAMA",
    PAPUA_NEW_GUINEA = "PAPUA NEW GUINEA",
    PARAGUAY = "PARAGUAY",
    PERU = "PERU",
    PHILIPPINES = "PHILIPPINES",
    POLAND = "POLAND",
    PORTUGAL = "PORTUGAL",
    QATAR = "QATAR",
    ROMANIA = "ROMANIA",
    RUSSIA = "RUSSIA",
    RWANDA = "RWANDA",
    SAINT_KITTS_AND_NEVIS = "SAINT KITTS AND NEVIS",
    SAINT_LUCIA = "SAINT LUCIA",
    SAINT_VINCENT_AND_THE_GRENADINES = "SAINT VINCENT AND THE GRENADINES",
    SAMOA = "SAMOA",
    SAN_MARINO = "SAN MARINO",
    SAO_TOME_AND_PRINCIPE = "SAO TOME AND PRINCIPE",
    SAUDI_ARABIA = "SAUDI ARABIA",
    SENEGAL = "SENEGAL",
    SERBIA = "SERBIA",
    SEYCHELLES = "SEYCHELLES",
    SIERRA_LEONE = "SIERRA LEONE",
    SINGAPORE = "SINGAPORE",
    SLOVAKIA = "SLOVAKIA",
    SLOVENIA = "SLOVENIA",
    SOLOMON_ISLANDS = "SOLOMON ISLANDS",
    SOMALIA = "SOMALIA",
    SOUTH_AFRICA = "SOUTH AFRICA",
    SOUTH_SUDAN = "SOUTH SUDAN",
    SPAIN = "SPAIN",
    SRI_LANKA = "SRI LANKA",
    SUDAN = "SUDAN",
    SURINAME = "SURINAME",
    SWEDEN = "SWEDEN",
    SWITZERLAND = "SWITZERLAND",
    SYRIA = "SYRIA",
    TAIWAN = "TAIWAN",
    TAJIKISTAN = "TAJIKISTAN",
    TANZANIA = "TANZANIA",
    THAILAND = "THAILAND",
    TOGO = "TOGO",
    TONGA = "TONGA",
    TRINIDAD_AND_TOBAGO = "TRINIDAD AND TOBAGO",
    TUNISIA = "TUNISIA",
    TURKEY = "TURKEY",
    TURKMENISTAN = "TURKMENISTAN",
    TUVALU = "TUVALU",
    UGANDA = "UGANDA",
    UKRAINE = "UKRAINE",
    UNITED_ARAB_EMIRATES = "UNITED ARAB EMIRATES",
    UNITED_KINGDOM = "UNITED KINGDOM",
    URUGUAY = "URUGUAY",
    UZBEKISTAN = "UZBEKISTAN",
    VANUATU = "VANUATU",
    VATICAN_CITY = "VATICAN CITY",
    VENEZUELA = "VENEZUELA",
    VIETNAM = "VIETNAM",
    YEMEN = "YEMEN",
    ZAMBIA = "ZAMBIA",
    ZIMBABWE = "ZIMBABWE"
}

export enum InfoType {
    Device = 'device',
    Market = 'market',
    BetSlips = 'betSlips',
    Sports = 'sports',
    League = 'league',
    Imbalance = 'imbalance',
    WinRate = 'winRate'
}

export enum EventType {
    all = 'all',
    inPlay = 'inPlay',
    preMatch = 'preMatch',
    startingSoon = 'startingSoon'
}

export enum BetSlipEventType {
    all = 'all',
    inPlay = 'inPlay',
    preMatch = 'preMatch',
    startingSoon = 'startingSoon',
    settled = 'settled'
}

export enum BetType {
    SINGLE = 'SINGLE',
    PARLAY = 'PARLAY'
}

export enum BetStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    EXPIRED = 'EXPIRED',
    VOID = 'VOID',
    DELETE = 'DELETE',
    RESULTING = 'RESULTING',
    SETTLED = 'SETTLED',
    RESETTLED = 'RESETTLED',
    PENDING_CASHOUT = 'PENDING_CASHOUT',
    EDITED = 'EDITED',
    IN_NEGOTIATION = 'IN_NEGOTIATION',
    /** Optional state of bet before sent to wallet */
    PRE_WALLET_STAKE = 'PRE_WALLET_STAKE',
    /** Optional state of bet before trying to refund a stake of a rejected bet in the wallet */
    PRE_WALLET_STAKE_REFUND = 'PRE_WALLET_STAKE_REFUND',
    PENDING_DANGER_BALL = 'PENDING_DANGER_BALL',
    PENDING_INPLAY_DELAY = 'PENDING_INPLAY_DELAY',
    PENDING_WALLET = 'PENDING_WALLET',
    PENDING_SETTLED = 'PENDING_SETTLED',
    PENDING_UNSETTLED = 'PENDING_UNSETTLED',
}

export enum FilteredBetStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    VOID = 'VOID'
}

export enum BetSettlement {
    UNSETTLED = 'UNSETTLED',
    SETTLED = 'SETTLED',
    RESETTLED = 'RESETTLED',
    EARLY_SETTLED = 'EARLY_SETTLED'
}

export enum BetResult {
    UNSETTLED = 'UNSETTLED',
    WIN = 'WIN',
    LOSE = 'LOSE',
    DRAW = 'DRAW',
    VOID = 'VOID',
    CASHOUT = 'CASHOUT'
}

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum Device {
    WEBSITE = 'WEBSITE',
    IOS = 'IOS',
    ANDROID = 'ANDROID',
    UNKNOWN = 'UNKNOWN'
}

export enum EventMarketStatus {
    SUSPENDED = 'SUSPENDED',
    ACTIVE = 'ACTIVE',
    CLOSE = 'CLOSE',
    LOCK = 'LOCK'
}

export enum EventSuspendedStatus {
    SUSPENDED = 'SUSPENDED',
    CLOSE = 'CLOSE',
    PROVIDER_SUSPENDED = 'PROVIDER_SUSPENDED',
    PROVIDER_CLOSE = 'PROVIDER_CLOSE'
}

export enum MarketLineStatus {
    SUSPENDED = 'SUSPENDED',
    CLOSED = 'CLOSED',
    ACTIVE = 'ACTIVE'
}

export enum ExtraScoreType {
    PENALTIES = 'PENALTIES',
}

export enum PlayLogPeriodType {
    PENALTIES = 'PENALTIES',
}