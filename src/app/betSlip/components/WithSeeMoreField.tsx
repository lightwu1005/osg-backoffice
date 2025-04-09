'use client';
import {Box, Stack, Tooltip, Typography} from "@mui/material";
import SeeMoreButton from "@/modules/components/buttons/textButton/SeeMoreButton";
import React, {FC, forwardRef, ReactNode, useEffect, useRef, useState} from "react";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {useIntl} from "react-intl";
import {MatchStatusChip} from "@/modules/components/chip/MatchStatusChip";
import {allFirstCharToUpperCase} from "@/modules/common/DisplayFormatConverter";
import {hashDataWith} from "@/utils/tools";

/**
 * @param data - array of string
 * @param limitItem - number of items to display
 * @param layoutType - type of layout
 * @param displayType - type of display
 * @param onClick - callback function when see more button is clicked
 * @param computedWidth - width of the container
 * @param className - class name of the text
 * @param hideSeeMoreButtonOnHover - hide see more button on hover
 * @param countIncludeDisplayItems - see more button count include display items
 * */
export interface WithSeeMoreFieldProps {
    data: ReactNode[]
    limitItem: number
    layoutType?: 'wording' | 'chip'
    displayType: 'plus-number' | 'leg' | 'number'
    onClick?: () => void
    computedWidth: number
    className?: string
    hideSeeMoreButtonOnHover?: boolean
    countIncludeDisplayItems?: boolean
}

export const ForwardedBox = forwardRef<HTMLDivElement, { children: ReactNode }>(({ children }, ref) => (
    <Box ref={ref}>{children}</Box>
));
ForwardedBox.displayName = 'ForwardedBox';

interface ForwardedTypographyProps {
    children: ReactNode;
    className?: string;
    computedWidth: number;
    seeMoreItemsLength: number;
}

export const ForwardedTypography = forwardRef<HTMLSpanElement, ForwardedTypographyProps>(({ children, className, computedWidth, seeMoreItemsLength }, ref) => (
    <Typography component={'span'} ref={ref} variant={'body2'} className={className} sx={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: (computedWidth > 80 && seeMoreItemsLength > 0) ? computedWidth - 80 : computedWidth,
    }}>
        {children}
    </Typography>
));
ForwardedTypography.displayName = 'ForwardedTypography';

const WithSeeMoreField: FC<Readonly<WithSeeMoreFieldProps>> = (props) => {
    const {
        data,
        limitItem = 1,
        layoutType = 'wording',
        displayType,
        onClick,
        computedWidth,
        hideSeeMoreButtonOnHover,
        countIncludeDisplayItems = false
    } = props
    const displayItems = data.slice(0, limitItem)
    const seeMoreItems = countIncludeDisplayItems ? data : data.slice(limitItem, data.length)
    const intl = useIntl()
    const funType = LocalizationFunctionType.Common

    const generateSeeMoreItems = (items: ReactNode[]) => {
        return items.map((item, index) => {
            if (React.isValidElement(item)) {
                return item
            }
            return (
                <Typography key={`${index} - ${item}`} variant={'body2'}>
                    {allFirstCharToUpperCase(item?.toString() ?? 'Unknown')}
                </Typography>
            )
        })
    }

    const seeMoreText = () => {
        switch (displayType) {
            case 'plus-number':
                return `(+${seeMoreItems.length})`
            case 'leg':
                return `(${seeMoreItems.length} ${intl.formatMessage({id: `${funType}.leg`, defaultMessage: 'Leg'})})`
            case 'number':
            default:
                return `(${seeMoreItems.length})`
        }
    }

    const textRef = useRef<HTMLSpanElement>(null);
    const [isOverflowed, setIsOverflowed] = useState(false);

    useEffect(() => {
        if (textRef.current) {
            setIsOverflowed(textRef.current.scrollWidth > textRef.current.clientWidth);
        }
    }, [displayItems]);

    switch (layoutType) {
        case "wording":
            return (
                <Stack direction="row" spacing={1} gap={'0.125rem'} alignContent="center" alignItems="center">
                    <Tooltip title={displayItems} arrow disableHoverListener={!isOverflowed}>
                        <div>
                            <ForwardedTypography ref={textRef} computedWidth={computedWidth}
                                                 seeMoreItemsLength={seeMoreItems.length}>
                                {displayItems.map((item, index) => <ForwardedBox
                                    key={`${index}-${hashDataWith(item)}`}>{item}</ForwardedBox>)}
                            </ForwardedTypography>
                        </div>
                    </Tooltip>
                    {
                        seeMoreItems.length > 0 &&
                        <SeeMoreButton
                            text={seeMoreText()}
                            hover={!hideSeeMoreButtonOnHover ? generateSeeMoreItems(seeMoreItems) : ''}
                            onClick={onClick}
                        />
                    }
                </Stack>
            )
        case "chip":
            return (
                <Stack direction="row" spacing={1} gap={'0.125rem'} alignContent="center" alignItems="center">
                    <Tooltip title={displayItems} arrow disableHoverListener={!isOverflowed}>
                        <div>
                            <MatchStatusChip status={displayItems[0] as string}/>
                        </div>
                    </Tooltip>
                    {seeMoreItems.length > 0 &&
                        <SeeMoreButton
                            text={seeMoreText()}
                            hover={!props.hideSeeMoreButtonOnHover ? generateSeeMoreItems(seeMoreItems) : ''}
                            onClick={props.onClick}
                        />
                    }
                </Stack>
            )
        default:
            return <Box></Box>;
    }
}

export default WithSeeMoreField