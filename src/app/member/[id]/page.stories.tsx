import type {Meta, StoryObj} from "@storybook/react";
import {expect, within} from "@storybook/test";
import MockApi from "@/data/mockData/MockApi";
import Page from "@/app/member/[id]/page";
import React from "react";
import {Providers} from "@/utils/Providers";
import {delay} from "@/utils/tools";
import {wrapWithLoadingCheck} from "@/utils/testUtils";

const {
    getRiskGroups,
    getMarkets,
    getLeagues,
    updateRiskGroupApply,
    getSingleRiskMembers,
    getRiskMembersBetSlips,
    getRiskMembersPerformanceTotalAmount,
    getRiskMembersPerformanceWinLossRate,
} = MockApi()

const meta = {
    component: Page,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getRiskGroups,
            getMarkets,
            getLeagues,
            updateRiskGroupApply,
            getSingleRiskMembers,
            getRiskMembersBetSlips,
            getRiskMembersPerformanceTotalAmount,
            getRiskMembersPerformanceWinLossRate,
        ],
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: '/member/12345'
            }
        }
    },
    decorators: [
        (Story) => {
            return (
                <Providers>
                    <Story/>
                </Providers>
            )
        },
    ],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: wrapWithLoadingCheck(async ({ canvasElement } : { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);

        const total = await canvas.findByTestId('totalBetAmount');
        await expect(total).toBeInTheDocument();

        const winLoss = await canvas.findByTestId('winLossRatePerformance');
        await expect(winLoss).toBeInTheDocument();

        const ip = document.getElementById('input-textField-ip')
        await expect(ip).toBeInTheDocument();

        const league = document.getElementById('input-textField-league')
        await expect(league).toBeInTheDocument();

        const market = document.getElementById('input-textField-market')
        await expect(market).toBeInTheDocument();

        const status = document.getElementById('input-textField-status')
        await expect(status).toBeInTheDocument();

        await delay(500)
        const tableRows = await canvas.findAllByRole('row');
        await expect(tableRows.length).toBeGreaterThan(1)
    })
}