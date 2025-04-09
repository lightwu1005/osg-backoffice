import React from "react";
import {Functionality} from "@/services/@core/module/Enum";
import AdminDashboard from "@/app/dashboard/AdminDashboard"
import OddsDashboard from "@/app/dashboard/OddsDashboard"

const useDashboardViewModel = () => {
    const userFunctionality = process.env.FUNCTIONALITY ?? '';

    const setDashboardPage = () => {
        switch (userFunctionality) {
            case Functionality.Admin:
                return (
                    <AdminDashboard/>
                )
            case Functionality.Odds:
                return (
                    <OddsDashboard/>
                )
        }
    }

    return {setDashboardPage}
}

export default useDashboardViewModel