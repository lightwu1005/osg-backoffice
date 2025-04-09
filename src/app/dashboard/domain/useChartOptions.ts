import {useCallback, useEffect, useState} from "react";
import {ChartCondition, CommonPieChartRecord} from "@/modules/components/charts/CommonPieChart";
import {SportsDataModel} from "@/services/@core/module/ResponseDataModels";
import lodash from "lodash";
import {InfoType} from "@/services/@core/module/Enum";


interface UseChartOptionsProps {
    sportsList?: SportsDataModel[];
    onDataSelected: (records: CommonPieChartRecord) => void;
}

const useChartOptions = ({sportsList, onDataSelected}: UseChartOptionsProps) => {
    const [options, setOptions] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        if (!sportsList) return;

        setOptions((prevState) => {
            const sportNames = sportsList.map((sport) => sport.sportName);
            if (prevState === sportNames) return prevState;
            return sportNames;
        });
    }, [sportsList]);

    const handleChanged = useCallback((options: string[]) => {
        const sortedOptions = lodash.sortBy(options);

        setSelectedItems(sortedOptions);

        const ids = sportsList
            ?.filter(sport => sortedOptions.includes(sport.sportName))
            .map(sport => sport.sportId) || [];

        setSelectedIds(ids);
    }, [sportsList]);

    const handleDataSelectedWithOptions = useCallback(
        (infoType: InfoType, selectedData: ChartCondition) => {
            onDataSelected({
                infoType: infoType,
                options: selectedIds.map((id, index) => ({
                    id: id,
                    name: selectedItems[index],
                })),
                filterCondition: selectedData,
            });
        }, [onDataSelected, selectedItems]);

    return {
        options,
        selected: selectedItems,
        handleChanged,
        handleDataSelectedWithOptions,
    };
};

export default useChartOptions;
