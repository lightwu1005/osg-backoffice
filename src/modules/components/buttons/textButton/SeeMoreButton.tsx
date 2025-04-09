import {Button, Tooltip} from "@mui/material";
import {forwardRef, ReactNode} from "react";

export interface SeeMoreButtonProps {
    size?: 'small' | 'medium' | 'large'
    text: string
    hover?: ReactNode
    onClick?: () => void
}

const SeeMoreButton = forwardRef<HTMLButtonElement, SeeMoreButtonProps>((props, ref) => {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick()
        }
    }

    return (
        <Tooltip title={props.hover} arrow placement="top-start">
            <Button
                ref={ref}
                sx={{minWidth: 0, padding: '1px'}}
                size={props.size ?? 'medium'}
                variant={'text'}
                onClick={handleClick}
            >
                {props.text}
            </Button>
        </Tooltip>
    )
})
SeeMoreButton.displayName = 'SeeMoreButton'
export default SeeMoreButton
