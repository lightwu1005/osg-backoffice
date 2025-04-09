"use client";
import EventDetailPage from "@/app/eventDetail/components/pageComponent/EventDetailPage";
import {usePathname} from "next/navigation";
import {Box} from "@mui/material";
import Breadcrumbs from "@/modules/components/breadcrumbs/Breadcrumbs";
import {useSearchParams} from "next/dist/client/components/navigation";

export default function EventDetailRouter() {
    const path = usePathname()
    const params = useSearchParams()
    const eventType = params.get('eventType') ?? ''
    const sportId = params.get('sportId') ?? ''
    const eventId = path ? path.split('/').pop() || '' : '';

    return (
        <Box mt={3}>
            <Box sx={{paddingX: 3}}><Breadcrumbs/></Box>
            <EventDetailPage eventType={eventType} eventId={eventId} sportId={sportId}/>
        </Box>
    )
}
