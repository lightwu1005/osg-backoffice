export enum FeederSuspendActionType {
    AUTO_HOLD = 'Auto Hold Bet Slip Until Feeder Unlock',
    AUTO_REJECT = 'Auto Reject Bet Slip Until Feeder Unlock',
    AUTO_ACCEPT = 'Auto Accept App Bet Slip'
}

export enum DangerAttackActionType {
    AUTO_HOLD = 'Auto Hold Bet Slip',
    AUTO_REJECT = 'Auto Reject Bet Slip',
    AUTO_ACCEPT = 'Auto Accept Bet Slip'
}

export enum ImbalanceAmountActionType {
    AUTO_HOLD = 'Auto Hold Bet Slip',
    AUTO_REJECT = 'Auto Reject Bet Slip'
}

export enum AlertRecipientsRoleType {
    ADMIN = 'Notify Admin',
    MANAGER = 'Notify Manager',
    TRADER = 'Notify Trader',
    VIEWER = 'Notify Viewer'
}