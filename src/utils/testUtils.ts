import { waitFor } from "@storybook/test";

const waitForLoadingToDisappear = async (canvasElement: HTMLElement) => {
    await waitFor(
        async () => {
            const loadingElement = canvasElement.querySelector('#loading-progress');
            if (loadingElement) {
                throw new Error('Loading progress is still visible');
            }
        },
        {
            timeout: 5000,
            interval: 100,
        }
    );
};

export const wrapWithLoadingCheck = (originalPlay: Function) => {
    return async (context: any) => {
        const { canvasElement } = context;
        await waitForLoadingToDisappear(canvasElement);
        if (originalPlay) {
            await originalPlay(context);
        }
    };
};