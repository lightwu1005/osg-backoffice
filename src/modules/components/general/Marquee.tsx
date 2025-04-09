import React, {useEffect, useRef, useState} from 'react'
import {Box, Tooltip} from '@mui/material'

/**
 * @param {string} text - The text to display in the marquee.
 * @param {string} [fontSize='0.75rem'] - The font size of the text.
 * @param {string} [color='white'] - The color of the text.
 * @param {string} [backgroundColor='var(--Background-Level-3, #243857)'] - The background color of the marquee.
 * @param {number} [opacity=0.9] - The opacity of the marquee background.
 * @param {number|string} [alignTop=0] - The top position of the marquee.
 * @param {number|string} [alignLeft=0] - The left position of the marquee.
 * @param {number|string} [alignRight] - The right position of the marquee.
 * @param {number|string} [alignBottom] - The bottom position of the marquee.
 * @param {boolean} [isBannerOn=false] - Whether to show the banner background.
 */
interface MarqueeProps {
    text: string
    fontSize?: string
    color?: string
    backgroundColor?: string
    opacity?: number
    alignTop?: number | string
    alignLeft?: number | string
    alignRight?: number | string
    alignBottom?: number | string
    isBannerOn?: boolean
}

const Marquee: React.FC<MarqueeProps> = ({
                                             text,
                                             fontSize = '0.875rem',
                                             color = 'white',
                                             backgroundColor = 'var(--Background-Level-3, #243857)',
                                             opacity = 0.9,
                                             alignTop = 0,
                                             alignLeft = 0,
                                             alignRight,
                                             alignBottom,
                                             isBannerOn = text.length > 0 ? true : false
                                         }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(0)
    const [textWidth, setTextWidth] = useState(0)
    const [shouldAnimate, setShouldAnimate] = useState(false)

    const updateWidths = () => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth)
        }
        if (textRef.current) {
            setTextWidth(textRef.current.scrollWidth)
        }
    }

    useEffect(() => {
        updateWidths()

        const resizeObserver = new ResizeObserver(() => {
            updateWidths()
        })

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
        }

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current)
            }
        }
    }, [text])

    useEffect(() => {
        setShouldAnimate(textWidth > containerWidth)
    }, [textWidth, containerWidth])

    const duration = `${(textWidth + containerWidth) / 100}s`

    return (
        <Tooltip title={text} arrow>
            <Box
                sx={{
                    position: 'absolute',
                    top: alignTop,
                    left: alignLeft,
                    right: alignRight,
                    bottom: alignBottom,
                    width: '100%',
                    overflow: 'hidden',
                    backgroundColor: isBannerOn ? backgroundColor : 'transparent',
                    opacity: isBannerOn ? opacity : 1,
                    height: isBannerOn ? '36px' : 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        left: 4,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        boxSizing: 'border-box',
                    }}
                    ref={containerRef}
                >
                    <Box
                        sx={{
                            display: 'inline-block',
                            whiteSpace: 'nowrap',
                            animation: shouldAnimate ? `marquee ${duration} linear infinite` : 'none',
                            fontSize,
                            color,
                        }}
                        ref={textRef}
                    >
                        {text}
                    </Box>
                    {shouldAnimate && (
                        <style>
                            {`
                            @keyframes marquee {
                                0% { transform: translateX(${containerWidth}px) }
                                100% { transform: translateX(-${textWidth}px) }
                            }
                        `}
                        </style>
                    )}
                </Box>
            </Box>
        </Tooltip>
    )
}

export default Marquee
