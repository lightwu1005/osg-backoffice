import {
    FilterCustomVMProps,
    FilterSectionElement,
    FilterSectionProps
} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {Stack, Typography} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import * as React from "react";
import {useEffect, useState} from "react";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export const CustomFilterSection = ({ItemProps, selected, clearLabel, onChange, children}: FilterSectionProps<any> & FilterCustomVMProps & {children: FilterSectionElement | FilterSectionElement[]}) => {
    const [updatedChildren, setUpdatedChildren] = useState<FilterSectionElement | FilterSectionElement[]>([])
    const {labelLangKey, label} = ItemProps.getFilterItemProps()
    const intl = useIntl();
    const funType = LocalizationFunctionType.Common;
    const translateText = (key: string, label: string) => {
        return intl.formatMessage({ id: `${funType}.${key}`, defaultMessage: label });
    }

    useEffect(() => {
        const updatedChildren = React.Children.map(children, (child) => {
            if (React.isValidElement<FilterSectionProps<any>>(child)) {
                const cloneChild = React.cloneElement(child, {
                    onChange: (result: any) => {
                        if (onChange) {
                            onChange(prevState => {
                                return {
                                    ...prevState,
                                    [label]: Array.isArray(result) ? [...result] : result.key,
                                }
                            })
                        }
                    },
                    clearLabel: clearLabel,
                    selected: selected,
                    key: label,
                });
                return cloneChild
            }
            return child;
        });
        setUpdatedChildren(updatedChildren)
    }, [children, selected]);

    return (
        <>
            <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'}
                   sx={{cursor: 'pointer'}}
                   onClick={() => {
                       if (clearLabel)
                           clearLabel()
                   }}>
                <ArrowBackIosNewIcon sx={{width: '0.75rem', margin: '8px 6px'}}/>
                <Typography variant={'subtitle2'}>
                    {translateText(labelLangKey, label)}
                </Typography>
            </Stack>
            {updatedChildren}
        </>
    );
}