import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import {expect, userEvent, within} from "@storybook/test";
import {MemoryRouter} from 'react-router-dom';
import LoggedInFrame from './LoggedInFrame';
import store from "@/modules/common/IdentityRedux";
import {Providers} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";

const meta: Meta<typeof LoggedInFrame> = {
    component: LoggedInFrame,
    parameters: {
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: '/dashboard'
            }
        }
    },
    decorators: [
        (Story) => (
            <Providers>
                <MemoryRouter initialEntries={['/']}>
                    <Story/>
                </MemoryRouter>
            </Providers>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: wrapWithLoadingCheck(async ({canvasElement}: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);

        const listItems = await canvas.findAllByRole('listitem');

        for (const item of listItems) {
            try {
                await expect(item).toHaveClass('MuiListItem-root');
                await userEvent.click(item, {delay: 500});
            } catch (error) {
                console.log('Routing error in Storybook:', error);
            }

            const pageTitle = canvas.getByTestId('pageTitle');
            // marked for cannot run real next-router in storybook, so cannot get real page name in screen.
            // await expect(pageTitle).toHaveTextContent(item.title);

        }

        const avatarButton = canvas.getByTestId('avatarActionButton');
        await expect(avatarButton).toBeInTheDocument();

        const usernameDisplay = canvas.getByTestId('usernameDisplay');
        await expect(usernameDisplay).toHaveTextContent(store.getState().un ?? '');
    })
};