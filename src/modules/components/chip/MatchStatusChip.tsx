import {EventStatus} from "@/services/@core/module/EventStatus";
import React from "react";
import {
    BetResult,
    BetStatus,
    ChannelStatus,
    MemberStatus,
    VendorStatus
} from "@/services/@core/module/Enum";
import {CustomChip} from "@/modules/components/chip/CustomChip";
import {ChipColor} from "@/modules/components/chip/MuiChipsStyled";
import {allFirstCharToUpperCase, firstCharToUpperCase} from "@/modules/common/DisplayFormatConverter";

export const MatchStatusChip = ({ status }: { status?: string }) => {
    const getLabel = (): string => {
        return allFirstCharToUpperCase(status ?? 'Unknown')
    };

    const getChipColor = (): ChipColor => {
        switch (status) {
            case EventStatus.ABANDONED:
                return ChipColor.black;
            case EventStatus.ABOUT_TO_START:
                return ChipColor.lightBlue;
            case EventStatus.CANCELED:
                return ChipColor.yellow;
            case EventStatus.COVERAGE_LOST:
                return ChipColor.red;
            case EventStatus.FINISHED:
                return ChipColor.black;
            case EventStatus.IN_PROGRESS:
                return ChipColor.green;
            case EventStatus.UNKNOWN:
                return ChipColor.greyBlue;
            case EventStatus.POSTPONED:
                return ChipColor.blue;
            case EventStatus.NOT_STARTED_YET:
                return ChipColor.pink;
            case EventStatus.INTERRUPTED:
                return ChipColor.brown;
            default:
                return ChipColor.default;
        }
    }
    return <CustomChip color={getChipColor()} label={getLabel()}/>;
};

export const MatchVendorStatusChip = ({ status }: {status?: VendorStatus}) => {
    const getLabel = (): string => {
        switch (status) {
            case VendorStatus.Running:
                return 'Running';
            case VendorStatus.LostConnection:
                return 'Lost Connection';
            default:
                return 'Lost Connection';
        }
    };

    const getChipColor = (): ChipColor => {
        switch (status) {
            case VendorStatus.Running:
                return ChipColor.green;
            case VendorStatus.LostConnection:
                return ChipColor.red;
            default:
                return ChipColor.default;
        }
    }
    return <CustomChip color={getChipColor()} label={getLabel()}/>;
}

export const MatchChannelStatusChip = ({ status }: { status?: ChannelStatus }) => {
    const getLabel = (): string => {
        switch (status) {
            case ChannelStatus.Pending:
                return 'Pending';
            case ChannelStatus.Active:
                return 'Active';
            case ChannelStatus.Proceeding:
                return 'Proceeding';
            case ChannelStatus.Suspended:
                return 'Suspended';
            case ChannelStatus.Maintained:
                return 'Maintained'
            default:
                return '';
        }
    }

    const getChipColor = (): ChipColor => {
        switch (status) {
            case ChannelStatus.Active:
                return ChipColor.green;
            case ChannelStatus.Proceeding:
                return ChipColor.blue;
            case ChannelStatus.Suspended:
                return ChipColor.brown;
            case ChannelStatus.Maintained:
                return ChipColor.lightBrown
            case ChannelStatus.Pending:
            default:
                return ChipColor.default;
        }
    }

    return <CustomChip color={getChipColor()} label={getLabel()}/>;
};

export const MatchMemberStatusChip = ({ status }: { status?: MemberStatus }) => {
    const getLabel = (): string => {
        switch (status) {
            case MemberStatus.Locked:
                return 'Locked';
            case MemberStatus.Verifying:
                return 'Verifying';
            case MemberStatus.Active:
                return 'Active';
            case MemberStatus.Suspended:
                return 'Suspended';
            case MemberStatus.Disabled:
                return 'Disabled';
            default:
                return status ?? '';
        }
    }

    const getChipColor = (): ChipColor => {
        switch (status) {
            case MemberStatus.Locked:
                return ChipColor.red;
            case MemberStatus.Verifying:
                return ChipColor.blue;
            case MemberStatus.Active:
                return ChipColor.green;
            case MemberStatus.Suspended:
                return ChipColor.brown;
            case MemberStatus.Disabled:
                return ChipColor.black;
            default:
                return ChipColor.default;
        }
    }
    return <CustomChip color={getChipColor()} label={getLabel()}/>;
};

export const MatchBetStatusChip = ({ status }: { status: BetStatus }) => {
    const getLabel = (): string => {
        return firstCharToUpperCase(status)
    }

    const getChipColor = (): ChipColor => {
        switch (status) {
            case BetStatus.ACCEPTED:
            case BetStatus.PRE_WALLET_STAKE:
            case BetStatus.PRE_WALLET_STAKE_REFUND:
            case BetStatus.SETTLED:
                return ChipColor.green;
            case BetStatus.REJECTED:
            case BetStatus.VOID:
                return ChipColor.red;
            case BetStatus.EXPIRED:
                return ChipColor.yellow;
            case BetStatus.RESULTING:
            case BetStatus.RESETTLED:
                return ChipColor.blue;
            case BetStatus.EDITED:
                return ChipColor.lightBlue;
            default:
                return ChipColor.default;
        }
    }
    return <CustomChip color={getChipColor()} label={getLabel()}/>;
};

export const MatchBetResultChip = ({ status }: { status: BetResult }) => {
    const getLabel = (): string => {
        return firstCharToUpperCase(status)
    }

    const getChipColor = (): ChipColor => {
        switch (status) {
            case BetResult.WIN:
                return ChipColor.green;
            case BetResult.LOSE:
            case BetResult.VOID:
                return ChipColor.red;
            case BetResult.UNSETTLED:
                return ChipColor.brown;
            case BetResult.CASHOUT:
                return ChipColor.yellow;
            case BetResult.DRAW:
            default:
                return ChipColor.default;
        }
    }
    return <CustomChip color={getChipColor()} label={getLabel()}/>;
};