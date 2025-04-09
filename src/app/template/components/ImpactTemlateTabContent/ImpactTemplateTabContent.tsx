import {Box} from "@mui/material";
import useImpactTemplateTabContentViewModel from "@/app/template/domain/useImpactTemplateTabContentViewModel";
import {
    MemoizedBasicTemplateTabContent
} from "@/app/template/components/ImpactTemlateTabContent/BasicTemplateTabContent";
import React from "react";
import {ImpactTemplatesViewWordingType} from "@/app/template/models/useTranslateMapping";
import {GetTemplateDetailModel} from "@/services/@core/module/ResponseDataModels";

export interface ImpactTemplateTabContentProps {
    contentType: ImpactTemplatesViewWordingType
    newTemplates: GetTemplateDetailModel[]
    oldTemplates: GetTemplateDetailModel[]
    onCellButtonClick: (isNew: boolean, rowIndex: number, cellIndex: number) => void
}

function ImpactTemplateTabContent(props: Readonly<ImpactTemplateTabContentProps>) {
    const {
        contentData,
        blockTitles
    } = useImpactTemplateTabContentViewModel(props)

    return (
        <Box marginTop={2}>
            <MemoizedBasicTemplateTabContent
                blockTitles={blockTitles}
                contentData={contentData}
            />
        </Box>
    )
}

export const MemoizedImpactTemplateTabContent = React.memo(ImpactTemplateTabContent)
MemoizedImpactTemplateTabContent.displayName = "ImpactTemplateTabContent"


