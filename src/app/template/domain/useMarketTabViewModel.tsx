import {useCallback, useEffect, useState} from "react";
import {TabProps} from "@/modules/components/tabs/Tabs";
import {useIntl} from "react-intl";
import {toGetMarketGroups} from "@/app/eventDetail/models/RequestDataMapping";
import useEventRepository from "@/services/@event/repository/useEventRepository";
import {MarketGroupModel} from "@/services/@core/module/ResponseDataModels";
import {debounce} from "lodash";

interface MarketTabProps {
    eventType: string
    sportId: string
}

const useMarketTabViewModel = ({eventType, sportId}: MarketTabProps) => {
    const eventRepo = useEventRepository();

    const getMarketGroups = async (eventType: string, sportId: string) => {
        return await eventRepo.getMarketGroups(toGetMarketGroups(eventType, sportId))
    }

    const [marketGroups, setMarketGroups] = useState<MarketGroupModel[]>([])
    const [selectedMarketGroup, setSelectedMarketGroup] = useState<MarketGroupModel>()
    const [selectedIdx, setSelectedIdx] = useState<number>(0)
    const [labels, setLabels] = useState<TabProps[]>([])
    const intl = useIntl()

    const allTab : TabProps = {
        label: intl.formatMessage({
            id: 'common.all',
            defaultMessage: 'All',
        })
    }

    const debouncedHandleTabChange = debounce((index: number) => {
            setSelectedIdx(index)
        }, 300)

    const handleTabChange = useCallback(
        (index: number) => {
            debouncedHandleTabChange(index);
        },
        [debouncedHandleTabChange]
    )


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMarketGroups(eventType, sportId);
                setMarketGroups(response);

                const items: TabProps[] = response.map((data) => ({
                    id: data.groupId,
                    label: data.groupName
                }));
                setLabels([allTab].concat(items));
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [eventType, sportId]);

    useEffect(() => {
        const selectedMarketGroupId = labels[selectedIdx]
        setSelectedMarketGroup(marketGroups.find((group) => group.groupId === selectedMarketGroupId.id))
    }, [selectedIdx])

    return {
        labels,
        selectedIdx,
        handleTabChange,
        selectedMarketGroup
    }
}

export default useMarketTabViewModel