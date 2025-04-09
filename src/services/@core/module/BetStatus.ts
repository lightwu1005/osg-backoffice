import {serverKeyTypeConvert} from "@/modules/common/DataProcessUnit";

const stringArray = [
    'PENDING',
    'ACCEPTED',
    'REJECTED',
    'EXPIRED',
    'VOID',
    'RESULTING',
    'SETTLED',
    'RESETTLED',
    'PENDING_CASHOUT',
    'EDITED',
    /** Optional state of bet before sent to wallet */
    'IN_NEGOTIATION',
    /** Optional state of bet before trying to refund a stake of a rejected bet in the wallet */
    'PRE_WALLET_STAKE',
    'PRE_WALLET_STAKE_REFUND',
    'PENDING_DANGER_BALL',
    'PENDING_INPLAY_DELAY',
    'PENDING_WALLET',
    'PENDING_SETTLED',
    'PENDING_UNSETTLED',
    ]

export const BetStatus: Record<string, string> = {};

serverKeyTypeConvert(stringArray, BetStatus);


