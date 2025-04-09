import {Meta, StoryObj} from "@storybook/react";
import RiskButton from "@/modules/components/buttons/riskButton/RiskButton";

const meta = {
    component: RiskButton,
    parameters: {},
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof RiskButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const handleClick = (index?: string) => {
    console.log('click on tag button: ', index);
}

export const Default: Story = {
    args: {
        index: 'test 1',
        riskColor: 'grey',
        hover: 'Risk level',
        onClick: handleClick
    }
}