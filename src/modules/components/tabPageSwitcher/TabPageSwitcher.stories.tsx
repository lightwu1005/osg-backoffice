import type {Meta, StoryObj} from "@storybook/react"
import React from "react"
import {TabPageSwitcher} from "@/modules/components/tabPageSwitcher/TabPageSwitcher"

const meta = {
    component: TabPageSwitcher,
    tags: ["autodocs"],
} satisfies Meta<typeof TabPageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        tabs: [{
            key: 'tab1',
            text: 'Tab 1',
            type: 'tab1',
        },{
            key: 'tab2',
            text: 'Tab 2',
            type: 'tab2',
        },{
            key: 'tab3',
            text: 'Tab 3',
            type: 'tab3',
        }],
        contents: [{
            key: 'tab1',
            item: <div>Content 1</div>,
        },{
            key: 'tab2',
            item: <div>Content 2</div>,
        },{
            key: 'tab3',
            item: <div>Content 3</div>,
        }]
    },
    render: (args) => <TabPageSwitcher {...args} />,
}