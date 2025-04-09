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
            service: 'fake-server',
            error: {
                message: "Authentication failed",
                code: 8606
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
export const Login401MS: Story = {
    play: wrapWithLoadingCheck(async ({args, canvasElement, step}: { canvasElement: HTMLElement, args: Args, step: StepFunction }) => {
        SumbittedComponent(canvasElement, step)
    })
};
