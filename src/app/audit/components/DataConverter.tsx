import React, {useEffect, useRef, useState} from "react";
import {Box} from "@mui/material";
import SeeMoreButton from "@/modules/components/buttons/textButton/SeeMoreButton";

export interface DescriptionCellParams {
    value: string;
    computedWidth: number;
    clickSeeMoreButton: (value: string) => void;
    buttonText: string;
}

export const DescriptionRenderer = (params: DescriptionCellParams) => {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = textRef.current;
        if (element) {
            setIsOverflowing(element.scrollWidth > element.clientWidth);
        }
    }, [params.value, params.computedWidth]);

    const onClick = () => {
        params.clickSeeMoreButton(params.value);
    };

    return (
        <>
            <Box
                ref={textRef}
                sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'inline-block',
                    maxWidth: params.computedWidth,
                }}
            >
                {params.value}
            </Box>
            { isOverflowing && (
                <Box display="inline-block" ml={1}>
                    <SeeMoreButton text={params.buttonText} onClick={onClick} />
                </Box>
            )}
        </>
    );
}