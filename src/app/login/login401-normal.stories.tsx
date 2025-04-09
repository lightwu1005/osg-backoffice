import type {Args, Meta, StoryObj} from '@storybook/react';
import Page from "./page"
import ApiUrlBuilder from "@/services/@core/module/ApiUrlBuilder";
import {SumbittedComponent} from "@/app/login/page.stories";
import React from "react";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const mockData = [
    {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.login),
        method: "POST",
        status: 401,
        response: {
            service: "osg-oauth-service",
            error: {
                message: "Authentication failed: Bad credentials",
                code: 8604
            }
        }
    }
]

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    component: Page,
    decorators: [(Story) => (
        <Providers>
            <Story/>
        </Providers>
    )],
    parameters: {
        mockData,
        nextjs: {
            appDirectory: true,
        },
    },
} satisfies Meta<typeof Page>;

export default meta
type Story = StoryObj<typeof meta>;
export const Login401Normal: Story = {
    play: wrapWithLoadingCheck(async ({args, canvasElement, step}: { canvasElement: HTMLElement, args: Args, step: StepFunction }) => {
        await SumbittedComponent(canvasElement, step)
    })
};
