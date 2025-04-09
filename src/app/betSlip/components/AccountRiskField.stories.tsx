import {Meta, StoryObj} from "@storybook/react";
import AccountRiskField from "@/app/betSlip/components/AccountRiskField";
import {RiskLevel} from "@/modules/components/buttons/riskButton/RiskButton";

const meta = {
    component: AccountRiskField,
    parameters: {},
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof AccountRiskField>;

export default meta;
type Story = StoryObj<typeof meta>;

const onMenuClick = (option: RiskLevel) => {
    console.log('click on tag button: ', option);
}

export const Default: Story = {
    args: {
        userId: 'ollehtest101',
        ipAddress: '218.201.160.38',
        riskColor: 'yellow',
        riskName: 'VVIP',
        menuItems: [
            {key: 'VIP', text: 'VIP'},
            {key: 'VVIP', text: 'VVIP'},
            {key: 'VVVIP', text: 'VVVIP'},
        ],
        onMenuClick: onMenuClick
    }
}
