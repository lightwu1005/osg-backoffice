import {Stack} from "@mui/material";
import React, {JSX} from "react";
import Box from "@mui/system/Box";
import {useRouter} from "next/navigation"

const MenuHeader: React.FC<{ open: boolean }> = ({open}): JSX.Element => {
    const router = useRouter()

    return <Stack sx={{
        padding: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row'
    }}>
        <Box
            component="img"
            alt="OllehSports"
            src={open ? "/logo/sideMenuLogo.svg" : "/logo/smallLogo.svg"}
            onClick={() => {
                router.push('/dashboard')
            }}
        />
    </Stack>
}

export default MenuHeader