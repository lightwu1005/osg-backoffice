import {serverKeyTypeConvert} from "@/modules/common/DataProcessUnit";
import {BetSettlement} from "@/services/@core/module/Enum";

export const BetSettle: Record<string, string> = {}

serverKeyTypeConvert(Object.values(BetSettlement), BetSettle)

