import {Meta, StoryObj} from "@storybook/react";
import {CustomChip} from "@/modules/components/chip/CustomChip";
import {ChipColor} from "@/modules/components/chip/MuiChipsStyled";

const meta: Meta<typeof CustomChip> = {
    component: CustomChip,
    tags: ["autodocs"],
    argTypes: {}
} as Meta<typeof CustomChip>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        return (
            <>
                <CustomChip color={ChipColor.default} label={'Default'}/>
                <CustomChip color={ChipColor.grey} label={'Grey'}/>
                <CustomChip color={ChipColor.blue} label={'Blue'}/>
                <CustomChip color={ChipColor.green} label={'Green'}/>
                <CustomChip color={ChipColor.red} label={'Red'}/>
                <CustomChip color={ChipColor.brown} label={'Brown'}/>
                <CustomChip color={ChipColor.yellow} label={'Yellow'}/>
                <CustomChip color={ChipColor.black} label={'Black'}/>
            </>
        )
    }
};