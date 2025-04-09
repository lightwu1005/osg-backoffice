import {Box, Typography} from "@mui/material";
import MatchStatsBar from "@/app/eventDetail/components/playLog/MatchStatsBar";

export interface MatchStatsCardProps {
    title: string;
    leftValue: number;
    rightValue: number;
}

const MatchStatsCard = ({title, leftValue, rightValue}: MatchStatsCardProps) => {
    const total = leftValue + rightValue
    return (
        <Box justifyContent={'center'} alignItems={'center'} sx={{ display: 'flex'}}>
            <MatchStatsBar value={leftValue} maxValue={total} barColor={'#0B6BCB'} direction={'left'}/>
            <Box marginLeft={3} marginRight={3} width={200} >
                <Typography variant={'subtitle2'} align={'center'}>{title}</Typography>
            </Box>
            <MatchStatsBar value={rightValue} maxValue={total} barColor={'#C41C1C'} direction={'right'}/>
        </Box>
    )
}

export default MatchStatsCard