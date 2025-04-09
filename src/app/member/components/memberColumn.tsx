import {GridColDef} from '@mui/x-data-grid';
import '@/modules/components/eventTable/event.columns.css';
import {useIntl} from "react-intl";
import {RiskGroupDataModel, RiskMemberModel, TagModel} from "@/services/@core/module/ResponseDataModels";
import {DropdownChip} from "@/modules/components/chip/ChipDropdown/component/DropdownChip";
import {DropdownChipViewModel} from "@/modules/components/chip/ChipDropdown/domain/DropdownChipViewModel";
import {OptionItem} from "@/modules/components/TextField/QueryableSelectTextField/QueryableSelectTextField";
import {CustomChip} from "@/modules/components/chip/CustomChip";
import * as React from "react";
import MemoizedEditableChips from "@/modules/components/chip/editableChip/EditableChips";
import MemoizedGridChips from "@/modules/components/chip/GridChip";
import {Box, Button} from "@mui/material";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";
import {getDateTimeDisplay} from "@/modules/components/eventTable/EventDataConverter";
import {TimeFormat} from "@/modules/common/DisplayFormatConverter";

interface MemberListProps {
    handleOnChange: (punterId: string, options: OptionItem<RiskGroupDataModel>[]) => void;
    handleTagEditClick: (id: string, tags: TagModel[]) => void;
}

const langCommonType = LocalizationFunctionType.Common
const langMemberType = LocalizationFunctionType.Member

export const MemberListColumns = (props: MemberListProps): GridColDef[] => {
    const intl = useIntl();

    const handleOnChange = (punterId: string, options: OptionItem<RiskGroupDataModel>[]) => {
        props.handleOnChange(punterId, options);
    };

    const handleTagEditClick = (id: string, tags: TagModel[]) => {
        props.handleTagEditClick(id, tags);
    }

    return [
        {
            field: 'punterId',
            headerName: intl.formatMessage({id: `${langCommonType}.memberId`, defaultMessage: 'Member ID'}),
            headerClassName: 'bold-header',
            flex: 1.5,
        },
        {
            field: 'punterAccount',
            headerName: intl.formatMessage({id: `${langCommonType}.account`, defaultMessage: 'Account'}),
            headerClassName: 'bold-header',
            flex: 1.5,
        },
        {
            field: 'risk',
            headerName: intl.formatMessage({id: `${langMemberType}.riskLevel`, defaultMessage: 'Risk Level'}),
            headerClassName: 'bold-header',
            flex: 1.5,
            renderCell: (params) => {
                const punterId = params.row.punterId as string;
                const risk: RiskMemberModel = params.value as RiskMemberModel;
                const defaultRiskLevel = {
                    id: 'defaultRiskLevel',
                    name: intl.formatMessage({id: `${langMemberType}.defaultRiskLevel`, defaultMessage: 'Default Risk Level'}),
                    data: {} as RiskGroupDataModel
                };

                return (
                    <Box
                        onClick={(event) => event.stopPropagation()}
                        sx={{display: 'flex', alignItems: 'center', height: '100%'}}
                    >
                        <DropdownChip
                            key={`${punterId}-${risk.riskId ?? defaultRiskLevel.id}`}
                            ViewModel={DropdownChipViewModel}
                            label={risk.riskName ?? defaultRiskLevel.name}
                            multiple={false}
                            currentValues={[
                                risk.riskId ? {
                                    id: risk.riskId,
                                    name: risk.riskName,
                                    data: risk as unknown as RiskGroupDataModel
                                } : defaultRiskLevel
                            ]}
                            onChange={(options) => {
                                handleOnChange(punterId, options);
                            }}
                        />
                    </Box>
                );
            }
        },
        {
            field: 'tags',
            headerName: intl.formatMessage({id: `${langMemberType}.tag`, defaultMessage: 'Tags'}),
            headerClassName: 'bold-header',
            flex: 1.5,
            renderCell: (params) => {
                const tags: TagModel[] = params.value as TagModel[];
                const tagNames = tags.map((tag) => tag.tagName);
                const punterId = params.row.punterId as string;
                return (
                    <MemoizedEditableChips
                        id={punterId}
                        onClicked={() => handleTagEditClick(punterId, tags)}
                        gridChipsProps={
                            {
                                labels: tagNames
                            }
                        }
                    />
                )
            }
        },
        {
            field: 'registerTime',
            headerName: intl.formatMessage({
                id: `${langCommonType}.registrationTime`,
                defaultMessage: 'Registration Time'
            }),
            headerClassName: 'bold-header',
            flex: 1.5,
            renderCell: (params) => {
                return getDateTimeDisplay(params, TimeFormat.Long);
            },
            sortable: false
        }
    ]
}

interface MemberLevelSettingsProps {
    handlePunterNumberClick: (id: string) => void;
}

export const MemberLevelSettingsColumns = (props: MemberLevelSettingsProps): GridColDef[] => {
    const intl = useIntl();

    const handlePunterNumberClick = (id: string) => {
        props.handlePunterNumberClick(id);
    }

    return [
        {
            field: 'riskName',
            headerName: intl.formatMessage({id: `${langMemberType}.riskName`, defaultMessage: 'Risk Name'}),
            headerClassName: 'bold-header',
            flex: 1.5,
        },
        {
            field: 'riskColor',
            headerName: intl.formatMessage({id: `${langMemberType}.riskLevel`, defaultMessage: 'Risk Level'}),
            headerClassName: 'bold-header',
            flex: 1.5,
            renderCell: (params) => {
                const risk: RiskGroupDataModel = params.row as RiskGroupDataModel;

                return (
                    <CustomChip color={risk.riskColor} label={risk.riskName}/>
                )
            }
        },
        {
            field: 'punterNumber',
            headerName: intl.formatMessage({id: `${langMemberType}.punterNumber`, defaultMessage: 'Members'}),
            headerClassName: 'bold-header',
            flex: 1.5,
            renderCell: (params) => {
                const risk = params.row as RiskGroupDataModel;
                return (
                    <Button
                        color={'primary'}
                        onClick={(event) => {
                            event.stopPropagation();
                            handlePunterNumberClick(risk.riskId);
                        }}
                    >
                        {risk.punterNumber}
                    </Button>
                )
            }
        },
        {
            field: 'tags',
            headerName: intl.formatMessage({id: `${langMemberType}.tag`, defaultMessage: 'Tags'}),
            headerClassName: 'bold-header',
            flex: 1.5,

            renderCell: (params) => {
                const id = params.id as string;
                const tags: TagModel[] = params.value as TagModel[];
                const tagNames = tags.map((tag) => tag.tagName);

                return (
                    <MemoizedGridChips
                        id={id}
                        labels={tagNames}
                    />
                )
            }
        }
    ]
}

export const rowsPerPageOptions = [10, 15, 20, 30, 50];
export const checkboxSelection = true;
export const disableSelectionOnClick = true;