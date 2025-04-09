import {Meta, StoryObj} from "@storybook/react";
import MockApi from "@/data/mockData/MockApi";
import {expect, within} from "@storybook/test";
import store, {setRole} from "@/modules/common/IdentityRedux"
import {MemoryRouter} from "react-router-dom";
import React from "react";
import EditMemberTagsDialog from "@/app/member/components/pageComponent/EditMemberTagsDialog";
import {RoleType} from "@/services/@core/module/Enum";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const {
    getTagsWithRandomData,
    updateTagsApply
} = MockApi()

const meta = {
    component: EditMemberTagsDialog,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getTagsWithRandomData,
            updateTagsApply
        ],
    },
    decorators: [
        (Story) => {
            store.dispatch(setRole(RoleType.BetsAdmin));
            return (
                <ProvidersWithoutNavigation>
                    <MemoryRouter initialEntries={['/']}>
                        <Story/>
                    </MemoryRouter>
                </ProvidersWithoutNavigation>
            )
        },
    ],
    tags: [],
    argTypes: {},
} satisfies Meta<typeof EditMemberTagsDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        open: true,
        punterId: '123456',
        initialSelectedOptions: [{name: 'fake_tag_0', id: 'id_0'}]
    },
    play: async ({canvasElement, step}) => {
        const canvas = within(document.body);
        const inputField = await canvas.findByLabelText("Tags");
        await expect(inputField).toBeInTheDocument();
    }
}
