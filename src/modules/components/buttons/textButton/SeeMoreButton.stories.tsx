import {Meta, StoryObj} from "@storybook/react";
import SeeMoreButton from "@/modules/components/buttons/textButton/SeeMoreButton";

const meta = {
    component: SeeMoreButton,
    parameters: {},
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof SeeMoreButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const handleClick = () => {
    console.log('click on see more button');
}

export const Leagues: Story = {
    args: {
        text: '(+3)',
        hover: 'League1, League2, League3'
    }
}

export const Legs: Story = {
    args: {
        text: '(20 Leg)',
        onClick: handleClick
    }
}