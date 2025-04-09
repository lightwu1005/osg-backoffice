import store, {
    setChannelId,
    setChannelValue,
    setEmail,
    setPageState,
    setRole,
    setUsername,
    setUuid
} from "@/modules/common/IdentityRedux";
import {LoginUserInfoDataModel, SingleMemberInfoResponseDataModel} from "@/services/@core/module/ResponseDataModels";
import {useSelector} from "react-redux";
import {Functionality, RoleType} from "@/services/@core/module/Enum";
import {aes256Encrypt} from "@/utils/tools";
import {usePathname} from "next/navigation";
import {BetSlipFiltersData} from "@/app/betSlip/components/FilterKeeper/FilterKeeper";
import {clearSplitStringsFromCookie, getCombineSplitStringsFromCookie} from "@/services/@core/module/LongTokenHandler";
import {PageState} from "@/utils/StateContext";

const IdentityHandler = () => {
    const pathname = usePathname();
    const currentPathName = (pathname ? pathname.split('/').pop() : '') || '';
    const authorization = getCombineSplitStringsFromCookie('a');

    const userUUID = useSelector((state: { u: string | null }) =>
        state.u ?? ''
    );

    const userName = useSelector((state: { un: string | null }) =>
        state.un ?? ''
    );

    const userEmail = useSelector((state: { e: string | null }) =>
        state.e ?? ''
    );

    const channelId = useSelector((state: { ci: string | null }) =>
        state.ci ?? ''
    );

    const userRole = useSelector((state: { r: string | null }) =>
        state.r ?? RoleType.NoRole
    );

    const userBetSlipFilters = useSelector((state: { bf: BetSlipFiltersData | null }) =>
        state.bf ?? {}
    );

    const userBetSlipLastFilter = useSelector((state: { blf: number | null }) =>
        state.blf ?? 0
    );

    const channelValue = useSelector((state: { cv: string | null }) =>
        state.cv ?? ''
    );

    const oddsDisplay = useSelector((state: { od: string | null }) =>
        state.od ?? ''
    );

    const pageState = useSelector((state: { pg: PageState }) =>
        state.pg ?? {}
    );

    return {
        authorization,
        userUUID,
        userName,
        userEmail,
        userRole,
        channelValue,
        currentPathName,
        channelId,
        userBetSlipFilters,
        userBetSlipLastFilter,
        oddsDisplay,
        pageState
    }
}

export default IdentityHandler

export const cleanIdentityInfo = () => {
    clearSplitStringsFromCookie('a');
    store.dispatch(setUuid(null));
    store.dispatch(setUsername(null));
    store.dispatch(setRole(null));
    store.dispatch(setEmail(null));
    store.dispatch(setChannelValue(null));
    store.dispatch(setChannelId(null));
    store.dispatch(setPageState({}));
}

export const setupIdentityInfoByLogin = (memberInfo: LoginUserInfoDataModel) => {
    if (memberInfo.uuid) {
        store.dispatch(setUuid(memberInfo.uuid));
    }
    if (memberInfo.username) {
        store.dispatch(setUsername(memberInfo.username));
    }
    if (memberInfo.role) {
        store.dispatch(setRole(memberInfo.role));
    }
    if (memberInfo.channel_id && memberInfo.functionality !== Functionality.Admin) {
        store.dispatch(setChannelId(memberInfo.channel_id));

        const combineString = JSON.stringify({
            channelId: memberInfo.channel_id,
            ...(memberInfo.brand_id && { brandId: memberInfo.brand_id })
        });
        if (combineString) {
            const aes256Key = process.env.NEXT_PUBLIC_ENCRYPT_KEY || '';
            const encryptedString = aes256Encrypt(combineString, aes256Key);
            store.dispatch(setChannelValue(encryptedString));
        }
    }
}

export const setupIdentityInfoByMemberInfo = (memberInfo: SingleMemberInfoResponseDataModel) => {
    if (memberInfo.uuid) {
        store.dispatch(setUuid(memberInfo.uuid));
    }
    if (memberInfo.userName) {
        store.dispatch(setUsername(memberInfo.userName));
    }
    if (memberInfo.role) {
        store.dispatch(setRole(memberInfo.role));
    }
    if (memberInfo.email) {
        store.dispatch(setEmail(memberInfo.email));
    }
}