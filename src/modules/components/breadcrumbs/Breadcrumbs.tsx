import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import {usePathname} from "next/navigation";
import {SplitscreenRounded} from "@mui/icons-material";
import {IntlShape, useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

interface BreadcrumbsProps {
    path?: string
    params?: Record<string, string>
}

function displayBreadcrumbName(endPoint: string, intl: IntlShape, funType: string) {
    switch (endPoint) {
        case 'eventList':
            return intl.formatMessage({
                id: `${funType}.eventList`,
                defaultMessage: 'Event List'
            })
        case 'playByPlayLog':
            return intl.formatMessage({
                id: `${funType}.playByPlayLog`,
                defaultMessage: 'Play By Play Log'
            })
        default:
            return endPoint
    }
}
function Breadcrumbs({path, params}: Readonly<BreadcrumbsProps>) {
    const hookPathname = usePathname()
    let pathname = path ?? hookPathname
    if (pathname.charAt(0) === '/') {
        pathname = pathname.slice(1);
    }
    const endPoints = pathname?.split('/')
    if (endPoints && endPoints[0] === 'dashboard') {
        endPoints.shift()
    }
    const lastEndPoint = endPoints.pop()
    const query = params ? Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&') : ''
    const intl = useIntl()
    const funType = `${LocalizationFunctionType.Common}.breadCrumb`

    return (
        <div role="presentation" >
            <MuiBreadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    sx={{display: 'flex', alignItems: 'center'}}
                    color="inherit"
                    href="/"
                >
                    <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>
                </Link>
                {endPoints.map((endPoint, index) => {
                    const url = endPoints.slice(0, index+1).join("/")
                    return <Link key={index}
                        underline="hover"
                        sx={{display: 'flex', alignItems: 'center'}}
                        color="inherit"
                        href={`/${url}?${query}`}
                    >
                        <SplitscreenRounded sx={{mr: 0.5}} fontSize="inherit"/>
                        {displayBreadcrumbName(endPoint, intl, funType)}
                    </Link>
                })}
                {lastEndPoint ?
                    <Typography
                        sx={{display: 'flex', alignItems: 'center'}}
                        color="text.primary"
                    >
                        <SplitscreenRounded sx={{mr: 0.5}} fontSize="inherit"/>
                        {displayBreadcrumbName(lastEndPoint, intl, funType)}
                    </Typography>
                    : undefined}
            </MuiBreadcrumbs>
        </div>
    );
}

export default Breadcrumbs