import type {Meta, StoryObj} from "@storybook/react";
import MockApi from "@/data/mockData/MockApi";
import ActivatingListDialog from "@/app/template/pageComponent/ActivatingItems";
import React from "react";
import {Providers} from "@/utils/Providers";
import store, {setRole} from "@/modules/common/IdentityRedux";
import {RoleType} from "@/services/@core/module/Enum";
import {MemoryRouter} from "react-router-dom";

const {
    getActivatingItems
} = MockApi()

const meta = {
    component: ActivatingListDialog,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getActivatingItems
        ],
        nextjs: {
            appDirectory: true,
        }
    },
    tags: [],
    argTypes: {},
    decorators: [
        (Story) => {
            store.dispatch(setRole(RoleType.ChannelAdmin));
            return (
                <Providers>
                    <MemoryRouter initialEntries={['/']}>
                        <Story/>
                    </MemoryRouter>
                </Providers>
            )
        },
    ],
} satisfies Meta<typeof ActivatingListDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        open: true,
        setOpen: () => {},
        currentTemplate: { templateName: 'template1', eventNumber: '1000', eventType: 'inPlay', templateId:'1122334455', searchType: 'market', totalNumber: 10},
    },
    play: async ({ canvasElement }) => {
    }
}