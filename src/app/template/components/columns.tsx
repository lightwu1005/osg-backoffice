"use client";
import {GRID_CHECKBOX_SELECTION_COL_DEF, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {getDateTimeDisplay} from '@/modules/components/eventTable/EventDataConverter'
import {allFirstCharToUpperCase, TimeFormat} from "@/modules/common/DisplayFormatConverter";
import {Box, Button, Stack, Typography} from "@mui/material";
import '@/modules/components/eventTable/event.columns.css'
import {IntlShape} from "react-intl";
import {Template} from "@/services/@core/module/ResponseDataModels";

/**
 * The value of field will be used as the key for sortField.
 * */

export function columns(
    intl: IntlShape,
    funType: string,
    list: Template[]
): GridColDef[] {

    const cols = [
        {
            field: 'templateName',
            headerName: intl.formatMessage({id: `${funType}.templateName`, defaultMessage: 'Template Name'}),
        },
        {
            field: 'settingLevel',
            headerName: intl.formatMessage({id: `${funType}.settingLevel`, defaultMessage: 'Setting Level'}),
            flex: 1,
            sortable: false
        },
        {
            field: 'sportName',
            headerName: intl.formatMessage({id: `${funType}.sport`, defaultMessage: 'Sport'}),
            flex: 1
        },
        // Hide eventNumber because BE has a known issue
        // {
        //     field: 'eventNumber',
        //     headerName: intl.formatMessage({id: `${funType}.events`, defaultMessage: 'Events'}),
        //     lex: 1,
        //     sortable: false
        // },
        {
            field: 'maximum',
            headerName: intl.formatMessage({id: `${funType}.mainOdds`, defaultMessage: 'Main Min-Max Odds'}),
            flex: 1.5
        },
        {
            field: 'margin',
            headerName: intl.formatMessage({id: `${funType}.margin`, defaultMessage: 'Margin'}),
            flex: 1
        },
        {
            field: 'updatedDate',
            headerName: intl.formatMessage({id: `${funType}.lastUpdated`, defaultMessage: 'Last Updated'}),
            flex: 1,
            timeFormat: TimeFormat.Long
        }
    ];

    const columnDefinitions: GridColDef[] = [];

    function getTextWidth(text: string, fontSize: string, fontFamily: string = 'Arial'): number {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
            context.font = `${fontSize} ${fontFamily}`;
            return context.measureText(text).width;
        }
        return 0;
    }

    function calculateMaxTemplateNameWidth(templateList: any[], fontSize: string, fontFamily: string): number {
        let maxWidth = 150; // Default minimum width

        templateList.forEach(row => {
            const templateNameWidth = getTextWidth(row.templateName, fontSize, fontFamily);
            const defaultMarkWidth = row.isDefault ? 70 : 0; // Add 70 for the "Default" mark
            const totalWidth = templateNameWidth + defaultMarkWidth;
            if (totalWidth > maxWidth) {
                maxWidth = totalWidth;
            }
        });

        return maxWidth;
    }

    const getTemplateNameWidth = () => {
        const templateList = list;
        const fontSize = '17px';
        const fontFamily = 'Arial, sans-serif';
        return calculateMaxTemplateNameWidth(templateList, fontSize, fontFamily);;
    }

    const getTemplateNameDisplay = (params: GridRenderCellParams<any, string>) => {
        const isDefault = params.row.isDefault;
        const templateName = params.row.templateName;

        return (
            <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
                <Typography variant={'inherit'}>{templateName}</Typography>
                {isDefault &&
                    <Box display={'flex'}
                         sx={{ bgcolor: 'rgba(199, 223, 247, 1)', borderRadius: 1, width: 50, height: 23}}
                            alignItems={'center'} justifyContent={'center'}
                    >
                        <Typography
                            sx={{
                                fontFamily: 'Arial, sans-serif',
                                fontSize: 11,
                                fontWeight: 'bold',
                                color: 'rgba(11, 107, 203, 1)',
                            }}
                        >
                            Default
                        </Typography>
                    </Box>
                }
            </Stack>
        )
    }

    for (let col of cols) {
        const colDef: GridColDef = {
            field: col.field,
            headerName: col.headerName,
            headerClassName: 'bold-header',
            flex: col.flex,
        };
        if (col.field === 'settingLevel') {
            colDef.renderCell = (params) => {
                const {level, totalNumber} = params.row.settingLevel;
                return (
                    totalNumber > 1
                        ? <Typography color={'#2196F3'}>{`${allFirstCharToUpperCase(level)} (${totalNumber})`}</Typography>
                        : <Typography>{allFirstCharToUpperCase(level)}</Typography>
                )
            }
        }
        if (col.field === 'templateName') {
            colDef.renderCell = (params) => {
                return getTemplateNameDisplay(params);
            };
            colDef.width = getTemplateNameWidth();
        }

        if (col.field === 'updatedDate') {
            colDef.renderCell = (params) => {
                return getDateTimeDisplay(params, col.timeFormat);
            };
        }

        if(col.field === 'eventNumber') {
            colDef.renderCell =  (params) => {
                return <Button variant={'text'}>{params.value ?? 0}</Button>
            }
        }

        if (col.field === 'margin') {
            colDef.renderCell =  (params) => {
                return `${params.value}%`
            }
        }

        if (col.field === 'maximum') {
            colDef.renderCell =  (params) => {
                const mainOdds = params.row['mainOdds'];
                return `${mainOdds?.minimum} ~ ${mainOdds?.maximum}`
            }
        }

        columnDefinitions.push(colDef);
    }

    return columnDefinitions;
}

export const pinColumns = {
    left: [
        GRID_CHECKBOX_SELECTION_COL_DEF.field,
        'templateName',
    ],
    right: []
}
export const rowsPerPageOptions = [10, 15, 20, 30, 50];
export const checkboxSelection = true;
export const disableSelectionOnClick = true;
