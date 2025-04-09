import CheckBoxItem from "@/modules/components/CheckBox/CheckBoxItem";
import {Meta, StoryObj} from "@storybook/react";
import CheckBoxGroup from "@/modules/components/CheckBox/CheckBoxGroup";
import {userEvent, within} from "@storybook/test";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const meta: Meta = {
    component: CheckBoxItem,
    argTypes: {
        isChecked: {control: 'boolean'},
        label: {control: 'text'},
        disabled: {control: 'boolean'},
    },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        isChecked: true,
        label: 'checkbox',
    }
};
export const Group: Story = {
    args: {
        items: [
            {id: '1', label: "checkbox1", checked: true},
            {id: '2', label: "checkbox2", checked: false},
            {id: '3', label: "checkbox3", checked: false},
        ],
    },
    render: (args) => {
        return <CheckBoxGroup items={args.items}/>
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);
        const check1 = canvas.getByText('checkbox1');
        const check2 = canvas.getByText('checkbox2');
        const check3 = canvas.getByText('checkbox3');

        await userEvent.click(check1, {
            delay: 500
        });
        await userEvent.click(check2, {
            delay: 500
        });
        await userEvent.click(check3, {
            delay: 500
        });
    })
};