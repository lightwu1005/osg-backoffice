import type {Meta, StoryObj} from '@storybook/react';
import React, {useState} from "react";
import {expect, userEvent, within} from "@storybook/test";
import SlideMenu from "@/modules/components/slideMenu/SlideMenu";
import ApiUrlBuilder from "@/services/@core/module/ApiUrlBuilder";
import {mockSingleMember} from "@/data/mockData/common/MockRowData";
import MockApi from "@/data/mockData/MockApi";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {getSingleMemberInfo} = MockApi()

const mockData = [
    {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.notificationsUnreadNumber),
        method: "GET",
        status: 200,
        response: {
            totalUnread: 123
        }
    },
    getSingleMemberInfo
]

const DefaultMenu = () => {
    const [isSlideMenuOpen, setIsSlideMenuOpen] = useState(true);

    return (
        <Providers>
            <SlideMenu open={isSlideMenuOpen} setOpen={setIsSlideMenuOpen}/>
        </Providers>
    )
}

const meta = {
    component: DefaultMenu,
    decorators: [(Story) => (
        <Providers>
            <Story/>
        </Providers>
    )],
    parameters: {
        mockData,
        nextjs: {
            appDirectory: true
        }
    },
} satisfies Meta<typeof DefaultMenu>;

export default meta
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);

        const listItems = await canvas.findAllByRole('listitem');

        listItems.forEach((item) => {
            expect(item).toBeInTheDocument();
        });

        const toggleButton = canvas.getByText('Collapse')

        step('toggleButton click', async () => {
            await userEvent.dblClick(toggleButton, {
                delay: 1000
            });
        });
    })
};

export const Admin: Story = {
    parameters: {
        mockData: [
            {
                url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.singleMember),
                method: "GET",
                status: 200,
                response: {
                    ...mockSingleMember,
                    functionality: 'Admin',
                }
            }
        ]
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);

        const listItems = await canvas.findAllByTestId('listItemButton');
        await expect(listItems).toHaveLength(5);
    })
}
/* // marked due to the functionality now load from .env.local, that will only can run one BO at same time.
export const Odds: Story = {
    parameters: {
        mockData: [
            {
                url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.singleMember),
                method: "GET",
                status: 200,
                response: {
                    ...mockSingleMember,
                    functionality: 'Odds',
                }
            }
        ]
    },
    play: async ({canvasElement, step}) => {
        const canvas = within(canvasElement);

        const listItems = await canvas.findAllByTestId('listItemButton');
        await expect(listItems).toHaveLength(13);
    }
}
 */

