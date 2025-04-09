import {useState} from "react";
import {BetSlipFiltersData} from "@/app/betSlip/components/FilterKeeper/FilterKeeper";
import IdentityHandler from "@/modules/common/IdentityHandler";


const useFilterMemory = () => {
    const {userBetSlipFilters, userBetSlipLastFilter} = IdentityHandler();
    const [filterMemory, setFilterMemory] = useState<BetSlipFiltersData>(userBetSlipFilters)
    const [currentDataIndex, setCurrentDataIndex] = useState(userBetSlipLastFilter)

    return {
        filters: filterMemory,
        setFilters: setFilterMemory,
        index: currentDataIndex,
        setIndex: setCurrentDataIndex
    }
}
export default useFilterMemory