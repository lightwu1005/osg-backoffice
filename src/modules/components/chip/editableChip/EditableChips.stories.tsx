import {Meta, StoryObj} from "@storybook/react";
import {EditableChips} from "@/modules/components/chip/editableChip/EditableChips";

const meta = {
    component: EditableChips,
    parameters: {},
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof EditableChips>;

export default meta;
type Story = StoryObj<typeof meta>;

const handleClick = (id: string) => {
    console.log('click on tag button: ', id);
}

const rows = [
    {
        id: 1, tags: [
            'JAPAN', 'TAIWAN', 'TOKYO HOT',
            'JAPAN', 'TAIWAN', 'TOKYO HOT',
            'JAPAN', 'TAIWAN', 'TOKYO HOT',
            'JAPAN', 'TAIWAN', 'TOKYO HOT'
        ]
    },
];

export const Default: Story = {
    args: {
        id: "1",
        gridChipsProps: {id: "1", labels: rows[0].tags},
        onClicked: handleClick
    }
}