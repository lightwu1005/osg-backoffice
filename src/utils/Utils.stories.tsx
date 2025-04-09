import type {Meta, StoryObj} from "@storybook/react";
import {expect, userEvent, within} from "@storybook/test";
import ActionButton, {ActionItem} from "@/modules/components/buttons/actionButton/ActionButton";
import {Box, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {mockDisplayTypes} from "@/data/mockData/common/MockRowData";
import {oddsFormat} from "@/utils/OddsFormat";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const list = mockDisplayTypes.map((type) => {
   return {
       key: type.id,
       value: type.typeName
   } as ActionItem
});
const OddsFormatView = () => {
    const [odds, setOdds] = useState('')
    const [formatOdds, setFormatOdds] = useState('')
    const [displayType, setDisplayType] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOdds(e.target.value)
    };
    const handleActionClick = (item: ActionItem) => {
        setDisplayType(item.value as string)
        setFormatOdds(oddsFormat(odds, item.value as string))
    }
    
    useEffect(() => {
        setFormatOdds(oddsFormat(odds, displayType as string))
    }, [odds])
    return <Box width={'50vw'}>
        <TextField label="input" onChange={handleChange}/>
        <ActionButton
            label={"DisplayType"}
            list={list}
            onItemClick={handleActionClick}/>
        <Typography data-testid='Odd' variant="h3" gutterBottom>{formatOdds}</Typography>
    </Box>
}

const meta = {
    component: OddsFormatView,
    parameters: {
        layout: 'centered',
    },
    tags: [],
    argTypes: {},
} satisfies Meta<typeof OddsFormatView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OddsFormat: Story = {
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const canvas = within(canvasElement);
        const actionButton = canvas.getByText('DisplayType');
        const odd = canvas.getByTestId('Odd');
        const input = canvas.getByLabelText('input');
        async function selectItem(item: ActionItem) {
            await step('action click', async () => {
                await userEvent.click(actionButton, {
                    delay: 50
                });
            });

            const index = list.indexOf(item);
            const menuItem = document.getElementsByClassName('MuiMenuItem-root')[index];

            await step(`menu item click ${index}`, async () => {
                await userEvent.click(menuItem, {
                    delay: 150
                });
            });
        }

        async function verify() {
            for (const item of list) {
                await selectItem(item)
                const oddValue = odd["textContent"]
                const expected = verifyData[item.value as keyof Object]
                await expect(oddValue).toBe(expected);
            }
        }

        await userEvent.type(input, '1.5');
        let verifyData = {
            Decimal: '1.50',
            American: '-200.00',
            Fractional: '1/2',
            Malay: '-2.00',
            Indonesian: '-2.00',
            'Hong Kong': '0.50'
        }
        await verify()

        await userEvent.clear(input);
        
        await userEvent.type(input, '3.0', {
            delay: 100
        });
        verifyData = {
            Decimal: '3.00',
            American: '+200.00',
            Fractional: '2/1',
            Malay: '2.00',
            Indonesian: '+2.00',
            'Hong Kong': '2.00'
        }
        await verify()
    })
}