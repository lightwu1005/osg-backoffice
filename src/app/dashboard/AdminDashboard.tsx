"use client";
import React from "react";
import Tabs, {FilterTabProps} from "@/modules/components/tabs/Tabs";
import AdminTabContent from "@/app/dashboard/components/pageComponent/AdminTabContent";
import useTabViewModel from "@/viewModels/useTabViewModel";
import {useIntl} from "react-intl";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export default function Page() {
    const {
        labels,
        sportCategories
    } = useTabViewModel()
    const intl = useIntl();
    const funType = `${LocalizationFunctionType.Common}.sportCategory`;
    const filterTab: FilterTabProps = {
        searchLabel: intl.formatMessage({id: `${funType}.searchLabel`, defaultMessage: 'Search Sports'}),
        filterLabel: intl.formatMessage({id: `${funType}.filterLabel`, defaultMessage: 'All Sports'})
    }

    return (
        <>
            <Tabs labels={labels} filterTab={filterTab}>
                {
                    sportCategories.map(category => (
                        <AdminTabContent sportId={category.sportId} key={'Admin_' + category.sportId}/>
                    ))
                }
            </Tabs>
        </>
    );
}
