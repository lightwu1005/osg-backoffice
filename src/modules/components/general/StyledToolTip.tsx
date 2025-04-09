import {styled} from "@mui/material/styles";
import {Tooltip} from "@mui/material";

const StyledToolTip = styled(Tooltip)(() => ({
    color: '#636B74',
    '[data-mui-color-scheme="dark"] &': {
        color: '#9FA6AD',
    }
}))

export default StyledToolTip