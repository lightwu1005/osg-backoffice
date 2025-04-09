import {Grid, Typography} from "@mui/material";
import NormalChip from "@/modules/components/chip/NormalChip";
import React, {useEffect, useRef, useState} from "react";
import lodash, {debounce} from "lodash";
import SeeMoreButton from "@/modules/components/buttons/textButton/SeeMoreButton";
import Box from "@mui/system/Box";

export interface GridChipsProps {
    id?: string
    labels: string[]
    rightElement?: React.ReactNode
}

export const GridChips = ({id, labels, rightElement}: GridChipsProps) => {
    const spacing = 1
    const containerRef = useRef<HTMLDivElement | null>(null)
    const moreRef = useRef<HTMLButtonElement | null>(null)
    const rightElementRef = useRef<HTMLDivElement | null>(null)
    const [showPlus, setShowPlus] = useState(false)
    const [visibleLabels, setVisibleLabels] = useState<string[]>(labels)
    const [moreItems, setMoreItems] = useState<string[]>([])
    const [rendering, setRendering] = useState(true)
    const [renderedShowPlus, setRenderedShowPlus] = useState(false)
    const [renderedVisibleLabels, setRenderedVisibleLabels] = useState<string[]>([])
    const [renderedMoreItems, setRenderedMoreItems] = useState<string[]>([])

    const rendered = debounce(() => setRendering(false), 500)

    useEffect(() => {
        const handleResize = debounce(() => {
            if (containerRef.current) {
                setRendering(true)
                const containerWidth = containerRef.current.offsetWidth
                const moreWidth = moreRef.current?.offsetWidth ?? 20
                const rightElementWidth = rightElementRef.current?.offsetWidth ?? 0
                const _spacing = spacing * 8;
                let itemsWidth = 0
                const visible = []

                for (let i = 0; i < labels.length; i++) {
                    const item = containerRef.current.children[i]
                    if (!item) break
                    if (item === moreRef.current?.parentElement || item === rightElementRef.current?.parentElement) {
                        visible.push(labels[i])
                        setTimeout(handleResize, 50)
                        setVisibleLabels(visible);
                        return;
                    }
                    const itemWidth = item.clientWidth || 0
                    const itemSpacing = i > 0 ? _spacing : 0
                    if (itemsWidth + itemWidth + itemSpacing <= containerWidth) {
                        itemsWidth += (itemWidth + itemSpacing)
                        visible.push(labels[i])
                        if (itemWidth === 0) {
                            setTimeout(handleResize, 50)
                        }
                    } else {
                        break
                    }
                }

                const _showPlus = visible.length < labels.length
                if (_showPlus) {
                    while (itemsWidth + moreWidth + _spacing + rightElementWidth + _spacing > containerWidth) {
                        const index = visible.length - 1
                        const item = containerRef.current.children[index]
                        const itemWidth = item.clientWidth || 0
                        const itemSpacing = index > 0 ? _spacing : 0
                        itemsWidth -= (itemWidth + itemSpacing)

                        visible.pop()
                    }
                }

                setShowPlus(_showPlus);
                setVisibleLabels(visible);
                setMoreItems(labels.slice(visible.length, labels.length))
            }
        }, 100)

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        };
    }, [labels]);

    useEffect(() => {
        rendered()
    }, [moreItems]);

    useEffect(() => {
        if (!rendering) {
            setRenderedShowPlus(showPlus)
            setRenderedVisibleLabels(Object.assign([], visibleLabels))
            setRenderedMoreItems(Object.assign([], moreItems))
        }
    }, [rendering]);

    return <Box sx={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        flexWrap: 'nowrap',
        overflow: 'hidden',
    }}>
        <Grid container spacing={spacing} ref={containerRef} sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            alignItems: 'center',
            pointerEvents: 'none',
            opacity: 0,
        }}>
            {visibleLabels.map((format: string, i: number) => (
                <Grid item key={`${id}_${i}`} style={{
                    display: 'inline-block',
                    flexShrink: 0,
                }}>
                    <NormalChip label={format}/>
                </Grid>
            ))}
            {showPlus &&
                <Grid item key={`${id}_more_${moreItems.length}`}>
                    <SeeMoreButton
                        ref={moreRef}
                        text={`+${moreItems.length}`}
                        hover={moreItems.join(', ')}
                    />
                </Grid>
            }
            {rightElement && (
                <Grid item key={`${id}_right_element`} ref={rightElementRef}>
                    {rightElement}
                </Grid>
            )}
        </Grid>
        <Grid
            container
            spacing={spacing}
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                flexWrap: 'nowrap',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                alignItems: 'center',
            }}
        >
            {renderedVisibleLabels.map((format: string, i: number) => (
                <Grid
                    item
                    key={`${id}_rendered_${i}`}
                    style={{
                        display: 'inline-block',
                        flexShrink: 0,
                    }}
                >
                    <NormalChip label={format} />
                </Grid>
            ))}
            {renderedShowPlus && (
                <Grid item key={`${id}_rendered_more_${renderedMoreItems.length}`}>
                    <SeeMoreButton text={`+${renderedMoreItems.length}`} hover={renderedMoreItems.join(', ')} />
                </Grid>
            )}
            {rightElement && (
                <Grid item key={`${id}_rendered_right_element`}>
                    {rightElement}
                </Grid>
            )}
        </Grid>
    </Box>
}

const MemoizedGridChips = React.memo(GridChips, (prevProps, nextProps) => (
    lodash.isEqual(prevProps, nextProps)
))

MemoizedGridChips.displayName = 'MemoizedGridChips'

export default MemoizedGridChips