import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import {within} from "@storybook/test";
import InfoHeaderInput from "@/modules/components/infoHeaderInput/InfoHeaderInput";
import {Stack} from "@mui/material";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";

const meta: Meta<typeof InfoHeaderInput> = {
    component: InfoHeaderInput,
    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <Providers>
                <Story/>
            </Providers>
        )
    ]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        tip: 'tip',
        label: "label",
        value: '9999',
        helperText: 'helperText',
        onChange: (e) => {
            console.log(e.target.value)
        }
    },
    render: (args) => {
        return <Stack spacing={'0.125rem'}>
            <Stack direction="row" spacing={'0.125rem'}>
                <InfoHeaderInput {...args} header={'Number'} prefix={'@'} format={'number'}/>
                <InfoHeaderInput {...args} header={'Money'} prefix={'$'} format={'money'}/>
                <InfoHeaderInput {...args} header={'Text'} format={'text'} value={'abcd'}/>
            </Stack>
            <Stack direction="row" spacing={'0.125rem'}>
                <InfoHeaderInput {...args} header={'Number'} error prefix={'@'} format={'number'}/>
                <InfoHeaderInput {...args} header={'Money'} error prefix={'$'} format={'money'}/>
                <InfoHeaderInput {...args} header={'Text'} error format={'text'} value={'abcd'}/>
            </Stack>
        </Stack>
    },
    play: wrapWithLoadingCheck(async ({canvasElement}: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);

    })
};