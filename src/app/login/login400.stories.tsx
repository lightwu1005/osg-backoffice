import type {Args, Meta, StoryObj} from '@storybook/react';
import Page from "./page"
import ApiUrlBuilder from "@/services/@core/module/ApiUrlBuilder";
import {SumbittedComponent} from "@/app/login/page.stories";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const mockData = [
    {
        url: ApiUrlBuilder.getPath(ApiUrlBuilder.MockServer.login),
        method: "POST",
        status: 400,
        response: {
            service: 'fake-server',
            error: {
                message: "Not found",
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
export const Login400: Story = {
    play: wrapWithLoadingCheck(async ({args, canvasElement, step}: { canvasElement: HTMLElement, args: Args, step: StepFunction }) => {
        await SumbittedComponent(canvasElement, step)
    })
};
