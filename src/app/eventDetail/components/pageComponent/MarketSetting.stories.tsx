import {Meta, StoryObj} from "@storybook/react";
import MockApi from "@/data/mockData/MockApi";
import {expect, userEvent, within} from "@storybook/test";
import {MemoryRouter} from "react-router-dom";
import React from "react";
import MarketSettingDialog from "@/app/eventDetail/components/pageComponent/MarketSettingDialog";
import {delay} from "@/utils/tools";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    getEventMarketSettings,
    getTemplateDetail,
    getTemplates,
    eventMarketDetail,
    sportsCategories,
    getConfiguration
} = MockApi()

const meta = {
    component: MarketSettingDialog,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getEventMarketSettings,
            getTemplateDetail,
            getTemplates,
            eventMarketDetail,
            sportsCategories,
            getConfiguration
        ],
    },
    decorators: [
        (Story) => (
            <ProvidersWithoutNavigation>
                <MemoryRouter initialEntries={['/']}>
                    <Story/>
                </MemoryRouter>
            </ProvidersWithoutNavigation>
        ),
    ],
    tags: [],
    argTypes: {},
} satisfies Meta<typeof MarketSettingDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        open: true,
        marketSettingProps: {
            eventType: 'inPlay',
            eventId: '12345',
            marketId: "123",
            sportId: '123567',
            sportType: 'Soccer',
            sportName: 'Soccer',
        }
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const allFields = Array.from(document.querySelectorAll('.MuiInputBase-input'))
        const templateField = allFields[1];
        await expect(templateField).toBeInTheDocument();
        await delay(1000);
        await userEvent.click(templateField);
        await delay(1000);
        const option = await within(document.body).findByText('Create as new template');
        await delay(1000);
        await userEvent.click(option);
    })
}