import {Box, Grid, Stack, Typography} from "@mui/material";
import {GrayText, GreenLabel} from "@/app/eventDetail/components/TemplateSummaryCardItem";
import {GridBlock} from "@/app/eventDetail/components/pageComponent/TemplateSummaryForm";
import React from "react";
import {KeyboardArrowRightRounded} from "@mui/icons-material";

interface BasicTemplateCell {
    isButton?: boolean;
    value: string;
    onClick?: (isNew: boolean, rowIndex: number, cellIndex: number) => void;
}

export interface BasicTemplateTabContentProps {
    title: string;
    headers: string[];
    cells: BasicTemplateCell[][][];
}

function generateKey(info: string[]): string {
    return info.join("-");
}

// RenderBlock
const RenderBlock = ({
                         isNew,
                         blockTitle,
                         headers,
                         cells,
                         marginBottom
                     }: {
    isNew: boolean;
    blockTitle: string;
    headers: string[];
    cells: BasicTemplateCell[][][];
    marginBottom: number;
}) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                {blockTitle === "NEW" ? (
                    <GreenLabel sx={{
                        paddingX: 0,
                        textAlign: "start",
                        fontWeight: "700",
                        fontSize: "1rem",
                        backgroundColor: "unset",
                        marginBottom
                    }}>
                        {blockTitle}
                    </GreenLabel>
                ) : (
                    <GrayText sx={{
                        paddingX: 0,
                        textAlign: "start",
                        fontWeight: "700",
                        fontSize: "1rem",
                        backgroundColor: "unset",
                        marginBottom
                    }}>
                        {blockTitle}
                    </GrayText>
                )}
            </Grid>
            <RenderHeaders headers={headers} marginBottom={marginBottom}/>
            <RenderRows isNew={isNew} cells={cells} marginBottom={4}/>
        </Grid>
    );
};

const RenderHeaders = ({headers, marginBottom}: { headers: string[]; marginBottom: number }) => {
    const xs = 12 / headers.length || 1;

    return (
        <Grid container>
            {headers.map((header, index) => (
                <Grid item xs={xs} marginBottom={marginBottom} key={generateKey(['header', `${index}`, header])}>
                    <Typography
                        variant="h6"
                        sx={{textAlign: "start", fontSize: "1rem", fontWeight: "bold"}}
                    >
                        {header}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    );
};

const CellRenderer = ({isNew, cell, rowIndex, cellIndex}: {
    isNew: boolean,
    cell: BasicTemplateCell[],
    rowIndex: number,
    cellIndex: number
}) => {
    return (
        <Stack spacing={1} alignItems={"start"}>
            {cell.map(({isButton = false, value, onClick}, lineIndex) =>
                isButton ? (
                    <ButtonCellRenderer
                        key={generateKey(['button', `${lineIndex}`, value])}
                        isNew={isNew}
                        value={value}
                        rowIndex={rowIndex}
                        cellIndex={cellIndex}
                        onClick={onClick}
                    />
                ) : (
                    <Typography
                        key={generateKey(['text', `${lineIndex}`, value])}
                        variant="body1"
                        sx={{textAlign: "start", fontSize: "1rem"}}
                    >
                        {value}
                    </Typography>
                )
            )}
        </Stack>
    );
};

// render button
const ButtonCellRenderer = ({isNew, value, rowIndex, cellIndex, onClick}: {
    isNew: boolean;
    value: string;
    rowIndex: number;
    cellIndex: number;
    onClick?: (isNew: boolean, rowIndex: number, cellIndex: number) => void
}) => {
    return (
        <Stack direction="row" alignItems="center" spacing={0}>
            <Typography variant="body1">{value}</Typography>
            <KeyboardArrowRightRounded
                color="primary"
                onClick={() => onClick?.(isNew, rowIndex, cellIndex)}
            />
        </Stack>
    );
};

// Render rows
const RenderRows = ({isNew, cells, marginBottom}: {
    isNew: boolean,
    cells: BasicTemplateCell[][][];
    marginBottom: number
}) => {
    if (!cells || cells.length === 0 || !cells[0]) {
        return null;
    }

    const xs = 12 / (cells[0]?.length || 1);

    return (
        <>
            {cells.map((row, rowIndex) => (
                <Grid container key={generateKey(['row', `${rowIndex}`])} marginBottom={marginBottom}>
                    {row.map((cell, cellIndex) => (
                        <Grid item xs={xs} key={generateKey(['cell', `${rowIndex}`, `${cellIndex}`])}>
                            <CellRenderer isNew={isNew} cell={cell} rowIndex={rowIndex} cellIndex={cellIndex}/>
                        </Grid>
                    ))}
                </Grid>
            ))}
        </>
    );
};

interface TemplateTabContentProps {
    blockTitles: string[];
    contentData: BasicTemplateTabContentProps[];
}

function BasicTemplateTabContent(props: Readonly<TemplateTabContentProps>) {
    const marginBottom = 2;
    const {blockTitles, contentData} = props

    return (
        <Box width={"100%"}>
            {blockTitles.map((blockTitle, index) => (
                <GridBlock
                    key={generateKey(['GridBlock', `${index}`, blockTitle])}
                    sx={{marginBottom: 3, backgroundColor: index === 0 ? "#e8f5e9" : "#FBFCFE"}}
                >
                    <RenderBlock
                        key={generateKey(['RenderBlock', `${index}`, blockTitle])}
                        isNew={index === 0}
                        blockTitle={blockTitle}
                        headers={contentData[index].headers}
                        cells={contentData[index].cells}
                        marginBottom={marginBottom}
                    />
                </GridBlock>
            ))}
        </Box>
    );
}

export const MemoizedBasicTemplateTabContent = React.memo(BasicTemplateTabContent);
MemoizedBasicTemplateTabContent.displayName = "BasicTemplateTabContent";
