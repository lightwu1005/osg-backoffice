import {ApiProps} from "@/services/@core/module/RequestDataModels";

export interface TestPlaceBetParameters {
    punterAccount: string;
    stack: number;
    betType: string;
    channelId: string;
    brandId: string;
    ip: string;
    market?: string;
    parts: BetPartData[],
}

export interface BetPartData {
    partNo: number,
    eventId: string,
    oddsId: string,
    oddsType: string,
    odds: number,
    line?: string,
}

export interface TestPlaceBetProps extends ApiProps {
    body: {
        punterAccount: string;
        stack: number;
        currency: string;
        betType: string;
        winType: string;
        language: string;
        fingerPrint: string;
        device: string;
        ip: string;
        channelId: string;
        brandId: string;
        betPart: BetPartData[],
    }
}

export enum TestDangerBallState {
    HOME_GOAL = "HOME_GOAL",
    AWAY_GOAL = "AWAY_GOAL",
    HOME_PENALTY = "HOME_PENALTY",
    AWAY_PENALTY = "AWAY_PENALTY",
    HOME_DANGER_PENALTY_RISK = "HOME_DANGER_PENALTY_RISK",
    AWAY_DANGER_PENALTY_RISK = "AWAY_DANGER_PENALTY_RISK",
    HOME_DANGEROUS_FREE_KICK = "HOME_DANGEROUS_FREE_KICK",
    AWAY_DANGEROUS_FREE_KICK = "AWAY_DANGEROUS_FREE_KICK",
    HOME_DANGEROUS_ATTACK = "HOME_DANGEROUS_ATTACK",
    AWAY_DANGEROUS_ATTACK = "AWAY_DANGEROUS_ATTACK",
    HOME_CORNER_DANGER = "HOME_CORNER_DANGER",
    AWAY_CORNER_DANGER = "AWAY_CORNER_DANGER",
    HOME_CORNER = "HOME_CORNER",
    AWAY_CORNER = "AWAY_CORNER",
    HOME_ATTACKING_FREE_KICK = "HOME_ATTACKING_FREE_KICK",
    AWAY_ATTACKING_FREE_KICK = "AWAY_ATTACKING_FREE_KICK",
    SAFE = "SAFE"
}

export interface TestDangerBallTriggerParameters {
    fixtureId: string;
    timestampUtc: string;
    dangerState: TestDangerBallState | string;
}

export interface TestDangerBallTriggerProps extends ApiProps {
    body: {
        type: string;
        fixtureId: string;
        dangerState: string;
        isConfirmed: boolean;
        phase: string;
        timeElapsedInPhase: string;
        timestampUtc: string;
    }
}

export interface TestGetVendorEventIdProps extends ApiProps {
    endPoint: {
        canonicalId: string;
        vendor: string
    }
}

export interface TestGetVendorEventIdResponse {
    eventId: string;
}