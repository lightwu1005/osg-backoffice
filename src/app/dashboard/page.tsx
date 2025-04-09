"use client";
import React from "react";
import useDashboardViewModel from "@/app/dashboard/domain/useDashboardViewModel";
import Stack from "@mui/material/Stack";
import PageFramework from "@/modules/components/general/PageFramework";

export default function Page() {
    const {setDashboardPage} = useDashboardViewModel();

    return (
        <PageFramework>
            <Stack spacing={2} sx={{width: '100%', maxWidth: '100%', mx: 'auto', paddingY: 2,  paddingX: 3}}>
                {setDashboardPage()}
            </Stack>
        </PageFramework>
    );
}