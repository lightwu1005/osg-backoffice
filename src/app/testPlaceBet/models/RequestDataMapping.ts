import {
    TestDangerBallTriggerParameters,
    TestDangerBallTriggerProps,
    TestGetVendorEventIdProps,
    TestPlaceBetParameters,
    TestPlaceBetProps
} from "@/app/testPlaceBet/models/TestPlaceBetParameters";

export function toTestPlaceBetProps(request: TestPlaceBetParameters): TestPlaceBetProps {
    return {
        headers: {
            'X-ChannelId': request.channelId,
            'X-BrandId': request.brandId,
        },
        body: {
            punterAccount: request.punterAccount,
            stack: request.stack,
            betType: request.betType,
            channelId: request.channelId,
            brandId: request.brandId,
            betPart: request.parts,
            currency: 'USD',
            winType: 'WIN',
            language: 'ENGLISH',
            device: 'WEBSITE',
            fingerPrint: '',
            ip: request.ip,
        }
    }
}

export function toTestDangerBallTriggerProps(requestData: TestDangerBallTriggerParameters): TestDangerBallTriggerProps {
    return {
        body: {
            type: 'stateChange',
            fixtureId: requestData.fixtureId,
            dangerState: requestData.dangerState,
            isConfirmed: true,
            phase: 'FirstHalf',
            timeElapsedInPhase: "00:10:00",
            timestampUtc: requestData.timestampUtc,

        }
    }
}

export function toTestGetVendorEventIdProps(canonicalId: string): TestGetVendorEventIdProps {
    return {
        endPoint: {
            canonicalId: canonicalId,
            vendor: 'GENIUS',
        },
        query: {
            language: 'ENGLISH',
        }
    };
}