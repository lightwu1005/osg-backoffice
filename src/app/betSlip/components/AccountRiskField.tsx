import {Stack, Typography} from "@mui/material";
import RiskButton, {RiskLevel} from "@/modules/components/buttons/riskButton/RiskButton";
import {className} from "postcss-selector-parser";

export interface AccountRiskFieldProps {
    userId: string
    riskColor: string
    riskName: string
    ipAddress: string
    menuItems?: RiskLevel[]
    onMenuClick?: (option: RiskLevel) => void
    className?: string
}

function AccountRiskField(props: Readonly<AccountRiskFieldProps>) {
    return (
        <Stack>
            <Stack direction="row" alignContent="start" alignItems="center">
                <Typography variant={'body2'} className={props.className}>{props.userId}</Typography>
                {/* Hide for now because of the risk function not yet ready */}
                {/*<RiskButton riskColor={props.riskColor} hover={props.riskName}*/}
                {/*            menuItems={props.menuItems}*/}
                {/*            onMenuClick={props.onMenuClick}/>*/}
            </Stack>
            <Typography variant={'body2'} color={'text.disabled'}>{props.ipAddress}</Typography>
        </Stack>
    )
}

export default AccountRiskField