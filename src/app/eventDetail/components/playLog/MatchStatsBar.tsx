import {Box, LinearProgress, Typography} from "@mui/material";

/**
 * @param value The number of percentage to display on bar.
 * @param maxValue The maximum limit of the value.
 * @param barColor The bar color.
 * @param BackgroundColor The bar background color. Default will be #DDE7EE.
 * @param direction Supports left and right side, if the stats bar is "right to left" then direction should use 'left', and "left to right" should use ''right.
 */
export interface MatchStatsBarProps {
    value: number;
    maxValue: number;
    barColor: string;
    backgroundColor?: string;
    darkBackgroundColor?: string;
    direction: 'right' | 'left'
}

const MatchStatsBar = ({value, maxValue, barColor, backgroundColor = '#DDE7EE', darkBackgroundColor = '#FFFFFF1F', direction = 'right'}: MatchStatsBarProps) => {

    const transform = (direction === 'right') ? '' : 'rotate(180deg)';
    const percentage = value / maxValue * 100;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {(direction === 'left') && <Typography variant={'subtitle2'} marginRight={2}>{value}</Typography>}
            <LinearProgress
                sx={{
                    transform: transform,
                    borderRadius: 2,
                    backgroundColor: backgroundColor,
                    '[data-mui-color-scheme="dark"] &': {
                        backgroundColor: darkBackgroundColor,
                    },
                    height: 16,
                    width: 300,
                    '& .MuiLinearProgress-bar': {
                        borderRadius: 2,
                        backgroundColor: barColor
                    }
                }}
                variant={'determinate'}
                value={percentage}
            />
            {(direction === 'right') && <Typography variant={'subtitle2'} marginLeft={2}>{value}</Typography>}
        </Box>
    )
}

export default MatchStatsBar