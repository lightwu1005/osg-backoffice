import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import React from "react";
import {Button} from "@mui/material";
import {InfoQueryableSelectTextField} from "@/modules/components/TextField";
import ToggleProps from "@/modules/interface/ToggleProps";
import PageFramework from "@/modules/components/general/PageFramework";
import LoadingAnimation from "@/modules/components/general/LoadingAnimation";
import useEditTagsModelViewModel from "@/app/member/domain/useEditTagsModelViewModel";
import {TagsListViewModel} from "@/app/member/domain/TagsListViewModel";
import {OptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import {LocalizationFunctionType} from "@/localizedConfig/LanguageContext";

export interface EditMemberTagsProps extends ToggleProps {
    punterId: string
    initialSelectedOptions: OptionItem[] // User's selected tags.
    onFinished: () => void
}

const EditMemberTagsDialog = (props: EditMemberTagsProps) => {
    const {open, setOpen, initialSelectedOptions} = props
    const {
        intl,
        funCommonType,
        handleQueryableSelectedValue,
        isSubmitEnable,
        updateTagsApplyData,
        isLoading,
        tagsSetting,
    } = useEditTagsModelViewModel(props)
    const funType = LocalizationFunctionType.Member

    return (
        <PageFramework>
            <Dialog
                open={open}
                onClose={setOpen}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        width: '40vw'
                    },
                }}
            >
                <DialogContent sx={{ paddingTop: 4 }}>
                    <InfoQueryableSelectTextField
                        header={intl.formatMessage({ id: `${funType}.tagsModelTitle`, defaultMessage: 'Edit Member’s Tags' })}
                        menu={{
                            label: intl.formatMessage({ id: `${funType}.tag`, defaultMessage: 'Tags' }),
                            currentValues: tagsSetting ?? initialSelectedOptions ?? [],
                            multiple: true,
                            limitTags: 3,
                            onChange: handleQueryableSelectedValue,
                            ViewModel: TagsListViewModel
                        }}
                    />
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: 'flex-end',
                        margin: '1rem'
                    }}
                >
                    <Button variant={'text'} onClick={() => setOpen(false)}>
                        { intl.formatMessage({id: `${funCommonType}.cancel`, defaultMessage: 'Cancel'}) }
                    </Button>
                    <Button data-testid={'export-button'}
                            variant={'contained'} disabled={isSubmitEnable} onClick={updateTagsApplyData}>
                        { intl.formatMessage({id: `${funCommonType}.save`, defaultMessage: 'Save'}) }
                    </Button>
                </DialogActions>
                <LoadingAnimation isLoading={isLoading}/>
            </Dialog>
        </PageFramework>
    )
}

export default EditMemberTagsDialog