import {Meta, StoryObj} from "@storybook/react";
import MockApi from "@/data/mockData/MockApi";
import {expect, userEvent, within} from "@storybook/test";
import store, {setRole} from "@/modules/common/IdentityRedux"
import {MemoryRouter} from "react-router-dom";
import React from "react";
import TemplateFormDialog from "@/app/template/pageComponent/TemplateFormDialog";
import {delay} from "@/utils/tools";
import {RoleType} from "@/services/@core/module/Enum";
import {ProvidersWithoutNavigation} from "@/utils/Providers";
import {wrapWithLoadingCheck} from "@/utils/testUtils";
import {StepFunction} from "@storybook/types";

const {
    getTemplateDetail,
    sportsCategories,
    getLeaguesWithSportId,
    getTemplateMarkets,
    getDangerBallList,
    getConfiguration
} = MockApi()

const meta = {
    component: TemplateFormDialog,
    parameters: {
        layout: 'fullscreen',
        mockData: [
            getTemplateDetail,
            sportsCategories,
            getLeaguesWithSportId,
            getTemplateMarkets,
            getDangerBallList,
            getConfiguration
        ],
    },
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
    tags: [],
    argTypes: {},
} satisfies Meta<typeof TemplateFormDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        open: true,
        templateModelProps: {
            eventType: 'inPlay',
            isDuplicate: false
        }
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        store.dispatch(setRole(RoleType.ChannelAdmin));
        const allFields = Array.from(document.querySelectorAll('.MuiInputBase-input'))

        await step('click first', async () => {
            const templateNameField = allFields[0];
            await expect(templateNameField).toBeInTheDocument();
            await userEvent.type(templateNameField, 'template1');
            await delay(500);

            const sportField = allFields[1];
            await expect(sportField).toBeInTheDocument();
            await userEvent.click(sportField);

            const activeOptionElement = document.getElementById('input-textField-chooseSport-option-0');
            await expect(activeOptionElement).toBeInTheDocument();
            await userEvent.click(activeOptionElement!);
            await userEvent.keyboard('{Escape}');
            await delay(500);

            const leagueField = document.getElementById('input-textField-chooseLeague');
            await expect(leagueField).toBeInTheDocument();
            await userEvent.click(leagueField);
            const leagueOption = document.getElementById('input-textField-chooseLeague-option-0');
            await userEvent.click(leagueOption);
            await userEvent.keyboard('{Escape}');
            await delay(500);
        });
        await step('click feeder', async () => {
            const feedMin = allFields[3]
            const feedMax = allFields[4]
            const feedDiff = allFields[5]

            await delay(500)

            await userEvent.clear(feedMin)
            await userEvent.clear(feedMax)
            await userEvent.clear(feedDiff)

            await delay(500)

            await expect(feedMin).toBeInTheDocument()
            await expect(feedMax).toBeInTheDocument()
            await expect(feedDiff).toBeInTheDocument()

            await userEvent.type(feedMin, '1')
            await userEvent.type(feedMax, '1000')
            await userEvent.type(feedDiff, '1000000')
        })

        await step('click margin line setting', async () => {
            const margin = allFields[6];
            await userEvent.clear(margin)
            await expect(margin).toBeInTheDocument();
            await userEvent.type(margin, '1');

            const lineField = allFields[7];
            await userEvent.click(lineField);
            const lineOption = await within(document.body).findByText('Mainline Only')
            await userEvent.click(lineOption)
        });

        await step('click deviation', async () => {
            const deviation = allFields[8];
            await expect(deviation).toBeInTheDocument();
            await userEvent.type(deviation, '1');
            const deviationAction = allFields[9];
            await expect(deviationAction).toBeInTheDocument();
            await userEvent.click(deviationAction);
            const deviationActionOption = await within(document.body).findByText('Follow the odds provider without margin guarantee')
            await userEvent.click(deviationActionOption);
        });
        await step('click betting', async () => {
            const bettingDiff = allFields[10];
            const bettingDecr = allFields[11];
            await userEvent.clear(bettingDiff);
            await userEvent.clear(bettingDecr);
            await expect(bettingDiff).toBeInTheDocument();
            await expect(bettingDecr).toBeInTheDocument();
            await userEvent.type(bettingDiff, '10');
            await userEvent.type(bettingDecr, '15');
        });
        await step('click heavy', async () => {
            const heavyTime = allFields[12];
            const heavyAmount = allFields[13];
            await userEvent.clear(heavyTime);
            await userEvent.clear(heavyAmount);
            await expect(heavyTime).toBeInTheDocument();
            await expect(heavyAmount).toBeInTheDocument();
            await userEvent.type(heavyTime, '12');
            await userEvent.type(heavyAmount, '15');
        });
    })
}

export const BetSlipSetting: Story = {
    args: {
        open: true,
        templateModelProps: {
            eventType: 'inPlay',
            isDuplicate: true
        }
    },
    play: wrapWithLoadingCheck(async ({ canvasElement, step } : { canvasElement: HTMLElement, step: StepFunction }) => {
        const allButtons = Array.from(document.querySelectorAll('.MuiButtonBase-root'))
        const betSlipSettingTab = allButtons[3]
        await expect(betSlipSettingTab).toBeInTheDocument();
        await userEvent.click(betSlipSettingTab)

        const allFields = Array.from(document.querySelectorAll('.MuiInputBase-input'))

        await step('click imbalance setting', async () => {
            const accept = allFields[5]
            const action = allFields[6]

            await delay(500)

            await userEvent.clear(accept)

            await delay(500)

            await expect(accept).toBeInTheDocument()
            await expect(action).toBeInTheDocument()

            await userEvent.type(accept, '1')
            await userEvent.click(action)
            const option = await within(document.body).findByText('Auto Reject Bet Slip')
            await expect(option).toBeInTheDocument()
            await userEvent.click(option)
        })

        await step('click below the margin setting', async () => {
            const margin = allFields[7]
            const alertArr = allFields[8]

            await delay(500)

            await userEvent.clear(margin)

            await delay(500)

            await expect(margin).toBeInTheDocument()
            await expect(alertArr).toBeInTheDocument()

            await userEvent.type(margin, '1')
            await userEvent.click(alertArr)
            const option = await within(document.body).findByText('Notify Admin')
            await expect(option).toBeInTheDocument()
            await userEvent.click(option)
            await userEvent.keyboard('{Escape}')
        })

        await step('click delayed acceptance setting', async () => {
            const event = allFields[9]
            const sec = allFields[10]

            await delay(500)

            await userEvent.clear(sec)

            await delay(500)

            await expect(event).toBeInTheDocument()
            await expect(sec).toBeInTheDocument()

            await userEvent.type(sec, '10')
            await userEvent.click(event)
            const option = await within(document.body).findByText('Corner')
            await expect(option).toBeInTheDocument()
            await userEvent.click(option)
            await userEvent.keyboard('{Escape}')
        })

        await step('click single bet setting', async () => {
            const min = allFields[11]
            const max = allFields[12]
            const payout = allFields[13]

            await delay(500)

            await userEvent.clear(min)
            await userEvent.clear(max)
            await userEvent.clear(payout)

            await delay(500)

            await expect(min).toBeInTheDocument()
            await expect(max).toBeInTheDocument()
            await expect(payout).toBeInTheDocument()

            await userEvent.type(min, '10')
            await userEvent.type(max, '10')
            await userEvent.type(payout, '10')
        })

        const allSwitchFields = Array.from(document.querySelectorAll('.MuiSwitch-input'))

        await step('click parlay sgp', async () => {
            const parlay = allSwitchFields[0]
            const sgp = allSwitchFields[1]
            await expect(parlay).toBeInTheDocument();
            await expect(sgp).toBeInTheDocument();

            const parlay1 = allFields[14]
            const parlay2 = allFields[15]
            const parlay3 = allFields[16]
            const parlay4 = allFields[17]
            const parlay5 = allFields[18]
            const sgp1 = allFields[19]
            const sgp2 = allFields[20]
            const sgp3 = allFields[21]
            const sgp4 = allFields[22]
            const sgp5 = allFields[23]

            await expect(parlay1).toBeInTheDocument()
            await expect(parlay2).toBeInTheDocument()
            await expect(parlay3).toBeInTheDocument()
            await expect(parlay4).toBeInTheDocument()
            await expect(parlay5).toBeInTheDocument()
            await expect(sgp1).toBeInTheDocument()
            await expect(sgp2).toBeInTheDocument()
            await expect(sgp3).toBeInTheDocument()
            await expect(sgp4).toBeInTheDocument()
            await expect(sgp5).toBeInTheDocument()

            await delay(500)

            await userEvent.type(parlay1, '10')
            await userEvent.type(parlay2, '10')
            await userEvent.type(parlay3, '10')
            await userEvent.type(parlay4, '10')
            await userEvent.type(parlay5, '10')
            await userEvent.type(sgp1, '10')
            await userEvent.type(sgp2, '10')
            await userEvent.type(sgp3, '10')
            await userEvent.type(sgp4, '10')
            await userEvent.type(sgp5, '10')
        })

        await step('click parlay alert notify', async () => {
            const alertArr = allFields[26]


            await delay(500)

            await expect(alertArr).toBeInTheDocument()

            await userEvent.click(alertArr)
            const option = await within(document.body).findByText('Notify Trader')
            await expect(option).toBeInTheDocument()
            await userEvent.click(option)
            await userEvent.keyboard('{Escape}')
        })

        await step('click rapid bet entry and auto settlement', async () => {
            const rapidEnable = allSwitchFields[2]
            const autoEnable = allSwitchFields[3]

            await expect(rapidEnable).toBeInTheDocument();
            await expect(autoEnable).toBeInTheDocument();

            await userEvent.click(rapidEnable)
            await userEvent.click(autoEnable)

            await delay(500)

            const allFields = Array.from(document.querySelectorAll('.MuiInputBase-input'))

            const tigger = allFields[17]
            const bets = allFields[18]
            const line = allFields[19]
            const autoSettle = allFields[20]

            await delay(500)

            await userEvent.clear(tigger)
            await userEvent.clear(bets)
            await userEvent.clear(line)
            await userEvent.clear(autoSettle)

            await delay(500)

            await expect(tigger).toBeInTheDocument()
            await expect(bets).toBeInTheDocument()
            await expect(line).toBeInTheDocument()
            await expect(autoSettle).toBeInTheDocument()

            await userEvent.type(tigger, '10')
            await userEvent.type(bets, '10')
            await userEvent.type(line, '10')
            await userEvent.type(autoSettle, '10')
        })
    })
}