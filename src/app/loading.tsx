import {Box, CircularProgress} from "@mui/material";
import React from "react";

/**
 * Please refer to App Router loading ui and streaming:
 * https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
 * */
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <Box id={'loading-progress'} data-testid="loading-progress"
             component="main" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
            <CircularProgress />
        </Box>
    )
}
