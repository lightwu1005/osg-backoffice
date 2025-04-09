import {Meta, StoryObj} from "@storybook/react";
import {within} from "@storybook/test";
import CommonHorizontalBarchart, {BarchartDataSet} from "@/modules/components/charts/CommonHorizontalBarchart";
import {MockImbalancePerformanceData, MockMarketPerformanceData} from "@/data/mockData/dashboard/MockPerformanceData";
import {InfoType} from "@/services/@core/module/Enum";
import React from "react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";

const meta = {
    component: CommonHorizontalBarchart,
    parameters: {},
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
} satisfies Meta<typeof CommonHorizontalBarchart>;

export default meta;
type Story = StoryObj<typeof meta>;

// These two data handling functions need to implement into ViewModel to give BarChart correct data in each data type
function getNumberLabels() {
    return MockMarketPerformanceData.map(item => item.infoTitle)
}

function getInfoIds() {
    return MockMarketPerformanceData.map(item => item.infoId)
}

function getNumberDisplayData() {
    const uniqueDataNames = Array.from(MockMarketPerformanceData.reduce((acc, item) => {
        item.infoData.forEach(dataItem => {
            acc.add(dataItem.dataName);
        });
        return acc;
    }, new Set()));
    const infoDataArray = MockMarketPerformanceData.map(item => item.infoData)
    const separatedArray = uniqueDataNames.map(name =>
        infoDataArray.flatMap(item => item.filter(b => b.dataName === name))
    )
    return [
        {
            data: separatedArray.flatMap(item => item.map(a => a.dataNumber)),
            label: '',
            stack: ''
        }
    ]
}

export const MoneyBarChart: Story = {
    args: {
        infoType: InfoType.Market,
        title: 'Market Name',
        subTitle: 'Number of Bets',
        height: 300,
        colors: [],
        dataType: 'number',
        data: getNumberDisplayData(),
        labels: getNumberLabels(),
        infoIds: getInfoIds()
    },
    render: (args) => <CommonHorizontalBarchart {...args}/>,
    play: wrapWithLoadingCheck(async ({ canvasElement } : { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
    })
}

// These two data handling functions need to implement into ViewModel to give BarChart correct data in each data type
function getPercentageLabels() {
    return MockImbalancePerformanceData.map(item => item.infoTitle)
}

function getPercentageDisplayData() {
    const uniqueDataNames = Array.from(MockImbalancePerformanceData.reduce((acc, item) => {
        item.infoData.forEach(dataItem => {
            acc.add(dataItem.dataName);
        });
        return acc;
    }, new Set()));
    const infoDataArray = MockImbalancePerformanceData.map(item => item.infoData)
    const separatedArray = uniqueDataNames.map(name =>
        infoDataArray.flatMap(item => item.filter(b => b.dataName === name))
    )

    return separatedArray.map(item => {
        const data: BarchartDataSet = {
            data: item.map(a => a.dataNumber),
            label: item[0].dataName,
            stack: 'stake'
        }
        return data
    })
}

export const PercentageBarChart: Story = {
    args: {
        infoType: InfoType.Imbalance,
        title: 'Event Name',
        subTitle: 'Imbalance Percentage',
        height: 300,
        colors: ['#8657FF', '#76CAFF'],
        dataType: 'percentage',
        data: getPercentageDisplayData(),
        labels: getPercentageLabels(),
        infoIds: getInfoIds()
    },
    render: (args) => <CommonHorizontalBarchart {...args}/>,
    play: wrapWithLoadingCheck(async ({ canvasElement } : { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
    })
}

export const NoData: Story = {
    args: {
        infoType: InfoType.Market,
        title: 'Market Name',
        subTitle: 'Number of Bets',
        height: 300,
        colors: [],
        dataType: 'number',
        data: [],
        labels: [],
        infoIds: []
    }
}