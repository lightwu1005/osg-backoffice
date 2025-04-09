import {ChipColor} from "@/modules/components/chip/MuiChipsStyled";
import {CustomChip} from "@/modules/components/chip/CustomChip";

interface NormalChipProps {
    label: string
}

const NormalChip = ({label}: NormalChipProps) => {
    return <CustomChip color={ChipColor.default} label={label}/>
};

export default NormalChip