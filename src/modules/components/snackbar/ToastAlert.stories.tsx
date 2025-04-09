import {Meta, StoryObj} from '@storybook/react';
import ToastAlert from './ToastAlert';

const meta: Meta = {
    component: ToastAlert,
    argTypes: {
        show: { control: 'boolean' },
        message: { control: 'text' },
        severity: {
            control: 'select', options: ['success', 'error', 'warning', 'info'] ,
        },
        horizontal: { control: 'select', options: ['left', 'center', 'right'] },
        vertical: { control: 'select', options: ['top', 'center', 'bottom'] },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        show: true,
        message: 'message',
        severity: 'success',
        vertical: 'top',
        horizontal: 'center',
    },
    render: (args) => (
        <ToastAlert
            alertInfo={{
                message: args.message,
                severity: args.severity,
                show: args.show,
            }}
            position={{
                horizontal: args.horizontal,
                vertical: args.vertical,
            }}
            closeAlert={()=>{}}/>
    ),
};