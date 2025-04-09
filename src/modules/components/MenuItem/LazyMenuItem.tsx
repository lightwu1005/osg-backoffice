import * as React from "react";
import {OptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

export enum LazyMenuItemType {
    Normal = 'Normal',
    Checkbox = 'Checkbox'
}

export interface LazyMenuItemProp {
    id?: string,
    itemType?: LazyMenuItemType
    option: OptionItem
    selected?: boolean
    onChange: (event: React.MouseEvent<HTMLElement>, option: OptionItem) => void;
}

export const LazyMenuItem: React.FC<LazyMenuItemProp> = React.memo((props) => {
    const {itemType = LazyMenuItemType.Checkbox, option, selected, onChange} = props;
    const {id, name} = option;

    return (
        <MenuItem className={'lazy-list-item'} id={props?.id ?? id} key={id} value={id} onClick={(e) => onChange(e, option)}>
            {itemType === LazyMenuItemType.Checkbox && <Checkbox checked={selected}/>}
            <ListItemText primary={name}/>
        </MenuItem>
    );
});

LazyMenuItem.displayName = 'LazyMenuItem'
