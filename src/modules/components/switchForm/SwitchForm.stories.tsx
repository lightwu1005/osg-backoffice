import type {Meta, StoryObj} from "@storybook/react";
import SwitchForm, {SwitchFormProps} from "@/modules/components/switchForm/SwitchForm";
import React, {useState} from "react";
import store, {setRole} from "@/modules/common/IdentityRedux";
import {RoleType} from "@/services/@core/module/Enum";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {MemoryRouter} from "react-router-dom";

const meta = {
    component: SwitchForm,
    tags: ["autodocs"],
    decorators: [
        (Story) => {
            store.dispatch(setRole(RoleType.ChannelAdmin));
            return (
                <ProvidersWithoutNavigation>
                    <MemoryRouter initialEntries={['/']}>
                        <Story/>
                    </MemoryRouter>
                </ProvidersWithoutNavigation>
            )
        },
    ],
} satisfies Meta<typeof SwitchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const SwitchFormState: React.FC<SwitchFormProps> = (props) => {
    const [selected, setSelected] = useState<boolean>(false);
    const [minimumLegs, setMinimumLegs] = useState<number>(2)
    const [maximumLegs, setMaximumLegs] = useState<number>(20)
    const [minimum, setMinimum] = useState<number>(1)
    const [maximum, setMaximum] = useState<number>(1000)
    const [payout, setPayout] = useState<number>(1000000)

    const dataArr = [
        [{value: minimumLegs, onChange: setMinimumLegs},
            {value: maximumLegs, onChange: setMaximumLegs}],
        [{value: minimum, onChange: setMinimum},
            {value: maximum, onChange: setMaximum},
            {value: payout, onChange: setPayout}]
    ]

    const {enabled, inputArr} = props

    enabled.value = selected
    enabled.onChange = setSelected

    inputArr.forEach((item, index) => {
        item.map((column, idx) => {
            column.value = dataArr[index][idx].value
            column.onChange = dataArr[index][idx].onChange
        })
    })

    return <SwitchForm {...props} />;
};

export const Default: Story = {
    args: {
        header: {
            title: 'Parlay Bet Setting',
            tip: 'Setting enabled parlay and same game parlay, as well as parlay bet limitation.'
        },
        enabled: {
            label: 'Parlay',
            value: false,
            onChange: () => {
            },
            disabled: false
        },
        inputArr: [
            [
                {
                    label: 'Minimum Legs',
                    format: 'number',
                    value: '',
                    onChange: () => {
                    },
                    disable: false,
                    header: '',
                    tip: '',
                    error: false,
                    helperText: '',
                    limit:[1, 9999]
                },
                {
                    label: 'Maximum Legs',
                    format: 'number',
                    value: '',
                    onChange: () => {
                    },
                    disable: false,
                    tip: '',
                    error: false,
                    helperText: '',
                    header: '',
                    limit:[1, 9999]
                },
            ],
            [
                {
                    label: 'Minimum Amount',
                    format: 'number',
                    value: '',
                    onChange: () => {
                    },
                    disable: false,
                    header: '',
                    tip: '',
                    error: false,
                    helperText: '',
                    limit:[1, 9999]
                },
                {
                    label: 'Maximum Amount',
                    format: 'number',
                    value: '',
                    tip: '',
                    helperText: '',
                    header: '',
                    onChange: () => {
                    },
                    disable: false,
                    error: false,
                    limit:[1, 9999]
                },
                {
                    label: 'Maximum Payout Amount',
                    format: 'number',
                    value: '',
                    onChange: () => {
                    },
                    disable: false,
                    tip: '',
                    error: false,
                    helperText: '',
                    header: '',
                    limit:[1, 9999]
                },
            ],
        ]
    },
    render: (args) => <SwitchFormState {...args} />,
}