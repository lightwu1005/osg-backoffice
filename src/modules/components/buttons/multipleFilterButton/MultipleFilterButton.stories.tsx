import {Meta, StoryObj} from "@storybook/react";
import {MultipleFilterButton} from "@/modules/components/buttons/multipleFilterButton/MultipleFilterButton";
import {FilterVM, SelectedOptions} from "@/modules/components/buttons/multipleFilterButton/models/Interface"
import {expect, userEvent, within} from "@storybook/test";
import React, {ReactElement, useEffect, useState} from "react";
import MockApi from "@/data/mockData/MockApi";
import {FilterSection} from "@/modules/components/buttons/multipleFilterButton/pageComponent/FilterSection";
import {MarketFilterViewModel} from "@/modules/components/buttons/multipleFilterButton/domain/MarketFilterViewModel";
import {SportFilterViewModel} from "@/modules/components/buttons/multipleFilterButton/domain/SportFilterViewModel";
import {
    LocationFilterViewModel
} from "@/modules/components/buttons/multipleFilterButton/domain/LocationFilterViewModel";
import {LeagueFilterViewModel} from "@/modules/components/buttons/multipleFilterButton/domain/LeagueFilterViewModel";
import {DeviceFilterViewModel} from "@/modules/components/buttons/multipleFilterButton/domain/DeviceFilterViewModel";
import {ConditionPayout} from "@/modules/components/buttons/multipleFilterButton/pageComponent/ConditionPayout";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {EventStartTime} from "@/modules/components/buttons/multipleFilterButton/pageComponent/EventStartTime";
import {
    BetStatusFilterViewModel
} from "@/modules/components/buttons/multipleFilterButton/domain/BetStatusFilterViewModel";
import {CustomFilterSection} from "@/modules/components/buttons/multipleFilterButton/pageComponent/CustomFilterSection";
import {BetTypeFilterViewModel} from "@/modules/components/buttons/multipleFilterButton/domain/BetTypeFilterViewModel";
import PaidIcon from "@mui/icons-material/Paid";
import {
    BetResultFilterViewModel
} from "@/modules/components/buttons/multipleFilterButton/domain/BetResultFilterViewModel";
import {
    BetSlipStatusFilterViewModel
} from "@/modules/components/buttons/multipleFilterButton/domain/BetSlipStatusFilterViewModel";
import {delay} from "@/utils/tools";
import {ProviderFilterViewModel} from "./domain/ProviderFilterViewModel";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    getMarkets,
    getMarketsWithSearch,
    sportsCategories,
    locations,
    getLeagues
} = MockApi()


const DemoMultipleFilterButton = ({children}: { children: ReactElement<FilterVM> | ReactElement<FilterVM>[] }) => {
    const [selected, setSelected] = useState<SelectedOptions<any>>({});
    useEffect(() => {
        console.log(JSON.stringify(selected))
    }, [selected]);
    return <MultipleFilterButton
        selected={selected}
        setSelected={setSelected}>
        {children}
    </MultipleFilterButton>;
};

const meta = {
    component: DemoMultipleFilterButton,
    parameters: {
        mockData: [getMarkets, getMarketsWithSearch, sportsCategories, locations, getLeagues],
    },
    tags: ["autodocs"],
    argTypes: {},
    decorators: [
        (Story) => {
            return (
                <ProvidersWithoutNavigation>
                    <Story />
                </ProvidersWithoutNavigation>
            )
        },
    ]
} satisfies Meta<typeof DemoMultipleFilterButton>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: [
            <FilterSection key={0} ViewModel={BetTypeFilterViewModel}/>,
            <FilterSection key={1} ViewModel={SportFilterViewModel}/>,
            <FilterSection key={2} ViewModel={LeagueFilterViewModel}/>,
            <FilterSection key={3} ViewModel={MarketFilterViewModel}/>,
            <FilterSection key={4} ViewModel={BetStatusFilterViewModel}/>,
            <CustomFilterSection key={5} ItemProps={{
                getFilterItemProps: () => {
                    return {
                        labelLangKey: 'maximumPayout',
                        label: 'Maximum Payout',
                        icon: PaidIcon
                    }
                }
            }}>
                <ConditionPayout/>
            </CustomFilterSection>,
            <FilterSection key={6} ViewModel={DeviceFilterViewModel}/>,
            <FilterSection key={7} ViewModel={BetSlipStatusFilterViewModel}/>,
            <FilterSection key={6} ViewModel={BetResultFilterViewModel}/>,
            <FilterSection key={8} option={{
                sportId: '54321'
            }} ViewModel={LocationFilterViewModel}/>,
            <CustomFilterSection key={9} ItemProps={{
                getFilterItemProps: () => {
                    return {
                        labelLangKey: 'eventStartTime',
                        label: 'Event Start Time',
                        icon: CalendarTodayIcon
                    }
                }
            }}>
                <EventStartTime/>
            </CustomFilterSection>,
            <FilterSection key={10} ViewModel={ProviderFilterViewModel}/>,
        ]
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);
        const filterButton = canvas.getByText('Filter');
        await expect(filterButton).toBeInTheDocument();

        // await step('Search', async () => {
        //     await userEvent.click(filterButton)
        //     const allFields = Array.from(document.querySelectorAll('.MuiInputBase-input'))
        //     await delay(500);
        //     const searchField = allFields[0];
        //     await expect(searchField).toBeInTheDocument();
        //     await userEvent.type(searchField, '1x2')
        //     const option = await within(document.body).findByText('1x2')
        //     await delay(500);
        //     await userEvent.click(option)
        //     await delay(500);
        // });

        await step('Multiple', async () => {
            await userEvent.click(filterButton)
            const MarketButton = await within(document.body).findByText('Market')
            await expect(MarketButton).toBeInTheDocument();
            await userEvent.click(MarketButton)
            await delay(500);
            const option = await within(document.body).findByText('Handicape')
            await expect(option).toBeInTheDocument();
            await userEvent.click(option)
            await delay(500);
            await userEvent.keyboard('{Escape}');
        });


        await step('Multiple Search', async () => {
            await userEvent.click(filterButton)
            const MarketButton = await within(document.body).findByText('Market')
            await expect(MarketButton).toBeInTheDocument();
            await userEvent.click(MarketButton)
            await delay(500);
            const allFields = Array.from(document.querySelectorAll('.MuiInputBase-input'))
            const searchField = allFields[0];
            await expect(searchField).toBeInTheDocument();
            await userEvent.type(searchField, '1')
            const option = await within(document.body).findByText('1X2')
            await userEvent.click(option)
            await delay(500);
            await userEvent.keyboard('{Escape}');
        });


        await step('Range', async () => {
            await userEvent.click(filterButton)
            await delay(500);
            const MaximumPayoutButton = await within(document.body).findByText('Maximum Payout')
            await expect(MaximumPayoutButton).toBeInTheDocument();
            await userEvent.click(MaximumPayoutButton)
            await delay(500);
            const MaximumPayoutOption = await within(document.body).findByText('Greater than')
            await expect(MaximumPayoutOption).toBeInTheDocument();
            await userEvent.click(MaximumPayoutOption)
            await delay(500);
            const BetweenOption = await within(document.body).findByText('Between')
            await expect(BetweenOption).toBeInTheDocument();
            await userEvent.click(BetweenOption)
            const allFields = Array.from(document.querySelectorAll('.MuiInputBase-input'))
            const minFields = allFields[1]
            const maxFields = allFields[2]
            await expect(minFields).toBeInTheDocument();
            await expect(maxFields).toBeInTheDocument();
            await delay(500);
            await userEvent.type(minFields, '1')
            await userEvent.type(maxFields, '1000')
            await delay(500);
            await userEvent.keyboard('{Escape}');
            await delay(500);
        });

        await step('Clean', async () => {
            await userEvent.click(filterButton)
            await delay(500);
            const CleanButton = await within(document.body).findByText('Clean')
            await expect(CleanButton).toBeInTheDocument();
            await userEvent.click(CleanButton)
            await delay(500);
            await userEvent.keyboard('{Escape}');
        });
    })
}