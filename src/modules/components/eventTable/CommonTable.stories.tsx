import React from 'react';
import CommonTable, {CommonTableProps} from '@/modules/components/eventTable/CommonTable';
import {adminColumns as dashboardColumns} from '@/app/dashboard/components/adminColumns';
import {
    checkboxSelection,
    columns as eventListColumns,
    disableSelectionOnClick,
    rowsPerPageOptions
} from '@/app/eventList/components/columns';
import {mockEventList} from "@/data/mockData/event/MockEventRowData";
import {Meta, StoryObj} from '@storybook/react';
import {expect, userEvent, within} from "@storybook/test";
import {PersistGate} from "redux-persist/integration/react";
import {persistor} from "@/modules/common/IdentityRedux";
import {useIntl} from "react-intl";
import {ApplyTemplate} from "@/services/@core/module/ResponseDataModels";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import IdentityHandler from "@/modules/common/IdentityHandler";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import { datadogLogs } from "@/config/Datadog";

export default {
    component: CommonTable,
} satisfies Meta<typeof CommonTable>;

type Story = StoryObj<CommonTableProps>;

const handleCopyButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) => {
    event.stopPropagation();
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text copied to clipboard: ', text);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
            datadogLogs.logger.error('Failed to copy text', {}, err instanceof Error ? err : new Error(String(err)));
        });
}

const handleTemplateBtnClick = (applyTemplate: ApplyTemplate) => {
   console.log('Template button clicked: ', applyTemplate);
}

const OddsDashboardTableComponent = (props: CommonTableProps) => {
    const intl = useIntl();
    const columns = dashboardColumns(intl, LocalizationFunctionType.Dashboard);
    return <CommonTable {...props} columns={columns}/>;
};
const OddsOperationTableComponent = (props: CommonTableProps) => {
    const {oddsDisplay} = IdentityHandler()
    const intl = useIntl();
    const columns = eventListColumns(intl, LocalizationFunctionType.Dashboard, '', oddsDisplay, handleCopyButtonClick);
    return <CommonTable {...props} columns={columns}/>;
};

export const OddsDashboardTable: Story = {
    render: (args) => {
        return (
            <ProvidersWithoutNavigation>
                <OddsDashboardTableComponent {...args} />
            </ProvidersWithoutNavigation>
        )
    },
    args: {
        rows: mockEventList.content,
        pageModel: {page: 1, pageSize: 10}
    },
    play: wrapWithLoadingCheck(async ({canvasElement}: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);

        const gridView = await canvas.findByRole('grid');
        await expect(gridView).toBeInTheDocument();
    })
};

export const OddsOperationTable: Story = {
    args: {
        pageSizeOptions: rowsPerPageOptions,
        checkboxSelection: checkboxSelection,
        disableRowSelectionOnClick: disableSelectionOnClick,
        rows: mockEventList.content,
        pageModel: {page: 1, pageSize: 10}
    },
    render: (args) => {
        return (
            <ProvidersWithoutNavigation>
                <PersistGate persistor={persistor}>
                    <OddsOperationTableComponent {...args} />
                </PersistGate>
            </ProvidersWithoutNavigation>
        )
    },
    play: wrapWithLoadingCheck(async ({canvasElement}: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);

        const gridView = await canvas.findByRole('grid');
        await expect(gridView).toBeInTheDocument();

        const checkbox = canvas.getAllByRole('checkbox');
        await expect(checkbox).toHaveLength;
        await userEvent.click(checkbox.at(0));
        await expect(checkbox.at(0)).toBeChecked();
    })
};



