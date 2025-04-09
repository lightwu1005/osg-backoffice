import React, {useEffect} from "react";
import {Box, Divider, Stack, Typography} from "@mui/material";
import SingleDropDown from "@/app/dashboard/components/SingleDropDown";
import MultipleDropDown from "@/app/dashboard/components/MultipleDropDown";
import TestProps from "@/modules/interface/TestProps";
import lodash from "lodash";

const style = {
    width: '100%',
    height: '100%',
    borderRadius: '0.5rem',
    border: 1,
    borderColor: 'divider',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
}

function ChartWrapper({children, title, type, atLeastOne, options, isSingle, flexDirection = 'column', onOptionsSelected, testId}: {
    children: React.ReactElement,
    title: string,
    type?: 'sport' | 'league',
    atLeastOne?: boolean,
    options?: string[],
    isSingle?: boolean
    flexDirection?: 'row' | 'column',
    onOptionsSelected?: (options: string[]) => void
} & TestProps) {
    const [_flexDirection, setFlexDirection] = React.useState('column');
    useEffect(() => {
        if (flexDirection !== _flexDirection) {
            setTimeout(() => {
                setFlexDirection('row')
            }, 500)
        }
    }, []);

    return (
        <Box sx={{...style}}>
            <Stack direction="row" justifyContent="space-between" my={2} mx={3}>
                <Typography variant="h6" flexWrap="nowrap"
                {...(testId ? {'data-testId': testId} : undefined)}
                >
                    {title}
                </Typography>
                {options && isSingle ? <SingleDropDown list={options} onOptionsSelected={onOptionsSelected}/> :
                    options && !isSingle ?<MultipleDropDown type={type} atLeastOne={atLeastOne} list={options} onOptionsSelected={onOptionsSelected}/> : null}
            </Stack>
            <Divider/>
            <Stack p={3} sx={{height: 'calc(100% - 48px)', flexDirection: _flexDirection}} >
                {children}
            </Stack>
        </Box>
    );
}

export default React.memo(ChartWrapper, (prevProps, nextProps) => {
    return lodash.isEqual(
        lodash.omit(prevProps, ['onOptionsSelected']),
        lodash.omit(nextProps, ['onOptionsSelected'])
    )
})