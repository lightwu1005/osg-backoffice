import {ProvidersWithoutNavigation} from "@/utils/Providers";
import type {Meta, StoryObj} from "@storybook/react";
import React, {useEffect, useState} from "react";
import MarketConfigFormContent, {
    MarketConfigFormContentProps
} from "@/app/template/components/marketConfigForm/MarketConfigFormContent";
import {mockTemplateMarkets, mockTemplateNewMarkets} from "@/data/mockData/template/MockTemplateList";
import {GridValidRowModel} from "@mui/x-data-grid";
import {expect, userEvent, waitFor, within} from "@storybook/test";
import {MarketConfigModel} from "@/services/@core/module/ResponseDataModels";

const meta = {
    component: MarketConfigFormContent,
    parameters: {
        mockData: []
    },
    decorators: [
        (Story) => (
            <ProvidersWithoutNavigation>
                <Story />
            </ProvidersWithoutNavigation>
        ),
    ]
} satisfies Meta<typeof MarketConfigFormContent>;

export default meta;
type Story = StoryObj<typeof meta>;

const MarketConfigFormContentWithState = (args: MarketConfigFormContentProps) => {
    const [selectedMarketIds, setSelectedMarketIds] = useState<string[]>(args.selectedMarketIds);
    const originalMarketRowData = args.marketRowData;
    const [marketRowData, setMarketRowData] = useState<MarketConfigModel[]>(args.marketRowData);

    const handleMarketSelectOnChange = (selectedMarketNames: string[]) => {
        const selectedMarketIds = args.markets
            .filter(market => selectedMarketNames.includes(market.marketName))
            .map(market => market.marketId);
        setSelectedMarketIds(selectedMarketIds);
    };

    const handleMarketRowUpdate = (row: GridValidRowModel) => {
        setMarketRowData((prevData) => prevData.map((marketConfig) =>
            marketConfig.marketId === row.marketId ? {...marketConfig, ...row} : marketConfig
        ));
    };

    useEffect(() => {
        const totalMarketConfigs = args.markets
            .filter(market => selectedMarketIds.includes(market.marketId))
            .map(market => {
                const existingConfig =
                    originalMarketRowData.find(config => config.marketId === market.marketId) ||
                    marketRowData.find(config => config.marketId === market.marketId);
                return existingConfig || {
                    marketId: market.marketId,
                    marketName: market.marketName,
                    margin: 0,
                    minimumDifference: 0,
                    lineSettings: "1",
                    singleBetSettings: {
                        minimum: 1,
                        maximum: 10000,
                        maxPayout: 1000000
                    },
                    parlayable: false,
                    sgpable: false
                } as MarketConfigModel;
            });
        setMarketRowData(totalMarketConfigs);
    }, [selectedMarketIds, args.markets]);

    return (
        <MarketConfigFormContent
            {...args}
            selectedMarketIds={selectedMarketIds}
            marketRowData={marketRowData}
            handleMarketSelectOnChange={handleMarketSelectOnChange}
            handleMarketRowUpdate={handleMarketRowUpdate}
        />
    );
};

export const Default: Story = {
    args: {
        eventType: 'inPlay',
        sportId: '1',
        markets: mockTemplateMarkets.content,
        marketRowData: mockTemplateNewMarkets,
        selectedMarketIds: mockTemplateNewMarkets.map(market => market.marketId)
    },
    render: (args) => <MarketConfigFormContentWithState {...args} />,
    play: async ({canvasElement, step, args}) => {
        const canvas = within(document.body);

        const gridView = await canvas.findByRole('grid');
        await expect(gridView).toBeInTheDocument();

        const autocomplete = await canvas.findByRole('combobox');
        await userEvent.click(autocomplete);

        const menu = await canvas.findByRole('listbox');
        await expect(menu).toBeInTheDocument();
        const options = await canvas.findAllByRole('option');
        options.shift();
        await expect(options).toHaveLength(args.markets.length);

        const selectedOptions = within(menu).getAllByRole('option', {selected: true});
        await expect(selectedOptions).toHaveLength(args.selectedMarketIds.length);
        await userEvent.keyboard('{Escape}');

        const rows = Array.from(gridView.querySelectorAll('div[data-field="marketName"]'));
        rows.shift();
        await expect(rows).toHaveLength(args.selectedMarketIds.length);

        await step('Check on All Options', async () => {
            await userEvent.click(autocomplete);
            const options = await canvas.findAllByRole('option');
            const allOption = options.shift();
            await userEvent.click(allOption);
            await userEvent.keyboard('{Escape}');

            await waitFor(async () => {
                const rows = Array.from(gridView.querySelectorAll('div[data-field="marketName"]'));
                rows.shift();
                await expect(rows).toHaveLength(13);
            }, {timeout: 1000});
        })
    }
};