import type {Meta, StoryObj} from '@storybook/react';
import {expect, userEvent, within} from "@storybook/test";
import MockApi from "@/data/mockData/MockApi";
import Page from "@/app/configuration/page";
import store, {setRole} from "@/modules/common/IdentityRedux";
import {delay} from "@/utils/tools";
import {RoleType} from "@/services/@core/module/Enum";
import React from "react";
import {Providers} from "@/utils/Providers";

const {
    displayTypes,
    getDangerBallList,
    getConfiguration,
    updateConfiguration,
    getBrandConfiguration,
    updateBrandConfiguration,
} = MockApi()

const meta = {
    component: Page,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            displayTypes,
            getDangerBallList,
            getConfiguration,
            updateConfiguration,
            getBrandConfiguration,
            updateBrandConfiguration,
        ],
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: '/configuration'
            }
        }
    },
    tags: [],
    argTypes: {},
    decorators: [
        (Story) => {
            return (
                <Providers>
                    <Story/>
                </Providers>
            )
        },
    ]
} satisfies Meta<typeof Page>;

export default meta
type Story = StoryObj<typeof meta>;

export const EditConfiguration: Story = {
    render: (args) => {
        store.dispatch(setRole(RoleType.ChannelAdmin))
        return (
            <Providers>
                <Page {...args} />
            </Providers>
        )
    },
    play: async ({canvasElement, step}) => {
        const canvas = within(canvasElement);

        await delay(300)
        // const saveButton = canvas.getByRole('button', { name: /save/i })
        // await expect(saveButton).toBeDisabled()

        const rounding_1 = canvas.getByLabelText('0 > = 2 (e.g. 0.1416)')
        await expect(rounding_1).toBeInTheDocument()
        await userEvent.clear(rounding_1)
        await delay(300)
        await userEvent.type(rounding_1, '3')
        await delay(500)

        // const roundingIncrement_3 = canvas.getByLabelText('Thousandth')
        // await expect(roundingIncrement_3).toBeInTheDocument()
    }
}

export const AllRulesOn: Story = {
    render: (args) => {
        store.dispatch(setRole(RoleType.ChannelAdmin))
        return (
            <Providers>
                <Page {...args} />
            </Providers>
        )
    },
    play: async ({canvasElement, step}) => {
        const canvas = within(canvasElement);

        await delay(300)

        const rounding_1 = canvas.getByLabelText(/0 > = 2 \(e.g. 0.1416\)/i)
        await delay(500)
        await expect(rounding_1).toBeEnabled()
        await userEvent.clear(rounding_1)
        await userEvent.type(rounding_1, '3')

        await delay(300)
        // const roundingIncrement_3 = canvas.getByLabelText('Thousandth')
        // await expect(roundingIncrement_3).toBeInTheDocument()

        await delay(500)

        // const allRulesCheckBox = canvas.getByText(/all rules consistent/i)
        // await userEvent.click(allRulesCheckBox)
        const rounding_2 = canvas.getByLabelText(/2 > = 5 \(e.g. 2.1416\)/i)
        await expect(rounding_2).toBeInTheDocument();
        // await expect(rounding_2).toBeDisabled()

        // const saveButton = canvas.getByRole('button', { name: /save/i })
        // await expect(saveButton).toBeEnabled()
    }
}