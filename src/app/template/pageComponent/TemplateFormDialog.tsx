import ToggleProps from "@/modules/interface/ToggleProps";
import {FullScreenDialog} from "@/modules/components/dialog/FullScreenDialog";
import * as React from "react";
import {useCallback, useState} from "react";
import TemplateForm, {TemplateFormProps} from "@/app/template/pageComponent/TemplateForm";
import {
    MemoizedTemplateSummaryForm,
    TemplateSummaryFormProps
} from "@/app/eventDetail/components/pageComponent/TemplateSummaryForm";
import {Box} from "@mui/material";

export interface TemplateModelDialogProps extends ToggleProps {
    templateModelProps: TemplateFormProps
    onFinished: (templateId?: string) => void
}

export default function TemplateFormDialog(props: TemplateModelDialogProps) {
    const {open, setOpen, templateModelProps} = props
    const [isPreview, setIsPreview] = useState(false)
    const data = {
        editTemplateId: templateModelProps.editTemplateId,
        eventType: templateModelProps.eventType,
        isDuplicate: templateModelProps.isDuplicate,
        viewOnly: templateModelProps.viewOnly,
    }
    const [templateSummaryData, setTemplateSummaryData] = useState<TemplateSummaryFormProps | undefined>();

    const handleNext = useCallback((data: TemplateSummaryFormProps) => {
        setTemplateSummaryData(data);
        setIsPreview(true);
    }, []);

    const handleFinished = useCallback((templateId?: string) => {
        setOpen(false);
        setIsPreview(false);
        props.onFinished(templateId);
    }, [setOpen, data.eventType]);

    const handleGotoSettingPage = useCallback(() => {
        setIsPreview(false);
    }, []);

    return <Box>
        <FullScreenDialog
            open={open}
            setOpen={setOpen}
            content={<TemplateForm {...data} onPublish={handleNext}/>}
        />
        <FullScreenDialog
            open={isPreview}
            setOpen={setIsPreview}
            content={
                templateSummaryData && <MemoizedTemplateSummaryForm
                    {...templateSummaryData}
                    onFinished={handleFinished}
                    gotoSettingPage={handleGotoSettingPage}
                />
            }
        />
    </Box>

}