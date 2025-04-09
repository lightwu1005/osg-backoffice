import React, {useEffect, useState} from "react";
import {Box, Stack, ToggleButtonGroup, Typography, ToggleButton} from "@mui/material";
import {ComputerRounded, PhoneIphoneRounded} from "@mui/icons-material";
import PreviewBuilder from "@/app/betSlip/components/Preview";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export enum PreviewType {
    Desktop,
    Mobile
}

export interface PreviewHeaderCardProps {
    previewText?: string
    previewType?: PreviewType
}

interface PreviewHeaderProps {
    title?: string
    currentPreviewType: PreviewType
    handleTypeSelect: (_: React.MouseEvent<HTMLElement>, newType: PreviewType | null) => void
}

const PreviewSwitchGroup = ({ currentPreviewType, handleTypeSelect }: PreviewHeaderProps) => {
    return (
        <ToggleButtonGroup
            value={currentPreviewType}
            exclusive
            onChange={handleTypeSelect}
            sx={{
                width: 112,
                height: 40
            }}
        >
            <ToggleButton value={PreviewType.Desktop}
                          sx={{
                              color: 'darkgrey',
                              '&.Mui-selected': {
                                  color: 'black',
                              },
                          }}>
                <ComputerRounded/>
            </ToggleButton>
            <ToggleButton value={PreviewType.Mobile}
                          sx={{
                              color: 'darkgrey',
                              '&.Mui-selected': {
                                  color: 'black',
                              },
                          }}>
                <PhoneIphoneRounded/>
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

const PreviewHeader = ({ title, handleTypeSelect, currentPreviewType }: PreviewHeaderProps) => {
    return (
        <Box sx={{backgroundColor: '#F0F4F8', borderTopLeftRadius: 8, borderTopRightRadius: 8, width: '100%', height: '4rem'}}>
            <Stack direction={'row'} alignItems="center" justifyContent="space-between" sx={{height: '100%'}}>
                <Typography color={'#555E68'} variant={"body1"} sx={{marginLeft: 2}}>
                    {title}
                </Typography>
                <PreviewSwitchGroup currentPreviewType={currentPreviewType} handleTypeSelect={handleTypeSelect}/>
            </Stack>
        </Box>
    )
}

const PreviewCard = (props: PreviewHeaderCardProps) => {
    const {previewText, previewType} = props
    const [currentPreviewType, setCurrentPreviewType] = useState<PreviewType>(previewType ?? PreviewType.Desktop)
    const [marqueeText, setMarqueeText] = useState('')
    const intl = useIntl();
    const funCommonType = LocalizationFunctionType.Common;
    const funType = LocalizationFunctionType.BetSlip;

    useEffect(() => {
        if (previewText) {
            const msg = intl.formatMessage({
                id: `${funType}.rejectPreviewMsg`,
                defaultMessage: 'Dear Members, please be informed that your bet slip has been rejected due to : {reason}'
            }, { reason: previewText });

            setMarqueeText(prevState => {
                if (prevState === previewText) return prevState
                return msg
            })
        }
    }, [previewText])

    const handleTypeSelect = (_: React.MouseEvent<HTMLElement>, newType: PreviewType | null) => {
        if (newType !== null) {
            setCurrentPreviewType(newType)
        }
    }

    return (
        <Stack direction={"column"} spacing={2}>
            <PreviewHeader
                title={intl.formatMessage({id: `${funCommonType}.preview`, defaultMessage: 'Preview'})}
                currentPreviewType={currentPreviewType}
                handleTypeSelect={handleTypeSelect}
            />
            <PreviewBuilder
                previewType={currentPreviewType}
                text={marqueeText}
            />
        </Stack>
    )
}

const MemoizedPreviewCard = React.memo(PreviewCard)
MemoizedPreviewCard.displayName = 'PreviewCard'

export default MemoizedPreviewCard
