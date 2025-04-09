import * as React from "react";
import {ReactElement, useEffect} from "react";
import {
    FilterVM,
    OptionItem,
    SelectedOptions
} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {Box, Stack, Typography} from "@mui/material";
import useAllSearchViewModel from "@/modules/components/buttons/multipleFilterButton/domain/useAllSearchViewModel"


export interface AllSearchBlockProps {
    search: string
    children: ReactElement<FilterVM> | ReactElement<FilterVM>[]
    onChange: React.Dispatch<React.SetStateAction<SelectedOptions<OptionItem[]>>>
    onClose: () => void
}

export interface SearchLabel {
    label: string
    totalElement: number
    options: OptionItem[]
}

interface LabelBlockProps {
    searchLabel: SearchLabel
    handleClick: (label: string, option: OptionItem) => void
    loadNextPage: (label: string) => void
}

const LabelBlock = ({searchLabel, handleClick, loadNextPage}: LabelBlockProps) => {
    const {label, totalElement, options} = searchLabel
    useEffect(() => {
        console.log(`${label} useEffect ${options.length} ${totalElement}`)
        if (options.length === totalElement)
            return
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (options.length < totalElement) {
                            loadNextPage(label)
                        }
                    }
                });
            }
        );
        const lastItem = document.querySelector(`#${label}_${options.length - 1}`) as Element
        console.log(`${label} lastItem ${lastItem}`)
        if (lastItem) observer.observe(lastItem);

        return () => {
            if (lastItem) observer.unobserve(lastItem)
        }
    }, [options]);

    return <Box mb={2}>
        <Typography
            lineHeight={'1.5rem'}
            fontSize={'0.875rem'}
            fontStyle={'normal'}
            fontFamily={'Roboto'}
            sx={{
                color: '#636B74',
                '[data-mui-color-scheme="dark"] &': {
                    color: '#9FA6AD',
                },
            }}
        >
            {label}
        </Typography>
        <Stack spacing={0.5}>
            {
                options.map((option, index) => {
                    const key = `${label}_${index}`
                    return <Typography
                        id={key}
                        key={key}
                        color={'text.primary'}
                        padding={'2px 0px'}
                        fontFamily={'Inter'}
                        fontSize={'1rem'}
                        fontStyle={'normal'}
                        fontWeight={'400'}
                        lineHeight={'1.5rem'}
                        onClick={(e) => {
                            e.preventDefault()
                            handleClick(label, option)
                        }}>
                        {option.name}
                    </Typography>
                })
            }
        </Stack>
    </Box>
}

export const AllSearchBlock: React.FC<AllSearchBlockProps> = (props) => {
    const {handleClick, loadNextPage, labelIndexes, searchLabels} = useAllSearchViewModel(props)
    return (
        <Stack maxHeight={'300px'} overflow={'auto'} spacing={1}>
            {
                labelIndexes.filter(label => {
                    return searchLabels[label] !== undefined
                }).map((label, index) => (
                    <LabelBlock
                        key={`${label}_${index}`}
                        searchLabel={searchLabels[label]}
                        handleClick={handleClick}
                        loadNextPage={loadNextPage}
                    />
                ))
            }
        </Stack>
    )
}
