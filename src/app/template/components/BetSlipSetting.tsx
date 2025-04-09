import SwitchForm, {SwitchFormProps} from "@/modules/components/switchForm/SwitchForm"
import {Grid, Stack, Typography} from "@mui/material"
import FormControl from "@mui/material/FormControl"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"
import {
    InfoInputComponent,
    InfoMultiSelectComponent,
    InfoSelectComponent,
    MultiMenuTextFieldType
} from "@/modules/components/TextField"
import StyledToolTip from "@/modules/components/general/StyledToolTip"
import {IntlShape} from "react-intl"
import {
    FeederSuspendActionType,
    DangerAttackActionType,
    ImbalanceAmountActionType,
    AlertRecipientsRoleType
} from "@/app/template/models/actionType"
import {getEnumValueByKey} from "@/modules/common/DataProcessUnit"
import {BetSlipSettingDataModel} from "@/app/template/models/TemplateDetailDataModel"
import React from "react"
import {InfoOutlined, KeyboardArrowDownRounded} from "@mui/icons-material"
import {range1To100, range1To999, range1To999999999} from "@/utils/rangeLimits"
import CheckBoxItem from "@/modules/components/CheckBox/CheckBoxItem"
import {allFirstCharToUpperCase} from "@/modules/common/DisplayFormatConverter";
import lodash from "lodash";
import {passRateOptions} from "@/app/template/domain/useTemplateFormViewModel";

export interface BetSlipSettingProps {
    intl: IntlShape,
    funType: string,
    isEditable: boolean,
    betSlipSetting: BetSlipSettingDataModel
    onBetSlipSettingChange?: (path: string) => (value: any) => void
    situationEventList?: string[]
    parlay: SwitchFormProps
    sgp: SwitchFormProps
    rapid: SwitchFormProps,
    autoSettlement: SwitchFormProps
}

export const BetSlipSetting = ({
                                   intl,
                                   funType,
                                   isEditable,
                                   betSlipSetting,
                                   onBetSlipSettingChange,
                                   situationEventList,
                                   parlay,
                                   sgp,
                                   rapid,
                                   autoSettlement
                               }: BetSlipSettingProps) => {
    return (
        <Grid container spacing={2} flexGrow={1} alignContent={'start'} alignItems={'flex-start'}>
            <Grid item xs={6}>
                <InfoSelectComponent
                    key="feeder-suspend-market"
                    header={intl.formatMessage({
                        id: `${funType}.feederSuspendMarket`, defaultMessage: 'Feeder Suspend Market' })}
                    tip={intl.formatMessage({
                        id: `${funType}.feederSuspendMarketTips`,
                        defaultMessage: 'When the feeder suspends the market, the system will take actions on ' +
                            'member‘s bet slips such as accepting, rejecting, or holding the bet slips.' })}
                    menu={{
                        label: '',
                        options: Object.values(FeederSuspendActionType),
                        value: getEnumValueByKey(FeederSuspendActionType, betSlipSetting?.feederSuspend ?? 'AUTO_HOLD'),
                        onChange: onBetSlipSettingChange?.('feederSuspend')
                    }}
                    disabled={isEditable}
                />
            </Grid>
            <Grid item xs={6}>
                <InfoSelectComponent
                    key="danger-attack-score-change"
                    header={intl.formatMessage({ id: `${funType}.dangerAttackOrScoreChange`,
                        defaultMessage: 'Danger attack or score change' })}
                    tip={intl.formatMessage({ id: `${funType}.dangerAttackOrScoreChangeTips`,
                        defaultMessage: 'When a danger attack or score change occurs, the system will ' +
                            'automatically manage the bet slips.' })}
                    menu={{
                        label: '',
                        options: Object.values(DangerAttackActionType),
                        value: getEnumValueByKey(DangerAttackActionType, betSlipSetting?.dangerAttackAction ?? 'AUTO_HOLD'),
                        onChange: onBetSlipSettingChange?.('dangerAttackAction')
                    }}
                    disabled={isEditable}
                />
            </Grid>

            <Grid item xs={12} mt={1}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <Typography variant={"h4"}>
                            {
                                intl.formatMessage({ id: `${funType}.betSlipAmountImbalanceSetting`,
                                    defaultMessage: 'Bet Slip Amount Imbalance Setting' })
                            }
                        </Typography>
                        <StyledToolTip
                            title={intl.formatMessage({ id: `${funType}.betSlipAmountImbalanceSettingTips`,
                                defaultMessage: 'When the bet slip imbalance reaches a specific percentage, ' +
                                    'it will trigger a recalculation and send notifications.' })}>
                            <InfoOutlined/>
                        </StyledToolTip>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <RadioGroup
                        row
                        onChange={onBetSlipSettingChange?.('imbalanceSettings.type')}>
                        <FormControlLabel
                            disabled={isEditable}
                            value="PERCENTAGE"
                            control={<Radio checked={betSlipSetting?.imbalanceSettings?.type === 'PERCENTAGE'} />}
                            label={intl.formatMessage({ id: `${funType}.percentage`,
                                defaultMessage: 'Percentage' })}
                        />
                        <FormControlLabel
                            disabled={isEditable}
                            value="AMOUNT"
                            control={<Radio checked={betSlipSetting?.imbalanceSettings?.type === 'AMOUNT'} />}
                            label={intl.formatMessage({ id: `common.amount`,
                                defaultMessage: 'Amount' })}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <InfoInputComponent
                    key="bet-slip-imbalance"
                    header={''}
                    error={false}
                    format={"number"}
                    prefix={'<'}
                    suffix={betSlipSetting?.imbalanceSettings?.type === 'PERCENTAGE' ? '%' : undefined}
                    tip={''}
                    label={intl.formatMessage({ id: `${funType}.autoAcceptBetSlip`,
                        defaultMessage: 'Auto Accept Bet Slip' })}
                    helperText={''}
                    value={betSlipSetting?.imbalanceSettings?.autoAccept}
                    limitRange={betSlipSetting?.imbalanceSettings?.type === 'PERCENTAGE' ? range1To100 : range1To999999999}
                    onChange={onBetSlipSettingChange?.('imbalanceSettings.autoAccept')}
                    disable={isEditable}
                />
            </Grid>
            <Grid item xs={6}>
                <InfoSelectComponent
                    key="bet-slip-imbalance-amount-action"
                    header={''}
                    tip={''}
                    menu={{
                        label: `>= ${betSlipSetting?.imbalanceSettings?.autoAccept} ${betSlipSetting?.imbalanceSettings?.type === 'PERCENTAGE' ? ' %' : ''}`,
                        options: Object.values(ImbalanceAmountActionType),
                        value: getEnumValueByKey(ImbalanceAmountActionType, betSlipSetting?.imbalanceSettings?.action ?? 'AUTO_HOLD'),
                        onChange: onBetSlipSettingChange?.('imbalanceSettings.action')
                    }}
                    disabled={isEditable}
                />
            </Grid>

            <Grid item xs={12} mt={1}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <Typography variant={"h4"}>
                            {intl.formatMessage({ id: `${funType}.belowTheMarginSetting`,
                                defaultMessage: 'Below the Margin Setting' })}
                        </Typography>
                        <StyledToolTip title={intl.formatMessage({
                            id: `${funType}.belowTheMarginSettingTips`,
                            defaultMessage: 'When the margin falls below a certain percentage, ' +
                                'set up notifications to be sent.' })}
                        >
                            <InfoOutlined/>
                        </StyledToolTip>
                    </Stack>
                </Stack>
            </Grid >
            <Grid item xs={6}>
                <InfoInputComponent
                    key="below-margin"
                    disable={isEditable}
                    header={''}
                    error={false}
                    tip={""}
                    label={intl.formatMessage({
                        id: `${funType}.belowMargin`, defaultMessage: 'margin %' })}
                    helperText={intl.formatMessage({ id: `common.pleaseEnterAValidValue`,
                        defaultMessage: 'Please enter a valid value' })}
                    suffix={'%'}
                    format={"number"}
                    value={Number(betSlipSetting?.belowMarginSettings?.margin)}
                    onChange={onBetSlipSettingChange?.('belowMarginSettings.margin')}
                    limitRange={range1To100}
                />
            </Grid>
            <Grid item xs={6}>
                <InfoMultiSelectComponent
                    key="below-margin-notifications"
                    header={''}
                    menu={{
                        label: intl.formatMessage({ id: `${funType}.setAlertNotificationRecipients`,
                            defaultMessage: 'Set Alert Notification Recipients' }),
                        options: Object.values(AlertRecipientsRoleType),
                        initialSelectedOptions: betSlipSetting?.belowMarginSettings?.alertRecipients.map(action => {
                            return getEnumValueByKey(AlertRecipientsRoleType, action)
                        }) as string[],
                        onChange: onBetSlipSettingChange?.('belowMarginSettings.alertRecipients')
                    }}
                    disabled={isEditable}
                />
            </Grid>

            <Grid item xs={12} mt={1}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <Typography variant={"h4"}>
                            {intl.formatMessage({ id: `${funType}.delayedAcceptanceSetting`, defaultMessage: 'Delayed Acceptance Setting' })}
                        </Typography>
                        <StyledToolTip title={intl.formatMessage({
                            id: `${funType}.delayedAcceptanceSettingTip`,
                            defaultMessage: 'When the conditions happen will delayed bet slip acceptance.'
                        })}>
                            <InfoOutlined />
                        </StyledToolTip>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <InfoMultiSelectComponent
                    disabled={isEditable}
                    header={''}
                    tip={''}
                    menu={{
                        label: intl.formatMessage({ id: `${funType}.selectSituationEvent`, defaultMessage: 'Select Situation Event' }),
                        placeholder: intl.formatMessage({ id: `${funType}.selectSituationEvent`, defaultMessage: 'Select Situation Event' }),
                        options: situationEventList ?? [],
                        onChange: onBetSlipSettingChange?.('delayedSettings.situation'),
                        initialSelectedOptions: lodash.isArray(betSlipSetting?.delayedSettings?.situation) ? betSlipSetting?.delayedSettings.situation?.map(item => allFirstCharToUpperCase(item)) : [],
                        limitTags: 2,
                        endAdornment: <KeyboardArrowDownRounded />
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <InfoInputComponent
                    disable={isEditable}
                    header={''}
                    error={false}
                    tip={""}
                    label={intl.formatMessage({ id: `${funType}.delayedBetSlipAcceptance`, defaultMessage: 'Delayed Bet Slip Acceptance (Second)' })}
                    helperText={''}
                    suffix={intl.formatMessage({ id: `${funType}.second`, defaultMessage: 'Second' })}
                    format={"number"}
                    value={Number(betSlipSetting?.delayedSettings.delayedSecond)}
                    onChange={onBetSlipSettingChange?.('delayedSettings.delayedSecond')}
                    limitRange={range1To999}
                />
            </Grid>

            <Grid item xs={12} mt={1}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <Typography variant={"h4"}>
                            {intl.formatMessage({ id: `${funType}.singleBetSetting`,
                                defaultMessage: 'Single Bet Setting' })}
                        </Typography>
                        <StyledToolTip title={intl.formatMessage({
                            id: `${funType}.singleBetSettingTip`,
                            defaultMessage: 'Setting minimum/ maximum bet amounts and payout amounts.'
                        })}>
                            <InfoOutlined />
                        </StyledToolTip>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <InfoInputComponent
                    disable={isEditable}
                    header={''}
                    error={Number(betSlipSetting?.singleBetSettings?.minimum) > Number(betSlipSetting?.singleBetSettings?.maximum)}
                    tip={""}
                    label={intl.formatMessage({ id: `${funType}.minimumAmount`,
                        defaultMessage: 'Minimum Amount' })}
                    helperText={intl.formatMessage({ id: `${funType}.amountLessThanMax`,
                        defaultMessage: 'The amount needs to be less than the maximum.' })}
                    format={"number"}
                    value={Number(betSlipSetting?.singleBetSettings?.minimum)}
                    onChange={onBetSlipSettingChange?.('singleBetSettings.minimum')}
                    limitRange={range1To999999999}
                />
            </Grid>
            <Grid item xs={4}>
                <InfoInputComponent
                    disable={isEditable}
                    header={''}
                    error={Number(betSlipSetting?.singleBetSettings?.minimum) > Number(betSlipSetting?.singleBetSettings?.maximum)}
                    label={intl.formatMessage({ id: `${funType}.maximumAmount`,
                        defaultMessage: 'Maximum Amount' })}
                    helperText={intl.formatMessage({ id: `${funType}.amountGreaterThanMin`,
                        defaultMessage: 'The amount needs to be greater than the minimum.' })}
                    format={"number"}
                    value={Number(betSlipSetting?.singleBetSettings?.maximum)}
                    onChange={onBetSlipSettingChange?.('singleBetSettings.maximum')}
                    limitRange={range1To999999999}
                />
            </Grid>
            <Grid item xs={4}>
                <InfoInputComponent
                    disable={isEditable}
                    header={''}
                    error={false}
                    label={intl.formatMessage({ id: `${funType}.maximumPayout`, defaultMessage: 'Maximum Payout' })}
                    helperText={''}
                    format={"number"}
                    value={Number(betSlipSetting?.singleBetSettings?.maxPayout)}
                    onChange={onBetSlipSettingChange?.('singleBetSettings.maxPayout')}
                    limitRange={range1To999999999}
                />
            </Grid>

            <SwitchForm {...parlay}/>
            <SwitchForm {...sgp}/>

            <Grid item xs={12}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <Typography variant={"h4"}>
                            {intl.formatMessage({ id: `${funType}.parlayAlertSettings`,
                                defaultMessage: 'Parlay Alert Settings' })}
                        </Typography>
                        <StyledToolTip title={intl.formatMessage({
                            id: `${funType}.parlayAlertSettingsTips`,
                            defaultMessage: 'When the pass rate of parlay bets reaches a specific percentage, ' +
                                'will send a reminder notification.' })}>
                            <InfoOutlined/>
                        </StyledToolTip>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <RadioGroup
                        row
                        onChange={onBetSlipSettingChange?.('parlayAlert.type')}>
                        <FormControlLabel
                            disabled={isEditable}
                            value="PERCENTAGE"
                            control={<Radio checked={betSlipSetting?.parlayAlert.type === 'PERCENTAGE'} />}
                            label={intl.formatMessage({ id: `${funType}.percentage`,
                                defaultMessage: 'Percentage' })}
                        />
                        <FormControlLabel
                            disabled={isEditable}
                            value="LEGS"
                            control={<Radio checked={betSlipSetting?.parlayAlert.type === 'LEGS'} />}
                            label={intl.formatMessage({ id: `${funType}.parlayLegs`,
                                defaultMessage: 'Parlay Legs' })}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                {
                    betSlipSetting?.parlayAlert.type === 'PERCENTAGE' ?
                        <InfoSelectComponent
                            key="parlay-alert-settings"
                            header={''}
                            tip={''}
                            menu={{
                                label: intl.formatMessage({ id: `${funType}.passRate`, defaultMessage: 'Pass Rate %' }),
                                prefix: '<',
                                options: passRateOptions.map(option => `${option}%`),
                                value: betSlipSetting?.parlayAlert?.type === 'PERCENTAGE' ?
                                    passRateOptions.find(option => option === `${betSlipSetting?.parlayAlert?.targetNumber}`)+ '%'
                                    : betSlipSetting.parlayAlert.targetNumber as unknown as string,
                                onChange: onBetSlipSettingChange?.('parlayAlert.targetNumber')
                            }}
                            disabled={isEditable}
                        />
                        :
                        <InfoInputComponent
                            disable={isEditable}
                            header={''}
                            error={false}
                            label={intl.formatMessage({ id: `${funType}.remainingParlayLegs`,
                                defaultMessage: 'Remaining Parlay Legs' })}
                            helperText={''}
                            format={"number"}
                            value={Number(betSlipSetting?.parlayAlert?.targetNumber)}
                            onChange={onBetSlipSettingChange?.('parlayAlert.targetNumber')}
                            limitRange={range1To999}
                        />
                }
            </Grid>
            <Grid item xs={4}>
                <InfoInputComponent
                    disable={isEditable}
                    header={''}
                    error={Number(betSlipSetting?.singleBetSettings?.minimum) > Number(betSlipSetting?.singleBetSettings?.maximum)}
                    label={intl.formatMessage({ id: `${funType}.potentialWin`,
                        defaultMessage: 'Potential Win' })}
                    helperText={intl.formatMessage({ id: `${funType}.amountGreaterThanMin`,
                        defaultMessage: 'The amount needs to be greater than the minimum.' })}
                    format={"number"}
                    value={Number(betSlipSetting?.parlayAlert?.potentialWin)}
                    onChange={onBetSlipSettingChange?.('parlayAlert.potentialWin')}
                    limitRange={range1To999999999}
                />
            </Grid>
            <Grid item xs={4}>
                <InfoMultiSelectComponent
                    key="parlay-alert-notifications"
                    header={''}
                    menu={{
                        label: intl.formatMessage({ id: `${funType}.setAlertNotificationRecipients`,
                            defaultMessage: 'Set Alert Notification Recipients' }),
                        displayType: MultiMenuTextFieldType.renderTag,
                        options: Object.values(AlertRecipientsRoleType),
                        initialSelectedOptions: betSlipSetting?.parlayAlert?.alertRecipients.map(action => {
                            return getEnumValueByKey(AlertRecipientsRoleType, action)
                        }) as string[],
                        onChange: onBetSlipSettingChange?.('parlayAlert.alertRecipients')
                    }}
                    disabled={isEditable}
                />
            </Grid>
            <Grid item xs={12}>
                <CheckBoxItem
                    label={intl.formatMessage({ id: `${funType}.sendNotificationToEmail`,
                        defaultMessage: 'Send notification to email' })}
                    isChecked={Boolean(betSlipSetting?.parlayAlert?.sendEmail)}
                    onChange={onBetSlipSettingChange?.('parlayAlert.sendEmail')}
                    disabled={isEditable}
                />
            </Grid>

            <SwitchForm {...rapid}/>
            <SwitchForm {...autoSettlement}/>
        </Grid>
    )
}