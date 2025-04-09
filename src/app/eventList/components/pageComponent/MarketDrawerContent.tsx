import {OddsContent} from "@/app/eventDetail/components/OddsContent";
import {Box, Divider, Stack} from "@mui/material";
import React from "react";
import {MultiMenuTextFieldType} from "@/modules/components/TextField";
import {EventDetailPageProps} from "@/app/eventDetail/components/pageComponent/EventDetailPage";
import useEventDetailViewModel from "@/app/eventDetail/domain/useEventDetailViewModel";
import TeamInfoRow from "@/app/eventList/components/TeamInfoRow";
import {
    Action,
    MarketsComponentViewModelProps,
    useMarketsComponentViewModel
} from "@/app/eventDetail/domain/useMarketsComponentViewModel";
import {PageType} from "@/services/@core/module/Enum";
import {MemoizedStatusButtonGroup} from "@/modules/components/buttons/statusButtonGroup/StatusButtonGroup";
import Tabs from "@/modules/components/tabs/Tabs";
import {MemoizedAutoMultiMenuTextField} from "@/modules/components/TextField/MultiSelectTextField";

const MarketDrawerContent = (props: EventDetailPageProps) => {
    const {eventType, eventId} = props
    const {
        detailData,
        allMarketStatusItems,
        marketsFilter,
        providersFilter,
        displayFilterButtons,
        selectedMarket,
        handleMarketSelectedResult,
        handleStatusButtonOnClick,
        onClickMarketSetting,
        intl,
        funType,
        isBets,
        onClickAcceptData,
        home,
        away,
        marketsData,
        marketGroups
    } = useEventDetailViewModel(props)

    const marketsComponentProps: MarketsComponentViewModelProps = {
        title: intl.formatMessage({id: `${funType}.market`, defaultMessage: 'Market'}),
        subTitle: intl.formatMessage({
            id: `${funType}.marketDescription`,
            defaultMessage: 'You can control specific markets here.'
        }),
        allMarketStatusItems: allMarketStatusItems,
        marketProps: marketsFilter,
        marketGroups: marketGroups,
        providerProps: providersFilter,
        isBets: isBets,
        marketSelectedResult: handleMarketSelectedResult,
        statusButtonOnClick: handleStatusButtonOnClick,
        sportType: detailData?.sportType ?? 'Soccer',
        eventType: eventType
    }

    const {
        statusButtonSelectedIndex,
        selected,
        handleFilterChange,
        allMarketGroups,
        handleTabChange,
        marketPropsState,
        statusButtonGroupState,
        item
    } = useMarketsComponentViewModel(marketsComponentProps);

    return (
        <Box display={"flex"} sx={{paddingX: '0.25rem'}}>
            <Stack direction={"column"} spacing={2} sx={{width: '100%', height: 'auto'}}>
                <TeamInfoRow homeName={home.name} awayName={away.name}/>
                <Divider/>
                <Box sx={{width: '100%'}}>
                    <Tabs
                        labels={
                            allMarketGroups.map(label => ({
                                label: label.groupName
                            }))
                        }
                        labelsOnly={true}
                        defaultSelected={0}
                        selected={selected}
                        onTabChange={handleTabChange}
                    >
                        {null}
                    </Tabs>
                </Box>
                <MemoizedAutoMultiMenuTextField
                    options={marketPropsState.options}
                    placeholder={marketPropsState.placeholder}
                    isEmptyEqualSelectAll={marketPropsState.isEmptyEqualSelectAll}
                    initialSelectedOptions={marketPropsState.initialSelectedOptions}
                    fixedSelectedOptions={marketPropsState.fixedSelectedOptions}
                    displayType={MultiMenuTextFieldType.selectedCount}
                    onChange={(value: string[]) => handleFilterChange(Action.MARKETS, value)}
                />
                {statusButtonGroupState.length !== 0 && (
                    <MemoizedStatusButtonGroup
                        isCollapsedStyle={true}
                        items={statusButtonGroupState}
                        selectedIndex={statusButtonSelectedIndex}
                        ableToDeselect={false}
                        onClick={(index: number, key: string, deselected: boolean) => {
                            if (deselected) {
                                handleFilterChange(Action.STATUS_ITEM, {key: '', text: '', type: ''});
                            } else {
                                const selectedItem = statusButtonGroupState[index];
                                handleFilterChange(Action.STATUS_ITEM, selectedItem);
                            }
                        }}
                    />
                )}

                <OddsContent
                    pageType={PageType.EventList}
                    eventType={eventType}
                    eventId={eventId}
                    onClickMarketSetting={onClickMarketSetting}
                    selectedMarket={item ?? selectedMarket}
                    marketStatusItems={displayFilterButtons.items}
                    providers={["GENIUS"]}
                    detailData={detailData}
                    isBets={isBets}
                    onClickAcceptData={onClickAcceptData}
                    homeParticipantEnName={home.participantEnName ?? home.name}
                    awayParticipantEnName={away.participantEnName ?? home.name}
                    marketType={marketsData.find((market) => market.marketId === selectedMarket.key)?.marketType ?? ''}
                />
            </Stack>
        </Box>
    )
}

export default React.memo(MarketDrawerContent)