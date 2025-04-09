"use client";
import PlayByPlayLogPage from "@/app/eventDetail/components/pageComponent/PlayByPlayLogPage";
import {Box} from "@mui/material";
import Breadcrumbs from "@/modules/components/breadcrumbs/Breadcrumbs";
import {useSearchParams} from "next/dist/client/components/navigation";
import {usePathname} from "next/navigation";

export default function PlayByPlayLogRouter() {
    const path = usePathname()
    const params = useSearchParams()
    const sportType = params.get('sportType') ?? ''
    const eventType = params.get('eventType') ?? ''
    const sportId = params.get('sportId') ?? ''
    const eventId = path ? path.split('/')[2] :'';
    const queryRecord = {
        eventType: eventType,
        sportId: sportId
    }
    return (
        <Box mt={3}>
            <Box sx={{paddingX: 3}}><Breadcrumbs params={queryRecord}/></Box>
            <PlayByPlayLogPage eventId={eventId} sportType={sportType}/>
        </Box>
    )
}
