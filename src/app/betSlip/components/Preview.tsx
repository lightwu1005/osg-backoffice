import {Box, Stack} from "@mui/material"
import * as React from "react"
import Marquee from "@/modules/components/general/Marquee"
import {PreviewType} from "@/app/betSlip/components/PreviewCard";

interface PreviewBuilderProps {
    previewType: PreviewType
    text?: string
    isBannerOn?: boolean
}

interface PreviewProps {
    text: string;
    isBannerOn?: boolean;
}

const DesktopPreview = ({ text, isBannerOn }: PreviewProps) => {
    return (
        <Box sx={{width: '100%', height: 'auto', overflow: 'hidden'}}>
            <Stack direction="column" sx={{width: '100%', height: 'auto'}}>
                <Box
                    component="img"
                    src='/Nav.png'
                    alt="NavigationBar"
                    sx={{width: '100%', height: 'auto', objectFit: 'contain'}}
                />
                <Stack direction="row" sx={{width: '100%', height: 'auto', backgroundColor: '#020F24'}}>
                    <Box
                        component="img"
                        src='/sidermenu.png'
                        alt="SideMenu"
                        sx={{width: '22%', height: 'auto', objectFit: 'contain'}}
                    />
                    <Box sx={{position: 'relative', width: '100%', height: '100%', objectFit: 'contain'}}>
                        <Box sx={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
                            <Marquee
                                text={text}
                                backgroundColor="var(--Background-Level-3, #243857)"
                                opacity={0.9}
                                alignTop={0}
                                alignLeft={0}
                                isBannerOn={isBannerOn}
                            />
                            <Box
                                component="img"
                                src='/container.png'
                                alt="Content"
                                sx={{width: '100%', height: 'auto', objectFit: 'contain'}}
                            />
                        </Box>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    )
}

const MobilePreview = ({ text, isBannerOn }: PreviewProps) => {
    return (
        <Box sx={{width: '60%', height: 'auto', overflow: 'hidden'}}>
            <Stack direction="column" sx={{width: '100%', height: 'auto'}}>
                <Box
                    component="img"
                    src='/NewMobileNav.png'
                    alt="NewMobileNavigationBar"
                    sx={{width: '100%', height: 'auto', objectFit: 'contain'}}
                />
                <Box sx={{position: 'relative', width: '100%', height: '100%', objectFit: 'contain'}}>
                    <Box sx={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
                        <Marquee
                            text={text}
                            backgroundColor="var(--Background-Level-3, #243857)"
                            opacity={0.9}
                            alignTop={0}
                            alignLeft={0}
                            isBannerOn={isBannerOn}
                        />
                        <Box
                            component="img"
                            src='/MobileContainer.png'
                            alt="MobileContent"
                            sx={{width: '100%', height: 'auto', objectFit: 'contain'}}
                        />
                    </Box>
                </Box>
            </Stack>
        </Box>
    )
}
const PreviewBuilder = (props: PreviewBuilderProps) => {
    const {previewType, text, isBannerOn} = props

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            {
                previewType === PreviewType.Desktop
                ? <DesktopPreview text={text ?? ''} isBannerOn={isBannerOn}/>
                : <MobilePreview text={text ?? ''} isBannerOn={isBannerOn}/>
            }
        </Box>
    )
}

export default PreviewBuilder
