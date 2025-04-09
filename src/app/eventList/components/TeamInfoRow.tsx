import React from "react";
import {Avatar, Stack, Typography} from "@mui/material";

interface TeamInfoRowProps {
    homeName: string;
    awayName: string;
}

const TeamInfo = ({name, isHomeTeam}: { name: string; isHomeTeam: boolean }) => {
    return (
        <Stack spacing={1} alignItems="center" direction="row">
            <Avatar
                sizes="small"
                sx={{
                    width: "1.5rem",
                    height: "1.5rem",
                    backgroundColor: isHomeTeam ? "#0B6BCB" : "#C41C1C",
                    color: "#FFFFFF",
                }}
            >
                <Typography>{isHomeTeam ? "H" : "A"}</Typography>
            </Avatar>
            <Typography color="text.secondary">{name}</Typography>
        </Stack>
    );
};

const TeamInfoRow = ({homeName, awayName}: TeamInfoRowProps) => {
    return (
        <Stack direction="row" spacing={1} padding={2}>
            <TeamInfo name={homeName} isHomeTeam={true}/>
            <TeamInfo name={awayName} isHomeTeam={false}/>
        </Stack>
    );
};

export default TeamInfoRow;
