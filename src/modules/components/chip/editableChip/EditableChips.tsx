import React from "react";
import MemoizedGridChips, {GridChips, GridChipsProps} from "@/modules/components/chip/GridChip";
import {Box, Button} from "@mui/material";
import {Edit} from "@mui/icons-material";
import lodash from "lodash";

/**
 * @param {string} id - the callback value, ex: Event ID, channel ID ...
 * @param {GridChipsProps} gridChipsProps - use for init GridChips
 * @param {function(string, GridChipsProps): void} onClicked - callback function
 */
export interface EditableChipsProps {
    id: string;
    gridChipsProps: GridChipsProps;
    onClicked?: (id: string, gridChipsProps: GridChipsProps) => void;
}

export const EditableChips = (props: EditableChipsProps) => {
    const {id, gridChipsProps, onClicked} = props;

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (onClicked) {
            onClicked(id, gridChipsProps);
        }
    };

    const editButton = (
        <Button
            color={'secondary'}
            endIcon={<Edit/>}
            onClick={handleClick}
            sx={{minWidth: 'auto', padding: 0, marginLeft: 0, height: '100%', minHeight: '100%'}}
        />
    );

    return (
        <Box sx={{width: '100%', display: 'flex', alignItems: 'center'}}>
            <MemoizedGridChips
                id={id}
                labels={gridChipsProps.labels}
                rightElement={editButton}
            />
        </Box>
    );
};

const MemoizedEditableChips = React.memo(EditableChips, (prevProps, nextProps) => (
        lodash.isEqual(
            lodash.omit(prevProps, 'onClicked'),
            lodash.omit(nextProps, 'onClicked')
        ))
)

MemoizedEditableChips.displayName = 'MemoizedEditableChips'

export default MemoizedEditableChips